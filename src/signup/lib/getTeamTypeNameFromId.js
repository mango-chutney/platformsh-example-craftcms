import { teamTypes } from '../constants';

const getTeamTypeNameFromId = id => {
  const teamType = Object.keys(teamTypes).find(
    type => teamTypes[type].id.toString() === id.toString(),
  );

  return teamType ? teamTypes[teamType].title : undefined;
};

export default getTeamTypeNameFromId;
