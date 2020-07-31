import Luhn from 'luhn-js';

export default registrationId => {
  let value = 20000000;

  if (typeof registrationId === 'number') {
    value += registrationId;
  } else if (typeof registrationId === 'string') {
    value += parseInt(registrationId, 10);
  }

  return Luhn.generate(String(value));
};
