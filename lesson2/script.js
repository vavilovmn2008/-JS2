class ApiMock {
    constructor() {

    }

    fetch() {
      return [
          { title: 'Shirt', price: 150 },
          { title: 'Socks', price: 50 },
          { title: 'Jacket', price: 350 },
          { title: 'Shoes', price: 250 },
        ];
    }
}

class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    getHtml() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}
class GoodsBestseller extends GoodsItem {
  constructor(title, price) {
    super (title, price);
    this.discount='20%';              //Унаследовали свойства от GoodsItem+добавили скидку 20% для "Лучшей книги". Цена доолжна быть уменьшена на 20%
  }
  getHtml() {
     return `<h2>Лучшая Книга</h2>${super.getHtml()}`
   }

}

class GoodsList {
    constructor() {
      this.api = new ApiMock();
      this.$goodsList = document.querySelector('.goods-list');
      this.goods = [];
    }

    fetchGoods() {
      this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
    }
      
    render() {
      this.$goodsList.textContent = '';
      this.goods.forEach((good) => {
          this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
      })
    }

    sumCount() {
      const sum = this.goods.reduce(function (acc, currentValue) {
        return acc + currentValue.price;
      }, 0);
      document.querySelector('.sumCount').textContent= `Общая стоимость: ${sum}`;
    }
          
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
goodsList.sumCount();