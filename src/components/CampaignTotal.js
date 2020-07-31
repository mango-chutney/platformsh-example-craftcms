/*
 * components/CampaignTotal.js
 */

import $ from 'jquery';
import React, { Component } from 'react';
import CountUp from 'react-countup';
import fetch from 'unfetch';
import { eventId, loader, mitigatedAmount } from '../abstracts/constants';

class CampaignTotal extends Component {
  state = {
    total: 0,
    loading: true,
  };

  componentDidMount() {
    fetch(`/api/get-event-fundraising-totals.php?eventId=${eventId}`)
      .then(response => response.text())
      .then(response => {
        const xml = $.parseXML(response);

        const total =
          parseFloat(
            $(xml)
              .find('eventVerifiedTotalCollected')
              .text(),
            10,
          ) - mitigatedAmount;

        this.setState({ total, loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, total } = this.state;
    return loading ? (
      <div>{loader}</div>
    ) : (
      <h1>
        <CountUp
          decimal="."
          decimals={0}
          duration={2.5}
          end={total}
          prefix="$"
          separator=","
          start={0}
          useEasing
          useGrouping
        />
      </h1>
    );
  }
}

export default CampaignTotal;
