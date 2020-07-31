// @flow

import * as React from 'react';
import {
  destroy,
  reduxForm,
  Field,
  SubmissionError,
  formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import type { FormProps } from 'redux-form';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import pickBy from 'lodash/pickBy';
import properCase from 'proper-case';
import BadWords from 'bad-words';
import isFunction from 'lodash/isFunction';
import { CoolChild, OtherChild } from 'mango-components';
import {
  CheckboxWrapper,
  Checkbox,
  Column,
  Cooltip,
  ErrorBox,
  FormFieldsetHeading,
  Input,
  InternationalToggle,
  Row,
  Section,
  Select,
  SubmitButton,
  TermsAndConditionsModal,
  TypeaheadAddressInput,
  Underage,
  ExistingAccountModal,
} from '../../../components';
import {
  defaultTeamFundraisingTarget,
  formKeys,
  teamSuggestedGoals,
  otherGoal,
  teamTypes,
} from '../../../constants';
import type { $Dispatch } from '../../../actions';
import * as actions from '../../../actions';
import type { $State as $AppState } from '../../../reducers';
import asyncValidate from './asyncValidate';
import validate from './validate';

const coolChildren = teamSuggestedGoals.map(({ value, label, description }) => (
  <CoolChild {...{ value: String(value), label }}>{description}</CoolChild>
));

const otherChild = (
  <OtherChild label={otherGoal.label}>{otherGoal.description}</OtherChild>
);

const onSubmit = (values: any, dispatch: $Dispatch, props) =>
  new Promise((resolve, reject) => {
    if (!props.internationalRegistrant) {
      if (!values.postcode) {
        dispatch(actions.appActionCreators.isValidAddress(values.postcode));

        return reject(
          new SubmissionError({
            _error: 'Address is invalid',
          }),
        );
      }
    }

    if (values.teamFundraisingGoal) {
      if (!/^\d+$/.test(values.teamFundraisingGoal)) {
        return reject(
          new SubmissionError({
            _error: 'Team fundraising goal should only be numbers',
          }),
        );
      }
    }

    return dispatch(actions.artezActionCreators.submit())
      .then(() => {
        dispatch(actions.appActionCreators.setFormKey(formKeys.stageTwo));
        return resolve();
      })
      .catch(error =>
        reject(
          new SubmissionError({
            _error: (error && error.message) || 'An unknown error occurred',
          }),
        ),
      );
  });

const onSubmitSuccess = (result: any, dispatch: $Dispatch) => {
  dispatch(
    destroy(
      formKeys.registration,
      formKeys.constituentLogin,
      formKeys.constituentRegistration,
    ),
  );
  window.scroll({
    top: 0,
    behaviour: 'smooth',
  });
};

const onSubmitFail = (errors: Object, dispatch: $Dispatch) => {
  // errors can either be an array of syncErrors or a SubmissionError string
  // eslint-disable-next-line no-underscore-dangle
  if (!errors._error) {
    dispatch(
      actions.appActionCreators.isValidAddress(
        !(!errors.address && errors.postcode),
      ),
    );
  }
};

type $Props = {
  internationalRegistrant: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'internationalRegistrant',
  >,
} & FormProps;

type $State = {};

class RegistrationForm extends React.Component<$Props, $State> {
  render() {
    const {
      asyncValidating,
      blur,
      creatingSchoolTeam,
      creatingTeam,
      dirtyValues,
      error,
      handleSubmit,
      submitFailed,
      internationalRegistrant,
      isValidAddress,
      submitting,
      valid,
      validAddress,
    } = this.props;

    const { overEighteen, teamType } = dirtyValues;

    return (
      <form onSubmit={handleSubmit}>
        <Section>
          <FormFieldsetHeading>
            Let’s setup your new fundraising account…
          </FormFieldsetHeading>
          <Row>
            <Column medium={6}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
                component={Input}
                disabled={asyncValidating === 'email'}
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
                autoComplete="new-password"
              />
            </Column>
          </Row>
          <Row>
            <Column medium={6}>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                label="First Name"
                onBlur={(event, newValue) => {
                  event.preventDefault();
                  blur('firstName', properCase(newValue));
                }}
                component={Input}
              />
            </Column>
            <Column medium={6}>
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                onBlur={(event, newValue) => {
                  event.preventDefault();
                  blur('lastName', properCase(newValue));
                }}
                component={Input}
              />
            </Column>
          </Row>
          {!internationalRegistrant && (
            <Field
              type="text"
              name="phone"
              placeholder="Mobile"
              label="Mobile"
              component={Input}
            />
          )}
          {!internationalRegistrant && (
            <React.Fragment>
              {validAddress && (
                <Field
                  type="text"
                  name="address"
                  placeholder="Start typing your address and select from the list"
                  label="Address"
                  component={TypeaheadAddressInput}
                  manualAddressOnChange={() => {
                    isValidAddress(false);
                  }}
                  autoComplete="nope"
                />
              )}
              {!validAddress && (
                <React.Fragment>
                  <Field
                    type="text"
                    name="addressLine"
                    placeholder="Address"
                    label="Address"
                    component={Input}
                  />
                  <Row>
                    <Column medium={6}>
                      <Field
                        type="text"
                        name="suburb"
                        placeholder="Suburb"
                        label="Suburb"
                        component={Input}
                      />
                    </Column>
                    <Column medium={6}>
                      <Field
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        label="Postcode"
                        component={Input}
                      />
                    </Column>
                  </Row>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Section>
        {creatingTeam && (
          <Section>
            <FormFieldsetHeading>
              Tell us about your {creatingSchoolTeam && 'school '}team
            </FormFieldsetHeading>
            {!creatingSchoolTeam && (
              <Row>
                <Column>
                  <Field
                    type="text"
                    name="teamType"
                    placeholder="Team type"
                    label="Team type"
                    component={Select}
                  >
                    {Object.keys(teamTypes).map(type => (
                      <option value={teamTypes[type].id} key={type}>
                        {teamTypes[type].title} Team
                      </option>
                    ))}
                  </Field>
                </Column>
              </Row>
            )}
            {teamType !== String(teamTypes.friends.id) && (
              <>
                <Row>
                  <Column>
                    <Field
                      type="text"
                      name="occupation"
                      placeholder={(() => {
                        if (teamType === String(teamTypes.school.id)) {
                          return 'Eg. Principal / Teacher / Student';
                        }

                        return 'Eg. Manager / Receptionist';
                      })()}
                      label={(() => {
                        if (teamType === String(teamTypes.school.id)) {
                          return 'Your role';
                        }

                        return 'Your occupation';
                      })()}
                      onBlur={(event, newValue) => {
                        event.preventDefault();
                        const filter = new BadWords();
                        if (/^[a-z0-9 ]+$/i.test(newValue)) {
                          if (filter.isProfane(newValue)) {
                            blur('occupation', '');
                          } else {
                            blur('occupation', properCase(newValue));
                          }
                        }
                      }}
                      component={Input}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Field
                      type="text"
                      name="organisationName"
                      placeholder={(() => {
                        if (teamType === String(teamTypes.school.id)) {
                          return 'Eg. Scotch College / Wesley College / Fairholme College';
                        }

                        return 'Eg. Bechtel / Bridgestone / Bunnings';
                      })()}
                      label={(() => {
                        if (teamType === String(teamTypes.school.id)) {
                          return 'School name';
                        }

                        return 'Organisation name';
                      })()}
                      onBlur={(event, newValue) => {
                        event.preventDefault();
                        const filter = new BadWords();
                        if (/^[a-z0-9 ]+$/i.test(newValue)) {
                          if (filter.isProfane(newValue)) {
                            blur('organisationName', '');
                          } else {
                            blur('organisationName', properCase(newValue));
                          }
                        }
                      }}
                      component={Input}
                    />
                  </Column>
                </Row>
              </>
            )}
            <Row>
              <Column>
                <Field
                  type="text"
                  name="teamName"
                  placeholder="Team name"
                  label="Team name"
                  component={Input}
                  onBlur={(event, newValue) => {
                    event.preventDefault();
                    const filter = new BadWords();
                    if (/^[a-z0-9 ]+$/i.test(newValue)) {
                      if (filter.isProfane(newValue)) {
                        blur('teamName', '');
                      } else {
                        blur('teamName', properCase(newValue));
                      }
                    }
                  }}
                />
              </Column>
            </Row>
            <div>
              <Field
                name="teamFundraisingGoal"
                component={Cooltip}
                coolChildren={coolChildren}
                otherChild={otherChild}
                normalize={value => (value ? value.replace(/\s/g, '') : '')}
                cooltipLabel="How much is your team aiming to fundraise..."
              />
            </div>
          </Section>
        )}
        <Section>
          <div>
            <CheckboxWrapper>
              <Field name="overEighteen" component={Checkbox} defaultChecked>
                I’m 18 or over
              </Field>
              <Field name="termsAndConditions" component={Checkbox}>
                I agree to the{' '}
                <TermsAndConditionsModal>
                  terms and conditions
                </TermsAndConditionsModal>
              </Field>
            </CheckboxWrapper>
          </div>
        </Section>
        {!overEighteen && <Underage />}
        {(error || (submitFailed && !valid)) && (
          <ErrorBox error={error || `You've missed a required field.`} />
        )}
        <SubmitButton
          buttonType="secondary"
          type="submit"
          submitting={submitting}
          expanded
        >
          Sign up
        </SubmitButton>
        <InternationalToggle />
        <ExistingAccountModal />
      </form>
    );
  }
}

const ConnectedForm = reduxForm({
  form: formKeys.registration,
  validate,
  onSubmit,
  onSubmitFail,
  onSubmitSuccess,
  asyncValidate,
  asyncBlurFields: ['email'],
})(RegistrationForm);

const mapStateToProps = (state: $AppState) => {
  const selector = formValueSelector(formKeys.registration);

  return {
    internationalRegistrant: state.app.internationalRegistrant,
    creatingTeam: state.app.creatingTeam,
    creatingSchoolTeam: state.app.creatingSchoolTeam,
    validAddress: state.app.validAddress,
    errors: get(state, `form.${formKeys.registration}.syncErrors`),
    dirtyValues: {
      overEighteen: selector(state, 'overEighteen'),
      teamType: selector(state, 'teamType'),
    },
    initialValues: {
      addressLine: undefined,
      suburb: undefined,
      postcode: undefined,
      overEighteen: true,
      teamFundraisingGoal: String(defaultTeamFundraisingTarget),
      teamType: state.app.creatingSchoolTeam
        ? String(teamTypes.school.id)
        : String(teamTypes.friends.id),
    },
  };
};

const mapDispatchToProps = (dispatch: $Dispatch) => ({
  ...bindActionCreators(
    pickBy(actions.appActionCreators, isFunction),
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedForm);
