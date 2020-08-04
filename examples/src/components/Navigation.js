// @flow

import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const Navigation = () => (
  <nav>
    <StaticQuery
      query={graphql`
        {
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }
      `}
      render={({ allSitePage: { edges } }) => {
        const componentPages = edges
          .filter(
            ({ node: { path } }) =>
              path.startsWith('/components') || path === '/',
          )
          .sort(({ node: { path: pathA } }, { node: { path: pathB } }) =>
            pathA.localeCompare(pathB),
          );

        return (
          <ul>
            {componentPages.map(({ node: { path } }) => (
              <li key={path}>
                <Link to={path}>{path}</Link>
              </li>
            ))}
          </ul>
        );
      }}
    />
  </nav>
);

export default Navigation;
