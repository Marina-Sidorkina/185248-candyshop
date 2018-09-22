'use strict';

var CATALOG_CARDS_LIST_LENGTH = 26;
var PRICE_RANGE = 100;
var order = [];
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = document.querySelector('.catalog__load');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var orderTemplate = document.querySelector('#card-order').content.querySelector('article');
var cartBlock = document.querySelector('.goods__cards');
var emptyBlock = document.querySelector('.goods__card-empty');
var headerBasket = document.querySelector('.main-header__basket');
var paymentMethodCardBtn = document.querySelector('#payment__card');
var paymentMethodCashBtn = document.querySelector('#payment__cash');
var paymentByCardBlock = document.querySelector('.payment__card-wrap');
var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
var deliverInStoreBtn = document.querySelector('#deliver__store');
var deliverByCourierBtn = document.querySelector('#deliver__courier');
var deliverInStoreBlock = document.querySelector('.deliver__store');
var deliverByCourierBlock = document.querySelector('.deliver__courier');
var priceRangeFilterBtnLeft = document.querySelector('.range__btn--left');
var priceRangeFilterBtnRight = document.querySelector('.range__btn--right');
var priceRangeMinPinValue = document.querySelector('.range__price--min');
var priceRangeMaxPinValue = document.querySelector('.range__price--max');
var priceRangeFilter = document.querySelector('.range__filter');
var priceRangeFilterCoordinate = priceRangeFilter.getBoundingClientRect();
var priceRangeStart = priceRangeFilterCoordinate.x;
var priceRangeWidth = priceRangeFilterCoordinate.width;
var priceRangeStep = priceRangeWidth / PRICE_RANGE;

var amountParams = {
  MIN: 0,
  MAX: 20
};
var priceParams = {
  MIN: 100,
  MAX: 1500
};
var weightParams = {
  MIN: 30,
  MAX: 300
};
var valueParams = {
  MIN: 1,
  MAX: 5
};
var numberParams = {
  MIN: 10,
  MAX: 900
};
var energyParams = {
  MIN: 70,
  MAX: 500
};
var ratingClasses = {
  1: '--one',
  2: '--two',
  3: '--three',
  4: '--four',
  5: '--five'
};

var GOODS_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var PICTURES_LINKS = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];
var CONTENTS_ITEMS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль',
  'нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomBoolean = function () {
  return Math.random() >= 0.5;
};

var getContentArr = function () {
  var arrayElements = [];
  for (var i = 0; i < getRandomNumber(getRandomNumber(1, CONTENTS_ITEMS.length), CONTENTS_ITEMS.length); i++) {
    arrayElements[i] = CONTENTS_ITEMS[getRandomNumber(0, CONTENTS_ITEMS.length)];
  }
  return arrayElements.join(', ');
};

var createGoodsArrayElement = function () {
  return {
    name: GOODS_NAMES[getRandomNumber(0, GOODS_NAMES.length)],
    picture: PICTURES_LINKS[getRandomNumber(0, PICTURES_LINKS.length)],
    amount: getRandomNumber(amountParams.MIN, amountParams.MAX + 1),
    price: getRandomNumber(priceParams.MIN, priceParams.MAX + 1),
    weight: getRandomNumber(weightParams.MIN, weightParams.MAX + 1),
    rating: {
      value: getRandomNumber(valueParams.MIN, valueParams.MAX + 1),
      number: getRandomNumber(numberParams.MIN, numberParams.MAX + 1)
    },
    nutritionFacts: {
      sugar: getRandomBoolean(),
      energy: getRandomNumber(energyParams.MIN, energyParams.MAX + 1),
      contents: getContentArr()
    }
  };
};

var renderGoodsArray = function (arrayLength) {
  var arrayElements = [];
  for (var i = 0; i < arrayLength; i++) {
    var element = createGoodsArrayElement();
    arrayElements[i] = element;
  }
  return arrayElements;
};

var createTagElement = function (tag, addClass, text) {
  var tagElement = document.createElement(tag);
  tagElement.classList.add(addClass);
  tagElement.textContent = text;
  return tagElement;
};

var getAvailability = function (obj) {
  if (!obj.amount) {
    return 'card--soon';
  }
  return obj.amount > 5 ? 'card--in-stock' : 'card--little';
};

var getRatingStars = function (obj) {
  return 'stars__rating' + ratingClasses[obj.rating.value];
};

var renderCatalogDomElements = function (object) {
  var catalogElement = cardTemplate.cloneNode(true);
  var goodRating = catalogElement.querySelector('.stars__rating');
  var btn = catalogElement.querySelector('.card__btn');
  var btnFavorite = catalogElement.querySelector('.card__btn-favorite');
  catalogElement.classList.add(getAvailability(object));
  catalogElement.querySelector('.card__title').textContent = object.name;
  catalogElement.querySelector('.card__img').src = object.picture;
  catalogElement.querySelector('.card__img').alt = object.name;
  catalogElement.querySelector('.card__price').textContent = object.price + ' ';
  catalogElement.querySelector('.card__price').appendChild(createTagElement('span', 'card__currency', '₽'));
  catalogElement.querySelector('.card__price').appendChild(createTagElement('span', 'card__weight', '/ ' + object.weight + ' Г'));
  goodRating.classList.remove('stars__rating--five');
  goodRating.classList.add(getRatingStars(object));
  catalogElement.querySelector('.star__count').textContent = object.rating.number;
  catalogElement.querySelector('.card__characteristic').textContent = (object.nutritionFacts.sugar ?
    'Содержит сахар, ' : 'Без сахара, ') + object.nutritionFacts.energy + ' ккал';
  catalogElement.querySelector('.card__composition-list').textContent = object.nutritionFacts.contents;
  btn.addEventListener('click', function () {
    addGoodToCart(object);
    object.amount -= 1;
  });
  btnFavorite.addEventListener('click', function () {
    btnFavorite.classList.toggle('card__btn-favorite--selected');
  });
  return catalogElement;
};

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

var createCatalogElements = function () {
  var catalogFragment = document.createDocumentFragment();
  for (var i = 0; i < catalogGoodsArray.length; i++) {
    var element = renderCatalogDomElements(catalogGoodsArray[i]);
    catalogFragment.appendChild(element);
  }
  return catalogFragment;
};

var createOrderElements = function (array) {
  var orderFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var element = renderOrderDomElements(array[i]);
    orderFragment.appendChild(element);
  }
  return orderFragment;
};

var checkGoodsInOrder = function (array, objectName) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === objectName) {
      var index = i;
    }
  }
  return index;
};

var getWordEnding = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ?
    2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var addGoodToCart = function (object) {
  var orderObject = Object.assign({}, object);
  var index = checkGoodsInOrder(order, object.name);
  if (index === undefined && object.amount > 0) {
    var orderGoodsArray = [];
    orderObject.orderAmount = 1;
    orderObject.amount = null;
    orderGoodsArray[orderGoodsArray.length] = orderObject;
    cartBlock.appendChild(createOrderElements(orderGoodsArray));
    order[order.length] = orderGoodsArray[0];
    headerBasket.textContent = 'В корзине: ' + order.length + ' ' + getWordEnding(order.length, ['товар', 'товара', 'товаров']);
  } else if (object.amount > 0) {
    var currentAmount = order[index].orderAmount;
    order[index].orderAmount = currentAmount + 1;
    cartBlock.innerHTML = '';
    cartBlock.appendChild(createOrderElements(order));
  }
};

var getPriceRangePinCoordinate = function (evtTarget) {
  var pinCoordinate = evtTarget.getBoundingClientRect();
  var pinX = pinCoordinate.x;
  var pinValue = Math.round((pinX - priceRangeStart) / priceRangeStep);
  return pinValue;
};

var onDeliveryTypeBtnClick = function () {
  deliverByCourierBlock.classList.toggle('visually-hidden');
  deliverInStoreBlock.classList.toggle('visually-hidden');
};

var onPaymentTypeBtnClick = function () {
  paymentByCashBlock.classList.toggle('visually-hidden');
  paymentByCardBlock.classList.toggle('visually-hidden');
};

var catalogGoodsArray = renderGoodsArray(CATALOG_CARDS_LIST_LENGTH);
catalogCards.appendChild(createCatalogElements());
catalogCards.classList.remove('catalog__cards--load');
catalogLoad.classList.add('visually-hidden');
cartBlock.classList.remove('goods__cards--empty');
emptyBlock.classList.add('visually-hidden');
deliverByCourierBtn.addEventListener('click', onDeliveryTypeBtnClick);
deliverInStoreBtn.addEventListener('click', onDeliveryTypeBtnClick);
paymentMethodCashBtn.addEventListener('click', onPaymentTypeBtnClick);
paymentMethodCardBtn.addEventListener('click', onPaymentTypeBtnClick);
priceRangeFilterBtnLeft.addEventListener('mouseup', function (evt) {
  var value = getPriceRangePinCoordinate(evt.target);
  priceRangeMinPinValue.textContent = value;
});
priceRangeFilterBtnRight.addEventListener('mouseup', function (evt) {
  var value = getPriceRangePinCoordinate(evt.target);
  priceRangeMaxPinValue.textContent = value;
});
