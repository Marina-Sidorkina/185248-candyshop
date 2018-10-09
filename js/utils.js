'use strict';

(function () {
  var ESC = 27;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomBoolean = function () {
    return Math.random() >= 0.5;
  };

  var createTagElement = function (tag, addClass, text) {
    var tagElement = document.createElement(tag);
    tagElement.classList.add(addClass);
    tagElement.textContent = text;
    return tagElement;
  };

  var getDeclension = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ?
      2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var onEscapeKeydown = function (keyCode) {
    return (keyCode === ESC);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomBoolean: getRandomBoolean,
    createTagElement: createTagElement,
    getDeclension: getDeclension,
    onEscapeKeydown: onEscapeKeydown
  };
})();
