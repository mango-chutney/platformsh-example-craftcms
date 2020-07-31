import React from 'react';
import ReactDOM from 'react-dom';
import SmartBanner from 'react-smartbanner';

window.addEventListener('load', () => {
  const div = document.createElement('div');
  div.id = 'smart-app-banner';
  document.body.insertBefore(
    div,
    document.getElementsByClassName('header-wrapper')[0],
  );
  ReactDOM.render(
    <SmartBanner title={`World's Greatest Shave`} />,
    document.getElementById('smart-app-banner'),
  );
});
