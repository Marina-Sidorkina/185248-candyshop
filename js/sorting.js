'use strict';
(function () {
  var GOODS_TYPES = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];
  var sortingVariants = {
    0: function (a, b) {
      return b.rating.number - a.rating.number;
    },
    1: function (a, b) {
      return b.price - a.price;
    },
    2: function (a, b) {
      return a.price - b.price;
    },
    3: function (a, b) {
      return b.rating.value - a.rating.value;
    }
  };
  var typeFilters = document.querySelectorAll('.input-btn__input--type');
  var contentFilters = document.querySelectorAll('.input-btn__input--content');
  var sortingFilters = document.querySelectorAll('.input-btn__input--sorting');
  var filtersBlock = document.querySelector('.catalog__sidebar');
  var allFilters = filtersBlock.querySelectorAll('.input-btn__input');
  var filtersNoResult = document.querySelector('#empty-filters').content.querySelector('div');
  var filteredGoodsCount = document.querySelectorAll('.input-btn__item-count');
  var priceRangeCount = document.querySelector('.range__count');
  var catalogCards = document.querySelector('.catalog__cards');
  var strongFilters = document.querySelectorAll('.input-btn__input--strong');

  var createCatalogElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var element = window.catalog.renderDomElements(item);
      catalogFragment.appendChild(element);
    });
    return catalogFragment;
  };

  var onCatalogCardsLoading = function () {
    catalogCards.classList.remove('catalog__cards--load');
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

  var sortGoods = function (catalog) {
    sortingFilters.forEach(function (item, index) {
      if (item.checked) {
        catalog.sort(function (a, b) {
          return sortingVariants[index](a, b);
        });
      }
    });
    return catalog;
  };

  var onFilterInStockAndFavoriteCancel = function () {
    strongFilters.forEach(function (item) {
      item.disabled = false;
    });
    window.catalog.checkListFromServerPrice();
    window.catalog.onSortingFiltersCancel();
  };

  var onFilterInStockAndFavoriteChange = window.debounce(function (filterChanged, filterToBlock, array) {
    if (filterChanged.checked) {
      window.filter.resetPriceRangeFilterBtnsValues();
      strongFilters.forEach(function (item) {
        item.checked = false;
        item.disabled = true;
      });
      filterToBlock.checked = false;
      return (!array.length) ? showNoResultBlock() : replaceCardsInCatalog(array);
    } else {
      return onFilterInStockAndFavoriteCancel();
    }
  });

  var onGoodsFiltersChange = window.debounce(function (catalog, listFromServer) {
    var array;
    window.catalog.checkListFromServerPrice();
    sortGoods(catalog, listFromServer);
    array = catalog.filter(function (item) {
      return (checkSugar(item) && checkVegetarian(item) && checkGluten(item) && checkType(item));
    });
    return (!array.length) ? showNoResultBlock() : replaceCardsInCatalog(array);
  });

  var onShowAllGoodsClick = window.debounce(function (catalog) {
    var array;
    allFilters.forEach(function (item) {
      item.checked = false;
    });
    sortingFilters[0].checked = true;
    window.catalog.checkListFromServerPrice();
    array = catalog.sort(function (a, b) {
      return b.rating.number - a.rating.number;
    });
    replaceCardsInCatalog(array);
  });

  var getGoodsAmountByType = function (index, kind, listFromServer) {
    var amount = listFromServer.filter(function (item) {
      return item.kind === kind;
    });
    filteredGoodsCount[index].textContent = '(' + amount.length + ')';
  };

  var getGoodsAmountByContent = function (index, content, listFromServer) {
    var amount = listFromServer.filter(function (item) {
      return (!item.nutritionFacts[content]);
    });
    filteredGoodsCount[index].textContent = '(' + amount.length + ')';
  };

  var getGoodsAmountByFilters = function (listFromServer, favoriteGoodsList) {
    var amount;
    GOODS_TYPES.forEach(function (type, index) {
      getGoodsAmountByType(index, type, listFromServer);
    });
    getGoodsAmountByContent(5, 'sugar', listFromServer);
    getGoodsAmountByContent(7, 'gluten', listFromServer);
    amount = listFromServer.filter(function (item) {
      return (item.nutritionFacts.vegetarian);
    });
    filteredGoodsCount[6].textContent = '(' + amount.length + ')';
    filteredGoodsCount[8].textContent = '(' + favoriteGoodsList.length + ')';
    amount = listFromServer.filter(function (item) {
      return (item.amount > 0);
    });
    filteredGoodsCount[9].textContent = '(' + amount.length + ')';
    amount = listFromServer.filter(window.filter.checkPriceRange);
    priceRangeCount.textContent = '(' + amount.length + ')';
  };

  window.sorting = {
    replaceCardsInCatalog: replaceCardsInCatalog,
    showNoResultBlock: showNoResultBlock,
    onGoodsFiltersChange: onGoodsFiltersChange,
    onShowAllGoodsClick: onShowAllGoodsClick,
    getGoodsAmountByFilters: getGoodsAmountByFilters,
    onCatalogCardsLoading: onCatalogCardsLoading,
    onFilterInStockAndFavoriteChange: onFilterInStockAndFavoriteChange
  };
})();
