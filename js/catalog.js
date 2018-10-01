'use strict';

(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var favoriteGoods = [];

  var ratingClasses = {
    1: '--one',
    2: '--two',
    3: '--three',
    4: '--four',
    5: '--five'
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

  var onCatalogElementBtnClick = function (evt, btn, object) {
    if (evt.target === btn) {
      evt.preventDefault();
      window.order.addGoodToCart(object);
      window.order.enableFormInputs();
    }
  };

  var renderCatalogDomElements = function (object) {
    var catalogElement = cardTemplate.cloneNode(true);
    var goodRating = catalogElement.querySelector('.stars__rating');
    var btn = catalogElement.querySelector('.card__btn');
    var btnFavorite = catalogElement.querySelector('.card__btn-favorite');
    catalogElement.addEventListener('click', function (evt) {
      onCatalogElementBtnClick(evt, btn, object);
    });
    catalogElement.classList.add(getAvailability(object));
    catalogElement.querySelector('.card__title').textContent = object.name;
    catalogElement.querySelector('.card__img').src = object.picture;
    catalogElement.querySelector('.card__img').alt = object.name;
    catalogElement.querySelector('.card__price').textContent = object.price + ' ';
    catalogElement.querySelector('.card__price').appendChild(window.utils.createTagElement('span', 'card__currency', '₽'));
    catalogElement.querySelector('.card__price').appendChild(window.utils.createTagElement('span', 'card__weight', '/ ' + object.weight + ' Г'));
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

  var createCatalogElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var element = renderCatalogDomElements(array[i]);
      catalogFragment.appendChild(element);
    }
    return catalogFragment;
  };

  catalogCards.appendChild(createCatalogElements(window.mock.catalogGoodsArray));
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
})();
