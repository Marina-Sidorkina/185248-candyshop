'use strict';

(function () {
  var buyForm = document.querySelector('.buy__form');
  var paymentInputsBlock = document.querySelector('.payment__inputs');
  var cardNumberInput = paymentInputsBlock.querySelector('input[name = "card-number"]');
  var dateInput = paymentInputsBlock.querySelector('input[name = "card-date"]');
  var cvcInput = paymentInputsBlock.querySelector('input[name = "card-cvc"]');
  var nameInput = paymentInputsBlock.querySelector('input[name = "cardholder"]');
  var paymentInputs = paymentInputsBlock.querySelectorAll('input');
  var cardStatus = document.querySelector('.payment__card-status');
  var storeImg = document.querySelector('.deliver__store-map-img');
  var stationsBlock = document.querySelector('.deliver__stores');
  var stations = stationsBlock.querySelectorAll('li');
  var modalApproved = document.querySelector('.modal--approved');
  var modalApprovedClose = modalApproved.querySelector('.modal__close');

  var switchImage = function () {
    stations.forEach(function (item) {
      item.addEventListener('click', function () {
        var label = item.querySelector('label');
        var input = item.querySelector('input');
        storeImg.src = 'img/map/' + input.value + '.jpg';
        storeImg.alt = label.textContent;
      });
    });
  };

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

  var onCardNumberInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите 16 цифр номера банковской карты в формате ХХХХ ХХХХ ХХХХ ХХХХ');
    } else if (checkLuhnAlgorithm(evt.target.value) === false) {
      evt.target.setCustomValidity('Неправильный номер банковской карты');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!cardNumberInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var onDateInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите срок действия карты в формате мм/гг');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!dateInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var onCvcInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите CVC в указанном формате: трёхзначное число с диапазоном значений от 100 до 999');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!cvcInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var checkValidity = function () {
    for (var i = 0; i < paymentInputs.length; i++) {
      if (paymentInputs[i].checkValidity() && !paymentInputs[i].disabled) {
        cardStatus.textContent = 'Одобрен';
      } else {
        cardStatus.textContent = 'Не определён';
      }
    }
  };

  var onFormSubmit = function () {
    if (buyForm.checkValidity()) {
      modalApproved.classList.remove('modal--hidden');
    }
  };

  var onCardNumberInputKeypress = function () {
    if (cardNumberInput.value.length === 4 || cardNumberInput.value.length === 9 || cardNumberInput.value.length === 14) {
      cardNumberInput.value += ' ';
    }
  };

  var onDateInputKeypress = function () {
    if (dateInput.value.length === 2) {
      dateInput.value += '/';
    }
  };

  var onModalApprovedClose = function () {
    modalApproved.classList.add('modal--hidden');
    buyForm.reset();
  };

  var onLoad = function () {
    modalApproved.classList.remove('modal--hidden');
    modalApprovedClose.addEventListener('click', onModalApprovedClose);
  };

  buyForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(buyForm), onLoad, window.backend.onLoadAndSendDataError);
    evt.preventDefault();
  });
  window.addEventListener('keydown', function (evt) {
    window.utils.onEscKeydown(evt, modalApproved);
  });
  switchImage();
  cardStatus.textContent = 'Не определён';
  buyForm.addEventListener('submit', onFormSubmit);
  cardNumberInput.addEventListener('input', onCardNumberInputInvalid);
  dateInput.addEventListener('input', onDateInputInvalid);
  cvcInput.addEventListener('input', onCvcInputInvalid);
  nameInput.addEventListener('input', checkValidity);
  cardNumberInput.addEventListener('keypress', onCardNumberInputKeypress);
  dateInput.addEventListener('keypress', onDateInputKeypress);
})();
