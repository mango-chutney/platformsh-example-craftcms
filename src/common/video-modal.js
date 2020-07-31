/*
 * common/navigation.js
 */

import $ from 'jquery';

export default () => {
  $('.js-toggle-video-modal').on('click', e => {
    e.stopPropagation();
    $('.modal-video').toggleClass('active');
  });
};
