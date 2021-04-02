Vue.component('cart-item', {
    template: `<tr data-id="id">
              <td>{{ title }}</td>
              <td>{{ price }}</td>
              <td>{{ quantity }}</td>
              <td>{{ totalPrice }}</td>
              <td class="actionButtonsHolder">
                  <button @click="increaseHandler">+</button>
                  <button @click="decreaseHandler">-</button>
                  <button @click="removeHandler">X</button>
              </td>
         </tr>`,
  
    props: ['title', 'price', 'id', 'quantity'], // задаем параметры компонента
  
    computed: {
      totalPrice() {
        return this.price * this.quantity;
      },
    },
  
    methods: {
      increaseHandler() {
        this.$emit('increaseQuantity', this.id);
      },
  
      decreaseHandler() {
        this.$emit('decreaseQuantity', this.id);
      },
  
      removeHandler() {
        this.$emit('remove', this.id);
      },
    },
  });
  
  Vue.component('cart', {
    template: `<div class="cartWrapper">
                  <button class="cart-button" @click="openCartHandler" type="button">Корзина ({{totalCount}}|{{totalPrice}}р)</button>
                  <div class="cartPopup" v-if="isVisibleCart">
                    <div class="emptyCartDisclaimer" v-if="!cartItems.length">Корзина пуста</div>
                    <table v-if="cartItems.length" class="cartItemsTable">
                          <tr class="cartTableHeader">
                            <td>Название</td>
                            <td>Количество</td>
                            <td>Цена</td>
                            <td>Сумма</td>
                            <td></td>
                          </tr>
                          <cart-item
                            v-for="good in cartItems"
                            :title="good.title"
                            :price="good.price"
                            :id="good.id"
                            :quantity="good.quantity"
                            @remove="removeHandler"
                            @increaseQuantity="increaseHandler"
                            @decreaseQuantity="decreaseHandler"
                          />
                    </table>
                  </div>
               </div>`,
  
    props: {
      cartItems: Array,
    },
  
    data() {
      return {
        isVisibleCart: false,
      };
    },
  
    computed: {
      totalCount() {
        return this.cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
      },
  
      totalPrice() {
        return this.cartItems.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0,
        );
      },
    },
  
    methods: {
      openCartHandler() {
        this.isVisibleCart = !this.isVisibleCart;
      },
  
      increaseHandler(id) {
        this.$emit('increaseQuantity', id);
      },
  
      decreaseHandler(id) {
        this.$emit('decreaseQuantity', id);
      },
  
      removeHandler(id) {
        this.$emit('remove', id);
      },
    },
  });
  