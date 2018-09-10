'use strict';

var ARRAY_LENGTH = 26;
var ORDER_AMOUNT = 3;
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = document.querySelector('.catalog__load');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var orderTemplate = document.querySelector('#card-order').content.querySelector('article');
var cartBlock = document.querySelector('.goods__cards');
var emptyBlock = document.querySelector('.goods__card-empty');

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
var NAME_ARRAY = [
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
var PICTURE_ARRAY = [
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
var CONTENTS_ARRAY = [
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
  return (Math.floor(Math.random() * 2) === 0);
};

var getContentArr = function () {
  var array = [];
  for (var i = 0; i < getRandomNumber(1, CONTENTS_ARRAY.length); i++) {
    array[i] = CONTENTS_ARRAY[getRandomNumber(0, CONTENTS_ARRAY.length)];
  }
  return array;
};

var createObject = function () {
  var object = {
    name: NAME_ARRAY[getRandomNumber(0, NAME_ARRAY.length)],
    picture: PICTURE_ARRAY[getRandomNumber(0, PICTURE_ARRAY.length)],
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
  return object;
};

var renderArray = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    var element = createObject();
    array[i] = element;
  }
  return array;
};

var goodsArray = renderArray(ARRAY_LENGTH);

var getAvailability = function (obj) {
  if (!obj.amount) {
    return 'card--soon';
  }
  return obj.amount > 5 ? 'card--in-stock' : 'card--little';
};

var getRatingStars = function (obj) {
  var rating;
  switch (obj.rating.value) {
    case 5:
      rating = 'stars__rating--five';
      break;
    case 4:
      rating = 'stars__rating--four';
      break;
    case 3:
      rating = 'stars__rating--three';
      break;
    case 2:
      rating = 'stars__rating--two';
      break;
    case 1:
      rating = 'stars__rating--one';
      break;
  }
  return rating;
};

var renderCardDomElements = function (object) {
  var card = cardTemplate.cloneNode(true);
  card.classList.add(getAvailability(object));
  card.querySelector('.card__title').textContent = object.name;
  card.querySelector('.card__img').src = object.picture;
  card.querySelector('.card__img').alt = object.name;
  card.querySelector('.card__price').textContent = object.price + ' ';
  var roubleSpan = document.createElement('span');
  roubleSpan.classList.add('card__currency');
  roubleSpan.textContent = '₽';
  card.querySelector('.card__price').appendChild(roubleSpan);
  var weightSpan = document.createElement('span');
  weightSpan.classList.add('card__weight');
  weightSpan.textContent = '/ ' + object.weight + ' Г';
  card.querySelector('.card__price').appendChild(weightSpan);
  var goodRating = card.querySelector('.stars__rating');
  goodRating.classList.remove('stars__rating--five');
  goodRating.classList.add(getRatingStars(object));
  card.querySelector('.star__count').textContent = object.rating.number;
  card.querySelector('.card__characteristic').textContent = object.nutritionFacts.sugar ? 'Содержит сахар, ' + object.nutritionFacts.sugar + ' ккал' : 'Без сахара, ' + object.nutritionFacts.sugar + ' ккал';
  card.querySelector('.card__composition-list').textContent = object.nutritionFacts.contents;
  return card;
};

var createCatalogElements = function () {
  var orderFragment = document.createDocumentFragment();
  for (var i = 0; i < goodsArray.length; i++) {
    var element = renderCardDomElements(goodsArray[i]);
    orderFragment.appendChild(element);
  }
  return orderFragment;
};

catalogCards.appendChild(createCatalogElements());
catalogCards.classList.remove('catalog__cards--load');
catalogLoad.classList.add('visually-hidden');

var orderArray = renderArray(ORDER_AMOUNT);

var renderOrderDomElements = function (object) {
  var orderElement = orderTemplate.cloneNode(true);
  orderElement.querySelector('.card-order__title').textContent = object.name;
  orderElement.querySelector('.card-order__img').src = object.picture;
  orderElement.querySelector('.card-order__img').alt = object.name;
  var amount = orderElement.querySelector('.card-order__count').value;
  orderElement.querySelector('.card-order__price').textContent = amount * object.price;
  return orderElement;
};

var createOrderElements = function () {
  var orderFragment = document.createDocumentFragment();
  for (var i = 0; i < orderArray.length; i++) {
    var element = renderOrderDomElements(orderArray[i]);
    orderFragment.appendChild(element);
  }
  return orderFragment;
};

cartBlock.classList.remove('goods__cards--empty');
emptyBlock.classList.add('visually-hidden');
cartBlock.appendChild(createOrderElements());
