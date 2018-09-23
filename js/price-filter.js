'use strict';

(function () {
  var PRICE_RANGE = 100;
  var priceRangeFilterBtnLeft = document.querySelector('.range__btn--left');
  var priceRangeFilterBtnRight = document.querySelector('.range__btn--right');
  var priceRangeMinPinValue = document.querySelector('.range__price--min');
  var priceRangeMaxPinValue = document.querySelector('.range__price--max');
  var priceRangeFilter = document.querySelector('.range__filter');
  var priceRangeFilterCoordinate = priceRangeFilter.getBoundingClientRect();
  var priceRangeStart = priceRangeFilterCoordinate.x;
  var priceRangeWidth = priceRangeFilterCoordinate.width;
  var priceRangeStep = priceRangeWidth / PRICE_RANGE;

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x;
    var pinValue = Math.round((pinX - priceRangeStart) / priceRangeStep);
    return pinValue;
  };

  priceRangeFilterBtnLeft.addEventListener('mouseup', function (evt) {
    var value = getPriceRangePinCoordinate(evt.target);
    priceRangeMinPinValue.textContent = value;
  });
  priceRangeFilterBtnRight.addEventListener('mouseup', function (evt) {
    var value = getPriceRangePinCoordinate(evt.target);
    priceRangeMaxPinValue.textContent = value;
  });
})();
