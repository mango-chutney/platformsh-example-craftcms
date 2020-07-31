/*
 * common/navigation.js
 */

import $ from 'jquery';

export default () => {
  $('.js-toggle-navigation').on('click', e => {
    e.stopPropagation();
    $('#navigation-modal').toggleClass('active');
    $('.mobile-navigation').toggleClass('active');
    $('.header-wrapper').toggleClass('active');
    $('.burger').toggleClass('burger-to-cross');
  });

  $('.js-open-navigation').on('click', e => {
    e.stopPropagation();
    $('#navigation-modal').addClass('active');
    $('.mobile-navigation').addClass('active');
    $('.header-wrapper').addClass('active');
    $('.burger').addClass('burger-to-cross');
  });

  $('.js-close-navigation').on('click', e => {
    e.stopPropagation();
    $('#navigation-modal').removeClass('active');
    $('.mobile-navigation').removeClass('active');
    $('.header-wrapper').removeClass('active');
    $('.burger').removeClass('burger-to-cross');
  });

  $('.js-close-navigation').on('click', e => {
    e.stopPropagation();
    $('#navigation-modal').removeClass('active');
    $('.mobile-navigation').removeClass('active');
    $('.header-wrapper').removeClass('active');
    $('.burger').removeClass('burger-to-cross');
  });

  $('.navigation-modal-link-toggle').on('click', e => {
    e.stopPropagation();
    $(e.currentTarget).toggleClass('active');
  });

  $('.navigation-modal-link-toggle ul').on('click', e => {
    e.stopPropagation();
  });
};
