'use strict';

(function () {
  var PRICE_RANGE = 100;
  var priceRangeFilter = document.querySelector('.range__filter');
  var priceRangeFilterCoordinate = priceRangeFilter.getBoundingClientRect();
  var PriceRangeStart = priceRangeFilterCoordinate.x;
  var PriceRangeEnd = priceRangeFilterCoordinate.right;
  var PriceRangWidth = priceRangeFilterCoordinate.width;
  var PriceRangeStep = PriceRangWidth / PRICE_RANGE;
  var priceRangeFilterBtnLeft = document.querySelector('.range__btn--left');
  var priceRangeFilterBtnRight = document.querySelector('.range__btn--right');
  var priceRangeMinPinValue = document.querySelector('.range__price--min');
  var priceRangeMaxPinValue = document.querySelector('.range__price--max');
  var priceRangeFilterBtnShift = priceRangeFilterBtnLeft.getBoundingClientRect().width / 2;
  var fillLine = document.querySelector('.range__fill-line');

  var resetPriceRangeFilterBtnsValues = function () {
    priceRangeFilterBtnLeft.style.left = (0 - priceRangeFilterBtnShift) + 'px';
    priceRangeFilterBtnRight.style.left = (0 + PriceRangWidth - priceRangeFilterBtnShift) + 'px';
    fillLine.style.left = 0 + '%';
    fillLine.style.right = 0 + '%';
    priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnLeft);
    priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnRight);
  };

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x + (pinCoordinate.width / 2);
    var pinValue = Math.round((pinX - PriceRangeStart) / PriceRangeStep);
    return pinValue;
  };

  var checkPriceRange = function (item) {
    var min = getPriceRangePinCoordinate(priceRangeFilterBtnLeft);
    var max = getPriceRangePinCoordinate(priceRangeFilterBtnRight);
    return (item.price >= min && item.price <= max);
  };

  var fillTheLine = function () {
    fillLine.style.left = priceRangeFilterBtnLeft.offsetLeft + 'px';
    fillLine.style.right = PriceRangWidth - priceRangeFilterBtnRight.offsetLeft + 'px';
  };

  var onFilterLeftBtnMouseDown = function (evt) {
    if (!window.catalog.checkSpecialFilters()) {
      var startCoord = evt.clientX;
      var secondBtnX = priceRangeFilterBtnRight.getBoundingClientRect().x;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX >= (PriceRangeStart + priceRangeFilterBtnShift)
        && moveEvt.clientX < secondBtnX) {
          var shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;
          evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
          priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
          fillTheLine();
        }
      };
      var onMouseUp = window.debounce(function (upEvt) {
        upEvt.preventDefault();
        priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        window.catalog.onPriceChangeFilterGoods();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onFilterRightBtnMouseDown = function (evt) {
    if (!window.catalog.checkSpecialFilters()) {
      var startCoord = evt.clientX;
      var secondBtnRight = priceRangeFilterBtnLeft.getBoundingClientRect().right;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX <= (PriceRangeEnd - priceRangeFilterBtnShift)
        && moveEvt.clientX > secondBtnRight) {
          var shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;
          evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
          priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
          fillTheLine();
        }
      };
      var onMouseUp = window.debounce(function (upEvt) {
        upEvt.preventDefault();
        priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        window.catalog.onPriceChangeFilterGoods();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnLeft);
  priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnRight);
  priceRangeFilterBtnLeft.addEventListener('mousedown', onFilterLeftBtnMouseDown);
  priceRangeFilterBtnRight.addEventListener('mousedown', onFilterRightBtnMouseDown);

  window.filter = {
    checkPriceRange: checkPriceRange,
    resetPriceRangeFilterBtnsValues: resetPriceRangeFilterBtnsValues
  };
})();
