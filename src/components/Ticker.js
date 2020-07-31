/*
 * components/ticker.js
 */

import React, { Component } from 'react';
import numeral from 'numeral';
import Papa from 'papaparse';
import { baseURL, eventName } from '../abstracts/constants';

const snapshotReportFileURL = `${baseURL}/resources/csv/ticker.csv`;

function convertSnapshotReportToTickerData(fileURL) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileURL, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        if (results.errors.length) {
          reject();
        }
        resolve(results.data);
      },
    });
  });
}

function TickerItem({
  companyName,
  donationAmount,
  donorDonationScrollPermission,
  donorNameScrollPermission,
  firstName,
  lastName,
  solicitorFirstName,
  solicitorLastName,
  transactionType,
}) {
  return donorDonationScrollPermission === 'Y' ||
    donorNameScrollPermission === 'Y' ? (
    <div className="ticker-item">
      {transactionType === 'Registration' ? (
        <span>
          <span className="ticker-registered">
            {companyName || `${firstName} ${lastName}`}
          </span>{' '}
          just signed up!
        </span>
      ) : (
        <span>
          <span className="ticker-donated">
            {companyName || `${firstName} ${lastName}`}
          </span>
          <span className="ticker-amount">
            {' '}
            {`donated ${numeral(donationAmount).format('$0,0[.]00')}`}{' '}
          </span>
          to{' '}
          <span className="ticker-recipient">
            {solicitorFirstName
              ? `${solicitorFirstName} ${solicitorLastName}`
              : eventName}
          </span>
        </span>
      )}
    </div>
  ) : null;
}

class Ticker extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    convertSnapshotReportToTickerData(snapshotReportFileURL).then(response =>
      this.setState({ items: response }),
    );
  }

  render() {
    const { items } = this.state;

    return items.length > 0 ? (
      <div className="ticker-container">
        <div className="ticker-mask">
          <div
            className="ticker"
            style={{
              animationDuration: `${items.length * 4}s`,
            }}
          >
            {items.map(item => (
              <TickerItem
                transactionType={item['Transaction Type']}
                firstName={item['First Name']}
                lastName={item['Last Name']}
                companyName={item['Company Name']}
                donationAmount={item['Donation Amount']}
                solicitorFirstName={item['Solicitor First Name']}
                solicitorLastName={item['Solicitor Last Name']}
                donorNameScrollPermission={item['Donor Name Scroll Permission']}
                donorDonationScrollPermission={
                  item['Donor Donation Scroll Permission']
                }
              />
            ))}
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Ticker;
