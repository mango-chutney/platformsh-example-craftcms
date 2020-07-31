import React from 'react';
import $ from 'jquery';
import { render } from 'react-dom';
import RegistrationSelection from '../components/RegistrationSelection';

const openSignupOnHash = () => {
  if (window.location.hash === '#signup') {
    $('body').addClass('modal-open');
    $('#registration-modal-wrapper').addClass('active');
  } else {
    $('body').removeClass('modal-open');
    $('#registration-modal-wrapper').removeClass('active');
  }
};

export default () => {
  if (document.getElementById('registration-select-modal')) {
    window.addEventListener('hashchange', openSignupOnHash, false);

    // do it on load as well
    openSignupOnHash();

    render(
      <RegistrationSelection />,
      document.getElementById('registration-select-modal'),
    );
  }
};
