'use strict';

(function () {
  var paymentClickTargetId = 'payment__card';
  var paymentToggleTab = document.querySelector('.payment__method');
  var paymentMethodCardBtn = document.querySelector('#payment__card');
  var paymentMethodCashBtn = document.querySelector('#payment__cash');
  var paymentByCardBlock = document.querySelector('.payment__card-wrap');
  var paymentByCardBlockInputs = paymentByCardBlock.querySelectorAll('input');
  var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
  var deliverClickTargetId = 'deliver__store';
  var deliverToggleTab = document.querySelector('.deliver__toggle');
  var deliverInStoreBtn = document.querySelector('#deliver__store');
  var deliverByCourierBtn = document.querySelector('#deliver__courier');
  var deliverInStoreBlock = document.querySelector('.deliver__store');
  var deliverByCourierBlock = document.querySelector('.deliver__courier');
  var deliverByCourierBlockInputs = deliverByCourierBlock.querySelectorAll('input');

  paymentToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === paymentMethodCardBtn || evt.target === paymentMethodCashBtn)
    && paymentClickTargetId !== evt.target.id) {
      paymentByCardBlock.classList.toggle('visually-hidden');
      paymentByCashBlock.classList.toggle('visually-hidden');
      paymentClickTargetId = evt.target.id;
    }
    if (paymentByCardBlock.classList.contains('visually-hidden')) {
      paymentByCardBlockInputs.forEach(function (item) {
        item.disabled = true;
      });
    } else {
      paymentByCardBlockInputs.forEach(function (item) {
        item.disabled = false;
      });
    }
  });

  deliverToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === deliverInStoreBtn || evt.target === deliverByCourierBtn)
    && deliverClickTargetId !== evt.target.id) {
      deliverInStoreBlock.classList.toggle('visually-hidden');
      deliverByCourierBlock.classList.toggle('visually-hidden');
      deliverClickTargetId = evt.target.id;
    }
    if (deliverClickTargetId === '#deliver__courier') {
      deliverByCourierBlockInputs.forEach(function (item) {
        item.disabled = false;
      });
    } else {
      deliverByCourierBlockInputs.forEach(function (item) {
        item.disabled = true;
      });
    }
  });

  deliverByCourierBlockInputs.forEach(function (item) {
    item.disabled = true;
  });
})();
