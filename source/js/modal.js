'use strict';

var button = document.querySelector('.special-product__button');
var itemsToCart = document.querySelectorAll('.product__cart');
var overlay = document.querySelector('.overlay');
var modal = document.querySelector('.modal');
var modalForm = modal.querySelector('.modal__form');
var sizeM = modalForm.querySelector('[value=size-m]');

function showModal(evt) {
  evt.preventDefault();
  overlay.classList.add('overlay--show');
  modal.classList.add('modal--show');
  sizeM.focus();
}

function hideModal() {
  if (modal.classList.contains('modal--show')) {
    modal.classList.remove('modal--show');
  }
  if (overlay.classList.contains('overlay--show')) {
    overlay.classList.remove('overlay--show');
  }
}

if (button) {
  button.addEventListener('click', function (evt) {
    showModal(evt);
  });
}

if (itemsToCart) {
  [].forEach.call(itemsToCart, function (item) {
    item.addEventListener('click', function (evt) {
      showModal(evt);
    });
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    hideModal();
  }
});

overlay.addEventListener('click', function () {
  hideModal();
});

modalForm.addEventListener('submit', function () {
  hideModal();
});
