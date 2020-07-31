// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as $Dispatch } from 'redux';
import pickBy from 'lodash/pickBy';
import isFunction from 'lodash/isFunction';
import RegistrationForm from './RegistrationForm';
import ConstituentForm from './ConstituentForm';
import {
  FormHeading,
  FormSubheading,
  Pill,
  PillBox,
  Section,
} from '../../components';
import { stageOneFormKeys, teamSearchRegColumns } from '../../constants';
import * as actions from '../../actions';
import type { $State as $AppState } from '../../reducers';
import type { $Action } from '../../actions';

type $Props = {
  creatingSchoolTeam: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'creatingSchoolTeam',
  >,
  creatingTeam: $PropertyType<$PropertyType<$AppState, 'app'>, 'creatingTeam'>,
  joiningTeam: $PropertyType<$PropertyType<$AppState, 'app'>, 'joiningTeam'>,
  participant: $PropertyType<$PropertyType<$AppState, 'app'>, 'participant'>,
  returningConstituent: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'returningConstituent',
  >,
  stageOneFormIndex: $PropertyType<
    $PropertyType<$AppState, 'app'>,
    'stageOneFormIndex',
  >,
  setStageOneFormIndex: number => $Action,
};

const StageOneForm = (props: $Props) => {
  const {
    creatingSchoolTeam,
    creatingTeam,
    joiningTeam,
    participant,
    returningConstituent,
    stageOneFormIndex,
    setStageOneFormIndex,
  } = props;

  const title = (() => {
    if (joiningTeam) {
      return `Join ${joiningTeam[teamSearchRegColumns.teamName]}`;
    }
    if (returningConstituent) {
      return `Welcome back ${(participant && participant.firstName) ||
        ''}`.trim();
    }
    if (creatingSchoolTeam) {
      return 'Start a school team';
    }
    if (creatingTeam) {
      return 'Start a team';
    }
    return 'Register';
  })();

  return (
    <>
      <Section>
        <FormHeading>{title}</FormHeading>
        <FormSubheading>
          {returningConstituent
            ? 'Please confirm all your details below…'
            : 'for World’s Greatest Shave 2021'}
        </FormSubheading>
        {!returningConstituent && (
          <>
            <div>
              <PillBox>
                <Pill
                  type="button"
                  onClick={() =>
                    setStageOneFormIndex(stageOneFormKeys.registration)
                  }
                  active={stageOneFormIndex === stageOneFormKeys.registration}
                >
                  Create a new account
                </Pill>
                <Pill
                  type="button"
                  onClick={() =>
                    setStageOneFormIndex(stageOneFormKeys.constituent)
                  }
                  active={stageOneFormIndex === stageOneFormKeys.constituent}
                >
                  I already have an account
                </Pill>
              </PillBox>
            </div>
          </>
        )}
      </Section>
      {stageOneFormIndex === stageOneFormKeys.registration && (
        <RegistrationForm />
      )}
      {stageOneFormIndex === stageOneFormKeys.constituent && (
        <ConstituentForm />
      )}
    </>
  );
};

const mapStateToProps = (state: $AppState) => ({
  creatingSchoolTeam: state.app.creatingSchoolTeam,
  creatingTeam: state.app.creatingTeam,
  joiningTeam: state.app.joiningTeam,
  participant: state.app.participant,
  returningConstituent: state.app.returningConstituent,
  stageOneFormIndex: state.app.stageOneFormIndex,
});

const mapDispatchToProps = (dispatch: $Dispatch<$Action>) => ({
  ...bindActionCreators(
    pickBy(actions.appActionCreators, isFunction),
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StageOneForm);
