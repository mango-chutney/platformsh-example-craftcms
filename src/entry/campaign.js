import React from 'react';
import { render } from 'react-dom';
import CampaignTotal from '../components/CampaignTotal';
import StateLeaderboard from '../components/StateLeaderboard';

if (document.getElementById('amount-raised')) {
  render(<CampaignTotal />, document.getElementById('amount-raised'));
}

if (document.getElementById('state-fundraising-totals')) {
  render(
    <StateLeaderboard />,
    document.getElementById('state-fundraising-totals'),
  );
}
