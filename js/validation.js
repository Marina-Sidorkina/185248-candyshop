'use strict';

(function () {
  var buyingForm = document.querySelector('.buy__form');
  var paymentInputsBlock = document.querySelector('.payment__inputs');
  var cardNumberInput = paymentInputsBlock.querySelector('input[name = "card-number"]');
  var dateInput = paymentInputsBlock.querySelector('input[name = "card-date"]');
  var cvcInput = paymentInputsBlock.querySelector('input[name = "card-cvc"]');
  var nameInput = paymentInputsBlock.querySelector('input[name = "cardholder"]');
  var paymentInputs = paymentInputsBlock.querySelectorAll('input');
  var cardStatus = document.querySelector('.payment__card-status');
  var storeImage = document.querySelector('.deliver__store-map-img');
  var stationsBlock = document.querySelector('.deliver__stores');
  var stations = stationsBlock.querySelectorAll('li');
  var successNotification = document.querySelector('.modal--approved');
  var closingButton = successNotification.querySelector('.modal__close');

  var switchImage = function () {
    stations.forEach(function (item) {
      item.addEventListener('click', function () {
        var label = item.querySelector('label');
        var input = item.querySelector('input');
        storeImage.src = 'img/map/' + input.value + '.jpg';
        storeImage.alt = label.textContent;
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
    return (sum % 10 === 0);
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
    if (buyingForm.checkValidity()) {
      successNotification.classList.remove('modal--hidden');
      window.addEventListener('keydown', function (evt) {
        if (window.utils.onEscapeKeydown(evt.keyCode)) {
          onClosingButtonClick();
        }
      });
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

  var onClosingButtonClick = function () {
    successNotification.classList.add('modal--hidden');
    buyingForm.reset();
  };

  var onLoad = function () {
    successNotification.classList.remove('modal--hidden');
    closingButton.addEventListener('click', onClosingButtonClick);
  };

  buyingForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(buyingForm), onLoad, window.backend.onLoadAndSendDataError);
    evt.preventDefault();
  });
  switchImage();
  cardStatus.textContent = 'Не определён';
  buyingForm.addEventListener('submit', onFormSubmit);
  cardNumberInput.addEventListener('input', onCardNumberInputInvalid);
  dateInput.addEventListener('input', onDateInputInvalid);
  cvcInput.addEventListener('input', onCvcInputInvalid);
  nameInput.addEventListener('input', checkValidity);
  cardNumberInput.addEventListener('keypress', onCardNumberInputKeypress);
  dateInput.addEventListener('keypress', onDateInputKeypress);
})();
