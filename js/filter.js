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
  var priceRangeFilterBtnShiftOne = priceRangeFilterBtnLeft.getBoundingClientRect().width / 10 * 4;
  var priceRangeFilterBtnShiftTwo = priceRangeFilterBtnLeft.getBoundingClientRect().width / 5;
  var fillLine = document.querySelector('.range__fill-line');

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x + (pinCoordinate.width / 2);
    var pinValue = Math.round((pinX - priceRangeStart) / priceRangeStep);
    return pinValue;
  };

  var onPriceRangeFilterBtnMousedown = function (evt, evtTarget) {
    var startCoord = evt.clientX;
    var secondBtn = evt.target === priceRangeFilterBtnLeft ?
      priceRangeFilterBtnRight : priceRangeFilterBtnLeft;
    var secondBtnX = secondBtn.getBoundingClientRect().x;
    var secondBtnRight = secondBtn.getBoundingClientRect().right;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (
        evt.target === priceRangeFilterBtnLeft
      && moveEvt.clientX >= (priceRangeStart + priceRangeFilterBtnShiftOne)
      && moveEvt.clientX < (secondBtnX + priceRangeFilterBtnShiftTwo)
      ||
      evt.target === priceRangeFilterBtnRight
      && moveEvt.clientX <= (priceRangeEnd - priceRangeFilterBtnShiftOne)
      && moveEvt.clientX > (secondBtnRight - priceRangeFilterBtnShiftTwo)) {
        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;
        evtTarget.style.left = (evtTarget.offsetLeft - shift) + 'px';
        fillLine.style.left = priceRangeFilterBtnLeft.offsetLeft + 'px';
        fillLine.style.right = priceRangeFilterCoordinate.width - priceRangeFilterBtnRight.offsetLeft + 'px';
        if (evt.target === priceRangeFilterBtnLeft) {
          priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        } else if (evt.target === priceRangeFilterBtnRight) {
          priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        }
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (evt.target === priceRangeFilterBtnLeft) {
        priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
      } else if (evt.target === priceRangeFilterBtnRight) {
        priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnLeft);
  priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeFilterBtnRight);
  priceRangeFilterBtnLeft.addEventListener('mousedown', function (evt) {
    onPriceRangeFilterBtnMousedown(evt, evt.target);
  });
  priceRangeFilterBtnRight.addEventListener('mousedown', function (evt) {
    onPriceRangeFilterBtnMousedown(evt, evt.target);
  });
})();
