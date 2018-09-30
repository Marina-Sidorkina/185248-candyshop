'use strict';

(function () {

  var filterFavorite = document.querySelector('#filter-favorite');
  var filterInStock = document.querySelector('#filter-availability');
  var filterSugarFree = document.querySelector('#filter-sugar-free');

  var createElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var element = window.catalog.renderDomElements(array[i]);
      catalogFragment.appendChild(element);
    }
    return catalogFragment;
  };

  var checkInStock = function () {
    var array = window.catalog.goodsArray.filter(function (item) {
      return (item.amount > 0);
    });
    return array;
  };

  var checkSugar = function (item) {
    var check = true;
    if (filterSugarFree.checked) {
      if (item.nutritionFacts.sugar === false) {
        check = true;
      } else {
        check = false;
      }
    }
    return check;
  };

  var filterGoods = function () {
    var array = window.catalog.goodsArray.filter(function (item) {
      return (checkSugar(item));
    });
    window.catalog.cards.innerHTML = '';
    window.catalog.cards.appendChild(createElements(array));
  };

  filterFavorite.addEventListener('change', function () {
    if (filterFavorite.checked) {
      filterInStock.checked = false;
      window.catalog.cards.innerHTML = '';
      window.catalog.cards.appendChild(createElements(window.catalog.favoriteGoods));
    } else {
      window.catalog.cards.innerHTML = '';
      window.catalog.cards.appendChild(createElements(window.catalog.goodsArray));
    }
  });

  filterInStock.addEventListener('change', function () {
    if (filterInStock.checked) {
      filterFavorite.checked = false;
      window.catalog.cards.innerHTML = '';
      window.catalog.cards.appendChild(createElements(checkInStock()));
    } else {
      window.catalog.cards.innerHTML = '';
      window.catalog.cards.appendChild(createElements(window.catalog.goodsArray));
    }
  });

  filterSugarFree.addEventListener('change', filterGoods);
})();
