'use strict';

(function () {
  var buyForm = document.querySelector('.buy__form');
  var paymentInputsBlock = document.querySelector('.payment__inputs');
  var cardNumberInput = paymentInputsBlock.querySelector('input[name = "card-number"]');
  var dateInput = paymentInputsBlock.querySelector('input[name = "card-date"]');
  var cvcInput = paymentInputsBlock.querySelector('input[name = "card-cvc"]');
  var paymentInputs = paymentInputsBlock.querySelectorAll('input');
  var cardStatus = document.querySelector('.payment__card-status');
  var storeImg = document.querySelector('.deliver__store-map-img');
  var metroStationsBlock = document.querySelector('.deliver__stores');
  var metroStations = metroStationsBlock.querySelectorAll('li');
  var modalApproved = document.querySelector('.modal--approved');

  var switchImage = function () {
    metroStations.forEach(function (item) {
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

  // Не понимаю, как сделать так, чтобы функция работала и при копипасте...
  cardNumberInput.onkeypress = function () {
    if (cardNumberInput.value.length === 4 || cardNumberInput.value.length === 9 || cardNumberInput.value.length === 14) {
      cardNumberInput.value += ' ';
    }
  };

  var onInputInvalidFunctions = {
    cardNumberInput: function (evt) {
      if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Введите 16 цифр номера банковской карты в формате ХХХХ ХХХХ ХХХХ ХХХХ');
      } else if (checkLuhnAlgorithm(evt.target.value) === false) {
        evt.target.setCustomValidity('Неправильный номер банковской карты');
      } else {
        evt.target.setCustomValidity('');
      }
    },
    dateInput: function (evt) {
      if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Введите срок действия карты в формате мм/гг');
      } else {
        evt.target.setCustomValidity('');
      }
    },
    cvcInput: function (evt) {
      if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Введите CVC в указанном формате: трёхзначное число с диапазоном значений от 100 до 999');
      } else {
        evt.target.setCustomValidity('');
      }
    }
  };

  var checkValidity = function () {
    for (var i = 0; i < paymentInputs.length; i++) {
      var validity = false;
      if (paymentInputs[i].checkValidity()) {
        validity = true;
      } else {
        validity = false;
      }
    }
    if (validity) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Не определен';
    }
  };

  var submitForm = function () {
    if (buyForm.checkValidity()) {
      modalApproved.classList.remove('modal--hidden');
    }
  };

  buyForm.addEventListener('submit', submitForm);

  cardStatus.textContent = 'Не определён';
  checkValidity();
  switchImage();
  cardNumberInput.addEventListener('input', onInputInvalidFunctions.cardNumberInput);
  dateInput.addEventListener('input', onInputInvalidFunctions.dateInput);
  cvcInput.addEventListener('input', onInputInvalidFunctions.cvcInput);
})();
