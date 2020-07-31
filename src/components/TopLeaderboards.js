/*
 * components/StateLeaderboard.js
 */

import React, { Component } from 'react';
import numeral from 'numeral';
import fetch from 'unfetch';
import { eventIdPrevious, loader } from '../abstracts/constants';

const defaultShowLimit = 20;

class TopLeaderboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indivdualLeaderboard: undefined,
      teamLeaderboard: undefined,
      loading: true,
      limit: defaultShowLimit,
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`/api/get-leaderboard.php?eventid=${eventIdPrevious}`).then(
        response => response.json(),
      ),
      fetch(`/api/get-team-leaderboard.php?eventid=${eventIdPrevious}`).then(
        response => response.json(),
      ),
    ])
      .then(([response, response2]) => {
        this.setState({
          indivdualLeaderboard: response,
          teamLeaderboard: response2,
          loading: false,
        });
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const {
      indivdualLeaderboard,
      teamLeaderboard,
      loading,
      limit,
    } = this.state;

    return (
      <div className="top-leaderboard-wrapper ">
        {!loading ? (
          <div>
            <div className="row large-up-2">
              <div className="columns column-block">
                <h4 className="text-primary">Top Individuals</h4>
                <div className="top-leaderboard-container">
                  {indivdualLeaderboard &&
                    indivdualLeaderboard.length &&
                    indivdualLeaderboard
                      .filter(({ isAnonymous }) => isAnonymous === 'n')
                      .slice(0, limit)
                      .map(
                        (
                          {
                            id,
                            firstName,
                            lastName,
                            location,
                            raised,
                            isAnonymous,
                          },
                          index,
                        ) => (
                          <div className="top-leaderboard-item">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://secure.leukaemiafoundation.org.au/registrant/FundraisingPage.aspx?EventID=${eventIdPrevious}&registrationID=${id}&LangPref=en-CA`}
                            >
                              <div className="top-leaderboard-position">
                                #{index + 1}
                              </div>
                              <div className="top-leaderboard-name-container">
                                <div className="top-leaderboard-name">
                                  {isAnonymous === 'n'
                                    ? `${firstName} ${lastName}`
                                    : 'Privacy Requested'}
                                </div>
                                <div className="top-leaderboard-location">
                                  {isAnonymous === 'n' ? location : '\u00A0'}
                                </div>
                              </div>
                              <div className="top-leaderboard-raised">
                                {numeral(raised).format('$0,0')}
                              </div>
                            </a>
                          </div>
                        ),
                      )}
                </div>
              </div>
              <div className="columns column-block">
                <h4 className="text-primary">Top Teams</h4>
                <div className="top-leaderboard-container">
                  {teamLeaderboard &&
                    teamLeaderboard.length &&
                    teamLeaderboard
                      .filter(({ isAnonymous }) => isAnonymous === 'n')
                      .slice(0, limit)
                      .map(
                        (
                          { id, teamName, location, raised, isAnonymous },
                          index,
                        ) => (
                          <div className="top-leaderboard-item">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://secure.leukaemiafoundation.org.au/registrant/TeamFundraisingPage.aspx?EventID=${eventIdPrevious}&TeamID=${id}&LangPref=en-CA`}
                            >
                              <div className="top-leaderboard-position">
                                #{index + 1}
                              </div>
                              <div className="top-leaderboard-name-container">
                                <div className="top-leaderboard-name">
                                  {isAnonymous === 'n'
                                    ? teamName
                                    : 'Privacy Requested'}
                                </div>
                                <div className="top-leaderboard-location">
                                  {isAnonymous === 'n' ? location : '\u00A0'}
                                </div>
                              </div>
                              <div className="top-leaderboard-raised">
                                {numeral(raised).format('$0,0')}
                              </div>
                            </a>
                          </div>
                        ),
                      )}
                </div>
              </div>
            </div>
            {limit === defaultShowLimit && (
              <div className="row  text-center padding-medium">
                <div className="columns">
                  <a
                    className="button large"
                    onClick={() => {
                      this.setState({
                        limit: 100,
                      });
                    }}
                  >
                    Load more
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>{loader}</div>
        )}
      </div>
    );
  }
}

export default TopLeaderboards;
