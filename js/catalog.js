'use strict';

(function () {

  var CATALOG_CARDS_LIST_LENGTH = 26;
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var favoriteGoods = [];

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
    catalogElement.addEventListener('click', function (evt) {
      if (evt.target === btn) {
        evt.preventDefault();
        window.order.addGoodToCart(object);
        window.order.enableFormInputs();
      }
    });
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
    btnFavorite.addEventListener('click', function (evt) {
      evt.preventDefault();
      btnFavorite.classList.toggle('card__btn-favorite--selected');
      if (btnFavorite.classList.contains('card__btn-favorite--selected')) {
        favoriteGoods[favoriteGoods.length] = object;
      } else {
        for (var i = 0; i < favoriteGoods.length; i++) {
          if (favoriteGoods[i].name === object.name) {
            favoriteGoods.splice(i, 1);
          }
        }
      }
    });
    return catalogElement;
  };

  var createCatalogElements = function () {
    var catalogFragment = document.createDocumentFragment();
    for (var i = 0; i < catalogGoodsArray.length; i++) {
      var element = renderCatalogDomElements(catalogGoodsArray[i]);
      catalogFragment.appendChild(element);
    }
    return catalogFragment;
  };

  var catalogGoodsArray = renderGoodsArray(CATALOG_CARDS_LIST_LENGTH);
  catalogCards.appendChild(createCatalogElements());
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
})();
