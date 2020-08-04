// @flow

import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const Wrapper = styled.div`
  margin: 1rem;
`;

const Layout = ({ children }: { children: React.Node }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title },
      },
    }) => (
      <>
        <Helmet title={title} />
        <Wrapper>
          <Header />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Wrapper>
      </>
    )}
  />
);

export default Layout;
