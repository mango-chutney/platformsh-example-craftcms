// @flow

import * as React from 'react';
import {
  destroy,
  reduxForm,
  Field,
  SubmissionError,
  formValueSelector,
} from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { CoolChild, OtherChild } from 'mango-components';
import properCase from 'proper-case';
import BadWords from 'bad-words';
import {
  Checkbox,
  CheckboxWrapper,
  Column,
  Cooltip,
  ErrorBox,
  FormFieldsetHeading,
  Input,
  Row,
  Section,
  Select,
  SubmitButton,
  TermsAndConditionsModal,
  Underage,
} from '../../../components';
import type { $Dispatch } from '../../../actions';
import {
  defaultTeamFundraisingTarget,
  formKeys,
  otherGoal,
  teamSuggestedGoals,
  teamTypes,
} from '../../../constants';
import * as actions from '../../../actions';
import type { $State as $AppState } from '../../../reducers';

const coolChildren = teamSuggestedGoals.map(({ value, label, description }) => (
  <CoolChild {...{ value: String(value), label }}>{description}</CoolChild>
));

const otherChild = (
  <OtherChild label={otherGoal.label}>{otherGoal.description}</OtherChild>
);

const validate = (values: any) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
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

  if (!values.address) {
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

  if (values.teamName) {
    if (!/^[a-z0-9 ]+$/i.test(values.teamName)) {
      errors.teamName = 'Team names cannot have special characters';
    }
  }

  return errors;
};

const onSubmit = (values: any, dispatch: $Dispatch) =>
  new Promise((resolve, reject) => {
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

const ConstituentLoginForm = ({
  blur,
  creatingTeam,
  creatingSchoolTeam,
  error,
  handleSubmit,
  internationalRegistrant,
  submitting,
  submitFailed,
  dirtyValues: { overEighteen, teamType },
  valid,
}: { internationalRegistrant: boolean } & FormProps) => (
  <form onSubmit={handleSubmit}>
    <Section>
      <Row>
        <Column medium={6}>
          <Field
            type="text"
            name="firstName"
            placeholder="First Name"
            label="First Name"
            component={Input}
            onBlur={(event, newValue) => {
              event.preventDefault();
              blur('firstName', properCase(newValue));
            }}
          />
        </Column>
        <Column medium={6}>
          <Field
            type="text"
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            component={Input}
            onBlur={(event, newValue) => {
              event.preventDefault();
              blur('lastName', properCase(newValue));
            }}
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
      {!overEighteen && <Underage />}
      {(error || (submitFailed && !valid)) && (
        <ErrorBox error={error || `You've missed a required field.`} />
      )}
      <SubmitButton
        type="submit"
        buttonType="secondary"
        submitting={submitting}
        expanded
      >
        Sign Up
      </SubmitButton>
    </Section>
  </form>
);

const ConnectedLoginForm = reduxForm({
  form: formKeys.constituentRegistration,
  validate,
  onSubmit,
  onSubmitSuccess,
  destroyOnUnmount: false,
})(ConstituentLoginForm);

const mapStateToProps = (state: $AppState) => {
  const selector = formValueSelector(formKeys.constituentRegistration);

  return {
    creatingTeam: state.app.creatingTeam,
    creatingSchoolTeam: state.app.creatingSchoolTeam,
    internationalRegistrant: state.app.internationalRegistrant,
    dirtyValues: {
      overEighteen: selector(state, 'overEighteen'),
      teamType: selector(state, 'teamType'),
    },
    initialValues: {
      overEighteen: true,
      teamFundraisingGoal: String(defaultTeamFundraisingTarget),
      teamType: state.app.creatingSchoolTeam
        ? String(teamTypes.school.id)
        : String(teamTypes.friends.id),
    },
  };
};

export default connect(mapStateToProps)(ConnectedLoginForm);
