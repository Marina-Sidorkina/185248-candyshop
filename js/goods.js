'use strict';

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
  object.amount = getRandom(0, 21);
  object.price = getRandom(100, 151);
  object.weight = getRandom(30, 301);
  object.rating = {};
  object.rating.value = getRandom(1, 6);
  object.rating.number = getRandom(10, 901);
  object.nutritionFacts = {};
  object.nutritionFacts.sugar = Boolean(getRandom(0, 2));
  object.nutritionFacts.energy = getRandom(70, 501);
  object.nutritionFacts.contents = contentsArr[getRandom(0, contentsArr.length)];
  return object;
};

var renderArray = function () {
  var array = [];
  for (var i = 0; i <= 25; i++) {
    var element = renderObject(nameArray, pictureArray, contentsArray);
    array[i] = element;
  }
  return array;
};
