'use strict';

(function () {
  var favoriteGoods = [];
  var listFromServer = [];
  var catalog = listFromServer.slice();
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var showAllGoods = document.querySelector('.catalog__submit');
  var filterFavorite = document.querySelector('#filter-favorite');
  var filterInStock = document.querySelector('#filter-availability');
  var sortingForm = document.querySelector('form');

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

  var onCatalogElementBtnClick = function (evt, object) {
    evt.preventDefault();
    window.order.addGoodToCart(object);
    window.order.enableFormInputs();
  };

  var renderCatalogDomElements = function (object) {
    var catalogElement = cardTemplate.cloneNode(true);
    var goodRating = catalogElement.querySelector('.stars__rating');
    var btn = catalogElement.querySelector('.card__btn');
    var btnFavorite = catalogElement.querySelector('.card__btn-favorite');
    btn.addEventListener('click', function (evt) {
      onCatalogElementBtnClick(evt, object);
    });
    catalogElement.classList.add(getAvailability(object));
    catalogElement.querySelector('.card__title').textContent = object.name;
    catalogElement.querySelector('.card__img').src = 'img/cards/' + object.picture;
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

  var checkFilterFavoriteAndInStockstate = function () {
    return (filterFavorite.checked || filterInStock.checked);
  };

  var checkInStock = function () {
    var array = listFromServer.filter(function (item) {
      return (item.amount > 0);
    });
    return array;
  };

  var onPriceChangeFilterGoods = function () {
    checkListFromServerPrice();
    window.sorting.onGoodsFiltersChange(catalog, listFromServer);
  };

  var onSortingFiltersCancel = function () {
    window.sorting.onGoodsFiltersChange(catalog, listFromServer);
    window.sorting.replaceCardsInCatalog(catalog);
  };

  var checkListFromServerPrice = function () {
    var array = listFromServer.filter(window.filter.checkPriceRange);
    catalog = array.slice();
  };

  var onLoad = function (array) {
    listFromServer = array.slice();
    catalog = listFromServer.filter(function (item) {
      return (window.filter.checkPriceRange(item));
    });
    window.sorting.onGoodsFiltersChange(catalog, listFromServer);
    window.sorting.getGoodsAmountByFilters(listFromServer, favoriteGoods);
    window.sorting.replaceCardsInCatalog(catalog);
    window.sorting.onCatalogCardsLoading();
    catalogLoad.classList.add('visually-hidden');
  };

  window.backend.load(onLoad, window.backend.onLoadAndSendDataError);
  sortingForm.addEventListener('change', window.debounce(function (evt) {
    if (evt.target === filterFavorite) {
      window.sorting.onFilterInStockAndFavoriteChange(filterFavorite, filterInStock, favoriteGoods);
    } else if (evt.target === filterInStock) {
      var list = checkInStock();
      var array = list.filter(function (item) {
        return (!window.order.checkGoodInOrderAmount(item));
      });
      window.sorting.onFilterInStockAndFavoriteChange(filterInStock, filterFavorite, array);
    } else {
      window.sorting.onGoodsFiltersChange(catalog, listFromServer);
    }
  }));
  showAllGoods.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.sorting.onShowAllGoodsClick(catalog);
  });

  window.catalog = {
    checkListFromServerPrice: checkListFromServerPrice,
    renderDomElements: renderCatalogDomElements,
    onPriceChangeFilterGoods: onPriceChangeFilterGoods,
    onSortingFiltersCancel: onSortingFiltersCancel,
    checkFilterFavoriteAndInStockstate: checkFilterFavoriteAndInStockstate
  };
})();
