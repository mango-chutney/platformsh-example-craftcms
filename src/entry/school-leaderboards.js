import React from 'react';
import { render } from 'react-dom';
import SchoolLeaderboard from '../components/SchoolLeaderboard';

if (document.getElementById('school-leaderboard')) {
  render(<SchoolLeaderboard />, document.getElementById('school-leaderboard'));
}
