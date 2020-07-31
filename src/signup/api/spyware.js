/* eslint-disable */

function makeFloodlightRequestOnDidLandOnRegistrationPageEvent() {
  const axel = Math.random() + '';
  const a = axel * 10000000000000;
  const div = document.createElement('div');
  div.innerHTML =
    '<iframe ' +
    'src="https://4534602.fls.doubleclick.net/activityi;src=4534602;' +
    'type=wgs20;cat=wgs-s00;dc_lat=;dc_rdid=;' +
    'tag_for_child_directed_treatment=;ord=1;' +
    'num=' +
    a +
    '?" width="1" height="1" frameborder="0"' +
    'style="display:none"></iframe>';
  document.body.appendChild(div);

  return Promise.resolve();
}

function makeFloodlightRequestOnDidFinishRegistrationEvent() {
  const axel = Math.random() + '';
  const a = axel * 10000000000000;
  const div = document.createElement('div');
  div.innerHTML =
    '<iframe ' +
    'src="https://4534602.fls.doubleclick.net/activityi;src=4534602;' +
    'type=wgs200;cat=wgs-s000;dc_lat=;dc_rdid=;' +
    'tag_for_child_directed_treatment=;ord=1;' +
    'num=' +
    a +
    '?" width="1" height="1" frameborder="0"' +
    'style="display:none"></iframe>';
  document.body.appendChild(div);

  return Promise.resolve();
}

export function updateIntercom(data) {
  return new Promise(resolve => {
    if (
      !(window.Intercom !== undefined && typeof window.Intercom === 'function')
    ) {
      return resolve();
    }

    try {
      window.Intercom('update', data);

      return resolve();
    } catch (_) {
      return resolve();
    }
  });
}

export function updateAutopilot(data) {
  return new Promise(resolve => {
    if (
      !(
        typeof window.Autopilot === 'object' &&
        typeof window.Autopilot.run === 'function'
      )
    ) {
      return resolve();
    }

    try {
      window.Autopilot.run('associate', data);

      return resolve();
    } catch (_) {
      return resolve();
    }
  });
}

export default {
  makeFloodlightRequestOnDidLandOnRegistrationPageEvent,
  makeFloodlightRequestOnDidFinishRegistrationEvent,
  updateAutopilot,
  updateIntercom,
};
