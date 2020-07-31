import $ from 'jquery';
import React, { Component } from 'react';
import { render } from 'react-dom';
import VirtualList from 'react-virtual-list';
import dateFns from 'date-fns';
import { baseURL } from '../abstracts/constants';
import { distanceFromLatLon } from '../abstracts/helpers';
import { makeGeocodingRequest } from '../actions/google';

const eventsJson = '/events.json';

const sortVenuesByDistance = (latitude, longitude, venues) =>
  venues
    .filter(venue => venue.latitude !== '' || venue.longitude !== '')
    .sort(
      (prevVenue, nextVenue) =>
        distanceFromLatLon(
          prevVenue.latitude,
          prevVenue.longitude,
          latitude,
          longitude,
        ) -
        distanceFromLatLon(
          nextVenue.latitude,
          nextVenue.longitude,
          latitude,
          longitude,
        ),
    );

const VenueListMask = ({ virtual, itemHeight }) => (
  <div
    style={virtual.style}
    className="row events-container events-excerpts-container"
  >
    <div className="columns">
      {virtual.items.map((venue, index) => (
        <li
          className="event-item-container"
          key={JSON.stringify(`venue-${index}`)}
          style={{ height: itemHeight }}
        >
          <div className="event">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${
                venue.address
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="event-image-container"
              style={{
                backgroundImage: `url('${baseURL}/resources/events/${
                  venue.latitude
                },${venue.longitude}.png')`,
              }}
            >
              <span />
            </a>
            <div className="event-content">
              <div>
                <h4 className="event-title text-primary">{venue.title}</h4>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${
                    venue.address
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-address"
                >
                  {venue.address}
                </a>
              </div>
              <div className="event-details">
                <div className="event-datetime">
                  <span className="event-date">
                    {dateFns.format(venue.eventDate.date, 'D MMM YYYY')}
                  </span>
                  <span className="event-time">{venue.time}</span>
                </div>
              </div>
              <div
                className="event-description"
                dangerouslySetInnerHTML={{ __html: venue.description }}
              />
            </div>
          </div>
        </li>
      ))}
    </div>
  </div>
);

const isValidPostcode = rawPostcode => {
  const numPostcode = parseInt(rawPostcode, 10);

  if (
    numPostcode < 200 ||
    (numPostcode >= 300 && numPostcode <= 799) ||
    numPostcode > 9999
  ) {
    return false;
  }

  return true;
};

export default class Venues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      searchLoading: false,
      searchError: '',
      postcode: '',
      venues: null,
      height: 280,
      hasEvents: true,
    };

    this.postcodeChange = this.postcodeChange.bind(this);
    this.search = this.search.bind(this);
    this.breakpointListener = this.breakpointListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.breakpointListener);
    window.addEventListener('orientationchange', this.breakpointListener);
    window.addEventListener('load', this.breakpointListener);

    $.ajax({
      type: 'GET',
      url: eventsJson,
      dataType: 'json',
      success: data => {
        this.setState({
          venues: data.data
            .filter(venue => venue.show === true)
            .sort(
              (a, b) => new Date(a.eventDate.date) - new Date(b.eventDate.date),
            ),
          loading: false,
        });
      },
      error: () => {
        this.setState({
          loading: false,
          hasEvents: false,
        });
      },
    });
  }

  breakpointListener() {
    this.setState({
      height:
        ($(window).innerWidth() + 15 <= 640 && 750) ||
        ($(window).innerWidth() + 15 <= 1020 && 300) ||
        ($(window).innerWidth() + 15 <= 1930 && 280) ||
        330,
    });
  }

  postcodeChange(event) {
    this.setState({ postcode: event.target.value, searchError: undefined });
  }

  search() {
    this.setState({ searchLoading: true });
    const { postcode } = this.state;
    if (!isValidPostcode(postcode)) {
      return this.setState({
        searchLoading: undefined,
        searchError: 'The Postcode you have entered is invalid',
      });
    }
    return makeGeocodingRequest(`${postcode}+Australia`).then(response => {
      if (response.results.length === 0) {
        return this.setState({
          searchLoading: false,
          searchError: 'No results found',
        });
      }
      const latitude = response.results[0].geometry.location.lat;
      const longitude = response.results[0].geometry.location.lng;

      const { venues } = this.state;

      return this.setState({
        venues: sortVenuesByDistance(latitude, longitude, venues),
        searchLoading: false,
      });
    });
  }

  render() {
    const {
      loading,
      searchLoading,
      searchError,
      postcode,
      venues,
      height,
      hasEvents,
    } = this.state;

    const VenueList = VirtualList()(VenueListMask);

    return (
      <div>
        {!loading ? (
          hasEvents && venues && venues.length > 0 ? (
            <div>
              <div className="margin-top-large margin-bottom-medium">
                <div className="row">
                  <div className="columns">
                    <div className="events-search-container">
                      <h3>
                        Search for Shave events close to you by typing in your
                        post code below:
                      </h3>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          this.search();
                        }}
                      >
                        <div className="input-button">
                          <input
                            type="text"
                            pattern="\d*"
                            placeholder="Enter a postcode"
                            value={postcode}
                            onChange={this.postcodeChange}
                          />
                          <button
                            type="button"
                            className="button"
                            onClick={this.search}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                      {searchLoading && <div>Loading events&hellip;</div>}
                      {searchError && <div>{searchError}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="events-wrapper">
                <div className="venue-wrapper">
                  <div className="venue-container">
                    {venues && venues.length > 0 && (
                      <VenueList
                        items={venues}
                        itemHeight={height}
                        itemBuffer={4}
                      />
                    )}
                    {venues && !venues.length > 0 && <div>No venues found</div>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="padding-large">
                <div className="row">
                  <div className="columns">
                    <h3>2020 Events Coming Soon!</h3>
                    <h4 className="text-gray">
                      We can&apos;t wait to Shave with you next year! Most of
                      our World&apos;s Greatest Shave events will be held in
                      March 2020 across Australia. Check back nearer to the time
                      to find an event near you.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="padding-large">
            <div className="row">
              <div className="columns">
                <h3>loading...</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

render(<Venues />, document.getElementById('events-wrapper'));
