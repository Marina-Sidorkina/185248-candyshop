'use strict';

(function () {
  var PRICE_RANGE = 100;
  var priceRangeFilter = document.querySelector('.range__filter');
  var PRICE_RANGE_FILTER_COORDINATE = priceRangeFilter.getBoundingClientRect();
  var PRICE_RANGE_START = PRICE_RANGE_FILTER_COORDINATE.x;
  var PRICE_RANGE_END = PRICE_RANGE_FILTER_COORDINATE.right;
  var PRICE_RANGE_WIDTH = PRICE_RANGE_FILTER_COORDINATE.width;
  var PRICE_RANGE_STEP = PRICE_RANGE_WIDTH / PRICE_RANGE;
  var priceRangeFilterBtnLeft = document.querySelector('.range__btn--left');
  var priceRangeFilterBtnRight = document.querySelector('.range__btn--right');
  var priceRangeMinPinValue = document.querySelector('.range__price--min');
  var priceRangeMaxPinValue = document.querySelector('.range__price--max');
  var priceRangeFilterBtnShift = priceRangeFilterBtnLeft.getBoundingClientRect().width / 2;
  var fillLine = document.querySelector('.range__fill-line');

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x + (pinCoordinate.width / 2);
    var pinValue = Math.round((pinX - PRICE_RANGE_START) / PRICE_RANGE_STEP);
    return pinValue;
  };

  var fillTheLine = function () {
    fillLine.style.left = priceRangeFilterBtnLeft.offsetLeft + 'px';
    fillLine.style.right = PRICE_RANGE_FILTER_COORDINATE.width - priceRangeFilterBtnRight.offsetLeft + 'px';
  };

  var onFilterLeftBtnMouseDown = function (evt) {
    var startCoord = evt.clientX;
    var secondBtnX = priceRangeFilterBtnRight.getBoundingClientRect().x;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientX >= (PRICE_RANGE_START + priceRangeFilterBtnShift)
      && moveEvt.clientX < secondBtnX) {
        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;
        evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
        priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        fillTheLine();
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onFilterRightBtnMouseDown = function (evt) {
    var startCoord = evt.clientX;
    var secondBtnRight = priceRangeFilterBtnLeft.getBoundingClientRect().right;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientX <= (PRICE_RANGE_END - priceRangeFilterBtnShift)
      && moveEvt.clientX > secondBtnRight) {
        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;
        evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
        priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        fillTheLine();
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnLeft);
  priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnRight);
  priceRangeFilterBtnLeft.addEventListener('mousedown', onFilterLeftBtnMouseDown);
  priceRangeFilterBtnRight.addEventListener('mousedown', onFilterRightBtnMouseDown);
})();
