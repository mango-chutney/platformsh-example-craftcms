// @flow

import * as React from 'react';
import { reduxForm, Field, change, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  Anchor,
  Column,
  ErrorBox,
  FormFieldsetHeading,
  Input,
  Row,
  Section,
  SubmitButton,
} from '../../../components';
import { regapi } from '../../../api';
import type { $Dispatch } from '../../../actions';
import { artezURL, eventId, formKeys } from '../../../constants';
import {
  getRegistrationFromGetLogins,
  guessProvinceCodeFromPostcode,
} from '../../../lib';
import * as actions from '../../../actions';
import * as styles from '../../../styles';

const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${rem(24)};
`;

const ForgotPasswordAnchor = styled(Anchor)`
  color: ${styles.palette.body};
  font-weight: ${styles.fontWeight.semibold};
  font-size: 0.875rem;
`;

const validate = (values: any) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const onSubmit = (values: any, dispatch: $Dispatch, props: any) =>
  new Promise((resolve, reject) => {
    const { email, password } = values;

    return regapi
      .getLogins(email, password)
      .then(logins => {
        if (!logins.ConstituentID) {
          return reject(
            new SubmissionError({ _error: 'Unable to get constituent id' }),
          );
        }

        const existingRegistration = getRegistrationFromGetLogins(
          logins.Registrations,
        );

        if (existingRegistration) {
          dispatch(
            actions.appActionCreators.saveParticipant({
              username: email,
              password,
            }),
          );

          dispatch(actions.appActionCreators.isExistingRegistrant(true));

          return resolve();
        }

        dispatch(
          actions.appActionCreators.isExistingConstituent(logins.ConstituentID),
        );

        return regapi
          .getConstituents(logins.ConstituentID)
          .then(constituents => {
            const {
              AddressLine1: address,
              City: suburb,
              FirstName: firstName,
              LastName: lastName,
              PhoneNumber: phone,
              PostalCode: postcode,
            } = constituents;

            const { toggleFormKey } = props;

            toggleFormKey();

            const isInternationalRegistrant =
              guessProvinceCodeFromPostcode(
                postcode === undefined ? '' : postcode.toString(),
              ) === 'Outside Australia';

            dispatch(
              actions.appActionCreators.isInternationalRegistrant(
                isInternationalRegistrant,
              ),
            );

            const formKey = formKeys.constituentRegistration;

            dispatch(change(formKey, 'addressLine', address));
            dispatch(change(formKey, 'email', email));
            dispatch(change(formKey, 'firstName', firstName));
            dispatch(change(formKey, 'lastName', lastName));
            dispatch(change(formKey, 'password', password));
            dispatch(change(formKey, 'phone', phone.trim()));
            dispatch(change(formKey, 'postcode', postcode));
            dispatch(change(formKey, 'suburb', suburb));

            dispatch(
              actions.appActionCreators.saveParticipant({
                firstName,
                lastName,
                username: email,
                password,
              }),
            );

            dispatch(actions.appActionCreators.isReturningConstituent(true));

            return resolve();
          });
      })
      .catch(() =>
        reject(
          new SubmissionError({ _error: 'Incorrect username or password' }),
        ),
      );
  });

const onSubmitSuccess = () => {
  window.onbeforeunload = () => undefined;
};

const ConstituentLoginForm = ({
  disabled,
  error,
  handleSubmit,
  submitting,
  submitFailed,
  valid,
}: { disabled: boolean } & FormProps) => (
  <form onSubmit={handleSubmit}>
    <Section>
      <FormFieldsetHeading>
        Log in to your existing fundraising account…
      </FormFieldsetHeading>
      <Row>
        <Column medium={6}>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            component={Input}
            disabled={disabled}
            autoComplete="email"
          />
        </Column>
        <Column medium={6}>
          <Field
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            component={Input}
            disabled={disabled}
            autoComplete="current-password"
          />
        </Column>
      </Row>
      <ForgotPassword>
        <ForgotPasswordAnchor
          href={`${artezURL}/registrant/ForgetPassword.aspx?eventid=${eventId}`}
          target="_blank"
          disableBeforeUnload
        >
          Forgot your password?
        </ForgotPasswordAnchor>
      </ForgotPassword>
      {(error || (submitFailed && !valid)) && (
        <ErrorBox error={error || `You've missed a required field.`} />
      )}
      <SubmitButton
        type="submit"
        buttonType="primary"
        submitting={submitting}
        expanded
      >
        Log In
      </SubmitButton>
    </Section>
  </form>
);

const ConnectedLoginForm = reduxForm({
  form: formKeys.constituentLogin,
  validate,
  onSubmit,
  onSubmitSuccess,
  destroyOnUnmount: false,
})(ConstituentLoginForm);

export default ConnectedLoginForm;
