/*
 * components/StateLeaderboard.js
 */

import $ from 'jquery';
import React, { Component } from 'react';
import numeral from 'numeral';
import fetch from 'unfetch';
import { locations } from '../abstracts/constants';

function getLocationTotal(locationId) {
  return new Promise((resolve, reject) =>
    fetch(`/api/get-event-fundraising-totals.php?eventId=${locationId}`)
      .then(response => response.text())
      .then(response => {
        const xml = $.parseXML(response);

        const total = {
          amount: parseInt(
            $(xml)
              .find('eventVerifiedTotalCollected')
              .text(),
            10,
          ),
          locationId: parseInt(
            $(xml)
              .find('eventid')
              .text(),
            10,
          ),
        };

        resolve(total);
      })
      .catch(() => reject()),
  );
}

class StateLeaderboard extends Component {
  state = {
    totals: [],
    loading: true,
    normalizeAmount: 200000,
    error: false,
  };

  componentDidMount() {
    Promise.all(locations.map(({ id }) => getLocationTotal(id)))
      .then(totals =>
        this.setState({
          totals: totals.sort((a, b) => b.amount - a.amount),
          loading: false,
          normalizeAmount:
            totals.sort((a, b) => b.amount - a.amount)[4].amount * 2, // scale widths by the 4th item
        }),
      )
      .catch(() =>
        this.setState({
          loading: false,
          error: true,
        }),
      );
  }

  render() {
    const { totals, error, loading, normalizeAmount } = this.state;

    const maxAmount = Math.max(...totals.map(({ amount }) => amount));

    // normalize A' = (1-α)*A + α*B
    const normalizeScale = 0.5;

    return (
      <div className="state-fundraising-totals-wrapper">
        {loading ? (
          <div />
        ) : error ? (
          <div>An error occured</div>
        ) : (
          <div className="state-fundraising-totals-container">
            <h3 className="state-fundraising-totals-heading">
              State Fundraising Totals
            </h3>
            {totals.map(({ amount, locationId }) => (
              <div className="row state-fundraising-totals-item-container">
                <div className="state-fundraising-totals-state-container columns small-4 medium-6">
                  <span className="state-leaderboard-state">
                    {locations.find(({ id }) => id === locationId).title}
                  </span>
                  <span className="state-leaderboard-abbr">
                    {locations.find(({ id }) => id === locationId).abbr}
                  </span>
                </div>
                <div className="state-fundraising-totals-amount-container columns small-8 medium-6 float-left">
                  <span
                    className="state-fundraising-totals-amount"
                    style={{
                      width: `${(((1 - normalizeScale) * amount +
                        0.5 * normalizeAmount) /
                        (maxAmount * (1 - normalizeScale) +
                          0.5 * normalizeAmount)) *
                        100}%`,
                    }}
                  >
                    {numeral(amount).format('$0,0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default StateLeaderboard;
