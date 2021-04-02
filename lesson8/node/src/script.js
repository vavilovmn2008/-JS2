const API_URL = 'http://localhost:3003/';
const vue = new Vue({
  el: '#app',
  template: `<div>
                <header class="header">
                    <search @valueChange="searchHandler" />
                    <cart
                        :cartItems="cart" 
                        @remove="removeFromCartHandler"
                        @increaseQuantity="increaseQuantityInCartHandler"
                        @decreaseQuantity="decreaseQuantityInCartHandler"
                    />
                </header>
                <main>
                    <loader :isLoading='isLoading' :isSuccessFetch='isSuccessFetch'/>
                    <goods-list v-if="isSuccessFetch" :goods="filtredGoods" @addToCart="addToCartHandler"/>
                </main>
            </div>`,
  data: {
    cart: [],
    goods: [],
    filtredGoods: [],
    search: '',
    isLoading: true,
    isSuccessFetch: false,
  },
  methods: {
    updateCart() {
      // каждое изменение корзины закидываем на сервер и забираем копию с сервера.
      // Таким образом точкой истины является файл на сервере
      fetch(`${API_URL}cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cart),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cart = data;
        });
    },

    addToCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good) {
        good.quantity++;
      } else {
        const initialGood = this.goods.find((item) => item.id == id);
        this.cart.push({ ...initialGood, quantity: 1 });
      }

      this.updateCart();
    },

    increaseQuantityInCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good) good.quantity++;

      this.updateCart();
    },

    decreaseQuantityInCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good && good.quantity >= 1) good.quantity--;

      if (good && good.quantity <= 0) {
        this.removeFromCartHandler(id);
      }

      this.updateCart();
    },

    removeFromCartHandler(id) {
      const goodIndex = this.cart.findIndex((item) => item.id == id);

      this.cart.splice(goodIndex, 1);

      this.updateCart();
    },

    searchHandler(e) {
      const {
        target: { value },
      } = e;
      if (value === '') {
        this.filtredGoods = this.goods;
      }
      const regexp = new RegExp(value, 'gi');
      this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    fetchPromise() {
      return fetch(`${API_URL}data`)
        .then((response) => {
          this.isLoading = false;
          this.isSuccessFetch = true;
          return response.json();
        })
        .catch((err) => {
          this.isLoading = false;
          this.isSuccessFetch = false;
          console.log('Fetch sucs. Smth went wrong');
        });
    },
  },
  mounted() {
    this.fetchPromise()
      .then((data) => {
        this.goods = data;
        this.filtredGoods = data;
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${API_URL}cart`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.cart = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

// запрос для создания нового товара
const addGood = () => {
  fetch(`${API_URL}data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'NEW Calc!',
      price: '10000',
    }),
  });
};