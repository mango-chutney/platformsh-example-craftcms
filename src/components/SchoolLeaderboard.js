/*
 * components/StateLeaderboard.js
 */

import React, { Component } from 'react';
import Papa from 'papaparse';
import numeral from 'numeral';
import { baseURL, provinceAbbrevToName, loader } from '../abstracts/constants';

const snapshotReportFileURL = `${baseURL}/resources/csv/TeamSummary.csv`;

const defaultShowLimit = 20;

/*
 * School array value example:
 * ["Scotch College Adelaide", "SA", "Registered", "", "Education", 0, "Scotch College", "https://secure.leukaemiafoundation.org.au/registra…e.aspx?EventID=14158&LangPref=en-CA&TeamID=103670", 10, 0, 10, 24944.5, 0, 24944.5, 301, 0, 301]
 * 0: name
 * 1: location
 * 4: type
 * 7: url
 * 11: raised verified
 * 13: raised total
 */

function convertSnapshotReportToTickerData(fileURL) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileURL, {
      download: true,
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        if (results.errors.length) {
          reject();
        }
        resolve(
          results.data
            .slice(7)
            .filter(school => school[4] === 'Education')
            .sort((a, b) => (a[11] > b[11] ? -1 : 1))
            .slice(0, 100),
        );
      },
    });
  });
}

class SchoolLeaderboard extends Component {
  state = {
    items: [],
    loading: true,
    limit: defaultShowLimit,
  };

  componentDidMount() {
    convertSnapshotReportToTickerData(snapshotReportFileURL).then(response =>
      this.setState({ items: response, loading: false }),
    );
  }

  render() {
    const { items, loading, limit } = this.state;

    return (
      <div className="top-leaderboard-wrapper">
        {!loading ? (
          <div>
            <div className="row">
              <div className="columns">
                <div className="top-leaderboard-container">
                  {items.slice(0, limit).map((item, index) => (
                    <div className="top-leaderboard-item">
                      <a
                        href={item[7]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="top-leaderboard-position">
                          #{index + 1}
                        </span>
                        <div className="top-leaderboard-name-container">
                          <div className="top-leaderboard-name">{item[0]}</div>
                          <div className="top-leaderboard-location">
                            {provinceAbbrevToName[item[1]]}
                          </div>
                        </div>
                        <span className="top-leaderboard-raised">
                          {numeral(item[11]).format('$0,0')}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {limit === defaultShowLimit && (
              <div className="row text-center padding-medium">
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

export default SchoolLeaderboard;
