import $ from 'jquery';
import fetch from 'unfetch';
import { paramify } from '../abstracts/helpers';

const contactForm = document.getElementsByClassName('contact-form')[0];
const $feedback = $('.contact-feedback');
let timer = null;

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  clearTimeout(timer);
  $feedback.removeClass('active');

  const data = {
    'chimeric-span-salute-bazaar': document.getElementById(
      'chimeric-span-salute-bazaar',
    ).value,
    'message[Under 18?]': document.getElementById('Under-18').value,
    'message[Email]': document.getElementById('email').value,
    'message[Phone]': document.getElementById('phone').value,
    action: document.getElementsByName('action')[0].value,
    CRAFT_CSRF_TOKEN: document.getElementsByName('CRAFT_CSRF_TOKEN')[0].value,
    fromEmail: document.getElementById('from-email').value,
    fromName: document.getElementById('from-name').value,
    toEmail: document.getElementById('to-email').value,
    subject: document.getElementById('subject').value,
  };

  fetch('/', {
    method: 'POST',
    body: paramify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    credentials: 'include',
  }).then(() => {
    contactForm.reset();

    if ($feedback) {
      $feedback.addClass('active');

      timer = setTimeout(() => {
        $feedback.removeClass('active');
      }, 15000);
    }
  });
});
