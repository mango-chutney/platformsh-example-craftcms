// @flow

import { parseFrom as parseEmailAddress } from 'email-addresses';

export default (values: any, props: any) => {
  const { creatingTeam } = props;

  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (parseEmailAddress({ input: values.email, rejectTLD: true }) === null) {
    errors.email = 'Please enter a valid email address';
  }

  if (values.email) {
    if (values.email.indexOf('+') > -1) {
      errors.email = `Email can not contain a '+'`;
    }
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.phone) {
    errors.phone = 'Mobile number is required';
  }

  if (values.phone) {
    if (values.phone.length !== 10) {
      errors.phone = 'Mobile number must be 10 numerals';
    }
    if (!/^\d+$/.test(values.phone)) {
      errors.phone = 'Mobile number should only be numbers';
    }
  }

  if (!values.addressLine) {
    errors.addressLine = 'Address is required';
  }

  if (!values.postcode && !values.address) {
    errors.address = 'Address is required';
  }

  if (!values.postcode) {
    errors.postcode = 'Postcode is required';
  }

  if (values.postcode) {
    if (values.postcode.length !== 4 || !/^\d+$/.test(values.postcode)) {
      errors.postcode = 'Postcode is invalid';
    }
  }

  if (!values.suburb) {
    errors.suburb = 'Suburb is required';
  }

  if (!values.termsAndConditions) {
    errors.termsAndConditions = 'Please agree to the terms and conditions';
  }

  if (values.occupation) {
    if (!/^[a-z0-9 ]+$/i.test(values.occupation)) {
      errors.occupation = 'Position titles cannot have special characters';
    }
  }

  if (creatingTeam) {
    if (!values.teamName) {
      errors.teamName = 'Team name is required';
    }

    if (values.teamName) {
      if (!/^[a-z0-9 ]+$/i.test(values.teamName)) {
        errors.teamName = 'Team names cannot have special characters';
      }
    }

    if (!values.teamType) {
      errors.teamType = 'Team type is required';
    }
  }

  return errors;
};
