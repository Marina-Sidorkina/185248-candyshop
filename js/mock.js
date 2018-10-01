'use strict';

(function () {
  var CATALOG_CARDS_LIST_LENGTH = 26;

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

  var getContentArr = function () {
    var arrayElements = [];
    for (var i = 0; i < window.utils.getRandomNumber(window.utils.getRandomNumber(1, CONTENTS_ITEMS.length), CONTENTS_ITEMS.length); i++) {
      arrayElements[i] = CONTENTS_ITEMS[window.utils.getRandomNumber(0, CONTENTS_ITEMS.length)];
    }
    return arrayElements.join(', ');
  };

  var createGoodsArrayElement = function () {
    return {
      name: GOODS_NAMES[window.utils.getRandomNumber(0, GOODS_NAMES.length)],
      picture: PICTURES_LINKS[window.utils.getRandomNumber(0, PICTURES_LINKS.length)],
      amount: window.utils.getRandomNumber(amountParams.MIN, amountParams.MAX + 1),
      price: window.utils.getRandomNumber(priceParams.MIN, priceParams.MAX + 1),
      weight: window.utils.getRandomNumber(weightParams.MIN, weightParams.MAX + 1),
      rating: {
        value: window.utils.getRandomNumber(valueParams.MIN, valueParams.MAX + 1),
        number: window.utils.getRandomNumber(numberParams.MIN, numberParams.MAX + 1)
      },
      nutritionFacts: {
        sugar: window.utils.getRandomBoolean(),
        energy: window.utils.getRandomNumber(energyParams.MIN, energyParams.MAX + 1),
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

  var catalogGoodsArray = renderGoodsArray(CATALOG_CARDS_LIST_LENGTH);

  window.mock = {
    catalogGoodsArray: catalogGoodsArray
  };
})();
