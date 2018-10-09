'use strict';

(function () {
  var order = [];
  var orderTemplate = document.querySelector('#card-order').content.querySelector('article');
  var cartBlock = document.querySelector('.goods__cards');
  var emptyBlock = document.querySelector('.goods__card-empty');
  var headerBasket = document.querySelector('.main-header__basket');
  var emptyBlockTemplate = emptyBlock.cloneNode(true);
  var orderForm = document.querySelector('.buy__form');
  var orderFormInputs = orderForm.querySelectorAll('input');
  var submitButton = document.querySelector('.buy__submit-btn');

  var onDecreaseButtonClick = function (object, element) {
    if (object.orderAmount === 1) {
      onOrderCardCloseClick(object);
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
      if (!order.length) {
        disableOrderFormInputs();
      }
    } else {
      object.orderAmount--;
      element.querySelector('.card-order__count').value = object.orderAmount;
    }
  };

  var onIncreaseButtonClick = function (object, element) {
    if (object.amount > object.orderAmount) {
      object.orderAmount++;
      element.querySelector('.card-order__count').value = object.orderAmount;
    }
  };

  var renderOrderDomElements = function (object) {
    var orderElement = orderTemplate.cloneNode(true);
    var orderCardClose = orderElement.querySelector('.card-order__close');
    var decreaseBtn = orderElement.querySelector('.card-order__btn--decrease');
    var increaseBtn = orderElement.querySelector('.card-order__btn--increase');
    orderCardClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      onOrderCardCloseClick(object);
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
      if (!order.length) {
        disableOrderFormInputs();
      }
    });
    decreaseBtn.addEventListener('click', function () {
      onDecreaseButtonClick(object, orderElement);
      window.catalog.checkGoodsLeft(object);
    });
    increaseBtn.addEventListener('click', function () {
      onIncreaseButtonClick(object, orderElement);
      window.catalog.checkGoodsLeft(object);
    });
    orderElement.querySelector('.card-order__title').textContent = object.name;
    orderElement.querySelector('.card-order__img').src = 'img/cards/' + object.picture;
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
    if (index === -1 && object.amount) {
      if (!order.length) {
        cartBlock.innerHTML = '';
      }
      var orderObject = Object.assign({}, object);
      var orderGoodsArray = [];
      orderObject.orderAmount = 1;
      orderGoodsArray[orderGoodsArray.length] = orderObject;
      cartBlock.appendChild(createOrderElements(orderGoodsArray));
      order[order.length] = orderGoodsArray[0];
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
    } else if (object.amount > order[index].orderAmount) {
      var currentAmount = order[index].orderAmount;
      order[index].orderAmount = currentAmount + 1;
      cartBlock.innerHTML = '';
      cartBlock.appendChild(createOrderElements(order));
    }
  };

  var checkGoodsInOrder = function (array, objectName) {
    var index = -1;
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === objectName) {
        index = i;
        break;
      }
    }
    return index;
  };

  var checkCatalogGoodAmount = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    var amount;
    if (index === -1) {
      amount = object.amount;
    } else {
      amount = object.amount - order[index].orderAmount;
    }
    return amount;
  };

  var onOrderCardCloseClick = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    order.splice(index, 1);
    cartBlock.innerHTML = '';
    if (order.length) {
      cartBlock.appendChild(createOrderElements(order));
    } else {
      cartBlock.appendChild(emptyBlockTemplate);
    }
  };

  var disableOrderFormInputs = function () {
    orderFormInputs.forEach(function (item) {
      item.disabled = true;
      submitButton.disabled = true;
    });
  };

  var enableOrderFormInputs = function () {
    orderFormInputs.forEach(function (item) {
      item.disabled = false;
      submitButton.disabled = false;
    });
    window.tabs.setInputsAbility(window.tabs.deliveryByCourierInputs, true);
  };

  var checkGoodInOrderAmount = function (object) {
    var check = order.some(function (item) {
      return (item.name === object.name && item.amount === object.amount);
    });
    return check;
  };

  window.order = {
    addGoodToCart: addGoodToCart,
    enableFormInputs: enableOrderFormInputs,
    checkGoods: checkGoodsInOrder,
    checkGoodAmount: checkGoodInOrderAmount,
    checkCatalogGoodAmount: checkCatalogGoodAmount
  };

  disableOrderFormInputs();
})();
