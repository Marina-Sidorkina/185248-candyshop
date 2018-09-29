'use strict';

(function () {

  // var filterFavorite = document.querySelector('#filter-favorite');
  var filterInStock = document.querySelector('#filter-availability');
  var filterSugarFree = document.querySelector('#filter-sugar-free');

  /*
  var createElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var element = window.catalog.renderDomElements(array[i]);
      catalogFragment.appendChild(element);
    }
    return catalogFragment;
  };
  */

  var checkInStock = function (item) {
    var check = true;
    if (filterInStock.checked) {
      if (item.amount) {
        check = true;
      } else {
        check = false;
      }
    }
    return check;
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
      return (checkInStock(item) && checkSugar(item));
    });
    return array;
  };

  filterInStock.addEventListener('change', filterGoods);
})();
