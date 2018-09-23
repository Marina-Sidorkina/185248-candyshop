'use strict';

(function () {
  var paymentClickTargetId = 'payment__card';
  var paymentToggleTab = document.querySelector('.payment__method');
  var paymentMethodCardBtn = document.querySelector('#payment__card');
  var paymentMethodCashBtn = document.querySelector('#payment__cash');
  var paymentByCardBlock = document.querySelector('.payment__card-wrap');
  var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
  paymentToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === paymentMethodCardBtn || evt.target === paymentMethodCashBtn)
    && paymentClickTargetId !== evt.target.id) {
      paymentByCardBlock.classList.toggle('visually-hidden');
      paymentByCashBlock.classList.toggle('visually-hidden');
      paymentClickTargetId = evt.target.id;
    }
  });
})();
