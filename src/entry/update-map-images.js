// eslint-disable-next-line import/no-extraneous-dependencies
import $ from 'jquery';
import React, { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'unfetch';
import { baseURL } from '../abstracts/constants';
import { paramify } from '../abstracts/helpers';
import { createStaticMapURL } from '../actions/google';

export function makeGoogleStaticMap({ address, fileName }) {
  const googleStaticMapURL = createStaticMapURL(address);

  const parameters = {
    fromFile: googleStaticMapURL,
    toFile: `${fileName}.png`,
  };

  return new Promise((resolve, reject) =>
    fetch(`${baseURL}/api/image-to-file.php?${paramify(parameters)}`)
      .then(() => resolve())
      .catch(() => reject()),
  );
}

const eventsJson = '/events.json';

export default class UpdateEventImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: eventsJson,
      dataType: 'json',
      success: data => {
        // Check if image is in cms, if not save from google maps
        // eslint-disable-next-line array-callback-return
        data.data.map(venue => {
          $.get(
            `${baseURL}/resources/events/${venue.latitude},${
              venue.longitude
            }.png`,
          )
            .done(() => {
              // Do something now you know the image exists.
            })
            .fail(() => {
              // Image doesn't exist - do something else.
              makeGoogleStaticMap({
                address: `${venue.latitude},${venue.longitude}`,
                fileName: `${venue.latitude},${venue.longitude}`,
              });
            });
        });

        this.setState({
          loading: false,
        });
      },
      error: () => {
        this.setState({
          loading: false,
        });
      },
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h3>{loading ? 'Saving new map images...' : ' images saved!'}</h3>
      </div>
    );
  }
}

render(<UpdateEventImages />, document.getElementById('update-map-images'));
