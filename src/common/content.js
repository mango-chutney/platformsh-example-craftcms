/*
 * common/faqs.js
 */

import $ from 'jquery';

export default () => {
  if ($('.content-row figure iframe').length) {
    $('.content-row figure iframe')
      .parent()
      .addClass('video-wrapper');
  }
};
