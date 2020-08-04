#!/usr/bin/env node

const argv = require('yargs')
  .demand('event-ids')
  .array('event-ids')
  .describe('event-ids', 'Target event IDs.')
  .demand('api-key')
  .describe('api-key', "Target org's API key.")
  .demand('org-id')
  .describe('org-id', 'Target org ID')
  .default('base-url', 'https://secure.artezpacific.com')
  .describe('base-url', 'Base URL (sans `/api`).').argv;
const fetch = require('isomorphic-fetch');
const first = require('lodash/first');
const { mapEventUDFs } = require('../');

const { apiKey, baseUrl, eventIds, orgId } = argv;

const headers = {
  Authorization: `Basic ${new Buffer(`${orgId}:${apiKey}`).toString('base64')}`,
  'Content-Type': 'application/json',
};

Promise.all(
  eventIds.map(eventId =>
    fetch(`${baseUrl}/api/UserDefinedFields?EventId=${eventId}`, { headers })
      .then(response => response.json())
      .then(
        response =>
          Array.isArray(first(response)) ? first(response) : response
      )
      .then(response => ({ [eventId]: mapEventUDFs(response) }))
  )
).then(maps => {
  // eslint-disable-next-line no-console
  process.stdout.write(
    JSON.stringify(
      maps.reduce((prev, next) => ({ ...prev, ...next }), {}),
      null,
      2
    )
  );
});
