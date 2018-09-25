'use strict';

(function () {
  var deliverClickTargetId = 'deliver__store';
  var deliverToggleTab = document.querySelector('.deliver__toggle');
  var deliverInStoreBtn = document.querySelector('#deliver__store');
  var deliverByCourierBtn = document.querySelector('#deliver__courier');
  var deliverInStoreBlock = document.querySelector('.deliver__store');
  var deliverByCourierBlock = document.querySelector('.deliver__courier');

  deliverToggleTab.addEventListener('click', function (evt) {
    if ((evt.target === deliverInStoreBtn || evt.target === deliverByCourierBtn)
    && deliverClickTargetId !== evt.target.id) {
      deliverInStoreBlock.classList.toggle('visually-hidden');
      deliverByCourierBlock.classList.toggle('visually-hidden');
      deliverClickTargetId = evt.target.id;
    }
  });
})();
