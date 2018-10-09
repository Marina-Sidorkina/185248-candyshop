'use strict';

(function () {
  var ratingVariants = {
    1: '--one',
    2: '--two',
    3: '--three',
    4: '--four',
    5: '--five'
  };
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var showAllButton = document.querySelector('.catalog__submit');
  var favoriteFilter = document.querySelector('#filter-favorite');
  var inStockFilter = document.querySelector('#filter-availability');
  var sortingForm = document.querySelector('.sorting-form');
  var favoriteGoods = [];
  var listFromServerItems = [];
  var catalog = listFromServerItems.slice();

  var getAmountStatus = function (amount) {
    if (!amount) {
      return 'card--soon';
    } else {
      return amount > 5 ? 'card--in-stock' : 'card--little';
    }
  };

  var getAvailability = function (object) {
    var amount = window.order.checkCatalogGoodAmount(object);
    return getAmountStatus(amount);
  };

  var getRatingStars = function (object) {
    return 'stars__rating' + ratingVariants[object.rating.value];
  };

  var onCatalogElementButtonClick = function (evt, object) {
    evt.preventDefault();
    window.order.addGoodToCart(object);
    window.order.enableFormInputs();
  };

  var handleAmountStatus = function (object, element) {
    element.classList.remove('card--in-stock', 'card--little', 'card--soon');
    element.classList.add(getAvailability(object));
  };

  var renderCatalogDomElements = function (object) {
    var catalogElement = cardTemplate.cloneNode(true);
    var goodRating = catalogElement.querySelector('.stars__rating');
    var btn = catalogElement.querySelector('.card__btn');
    var btnFavorite = catalogElement.querySelector('.card__btn-favorite');
    handleAmountStatus(object, catalogElement);
    btn.addEventListener('click', function (evt) {
      onCatalogElementButtonClick(evt, object);
      handleAmountStatus(object, catalogElement);
    });
    catalogElement.id = object.name;
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
    handleFavoriteStatus(object, btnFavorite);
    btnFavorite.addEventListener('click', function (evt) {
      evt.preventDefault();
      btnFavorite.classList.toggle('card__btn-favorite--selected');
      if (btnFavorite.classList.contains('card__btn-favorite--selected') && !object.favorite) {
        object.favorite = true;
        favoriteGoods[favoriteGoods.length] = object;
      } else {
        object.favorite = false;
        for (var i = 0; i < favoriteGoods.length; i++) {
          if (favoriteGoods[i].name === object.name) {
            favoriteGoods.splice(i, 1);
          }
        }
      }
    });
    return catalogElement;
  };

  var checkGoodsLeft = function (object) {
    var index = window.order.checkGoods(catalog, object.name);
    var amount = catalog[index].amount - object.orderAmount;
    var card = document.getElementById(object.name);
    var name = getAmountStatus(amount);
    card.classList.remove('card--in-stock', 'card--little', 'card--soon');
    card.classList.add(name);
  };

  var checkSpecialFilters = function () {
    return (favoriteFilter.checked || inStockFilter.checked);
  };

  var checkInStock = function () {
    var list = listFromServerItems.filter(function (item) {
      return (item.amount > 0);
    });
    var array = list.filter(function (item) {
      return (!window.order.checkGoodAmount(item));
    });
    return array;
  };

  var onPriceChangeFilterGoods = function () {
    checkListFromServerPrice();
    window.sorting.onFiltersChange(catalog, listFromServerItems);
  };

  var getInitialCardsList = function () {
    window.sorting.onFiltersChange(catalog, listFromServerItems);
    window.sorting.replaceCardsInCatalog(catalog);
  };

  var checkListFromServerPrice = function () {
    var array = listFromServerItems.filter(window.filter.checkPriceRange);
    catalog = array.slice();
  };

  var handleFavoriteStatus = function (object, element) {
    if (object.favorite) {
      element.classList.add('card__btn-favorite--selected');
    }
  };

  var onLoad = function (array) {
    listFromServerItems = array.slice();
    catalog = listFromServerItems.filter(function (item) {
      return (window.filter.checkPriceRange(item));
    });
    window.sorting.onFiltersChange(catalog, listFromServerItems);
    window.sorting.getGoodsAmount(listFromServerItems, favoriteGoods);
    window.sorting.replaceCardsInCatalog(catalog);
    window.sorting.onCatalogCardsLoading();
    catalogLoad.classList.add('visually-hidden');
  };

  window.backend.load(onLoad, window.backend.onLoadAndSendDataError);
  sortingForm.addEventListener('change', window.debounce(function (evt) {
    if (evt.target === favoriteFilter) {
      window.sorting.onSpecialFiltersChange(favoriteFilter, inStockFilter, favoriteGoods);
    } else if (evt.target === inStockFilter) {
      window.sorting.onSpecialFiltersChange(inStockFilter, favoriteFilter, checkInStock());
    } else {
      window.sorting.onFiltersChange(catalog, listFromServerItems);
    }
  }));
  showAllButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.sorting.onShowAllClick(catalog);
  });

  window.catalog = {
    checkListFromServerPrice: checkListFromServerPrice,
    renderDomElements: renderCatalogDomElements,
    onPriceChangeFilterGoods: onPriceChangeFilterGoods,
    getInitialCardsList: getInitialCardsList,
    checkSpecialFilters: checkSpecialFilters,
    checkGoodsLeft: checkGoodsLeft
  };
})();
