'use strict';

(function () {
  var paymentToggleTab = document.querySelector('.payment__method');
  var paymentByCardButton = document.querySelector('#payment__card');
  var paymentByCashButton = document.querySelector('#payment__cash');
  var paymentByCardBlock = document.querySelector('.payment__card-wrap');
  var paymentByCardBlockInputs = paymentByCardBlock.querySelectorAll('input');
  var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
  var deliverToggleTab = document.querySelector('.deliver__toggle');
  var deliveryInStoreButton = document.querySelector('#deliver__store');
  var deliveryByCourierButton = document.querySelector('#deliver__courier');
  var deliveryInStoreBlock = document.querySelector('.deliver__store');
  var deliveryByCourierBlock = document.querySelector('.deliver__courier');
  var deliveryByCourierInputs = deliveryByCourierBlock.querySelectorAll('input');
  var paymentClickTargetId = 'payment__card';
  var deliveryClickTargetId = 'deliver__store';

  var setInputsAbility = function (inputs, abilityStatus) {
    inputs.forEach(function (item) {
      item.disabled = abilityStatus;
    });
  };

  paymentToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === paymentByCardButton || evt.target === paymentByCashButton)
    && paymentClickTargetId !== evt.target.id) {
      paymentByCardBlock.classList.toggle('visually-hidden');
      paymentByCashBlock.classList.toggle('visually-hidden');
      paymentClickTargetId = evt.target.id;
    }
    if (paymentByCardBlock.classList.contains('visually-hidden')) {
      setInputsAbility(paymentByCardBlockInputs, true);
    } else {
      setInputsAbility(paymentByCardBlockInputs, false);
    }
  });

  deliverToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === deliveryInStoreButton || evt.target === deliveryByCourierButton)
    && deliveryClickTargetId !== evt.target.id) {
      deliveryInStoreBlock.classList.toggle('visually-hidden');
      deliveryByCourierBlock.classList.toggle('visually-hidden');
      deliveryClickTargetId = evt.target.id;
    }
    if (deliveryClickTargetId === 'deliver__courier') {
      setInputsAbility(deliveryByCourierInputs, false);
    } else {
      setInputsAbility(deliveryByCourierInputs, true);
    }
  });

  window.tabs = {
    setInputsAbility: setInputsAbility,
    deliveryByCourierInputs: deliveryByCourierInputs
  };
})();
