'use strict';

(function () {
  function findHasDropElements() {
    var elements = document.querySelectorAll('.has-drop');

    if (elements.length > 0) {
      elements = Array.prototype.slice.call(elements);
      elements.forEach(function (item) {
        var hasFocus = new HasFocus(item);
        hasFocus.run();
      });
    }
  }

  function HasFocus(element) {
    this.element = element;
  }

  HasFocus.prototype.onElementFocus = function () {
    this.element.classList.add('has-focus');
  };

  HasFocus.prototype.onElementBlur = function () {
    this.element.classList.remove('has-focus');
  };

  HasFocus.prototype.run = function () {
    this.element.classList.remove('has-drop--nojs');
    this.element.addEventListener('focus', this.onElementFocus.bind(this), true);
    this.element.addEventListener('blur', this.onElementBlur.bind(this), true);
  };

  findHasDropElements();
})();
