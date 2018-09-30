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
  var priceRangeEnd = priceRangeFilterCoordinate.right;
  var priceRangeWidth = priceRangeFilterCoordinate.width;
  var priceRangeStep = priceRangeWidth / PRICE_RANGE;
  var priceRangeFilterBtnShift = priceRangeFilterBtnLeft.getBoundingClientRect().width / 2;
  var fillLine = document.querySelector('.range__fill-line');

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x + (pinCoordinate.width / 2);
    var pinValue = Math.round((pinX - priceRangeStart) / priceRangeStep);
    return pinValue;
  };

  var fillTheLine = function () {
    fillLine.style.left = priceRangeFilterBtnLeft.offsetLeft + 'px';
    fillLine.style.right = priceRangeFilterCoordinate.width - priceRangeFilterBtnRight.offsetLeft + 'px';
  };

  var onFilterLeftBtnMouseDown = function (evt) {
    var startCoord = evt.clientX;
    var secondBtnX = priceRangeFilterBtnRight.getBoundingClientRect().x;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientX >= (priceRangeStart + priceRangeFilterBtnShift)
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
      if (moveEvt.clientX <= (priceRangeEnd - priceRangeFilterBtnShift)
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
