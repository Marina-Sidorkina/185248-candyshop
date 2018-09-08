'use strict';
// ПЕРВОЕ ЗАДАНИЕ
var ARRAY_LENGTH = 26;

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

var nameArray = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var pictureArray = ['../img/cards/gum-cedar.jpg', '../img/cards/gum-chile.jpg', '../img/cards/gum-eggplant.jpg', '../img/cards/gum-mustard.jpg', '../img/cards/gum-portwine', '../img/cards/gum-wasabi.jpg', '../img/cards/ice-cucumber.jpg', '../img/cards/ice-eggplant.jpg', '../img/cards/ice-garlic.jpg', '../img/cards/ice-italian.jpg', '../img/cards/ice-mushroom.jpg', '../img/cards/ice-pig.jpg', '../img/cards/marmalade-beer.jpg', '../img/cards/marmalade-caviar.jpg', '../img/cards/marmalade-corn.jpg', '../img/cards/marmalade-new-year.jpg', '../img/cards/marmalade-sour.jpg', '../img/cards/marshmallow-bacon.jpg', '../img/cards/marshmallow-beer', '../img/cards/marshmallow-shrimp.jpg', '../img/cards/marshmallow-spicy.jpg', '../img/cards/marshmallow-wine.jpg', '../img/cards/soda-bacon.jpg', '../img/cards/soda-celery.jpg', '../img/cards/soda-cob.jpg', '../img/cards/soda-garlic.jpg', '../img/cards/soda-peanut-grapes.jpg', '../img/cards/soda-russian.jpg'];

var contentsArray = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор, дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль', 'нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderObject = function (nameArr, pictureArr, contentsArr) {
  var object = {};
  object.name = nameArr[getRandom(0, nameArr.length)];
  object.picture = pictureArr[getRandom(0, pictureArr.length)];
  object.amount = getRandom(amountParams.MIN, amountParams.MAX + 1);
  object.price = getRandom(priceParams.MIN, priceParams.MAX + 1);
  object.weight = getRandom(weightParams.MIN, weightParams.MAX + 1);
  object.rating = {};
  object.rating.value = getRandom(valueParams.MIN, valueParams.MAX + 1);
  object.rating.number = getRandom(numberParams.MIN, numberParams.MAX + 1);
  object.nutritionFacts = {};
  object.nutritionFacts.sugar = Boolean(getRandom(0, 2));
  object.nutritionFacts.energy = getRandom(energyParams.MIN, energyParams.MAX + 1);
  object.nutritionFacts.contents = contentsArr[getRandom(0, contentsArr.length)];
  return object;
};

var renderArray = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    var element = renderObject(nameArray, pictureArray, contentsArray);
    array[i] = element;
  }
  return array;
};

var goodsArray = renderArray(ARRAY_LENGTH)

// ВТОРОЕ ЗАДАНИЕ
var CATALOG__CARDS = document.querySelector('.catalog__cards');
var CATALOG__LOAD = document.querySelector('.catalog__load');

CATALOG__CARDS.classList.remove('catalog__cards--load');
CATALOG__LOAD.classList.add('visually-hidden');

var CARD__TEMPLATE = document.querySelector('#card').content.querySelector('article');

var renderDomObject = function (object) {
  var card = CARD__TEMPLATE.cloneNode(true);

};
