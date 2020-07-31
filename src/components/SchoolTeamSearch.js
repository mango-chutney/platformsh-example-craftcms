// @flow

import * as React from 'react';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import styled from 'styled-components';
import {
  TypeaheadMenuComponent,
  TypeaheadItemComponent,
} from 'mango-components';
import { rem } from 'polished';
import { Pulse as Loader } from 'styled-spinkit';
import {
  AnchorButton,
  InputComponent,
  LabelComponent,
} from '../signup/components';
import * as styles from '../signup/styles';
import { teamTypes, teamSearchRegColumns } from '../signup/constants';
import getTeams from './RegistrationSelection/getTeams';

const InputContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: ${rem(680)};

  > div {
    flex: 1;
  }

  label {
    display: none;
  }

  input {
    background: ${styles.palette.white};
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    height: ${rem(73)} !important;
    margin: 0;
  }
`;

const StartJoinSchoolContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: ${rem(380)};

  p {
    font-weight: ${styles.fontWeight.medium};
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  h3 {
    font-weight: ${styles.fontWeight.semibold};
  }
`;

const BorderedLeftColumn = styled.div`
  border-left: 1px solid ${styles.palette.border};

  ${styles.media.lessThan('medium')`
    border-left: 0;
  `};
`;

const filterItems = (teams: any, inputValue: any) =>
  teams && inputValue
    ? matchSorter(teams, inputValue, {
        maxRanking: matchSorter.rankings.STARTS_WITH,
      }).slice(0, 10)
    : [];

const mapItemToString = item =>
  item === null ? '' : item[teamSearchRegColumns.teamName];

type $Props = {};

type $State = {
  loading: boolean,
  selectedTeam: any,
  teams: any,
};

const StyledAnchorButton = styled(AnchorButton)`
  font-size: ${rem(20)};
`;

const StyledJoinTeamButton = styled(StyledAnchorButton)`
  align-items: center;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  display: flex;
  height: ${rem(73)};
  justify-content: center;
  padding: 0 1rem;
  width: auto;
  min-width: ${rem(73)};
`;

class SchoolTeamSearch extends React.Component<$Props, $State> {
  state = {
    loading: true,
    teams: undefined,
    selectedTeam: undefined,
    error: false,
  };

  componentDidMount() {
    getTeams()
      .then(teams => {
        const filteredTeams = teams
          ? teams.filter(
              team =>
                team[teamSearchRegColumns.teamTypeId] === teamTypes.school.id,
            )
          : teams;

        this.setState({ teams: filteredTeams, loading: false });
      })
      .catch(() => {
        this.setState({ loading: true, error: true });
      });
  }

  render() {
    const { teams, loading, selectedTeam, error } = this.state;

    const JoinTeamButton = () => (
      <StyledJoinTeamButton
        href={
          selectedTeam &&
          selectedTeam[teamSearchRegColumns.teamId] &&
          `/signup/${selectedTeam[teamSearchRegColumns.teamId]}`
        }
        buttonType="secondary"
        wide
        disabled={!(selectedTeam && selectedTeam[teamSearchRegColumns.teamId])}
      >
        {loading ? <Loader color={styles.palette.white} size={20} /> : 'Join'}
      </StyledJoinTeamButton>
    );

    return (
      <div className="school-team-search-wrapper">
        <div className="row medium-up-2">
          <div className="columns column-block">
            <StartJoinSchoolContainer>
              <div className="text-center">
                <h3>Start a school team</h3>
                <p>
                  If your school is new to World’s Greatest Shave, start a
                  school team as team captain below.
                </p>
                <StyledAnchorButton
                  href="/school/signup"
                  buttonType="primary"
                  wide
                >
                  Start a school team
                </StyledAnchorButton>
              </div>
            </StartJoinSchoolContainer>
          </div>
          <BorderedLeftColumn className="columns column-block">
            <StartJoinSchoolContainer>
              <div className="text-center">
                <h3>Join a school team</h3>
                <p>
                  If your school is taking part in World’s Greatest Shave,
                  search for your school team below.
                </p>
              </div>
              <InputContainer>
                <Downshift
                  itemToString={mapItemToString}
                  onSelect={(selectedItem: any) => {
                    this.setState({ selectedTeam: selectedItem });
                  }}
                >
                  {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                  }) => (
                    <div style={{ position: 'relative' }}>
                      <LabelComponent {...getLabelProps()} />
                      <InputComponent
                        meta={{ error: undefined, touched: undefined }}
                        placeholder={(() => {
                          if (error) {
                            return 'Unable to load teams';
                          }

                          if (loading) {
                            return 'Loading...';
                          }

                          return 'Search for your school team';
                        })()}
                        {...getInputProps()}
                        disabled={loading}
                      />
                      <TypeaheadMenuComponent {...getMenuProps()}>
                        {isOpen
                          ? filterItems(teams, inputValue).map(
                              (item, index) => (
                                <TypeaheadItemComponent
                                  {...getItemProps({
                                    key: item[teamSearchRegColumns.teamId],
                                    index,
                                    item,
                                    style: {
                                      backgroundColor:
                                        highlightedIndex === index
                                          ? 'lightgray'
                                          : 'white',
                                      fontWeight:
                                        selectedItem === item
                                          ? 'bold'
                                          : 'normal',
                                    },
                                  })}
                                >
                                  {mapItemToString(item)}
                                </TypeaheadItemComponent>
                              ),
                            )
                          : null}
                      </TypeaheadMenuComponent>
                    </div>
                  )}
                </Downshift>
                <JoinTeamButton />
              </InputContainer>
            </StartJoinSchoolContainer>
          </BorderedLeftColumn>
        </div>
        <div className="row text-center text-gray margin-top-medium">
          <div className="columns">
            Under 18? You’ll need to get{' '}
            <a
              href="/resources/downloads/Under-18-Consent-Form-WGS-2020.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              {' '}
              this consent form{' '}
            </a>{' '}
            signed by a guardian AND a teacher.
          </div>
        </div>
        <div className="row text-center text-gray margin-top-medium">
          <div className="columns">
            Signing up as an individual? No problem,{' '}
            <a href="#signup">sign up here.</a>
          </div>
        </div>
      </div>
    );
  }
}

export default SchoolTeamSearch;
