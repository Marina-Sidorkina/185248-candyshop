'use strict';

(function () {
  var order = [];
  var orderTemplate = document.querySelector('#card-order').content.querySelector('article');
  var cartBlock = document.querySelector('.goods__cards');
  var emptyBlock = document.querySelector('.goods__card-empty');
  var headerBasket = document.querySelector('.main-header__basket');

  var renderOrderDomElements = function (object) {
    var orderElement = orderTemplate.cloneNode(true);
    orderElement.querySelector('.card-order__title').textContent = object.name;
    orderElement.querySelector('.card-order__img').src = object.picture;
    orderElement.querySelector('.card-order__img').alt = object.name;
    orderElement.querySelector('.card-order__count').value = object.orderAmount;
    var amount = orderElement.querySelector('.card-order__count').value;
    orderElement.querySelector('.card-order__price').textContent = amount * object.price;
    return orderElement;
  };
  var createOrderElements = function (array) {
    var orderFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var element = renderOrderDomElements(array[i]);
      orderFragment.appendChild(element);
    }
    return orderFragment;
  };

  var addGoodToCart = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    if (index === undefined) {
      var orderObject = Object.assign({}, object);
      var orderGoodsArray = [];
      orderObject.orderAmount = 1;
      orderObject.amount = null;
      orderGoodsArray[orderGoodsArray.length] = orderObject;
      cartBlock.appendChild(createOrderElements(orderGoodsArray));
      order[order.length] = orderGoodsArray[0];
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + getWordEnding(order.length, ['товар', 'товара', 'товаров']);
    } else {
      var currentAmount = order[index].orderAmount;
      order[index].orderAmount = currentAmount + 1;
      cartBlock.innerHTML = '';
      cartBlock.appendChild(createOrderElements(order));
    }
  };

  var checkGoodsInOrder = function (array, objectName) {
    var index;
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === objectName) {
        index = i;
        break;
      }
    }
    return index;
  };

  var getWordEnding = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ?
      2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  cartBlock.classList.remove('goods__cards--empty');
  emptyBlock.classList.add('visually-hidden');
  window.addGoodToCart = addGoodToCart;
})();
