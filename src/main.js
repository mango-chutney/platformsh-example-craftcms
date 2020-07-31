/*
 * main.js
 */

import '@babel/polyfill';
import $ from 'jquery';
import * as React from 'react';
import { render } from 'react-dom';
import SchoolTeamSearch from './components/SchoolTeamSearch';
import content from './common/content';
import mobileRegistrationCta from './common/mobileRegistrationCta';
import navigation from './common/navigation';
import renderSignupModal from './common/renderSignupModal';

$(() => {
  renderSignupModal();
  mobileRegistrationCta();

  if (document.getElementById('school-registration-selection')) {
    render(
      <SchoolTeamSearch />,
      document.getElementById('school-registration-selection'),
    );
  }

  navigation();
  content();
});
