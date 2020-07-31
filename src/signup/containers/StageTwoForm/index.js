// @flow

import * as React from 'react';
import { destroy, reduxForm, Field, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { CoolChild, OtherChild } from 'mango-components';
import { mergeUDFResponses } from 'udf-mapper';
import { bindActionCreators } from 'redux';
import pickBy from 'lodash/pickBy';
import isFunction from 'lodash/isFunction';
import { DateTime } from 'luxon';
import {
  Column,
  Cooltip,
  DateOfBirth,
  DatePicker,
  ErrorBox,
  FormHeading,
  FormSubheading,
  Row,
  Section,
  Select,
  SubmitButton,
} from '../../components';
import { regapi, spyware } from '../../api';
import type { $Dispatch } from '../../actions';
import {
  defaultFundraisingTarget,
  defaultShaveDate,
  formKeys,
  inputDateFormat,
  otherGoal,
  suggestedGoals,
  udfDateFormat,
} from '../../constants';
import {
  mapUDFAnswersToOptions,
  getBoundEventUDFs,
  findAnswerValueForAnswerId,
  valueify,
  sanitiseFundraisingTarget,
} from '../../lib';
import type { $State as $AppState } from '../../reducers';
import * as actions from '../../actions';

const {
  mapEventUDFQuestionKeysToAnswers,
  udfAnswerKeys,
  udfAnswerKeysToAnswerIds,
  udfQuestionKeys,
} = getBoundEventUDFs();

const validate = (values: any) => {
  const errors = {};

  if (!values.shaveType) {
    errors.shaveType = 'Shave Type is required';
  }

  if (!values.shaveDate) {
    errors.shaveDate = 'Shave Date is required';
  }

  return errors;
};

const makeSubmissionError = err =>
  new SubmissionError({
    _error: err ? `Unable to submit. Error Code: ${err}` : 'Unable to submit',
  });

const onSubmit = (values: any, dispatch: $Dispatch, props: any) =>
  new Promise((resolve, reject) => {
    if (values.fundraisingGoal) {
      if (!/^\d+$/.test(values.fundraisingGoal)) {
        return reject(
          new SubmissionError({
            _error: 'Fundraising goal should only be numbers',
          }),
        );
      }
    }
    const {
      participant: { registrationId, username },
      artez: { eventUDFs },
    } = props;

    const { dob, fundraisingGoal, gender, shaveDate, shaveType } = values;

    const eventUDFQuestionKeysToAnswers = mapEventUDFQuestionKeysToAnswers(
      eventUDFs,
    );

    const shaveTypeValue = findAnswerValueForAnswerId({
      answerId: shaveType,
      eventUDFQuestionKeysToAnswers,
      questionKey: udfQuestionKeys.SHAVE_TYPE_DROPDOWN,
    });

    const genderValue = findAnswerValueForAnswerId({
      answerId: gender,
      eventUDFQuestionKeysToAnswers,
      questionKey: udfQuestionKeys.GENDER_RADIO,
    });

    const newUDFResponses = [
      {
        AnswerID: udfAnswerKeysToAnswerIds[udfAnswerKeys.EVENT_DATE_DDMMYYYY],
        Value: shaveDate,
      },
      {
        AnswerID: shaveType,
        Value: shaveTypeValue,
      },
      ...(gender
        ? [
            {
              AnswerID: gender,
              Value: genderValue,
            },
          ]
        : []),
      ...(dob
        ? [
            {
              AnswerID:
                udfAnswerKeysToAnswerIds[udfAnswerKeys.DATE_OF_BIRTH_TEXT_LINE],
              Value: dob,
            },
          ]
        : []),
    ];

    const sanitizedfundraisingGoal = parseFloat(
      sanitiseFundraisingTarget(fundraisingGoal),
    );

    return regapi
      .getUDFs({ RegistrationID: registrationId })
      .then(existingUDFResponses => {
        const udfResponses = mergeUDFResponses({
          boundEventUDFs: getBoundEventUDFs(),
          existingUDFResponses,
          newUDFResponses,
        });

        return regapi
          .putUDFs({
            RegistrationID: registrationId,
            TeamID: null,
            UdfResponses: udfResponses,
          })
          .then(() =>
            regapi
              .putRegistrations(
                registrationId,
                valueify({
                  Goal: sanitizedfundraisingGoal,
                }),
              )
              .then(() =>
                Promise.all([
                  spyware.updateIntercom({
                    email: username,
                    wgs_event_date:
                      DateTime.fromFormat(shaveDate, 'yyyy-MM-dd', {
                        zone: 'UTC',
                      })
                        .plus(6 * 60 * 60 * 1000)
                        .toMillis() / 1000,
                    ...(dob
                      ? {
                          dob:
                            DateTime.fromFormat(dob, inputDateFormat, {
                              zone: 'UTC',
                            })
                              .plus(6 * 60 * 60 * 1000)
                              .toMillis() / 1000,
                        }
                      : {}),
                    ...(shaveTypeValue ? { wgs_shave: shaveTypeValue } : {}),
                    ...(genderValue ? { gender: genderValue } : {}),
                    wgs_goal: sanitizedfundraisingGoal,
                  }),
                  spyware.updateAutopilot({
                    Email: username,
                    custom: {
                      'date--WGS--Event--Date': DateTime.fromFormat(
                        shaveDate,
                        'yyyy-MM-dd',
                        { zone: 'UTC' },
                      )
                        .plus(6 * 60 * 60 * 1000)
                        .toISO(),
                      ...(dob
                        ? {
                            'date--DOB': DateTime.fromFormat(
                              dob,
                              inputDateFormat,
                              { zone: 'UTC' },
                            )
                              .plus(6 * 60 * 60 * 1000)
                              .toISO(),
                          }
                        : {}),
                      ...(shaveTypeValue
                        ? { 'string--WGS--SHAVE': shaveTypeValue }
                        : {}),
                      ...(genderValue ? { 'string--Gender': genderValue } : {}),
                      'float--WGS--Goal': sanitizedfundraisingGoal,
                    },
                  }),
                ])
                  .then(() =>
                    dispatch(
                      actions.regapiActionCreators.getMobileParticipant(),
                    )
                      .then(() => {
                        dispatch(
                          actions.appActionCreators.setFormKey(
                            formKeys.stageThree,
                          ),
                        );
                        return resolve();
                      })
                      .catch(() => reject(makeSubmissionError('103'))),
                  )
                  .catch(() => reject(makeSubmissionError('102'))),
              ),
          )
          .catch(() => reject(makeSubmissionError('101')));
      })
      .catch(() => reject(makeSubmissionError('100')));
  });

const onSubmitSuccess = (result: any, dispatch: $Dispatch) => {
  dispatch(destroy(formKeys.stageTwo));
  window.scroll({
    top: 0,
    behaviour: 'smooth',
  });
};

const coolChildren = suggestedGoals.map(({ value, label, description }) => (
  <CoolChild {...{ value: String(value), label }}>{description}</CoolChild>
));

const otherChild = (
  <OtherChild label={otherGoal.label}>{otherGoal.description}</OtherChild>
);

const StageTwoForm = ({
  error,
  eventUDFQuestionKeysToAnswers,
  handleSubmit,
  participant,
  submitting,
  submitFailed,
  valid,
}: { disabled: boolean } & FormProps) => (
  <form onSubmit={handleSubmit}>
    <Section>
      <FormHeading>
        {participant.teamName
          ? `${participant.teamName} is all signed up`
          : `You're all signed up ${participant.firstName}`}
      </FormHeading>
      <FormSubheading>
        Please tell us a few more things about yourself.
      </FormSubheading>
    </Section>
    <Section>
      <Row>
        <Column medium={6}>
          <Field
            type="text"
            name="shaveType"
            placeholder="Shaving"
            label="How will you participate…"
            component={Select}
          >
            {mapUDFAnswersToOptions(
              eventUDFQuestionKeysToAnswers[
                udfQuestionKeys.SHAVE_TYPE_DROPDOWN
              ],
            )}
          </Field>
        </Column>
        <Column medium={6}>
          <Field
            type="text"
            name="shaveDate"
            placeholder="Friday 12 March 2021"
            label="When will you be participating…"
            autoComplete="off"
            component={DatePicker}
            dateFormat="dd/MM/yyyy"
            dayPickerProps={{
              initialMonth: new Date(2021, 2, 12),
              selectedDays: new Date(2021, 2, 12),
              modifiers: {
                disabled: {
                  before: new Date(),
                },
              },
            }}
            parse={value => {
              if (value) {
                return DateTime.fromFormat(value, 'dd/MM/yyyy').toFormat(
                  'yyyy-MM-dd',
                );
              }

              return undefined;
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column medium={6}>
          <Field
            type="text"
            name="gender"
            placeholder="Please select..."
            label="Gender"
            component={Select}
          >
            <option value="">Please select...</option>
            {mapUDFAnswersToOptions(
              eventUDFQuestionKeysToAnswers[udfQuestionKeys.GENDER_RADIO],
            )}
          </Field>
        </Column>
        <Column medium={6}>
          <Field
            type="text"
            name="dob"
            label="Date of birth"
            component={DateOfBirth}
            parse={value => {
              if (value) {
                return DateTime.fromFormat(value, inputDateFormat).toFormat(
                  udfDateFormat,
                );
              }

              return undefined;
            }}
          />
        </Column>
      </Row>
      <div>
        <Field
          name="fundraisingGoal"
          component={Cooltip}
          coolChildren={coolChildren}
          otherChild={otherChild}
          normalize={value => (value ? value.replace(/\s/g, '') : '')}
          cooltipLabel="How much are you aiming to individually fundraise..."
        />
      </div>
    </Section>
    <Section>
      {(error || (submitFailed && !valid)) && (
        <ErrorBox error={error || `You've missed a required field.`} />
      )}
      <SubmitButton
        type="submit"
        buttonType="secondary"
        submitting={submitting}
        expanded
      >
        Next
      </SubmitButton>
    </Section>
  </form>
);

const ConnectedForm = reduxForm({
  form: formKeys.stageTwo,
  validate,
  onSubmit,
  onSubmitSuccess,
  initialValues: {
    shaveType:
      udfAnswerKeysToAnswerIds[udfAnswerKeys.SHAVE_TYPE_DROPDOWN_SHAVE],
    shaveDate: defaultShaveDate,
    fundraisingGoal: String(defaultFundraisingTarget),
  },
})(StageTwoForm);

const mapStateToProps = (state: $AppState) => {
  const {
    artez: { eventUDFs },
    artez,
    app: { participant },
  } = state;

  const eventUDFQuestionKeysToAnswers = mapEventUDFQuestionKeysToAnswers(
    eventUDFs,
  );

  return {
    artez,
    participant,
    eventUDFQuestionKeysToAnswers,
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
