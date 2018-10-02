'use strict';

(function () {
  var urls = {
    FORM_URL: 'https://js.dump.academy/candyshop',
    DATA_URL: 'https://js.dump.academy/candyshop/data'
  };

  var modalError = document.querySelector('.modal--error');
  var modalErrorClose = modalError.querySelector('.modal__close');
  var modalErrorMessage = modalError.querySelector('.modal__message');

  var onModalErrorClose = function () {
    modalError.classList.add('modal--hidden');
  };

  var onLoadAndSendDataError = function (error) {
    switch (error) {
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Произошла ошибка соединения';
    }

    if (error) {
      modalError.classList.remove('modal--hidden');
      modalErrorClose.addEventListener('click', onModalErrorClose);
      modalErrorMessage.textContent = error;
    }
  };

  var onLoadAndSendDataTimeout = function (xhr) {
    modalError.classList.remove('modal--hidden');
    modalErrorClose.addEventListener('click', onModalErrorClose);
    modalErrorMessage.textContent = 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
  };

  var sendForm = function (data, onLoad, onError) {
    var Xhr = new XMLHttpRequest();
    Xhr.responseType = 'json';
    Xhr.addEventListener('load', function () {
      if (Xhr.status === 200) {
        onLoad();
        data = JSON.parse(Xhr.responseText);
      } else {
        onError(Xhr.status);
      }
    });
    Xhr.addEventListener('timeout', function () {
      onLoadAndSendDataTimeout(Xhr);
    });
    Xhr.timeout = 1000;
    Xhr.open('POST', urls.FORM_URL);
    Xhr.send(data);
  };

  var loadData = function (onLoad, onError) {
    var Xhr = new XMLHttpRequest();
    Xhr.responseType = 'json';
    Xhr.addEventListener('load', function () {
      if (Xhr.status === 200) {
        onLoad(Xhr.response);
      } else {
        onError(Xhr.status);
      }
    });
    Xhr.addEventListener('timeout', function () {
      onLoadAndSendDataTimeout(Xhr);
    });
    Xhr.timeout = 1000;
    Xhr.open('GET', urls.DATA_URL);
    Xhr.send();
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC && !modalError.classList.contains('modal--hidden')) {
      onModalErrorClose();
    }
  });

  window.backend = {
    sendForm: sendForm,
    loadData: loadData,
    onLoadAndSendDataError: onLoadAndSendDataError,
  };
})();
