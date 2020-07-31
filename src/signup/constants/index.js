export const kleberApiUrl =
  'https://kleber.datatoolscloud.net.au/KleberWebService/DtKleberService.svc';

export const departmentCode = 'WGS';

export const baseURL =
  window.location.port === ''
    ? `${window.location.protocol}//${window.location.hostname}`
    : `${window.location.protocol}//${window.location.hostname}` +
      `:${window.location.port}`;

export const formKeys = {
  stageOne: 'stage-one',
  stageTwo: 'stage-two',
  stageThree: 'stage-three',
  constituentLogin: 'constituent-login',
  constituentRegistration: 'constituent-registration',
  registration: 'registration',
  teamSearch: 'team-search',
};

export const eventId = 15972;

export const languagePreference = 'en-CA';

export const registrationTypeId = 5602;

export const provinceCodeKeysToLocationIds = {
  ACT: 15973,
  NSW: 15974,
  VIC: 15975,
  TAS: 15976,
  SA: 15977,
  NT: 15978,
  WA: 15979,
  QLD: 15980,
};

export const internationalLocationId = 15981;

export const artezURL = 'https://secure.leukaemiafoundation.org.au';

export const defaultShaveDate = '2021-03-12';

export const defaultFundraisingTarget = 560;

export const defaultTeamFundraisingTarget = 5000;

export const defaultCountryCode = 'AU';

export const defaultLocationId = provinceCodeKeysToLocationIds.ACT;

export const teamSearchRegColumns = {
  teamName: 0,
  captainName: 1,
  teamId: 2,
  teamTypeId: 3,
  corporateTeamId: 4,
  firstName: 5,
  lastName: 6,
  memberCount: 7,
  maximumMembers: 8,
  maximumReached: 9,
};

export const suggestedGoals = [
  {
    value: 350,
    label: '$350',
    description:
      'can provide emergency financial support to cover expenses like groceries, fuel and electricity bills for families facing hardship through treatment.',
  },
  {
    value: 560,
    label: '$560',
    description:
      'covers one week of patient accommodation for a family who must relocate for treatment that can last months – and sometimes even years.',
  },
  {
    value: 1000,
    label: '$1000',
    description:
      'truly furthers the search for a cure by supporting the work of a brilliant PhD scholarship recipient for a whole week.',
  },
];

export const otherGoal = {
  value: undefined,
  label: 'Other',
  description:
    'All funds raised support families impacted by blood cancer and fund vital blood cancer research',
};

export const teamSuggestedGoals = [
  {
    value: 3000,
    label: '$3000',
    description:
      'keeps a patient transport vehicle and specially trained volunteer driver on the road for a month –  getting patients safely to and from treatment.',
  },
  {
    value: 5000,
    label: '$5000',
    description:
      'truly furthers the search for a cure by supporting the work of a brilliant scientist for one month.',
  },
  {
    value: 15000,
    label: '$15,000',
    description:
      ' covers six months of patient accommodation for a regional or rural family going through a long battle with blood cancer. ',
  },
];

export const inputDateFormat = 'dd/mm/yyyy';

export const udfDateFormat = 'yyyy-mm-dd';

export const teamTypes = {
  friends: { id: 5574, title: 'Friends & Family' },
  work: { id: 5575, title: 'Workplace' },
  school: { id: 5576, title: 'School' },
};

export const organizationId = '9';

export const stageOneFormKeys = {
  registration: 0,
  constituent: 1,
};
