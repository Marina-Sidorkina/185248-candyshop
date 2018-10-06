'use strict';

(function () {
  var GOODS_TYPES = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];
  var favoriteGoods = [];
  var listFromServer = [];
  var catalog = listFromServer.slice();
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var filtersBlock = document.querySelector('.catalog__sidebar');
  var filteredGoodsCount = filtersBlock.querySelectorAll('.input-btn__item-count');
  var allFilters = filtersBlock.querySelectorAll('.input-btn__input');
  var strongFilters = filtersBlock.querySelectorAll('.input-btn__input--strong');
  var filtersNoResult = document.querySelector('#empty-filters').content.querySelector('div');
  var showAllGoods = document.querySelector('.catalog__submit');
  var filterFavorite = document.querySelector('#filter-favorite');
  var filterInStock = document.querySelector('#filter-availability');
  var priceRangeCount = document.querySelector('.range__count');
  var typeFilters = [
    document.querySelector('#filter-icecream'),
    document.querySelector('#filter-soda'),
    document.querySelector('#filter-gum'),
    document.querySelector('#filter-marmalade'), document.querySelector('#filter-marshmallows')
  ];
  var contentFilters = [
    document.querySelector('#filter-sugar-free'),
    document.querySelector('#filter-vegetarian'),
    document.querySelector('#filter-gluten-free')
  ];
  var sortingFilters = [
    document.querySelector('#filter-popular'),
    document.querySelector('#filter-rating'),
    document.querySelector('#filter-expensive'),
    document.querySelector('#filter-cheep')
  ];

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

  var createCatalogElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var element = renderCatalogDomElements(item);
      catalogFragment.appendChild(element);
    });
    return catalogFragment;
  };

  var checkFilterFavoriteAndInStockstate = function () {
    return (filterFavorite.checked || filterInStock.checked);
  };

  var checkListFromServerPrice = function () {
    var array = listFromServer.filter(window.filter.checkPriceRange);
    catalog = array.slice();
  };

  var replaceCardsInCatalog = function (array) {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(createCatalogElements(array));
  };

  var showNoResultBlock = function () {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(filtersNoResult);
  };

  var checkSugar = function (item) {
    return (contentFilters[0].checked) ? (!item.nutritionFacts.sugar) : true;
  };

  var checkVegetarian = function (item) {
    return (contentFilters[1].checked) ? (item.nutritionFacts.vegetarian) : true;
  };

  var checkGluten = function (item) {
    return (contentFilters[2].checked) ? (!item.nutritionFacts.gluten) : true;
  };

  var checkType = function (item) {
    var condition = [];
    var check = true;
    for (var i = 0; i < typeFilters.length; i++) {
      if (typeFilters[i].checked) {
        condition[condition.length] = GOODS_TYPES[i];
      }
    }
    if (condition.length) {
      check = condition.some(function (kind) {
        return kind === item.kind;
      });
    }
    return check;
  };

  var checkInStock = function () {
    var array = listFromServer.filter(function (item) {
      return (item.amount > 0);
    });
    return array;
  };

  var sortGoods = function () {
    var array;
    if (sortingFilters[0].checked) {
      array = catalog.sort(function (a, b) {
        return b.rating.number - a.rating.number;
      });
      catalog = array.slice();
    } else if (sortingFilters[1].checked) {
      array = catalog.sort(function (a, b) {
        return b.rating.value - a.rating.value;
      });
      catalog = array.slice();
    } else if (sortingFilters[2].checked) {
      array = catalog.sort(function (a, b) {
        return b.price - a.price;
      });
      catalog = array.slice();
    } else if (sortingFilters[3].checked) {
      array = catalog.sort(function (a, b) {
        return a.price - b.price;
      });
      catalog = array.slice();
    }
    return catalog;
  };

  var onGoodsFiltersChange = window.debounce(function () {
    var array;
    checkListFromServerPrice();
    sortGoods();
    array = catalog.filter(function (item) {
      return (checkSugar(item) && checkVegetarian(item) && checkGluten(item) && checkType(item));
    });
    if (!array.length) {
      showNoResultBlock();
    } else {
      replaceCardsInCatalog(array);
    }
  });

  var onFilterInStockAndFavoriteChange = window.debounce(function (filterChanged, filterToBlock, array) {
    if (filterChanged.checked) {
      window.filter.resetPriceRangeFilterBtnsValues();
      strongFilters.forEach(function (item) {
        item.checked = false;
        item.disabled = true;
      });
      filterToBlock.checked = false;
      if (!array.length) {
        showNoResultBlock();
      } else {
        replaceCardsInCatalog(array);
      }
    } else {
      strongFilters.forEach(function (item) {
        item.disabled = false;
      });
      checkListFromServerPrice();
      onGoodsFiltersChange();
      replaceCardsInCatalog(catalog);
    }
  });

  var onShowAllGoodsClick = window.debounce(function () {
    var array;
    allFilters.forEach(function (item) {
      item.checked = false;
    });
    sortingFilters[0].checked = true;
    checkListFromServerPrice();
    array = catalog.sort(function (a, b) {
      return b.rating.number - a.rating.number;
    });
    replaceCardsInCatalog(array);
  });

  var getGoodsAmountByType = function (index, kind) {
    var amount = listFromServer.filter(function (item) {
      return item.kind === kind;
    });
    filteredGoodsCount[index].textContent = '(' + amount.length + ')';
  };

  var getGoodsAmountByContent = function (index, content) {
    var amount = listFromServer.filter(function (item) {
      return (!item.nutritionFacts[content]);
    });
    filteredGoodsCount[index].textContent = '(' + amount.length + ')';
  };

  var getGoodsAmountByFilters = function () {
    var amount;
    GOODS_TYPES.forEach(function (type, index) {
      getGoodsAmountByType(index, type);
    });
    getGoodsAmountByContent(5, 'sugar');
    getGoodsAmountByContent(7, 'gluten');
    amount = listFromServer.filter(function (item) {
      return (item.nutritionFacts.vegetarian);
    });
    filteredGoodsCount[6].textContent = '(' + amount.length + ')';
    filteredGoodsCount[8].textContent = '(' + favoriteGoods.length + ')';
    amount = listFromServer.filter(function (item) {
      return (item.amount > 0);
    });
    filteredGoodsCount[9].textContent = '(' + amount.length + ')';
    amount = listFromServer.filter(window.filter.checkPriceRange);
    priceRangeCount.textContent = '(' + amount.length + ')';
  };

  var onLoad = function (array) {
    listFromServer = array.slice();
    catalog = listFromServer.filter(function (item) {
      return (window.filter.checkPriceRange(item));
    });
    onGoodsFiltersChange();
    getGoodsAmountByFilters();
    catalogCards.appendChild(createCatalogElements(catalog));
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };

  window.backend.load(onLoad, window.backend.onLoadAndSendDataError);
  filterFavorite.addEventListener('change', window.debounce(function () {
    onFilterInStockAndFavoriteChange(filterFavorite, filterInStock, favoriteGoods);
  }));
  filterInStock.addEventListener('change', window.debounce(function () {
    var list = checkInStock();
    var array = list.filter(function (item) {
      return (!window.order.checkGoodInOrderAmount(item));
    });
    onFilterInStockAndFavoriteChange(filterInStock, filterFavorite, array);
  }));
  strongFilters.forEach(function (item) {
    item.addEventListener('change', onGoodsFiltersChange);
  });
  showAllGoods.addEventListener('click', function (evt) {
    evt.preventDefault();
    onShowAllGoodsClick(evt);
  });

  window.catalog = {
    checkListFromServerPrice: checkListFromServerPrice,
    onGoodsFiltersChange: onGoodsFiltersChange,
    checkFilterFavoriteAndInStockstate: checkFilterFavoriteAndInStockstate
  };
})();
