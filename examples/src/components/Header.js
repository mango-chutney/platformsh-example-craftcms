// @flow

import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const Header = () => (
  <header>
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              name
              version
              revision
              repository
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: { name, version, revision, repository },
        },
      }) => (
        <div>
          <h1>
            <Link to="/">{name}</Link>@{version}{' '}
            <a
              alt="Browse this revision on GitHub"
              href={`${repository}/commit/${revision}`}
            >
              ({revision.slice(0, 7)})
            </a>
          </h1>
        </div>
      )}
    />
  </header>
);

export default Header;
