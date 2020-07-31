// @flow
//
// See here for an example of how to type actions
// https://github.com/fbsamples/f8app/blob/master/js/actions/types.js

/* eslint-disable no-use-before-define */

import { formKeys } from '../constants';

export const UPDATE_ADDRESS_RECORD_ID = 'UPDATE_ADDRESS_RECORD_ID';

export type $UpdateAddressRecordIdWithRecordId = {
  type: typeof UPDATE_ADDRESS_RECORD_ID,
  value: ?string,
};

export const REQUEST_ADDRESS_DATA = 'REQUEST_ADDRESS_DATA';

export type $RequestAddressData = {
  type: typeof REQUEST_ADDRESS_DATA,
};

export const RECEIVE_ADDRESS_DATA = 'RECEIVE_ADDRESS_DATA';

export type $ReceiveAddressData = {
  type: typeof RECEIVE_ADDRESS_DATA,
  addresses: any,
};

export const REJECT_ADDRESS_DATA = 'REJECT_ADDRESS_DATA';

export type $RejectAddressData = {
  type: typeof REJECT_ADDRESS_DATA,
  reason: string,
};

export const MAKE_THROWAWAY_KLEBER_REQUEST = 'MAKE_THROWAWAY_KLEBER_REQUEST';

export type $MakeThrowawayKleberRequest = {
  type: typeof MAKE_THROWAWAY_KLEBER_REQUEST,
};

export const REQUEST_GET_TEAMS = 'REQUEST_GET_TEAMS';

export type $RequestGetTeams = {
  type: typeof REQUEST_GET_TEAMS,
};

export const RECEIVE_GET_TEAMS = 'RECEIVE_GET_TEAMS';

export type $ReceiveGetTeams = {
  type: typeof RECEIVE_GET_TEAMS,
  teams: any,
};

export const REJECT_GET_TEAMS = 'REJECT_GET_TEAMS';

export type $RejectGetTeams = {
  type: typeof REJECT_GET_TEAMS,
  reason: string,
};

export const REQUEST_GET_LOCATIONS = 'REQUEST_GET_LOCATIONS';

export type $RequestGetLocations = {
  type: typeof REQUEST_GET_LOCATIONS,
};

export const RECEIVE_GET_LOCATIONS = 'RECEIVE_GET_LOCATIONS';

export type $ReceiveGetLocations = {
  type: typeof RECEIVE_GET_LOCATIONS,
  locations: any,
};

export const REJECT_GET_LOCATIONS = 'REJECT_GET_LOCATIONS';

export type $RejectGetLocations = {
  type: typeof REJECT_GET_LOCATIONS,
  reason: string,
};

export const REQUEST_GET_EVENT_UDFS = 'REQUEST_GET_EVENT_UDFS';

export type $RequestGetEventUDFs = {
  type: typeof REQUEST_GET_EVENT_UDFS,
};

export const RECEIVE_GET_EVENT_UDFS = 'RECEIVE_GET_EVENT_UDFS';

export type $ReceiveGetEventUDFs = {
  type: typeof RECEIVE_GET_EVENT_UDFS,
  eventUDFs: any,
};

export const REJECT_GET_EVENT_UDFS = 'REJECT_GET_EVENT_UDFS';

export type $RejectGetEventUDFs = {
  type: typeof REJECT_GET_EVENT_UDFS,
  reason: string,
};

export const REQUEST_GET_TEAM_TYPES = 'REQUEST_GET_TEAM_TYPES';

export type $RequestGetTeamTypes = {
  type: typeof REQUEST_GET_TEAM_TYPES,
};

export const RECEIVE_GET_TEAM_TYPES = 'RECEIVE_GET_TEAM_TYPES';

export type $ReceiveGetTeamTypes = {
  type: typeof RECEIVE_GET_TEAM_TYPES,
  teamTypes: any,
};

export const REJECT_GET_TEAM_TYPES = 'REJECT_GET_TEAM_TYPES';

export type $RejectGetTeamTypes = {
  type: typeof REJECT_GET_TEAM_TYPES,
  reason: string,
};

export const REQUEST_GET_CONSTITUENTS = 'REQUEST_GET_CONSTITUENTS';

export type $RequestGetConstituents = {
  type: typeof REQUEST_GET_CONSTITUENTS,
};

export const RECEIVE_GET_CONSTITUENTS = 'RECEIVE_GET_CONSTITUENTS';

export type $ReceiveGetConstituents = {
  type: typeof RECEIVE_GET_CONSTITUENTS,
  constituents: any,
};

export const REJECT_GET_CONSTITUENTS = 'REJECT_GET_CONSTITUENTS';

export type $RejectGetConstituents = {
  type: typeof REJECT_GET_TEAM_TYPES,
  reason: string,
};

export const REQUEST_GET_LOGINS = 'REQUEST_GET_LOGINS';

export type $RequestGetLogins = {
  type: typeof REQUEST_GET_LOGINS,
};

export const RECEIVE_GET_LOGINS = 'RECEIVE_GET_LOGINS';

export type $ReceiveGetLogins = {
  type: typeof RECEIVE_GET_LOGINS,
  logins: any,
};

export const REJECT_GET_LOGINS = 'REJECT_GET_LOGINS';

export type $RejectGetLogins = {
  type: typeof REJECT_GET_LOGINS,
  reason: string,
};

export const REQUEST_GET_REGISTRATION_TYPES = 'REQUEST_GET_REGISTRATION_TYPES';

export type $RequestGetRegistrationTypes = {
  type: typeof REQUEST_GET_REGISTRATION_TYPES,
};

export const RECEIVE_GET_REGISTRATION_TYPES = 'RECEIVE_GET_REGISTRATION_TYPES';

export type $ReceiveGetRegistrationTypes = {
  type: typeof RECEIVE_GET_REGISTRATION_TYPES,
  registrationTypes: any,
};

export const REJECT_GET_REGISTRATION_TYPES = 'REJECT_GET_REGISTRATION_TYPES';

export type $RejectGetRegistrationTypes = {
  type: typeof REJECT_GET_REGISTRATION_TYPES,
  reason: string,
};

export const REQUEST_GET_MOBILE_PARTICIPANT = 'REQUEST_GET_MOBILE_PARTICIPANT';

export type $RequestGetMobileParticipant = {
  type: typeof REQUEST_GET_MOBILE_PARTICIPANT,
};

export const RECEIVE_GET_MOBILE_PARTICIPANT = 'RECEIVE_GET_MOBILE_PARTICIPANT';

export type $ReceiveGetMobileParticipant = {
  type: typeof RECEIVE_GET_MOBILE_PARTICIPANT,
  mobileParticipant: any,
};

export const REJECT_GET_MOBILE_PARTICIPANT = 'REJECT_GET_MOBILE_PARTICIPANT';

export type $RejectGetMobileParticipant = {
  type: typeof REJECT_GET_MOBILE_PARTICIPANT,
  reason: string,
};

export const REQUEST_UPLOAD_IMAGE_ITEM = 'REQUEST_UPLOAD_IMAGE_ITEM';

export type $RequestUploadImageItem = {
  type: typeof REQUEST_UPLOAD_IMAGE_ITEM,
};

export const RECEIVE_UPLOAD_IMAGE_ITEM = 'RECEIVE_UPLOAD_IMAGE_ITEM';

export type $ReceiveUploadImageItem = {
  type: typeof RECEIVE_UPLOAD_IMAGE_ITEM,
};

export const REJECT_UPLOAD_IMAGE_ITEM = 'REJECT_UPLOAD_IMAGE_ITEM';

export type $RejectUploadImageItem = {
  type: typeof REJECT_UPLOAD_IMAGE_ITEM,
  reason: string,
};

export const REQUEST_SET_IMAGE_ITEM = 'REQUEST_SET_IMAGE_ITEM';

export type $RequestSetImageItem = {
  type: typeof REQUEST_SET_IMAGE_ITEM,
};

export const RECEIVE_SET_IMAGE_ITEM = 'RECEIVE_SET_IMAGE_ITEM';

export type $ReceiveSetImageItem = {
  type: typeof RECEIVE_SET_IMAGE_ITEM,
};

export const REJECT_SET_IMAGE_ITEM = 'REJECT_SET_IMAGE_ITEM';

export type $RejectSetImageItem = {
  type: typeof REJECT_SET_IMAGE_ITEM,
  reason: string,
};

export const IS_EXISTING_CONSTITUENT = 'IS_EXISTING_CONSTITUENT';

export type $IsExistingConstituent = {
  type: typeof IS_EXISTING_CONSTITUENT,
  constituentId: ?(number | string),
};

export const IS_EXISTING_REGISTRANT = 'IS_EXISTING_REGISTRANT';

export type $IsExistingRegistrant = {
  type: typeof IS_EXISTING_REGISTRANT,
  existingRegistrant: boolean,
};

export const IS_RETURNING_CONSTITUENT = 'IS_RETURNING_CONSTITUENT';

export type $IsReturningConstituent = {
  type: typeof IS_RETURNING_CONSTITUENT,
  returningConstituent: boolean,
};

export const IS_JOINING_TEAM = 'IS_JOINING_TEAM';

export type $IsJoiningTeam = {
  type: typeof IS_JOINING_TEAM,
  joiningTeam: any,
};

export const SAVE_PARTICIPANT = 'SAVE_PARTICIPANT';

export type $SaveParticipant = {
  type: typeof SAVE_PARTICIPANT,
  participant: any,
};

export const SET_FORM_KEY = 'SET_FORM_KEY';

export type $SetFormKey = {
  type: typeof SET_FORM_KEY,
  formKey: typeof formKeys,
};

export const IS_INTERNATIONAL_REGISTRANT = 'IS_INTERNATIONAL_REGISTRANT';

export type $IsInternationalRegistrant = {
  type: typeof IS_INTERNATIONAL_REGISTRANT,
  internationalRegistrant: boolean,
};

export const IS_CREATING_TEAM = 'IS_CREATING_TEAM';

export type $IsCreatingTeam = {
  type: typeof IS_CREATING_TEAM,
  creatingTeam: any,
};

export const IS_CREATING_SCHOOL_TEAM = 'IS_CREATING_SCHOOL_TEAM';

export type $IsCreatingSchoolTeam = {
  type: typeof IS_CREATING_SCHOOL_TEAM,
  creatingSchoolTeam: boolean,
};

export const IS_VALID_ADDRESS = 'IS_VALID_ADDRESS';

export type $IsValidAddress = {
  type: typeof IS_VALID_ADDRESS,
  validAddress: ?boolean,
};

export const MAKE_GOOGLE_ANALYTICS_REQUEST = 'MAKE_GOOGLE_ANALYTICS_REQUEST';

export type $MakeGoogleAnalyticsRequest = {
  type: typeof MAKE_GOOGLE_ANALYTICS_REQUEST,
};

export const SET_STAGE_ONE_FORM_INDEX = 'SET_STAGE_ONE_FORM_INDEX';

export type $SetStageOneFormIndex = {
  type: typeof SET_STAGE_ONE_FORM_INDEX,
  stageOneFormIndex: number,
};

export const SET_EXISTING_ACCOUNT_MODAL_OPEN =
  'SET_EXISTING_ACCOUNT_MODAL_OPEN';

export type $SetExistingAccountModalOpen = {
  type: typeof SET_EXISTING_ACCOUNT_MODAL_OPEN,
  existingAccountModalIsOpen: boolean,
};

export type $Action =
  | $UpdateAddressRecordIdWithRecordId
  | $RequestAddressData
  | $ReceiveAddressData
  | $RejectAddressData
  | $MakeThrowawayKleberRequest
  | $RequestGetTeams
  | $ReceiveGetTeams
  | $RejectGetTeams
  | $RequestGetLocations
  | $ReceiveGetLocations
  | $RejectGetLocations
  | $RequestGetEventUDFs
  | $ReceiveGetEventUDFs
  | $RejectGetEventUDFs
  | $RequestGetTeamTypes
  | $ReceiveGetTeamTypes
  | $RejectGetTeamTypes
  | $RequestGetConstituents
  | $ReceiveGetConstituents
  | $RejectGetConstituents
  | $RequestGetLogins
  | $ReceiveGetLogins
  | $RejectGetLogins
  | $RequestGetRegistrationTypes
  | $ReceiveGetRegistrationTypes
  | $RejectGetRegistrationTypes
  | $RequestGetMobileParticipant
  | $ReceiveGetMobileParticipant
  | $RejectGetMobileParticipant
  | $RequestUploadImageItem
  | $ReceiveUploadImageItem
  | $RejectUploadImageItem
  | $RequestSetImageItem
  | $ReceiveSetImageItem
  | $RejectSetImageItem
  | $IsExistingRegistrant
  | $IsReturningConstituent
  | $IsJoiningTeam
  | $SaveParticipant
  | $SetFormKey
  | $IsInternationalRegistrant
  | $IsValidAddress
  | $MakeGoogleAnalyticsRequest
  | $SetStageOneFormIndex
  | $SetExistingAccountModalOpen;

export type $Dispatch = (
  action: $Action | $ThunkAction | $PromiseAction | Array<$Action>,
) => any;

export type $GetState = () => Object;

export type $ThunkAction = (dispatch: $Dispatch, getState: $GetState) => any;

export type $PromiseAction = Promise<$Action>;

/* eslint-enable no-use-before-define */
