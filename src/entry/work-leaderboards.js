import React from 'react';
import { render } from 'react-dom';
import WorkLeaderboard from '../components/WorkLeaderboard';

if (document.getElementById('work-leaderboards')) {
  render(<WorkLeaderboard />, document.getElementById('work-leaderboards'));
}
