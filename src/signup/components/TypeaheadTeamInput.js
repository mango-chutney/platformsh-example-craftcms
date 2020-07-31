// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import styled from 'styled-components';
import { TypeaheadInput, Tootlip } from 'mango-components';
import type { FieldProps } from 'redux-form';
import type { $State as $AppState } from '../reducers';
import { Column, Row, Input, InputComponent } from '.';
import { appActionCreators } from '../actions';
import type { $Action, $Dispatch } from '../actions';
import { teamSearchRegColumns } from '../constants';

const filterItems = (teams: any, inputValue: any) =>
  teams && inputValue
    ? matchSorter(teams.rows, inputValue, {
        maxRanking: matchSorter.rankings.STARTS_WITH,
      }).slice(0, 10)
    : [];

const mapItemToString = item =>
  item === null ? '' : item[teamSearchRegColumns.teamName];

const mapStateToProps = (state: $AppState) => ({
  teams: state.artez.teams,
});

const mapDispatchToProps = (dispatch: $Dispatch) => ({
  selectTeam(selectedTeam: any) {
    dispatch(appActionCreators.isJoiningTeam(selectedTeam));
  },
});

const StyledTypeaheadInput = styled(TypeaheadInput)`
  + div {
    margin-top: -4px;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (
    props: {
      label: string,
      column: string,
      teams: Array<any>,
      placeholder?: string,
      selectTeam: (selectedTeam: any, teams: any) => $Action,
      tooltipVisible?: boolean,
    } & FieldProps,
  ) => {
    const {
      teams,
      input,
      meta,
      placeholder,
      label,
      column,
      selectTeam,
      tooltipVisible,
      ...rest
    } = props;

    const handleOnSelect = (selectedItem: any) => {
      selectTeam(selectedItem);
    };

    const handleOnInputValueChange = () => {
      selectTeam(null);
    };

    return (
      <Row>
        <Column column={column}>
          <StyledTypeaheadInput
            {...{
              ...rest,
              input,
              meta,
              label,
              items: teams || [],
              filterItems,
              mapItemToString,
              placeholder,
              ComposedInputComponent: Input,
              InputComponent,
              downshiftProps: {
                onSelect: handleOnSelect,
                onInputValueChange: handleOnInputValueChange,
              },
            }}
          />
          <Tootlip {...{ meta }} visible={tooltipVisible} />
        </Column>
      </Row>
    );
  },
);
