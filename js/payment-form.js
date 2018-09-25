'use strict';

(function () {
  var paymentClickTargetId = 'payment__card';
  var paymentToggleTab = document.querySelector('.payment__method');
  var paymentMethodCardBtn = document.querySelector('#payment__card');
  var paymentMethodCashBtn = document.querySelector('#payment__cash');
  var paymentByCardBlock = document.querySelector('.payment__card-wrap');
  var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
  var cardNumberInput = document.querySelector('input[name = "card-number"]');
  var cardStatus = document.querySelector('.payment__card-status');

  paymentToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === paymentMethodCardBtn || evt.target === paymentMethodCashBtn)
    && paymentClickTargetId !== evt.target.id) {
      paymentByCardBlock.classList.toggle('visually-hidden');
      paymentByCashBlock.classList.toggle('visually-hidden');
      paymentClickTargetId = evt.target.id;
    }
  });

  var checkLuhnAlgorithm = function (string) {
    string = string.replace(/\s/g, '');
    var cardNumber = string.split('').map(Number);
    var sum = 0;
    for (var i = 0; i < cardNumber.length; i++) {
      if ((cardNumber.length - i) % 2 !== 0) {
        sum += cardNumber[i];
      } else {
        if (cardNumber[i] * 2 > 9) {
          var multiplication = String(cardNumber[i] * 2).split('').map(Number);
          sum += multiplication[0] + multiplication[1];
        } else {
          sum += (cardNumber[i] * 2);
        }
      }
    }
    return sum % 10 === 0 ? true : false;
  };

  cardNumberInput.onkeypress = function () {
    if (cardNumberInput.value.length === 4 || cardNumberInput.value.length === 9 || cardNumberInput.value.length === 14) {
      cardNumberInput.value += ' ';
    }
  };

  var checkCardNumberValidity = function (evt) {
    if (cardNumberInput.checkValidity()) {
      var validity = checkLuhnAlgorithm(evt.target.value);
      if (validity === false) {
        cardNumberInput.setCustomValidity('Неправильный номер банковской карты');
      }
    }
    cardStatus.textContent = validity ? 'Одобрен' : 'Не определён';
  };

  cardNumberInput.addEventListener('input', checkCardNumberValidity);
})();
