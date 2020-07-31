// @flow

import { mergeUDFResponses } from 'udf-mapper';
import { DateTime } from 'luxon';
import first from 'lodash/first';
import type { $Dispatch, $GetState } from '.';
import { regapi, spyware } from '../api';
import {
  createBPayCRN,
  findAnswerValueForAnswerId,
  getBoundEventUDFs,
  getTeamTypeNameFromId,
  guessProvinceCodeFromPostcode,
  sanitiseAddress,
  sanitiseFundraisingTarget,
  stripWhitespace,
  valueify,
} from '../lib';
import {
  artezURL,
  defaultCountryCode,
  defaultFundraisingTarget,
  defaultShaveDate,
  eventId,
  formKeys,
  internationalLocationId,
  languagePreference,
  provinceCodeKeysToLocationIds,
  registrationTypeId,
  teamSearchRegColumns,
  teamTypes,
} from '../constants';
import type { $State as $AppState } from '../reducers';
import * as actions from '.';

const {
  mapEventUDFQuestionKeysToAnswers,
  udfAnswerKeys,
  udfAnswerKeysToAnswerIds,
  udfQuestionKeys,
} = getBoundEventUDFs();

const makeVanityURLSlug = (value: string) =>
  value.toLowerCase().replace(/[\W_]+/g, '');

// eslint-disable-next-line no-unused-vars
const sanitiseConstituent = (constituent: any) => ({
  ...constituent,
  PhoneNumber: stripWhitespace(constituent.PhoneNumber),
});

const sanitiseProvinceCode = (postcode: string) =>
  guessProvinceCodeFromPostcode(
    postcode === undefined ? '' : postcode.toString(),
  );

const artezifyConstituent = (values: any, international: boolean) => {
  const {
    addressLine,
    email,
    firstName,
    lastName,
    phone,
    postcode,
    suburb,
  } = values;

  const provinceCode = sanitiseProvinceCode(postcode);

  return {
    Address: {
      City: suburb || 'n/a',
      ...(provinceCode === 'Outside Australia'
        ? {
            ProvinceFreeText: international ? provinceCode : postcode,
            CountryCode: 'AQ', // Antarctica
          }
        : {
            ProvinceCode: provinceCode,
            CountryCode: defaultCountryCode,
          }),
      PostalCode: postcode === undefined ? 'n/a' : postcode,
      ...sanitiseAddress(addressLine || 'n/a'),
    },
    AllowContactViaEmail: true,
    AllowContactViaPost: true,
    EmailAddress: email.trim(),
    FirstName: firstName.trim(),
    LanguagePreference: languagePreference,
    LastName: lastName.trim(),
    ...(international ? {} : { PhoneNumber: stripWhitespace(phone) }),
  };
};

const artezifyRegistrant = (
  values: any,
  { locationId, transactionId, constituentId, vanityURL, UDFResponses, teamId },
) => {
  const { email, password } = values;

  return {
    ConstituentID: constituentId,
    LocationID: locationId,
    Password: password,
    RegistrationTypeID: registrationTypeId,
    ScoreboardConsent: process.env.NODE_ENV === 'production',
    SearchConsent: process.env.NODE_ENV === 'production',
    TeamID: teamId,
    TransactionID: transactionId,
    UdfResponses: UDFResponses,
    Username: email.trim(),
    VanityURL: vanityURL,
  };
};

const artezifyUDFResponses = (values: any, eventUDFs: any) => {
  const { organisationName, overEighteen, occupation } = values;

  const eventUDFQuestionKeysToAnswers = mapEventUDFQuestionKeysToAnswers(
    eventUDFs,
  );

  return [
    {
      AnswerID: overEighteen
        ? udfAnswerKeysToAnswerIds[udfAnswerKeys.OVER_18_DROPDOWN_18_OLDER]
        : udfAnswerKeysToAnswerIds[udfAnswerKeys.OVER_18_DROPDOWN_17_YOUNGER],
      Value: true,
    },
    {
      AnswerID: udfAnswerKeysToAnswerIds[udfAnswerKeys.EVENT_DATE_DDMMYYYY],
      Value: defaultShaveDate,
    },
    ...[udfAnswerKeysToAnswerIds[udfAnswerKeys.WAIVER_CONSENT_CHECKBOX]].map(
      AnswerID => ({ AnswerID, Value: true }),
    ),
    ...(organisationName !== undefined && typeof organisationName === 'string'
      ? [
          {
            AnswerID:
              udfAnswerKeysToAnswerIds[udfAnswerKeys.ORGANISATION_NAME_TEXT],
            Value: organisationName,
          },
        ]
      : []),
    ...(occupation !== undefined && typeof occupation === 'string'
      ? [
          {
            AnswerID:
              udfAnswerKeysToAnswerIds[udfAnswerKeys.OCCUPATION_TEXT_LINE],
            Value: occupation,
          },
        ]
      : []),
    {
      AnswerID:
        udfAnswerKeysToAnswerIds[udfAnswerKeys.SHAVE_TYPE_DROPDOWN_SHAVE],
      Value: findAnswerValueForAnswerId({
        answerId:
          udfAnswerKeysToAnswerIds[udfAnswerKeys.SHAVE_TYPE_DROPDOWN_SHAVE],
        eventUDFQuestionKeysToAnswers,
        questionKey: udfQuestionKeys.SHAVE_TYPE_DROPDOWN,
      }),
    },
  ].map(({ AnswerID, ...rest }) => ({
    AnswerID: parseInt(AnswerID, 10),
    ...rest,
  }));
};

const artezifyTeam = (
  values: any,
  {
    transactionId,
    locationId,
    registrationId,
    vanityURL,
  }: {
    locationId: number | string,
    transactionId: number | string,
    registrationId: number | string,
    vanityURL: string,
  },
) => {
  const { teamType, teamName } = values;

  return {
    Description: teamName,
    LocationID: locationId,
    Name: teamName,
    SearchConsent: process.env.NODE_ENV === 'production',
    TeamCaptainRegistrationID: registrationId,
    TeamTypeID: parseInt(teamType, 10),
    TransactionID: transactionId,
    WaiveFee: true,
    VanityURL: vanityURL,
  };
};

// The schema that GET constituents returns (and that PUT constituents expects)
// is slightly different to that which artezifyConstituents (which is
// for POST constituents)
// eslint-disable-next-line no-unused-vars
const artezifyExistingConstituent = (values: any, international: boolean) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    suburb,
    postcode,
    addressLine,
  } = values;

  const provinceCode = sanitiseProvinceCode(postcode);

  return {
    AllowContactViaEmail: true,
    AllowContactViaPost: true,
    City: suburb || 'n/a',
    ...(provinceCode === 'Outside Australia'
      ? {
          ProvinceFreeText: international ? provinceCode : postcode,
          CountryCode: 'AQ', // Antarctica
        }
      : {
          ProvinceCode: provinceCode,
          CountryCode: defaultCountryCode,
        }),
    PostalCode: postcode === undefined ? 'n/a' : stripWhitespace(postcode),
    ...sanitiseAddress(addressLine || 'n/a'),
    EmailAddress: email.trim(),
    FirstName: firstName.trim(),
    LanguagePreference: languagePreference,
    LastName: lastName.trim(),
    ...(international ? {} : { PhoneNumber: stripWhitespace(phone) }),
  };
};

const createConstituent = (values: any, state: $AppState) => {
  const { firstName, lastName } = values;

  const {
    app: { existingConstituent, internationalRegistrant = false },
  } = state;

  return regapi
    .recursivelyGetVanityURL(makeVanityURLSlug(`${firstName}${lastName}`))
    .then(vanityURL =>
      existingConstituent
        ? regapi
            .putConstituents(
              existingConstituent,
              artezifyExistingConstituent(values, internationalRegistrant),
            )
            .then(() => ({
              constituentId: existingConstituent,
              vanityURL,
            }))
        : regapi
            .postConstituents(
              artezifyConstituent(values, internationalRegistrant),
            )
            .then(constituents => ({
              constituentId: constituents.ConstituentID,
              vanityURL,
            })),
    )
    .then(({ constituentId, vanityURL }) =>
      regapi
        .postTransactions({
          ConstituentID: constituentId,
        })
        .then(({ TransactionID: transactionId }) => ({
          transactionId,
          constituentId,
          vanityURL,
        })),
    );
};

const createRegistrant = (
  values: any,
  state: $AppState,
  {
    constituentId,
    transactionId,
    vanityURL,
    locationId,
    existingUDFResponses,
  }: {
    constituentId: number | string,
    transactionId: number | string,
    vanityURL: string,
    locationId: number | string,
    existingUDFResponses: any,
  },
) => {
  const {
    app: { joiningTeam },
  } = state;

  const teamId = joiningTeam ? joiningTeam[teamSearchRegColumns.teamId] : null;

  return regapi
    .postRegistrations(
      artezifyRegistrant(values, {
        constituentId,
        transactionId,
        vanityURL,
        UDFResponses: existingUDFResponses,
        teamId,
        locationId,
      }),
    )
    .then(({ RegistrationID: registrationId }) =>
      regapi
        .putRegistrations(
          registrationId,
          valueify({
            Goal: defaultFundraisingTarget,
          }),
        )
        .then(() =>
          regapi.putUDFs({
            RegistrationID: registrationId,
            TeamID: null,
            UdfResponses: mergeUDFResponses({
              boundEventUDFs: getBoundEventUDFs(),
              existingUDFResponses,
              newUDFResponses: [
                {
                  AnswerID:
                    udfAnswerKeysToAnswerIds[udfAnswerKeys.BPAY_CRN_TEXT_LINE],
                  Value: createBPayCRN(registrationId),
                },
              ],
            }),
          }),
        )
        .then(() => ({ registrationId })),
    );
};

const createTeam = (
  values: any,
  state: $AppState,
  {
    registrationId,
    transactionId,
    locationId,
  }: {
    registrationId: number | string,
    transactionId: number | string,
    locationId: number | string,
  },
) => {
  const {
    app: { creatingTeam },
  } = state;

  if (!creatingTeam) {
    return Promise.resolve();
  }

  const { teamName, teamFundraisingGoal } = values;

  return regapi
    .recursivelyGetVanityURL(makeVanityURLSlug(teamName))
    .then(vanityURL =>
      regapi.postTeams(
        artezifyTeam(values, {
          registrationId,
          transactionId,
          locationId,
          vanityURL,
        }),
      ),
    )
    .then(({ TeamID }) =>
      regapi
        .putTeams(
          TeamID,
          valueify({ Goal: sanitiseFundraisingTarget(teamFundraisingGoal) }),
        )
        .then(() => ({ teamId: TeamID })),
    );
};

const handleSpyware = (
  values: any,
  eventUDFs: any,
  dispatch: $Dispatch,
  state: $AppState,
  {
    registrationId,
    constituentId,
    locationId,
    teamId,
  }: {
    registrationId: number | string,
    constituentId: number | string,
    locationId: number | string,
    teamId: ?(number | string),
  },
) => {
  const {
    app: {
      creatingTeam,
      existingConstituent,
      internationalRegistrant,
      joiningTeam,
    },
    kleber: { addressRecordId },
  } = state;

  const eventUDFQuestionKeysToAnswers = mapEventUDFQuestionKeysToAnswers(
    eventUDFs,
  );

  const {
    firstName,
    lastName,
    email,
    phone,
    suburb,
    postcode,
    addressLine,
    overEighteen,
    teamType,
    teamName,
  } = values;

  return Promise.all([
    ...(addressRecordId !== null
      ? [dispatch(actions.kleberActionCreators.makeThrowawayKleberRequest())]
      : []),
    spyware.makeFloodlightRequestOnDidFinishRegistrationEvent(),
    spyware.updateIntercom({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      user_id: constituentId,
      location_data: {
        type: 'location_data',
        city_name: suburb,
        postal_code: postcode,
        ...(internationalRegistrant
          ? { region_name: sanitiseProvinceCode(postcode) }
          : {}),
      },
      first_name: firstName,
      last_name: lastName,
      mailing_street: addressLine,
      mailing_city: suburb,
      mailing_postal_code: postcode,
      mailing_state: sanitiseProvinceCode(postcode),
      wgs_username: email,
      wgs_registrant_state: internationalRegistrant
        ? 'Outside Australia'
        : first(
            Object.keys(provinceCodeKeysToLocationIds).filter(
              key => provinceCodeKeysToLocationIds[key] === locationId,
            ),
          ),
      wgs_team_type: joiningTeam
        ? joiningTeam[teamSearchRegColumns.teamTypeId]
        : teamType,
      wgs_type: (() => {
        if (creatingTeam) {
          return 'Team Captain';
        }
        if (joiningTeam) {
          return 'Team Member';
        }

        return 'Individual';
      })(),
      wgs_age_group: !overEighteen ? 'Under 18' : '18 or older',
      wgs_total_raised: 0,
      wgs_goal: defaultFundraisingTarget,
      wgs_created_on: new Date().toISOString(),
      wgs_event_date: DateTime.fromFormat(defaultShaveDate, 'yyyy-MM-dd', {
        zone: 'UTC',
      }),
      wgs_is_returning_registrant: existingConstituent !== null,
      wgs_registration_id: registrationId,
      wgs_bpay_crn: createBPayCRN(registrationId),
      wgs_event_id: eventId,
      wgs_is_international_signup: internationalRegistrant,
      ...(joiningTeam
        ? {
            wgs_team_name: joiningTeam[teamSearchRegColumns.teamName],
            wgs_team_captain_name: `${
              joiningTeam[teamSearchRegColumns.firstName]
            } ${joiningTeam[teamSearchRegColumns.lastName]}`,
            wgs_team_profile: `${artezURL}/registrant/TeamFundraisingPage.aspx?TeamID=${
              joiningTeam[teamSearchRegColumns.teamId]
            }`,
          }
        : {}),
      ...(creatingTeam
        ? {
            wgs_team_name: teamName,
            wgs_team_captain_name: `${firstName} ${lastName}`,
            wgs_team_profile: teamId
              ? `${artezURL}/registrant/TeamFundraisingPage.aspx?TeamID=${teamId}`
              : '',
          }
        : {}),
    }),
    spyware.updateAutopilot({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      MobilePhone: phone,
      MailingStreet: addressLine,
      MailingCity: suburb,
      MailingPostalCode: postcode,
      MailingState: sanitiseProvinceCode(postcode),
      unsubscribed: false,
      custom: {
        'string--WGS--Username': email,
        'string--Constituent--ID': constituentId,
        'string--WGS--Artez--Confirmation--No': registrationId,
        'string--WGS--BPAY': createBPayCRN(registrationId),
        'string--WGS--Profile': `${artezURL}/registrant/FundraisingPage.aspx?RegistrationID=${registrationId}`,
        'string--WGS-Campaign': 'WGS 2021',
        'boolean--WGS--Self--Sponsored': false,
        'boolean--WGS--Goal--Reached': false,
        'string--WGS--Registrant--State': internationalRegistrant
          ? 'Outside Australia'
          : first(
              Object.keys(provinceCodeKeysToLocationIds).filter(
                key => provinceCodeKeysToLocationIds[key] === locationId,
              ),
            ),
        'string--WGS--Category': (() => {
          const category = Object.values(teamTypes).find(
            (value: any) => value.id === parseInt(teamType, 10),
          );

          return (category && category.title) || 'undefined';
        })(),
        'string--WGS--Type': (() => {
          if (creatingTeam) {
            return 'Team Captain';
          }
          if (joiningTeam) {
            return 'Team Member';
          }

          return 'Individual';
        })(),
        'string--WGS--Age--Group': !overEighteen ? 'Under 18' : '18 or older',
        'float--WGS--Total--Raised': 0,
        'float--WGS--Goal': defaultFundraisingTarget,
        'boolean--WGS--Host': false,
        'date--WGS--Created--On': DateTime.utc()
          .plus(6 * 60 * 60 * 1000)
          .toISO(),
        'date--WGS--Event--Date': DateTime.fromFormat(
          defaultShaveDate,
          'yyyy-MM-dd',
          { zone: 'UTC' },
        )
          .plus(6 * 60 * 60 * 1000)
          .toISO(),
        'string--WGS--SHAVE': findAnswerValueForAnswerId({
          answerId:
            udfAnswerKeysToAnswerIds[udfAnswerKeys.SHAVE_TYPE_DROPDOWN_SHAVE],
          eventUDFQuestionKeysToAnswers,
          questionKey: udfQuestionKeys.SHAVE_TYPE_DROPDOWN,
        }),
        'string--WGS--Receipt--Book--Status': 'undefined',
        ...(joiningTeam
          ? {
              'string--WGS--Team--Name':
                joiningTeam[teamSearchRegColumns.teamName],
              'string--WGS--Team--Profile': `${artezURL}/registrant/TeamFundraisingPage.aspx?TeamID=${
                joiningTeam[teamSearchRegColumns.teamId]
              }`,
              'string--WGS--Category': getTeamTypeNameFromId(
                joiningTeam[teamSearchRegColumns.teamTypeId],
              ),
            }
          : {}),
        ...(creatingTeam
          ? {
              'string--WGS--Team--Name': teamName,
              'string--WGS--Team--Profile': teamId
                ? `${artezURL}/registrant/TeamFundraisingPage.aspx?TeamID=${teamId}`
                : '',
              'string--WGS--Category': getTeamTypeNameFromId(teamType),
            }
          : {}),
        ...(!joiningTeam && !creatingTeam
          ? {
              'string--WGS--Team--Name': 'undefined',
              'string--WGS--Category': 'undefined',
              'string--WGS--Team--Profile': 'undefined',
            }
          : {}),
      },
    }),
  ]).catch(() => Promise.resolve());
};

export function submit() {
  return (dispatch: $Dispatch, getState: $GetState) =>
    new Promise((resolve, reject) => {
      const state = getState();

      const {
        form,
        app: { creatingTeam, returningConstituent, internationalRegistrant },
      } = state;

      const { values } = returningConstituent
        ? form[formKeys.constituentRegistration]
        : form[formKeys.registration];

      const { postcode } = values;

      const provinceCode = sanitiseProvinceCode(postcode);

      const locationId = internationalRegistrant
        ? internationalLocationId
        : provinceCodeKeysToLocationIds[provinceCode];

      return dispatch(actions.regapiActionCreators.getEventUDFs())
        .then(({ eventUDFs }) => {
          const existingUDFResponses = artezifyUDFResponses(values, eventUDFs);

          return createConstituent(values, state).then(
            ({ transactionId, constituentId, vanityURL }) =>
              createRegistrant(values, state, {
                constituentId,
                locationId,
                transactionId,
                vanityURL,
                existingUDFResponses,
              }).then(({ registrationId }) =>
                createTeam(values, state, {
                  registrationId,
                  transactionId,
                  locationId,
                }).then(team =>
                  regapi.putTransactions(transactionId).then(() => {
                    const { firstName, lastName, email, password } = values;

                    dispatch(
                      actions.appActionCreators.saveParticipant({
                        username: email,
                        registrationId,
                        firstName,
                        lastName,
                        password,
                        ...(creatingTeam ? { teamName: values.teamName } : {}),
                      }),
                    );

                    return handleSpyware(values, eventUDFs, dispatch, state, {
                      registrationId,
                      constituentId,
                      locationId,
                      ...(team ? { teamId: team.teamId } : {}),
                    }).then(() => resolve());
                  }),
                ),
              ),
          );
        })
        .catch(error => reject(error));
    });
}
