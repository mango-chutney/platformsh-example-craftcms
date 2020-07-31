import $ from 'jquery';

const handleHashChange = () => {
  if (window.location.hash === '#signup') {
    $('.footer-registration-container').addClass('modal-open');
    $('.footer-registration-button').attr('href', '/signup');
    window.Intercom('update', { hide_default_launcher: true });
  } else {
    $('.footer-registration-container').removeClass('modal-open');
    $('.footer-registration-button').attr('href', '#signup');
    $('.footer-registration-container').removeClass('hide');
    window.Intercom('update', { hide_default_launcher: false });
  }
};

export default () => {
  handleHashChange();

  $(window).bind('hashchange', handleHashChange);
};
