import React from 'react';
import { render } from 'react-dom';
import Ticker from '../components/Ticker';

if (document.getElementById('ticker')) {
  render(<Ticker />, document.getElementById('ticker'));
}
