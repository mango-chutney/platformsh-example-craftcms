// @flow

import * as React from 'react';
// Explicitly import from index.js, not from the "main" property of package.json
// in the directory.
import {
  Toast,
  ToastConsumer,
  ToastProvider,
  RainbowToastComponent,
  PersistentToast,
} from 'mango-components';
import Layout from '../../../containers/Layout';

const Unicorn = () => (
  <span role="img" aria-label="unicorn">
    🦄
  </span>
);

const TransientToast = props => (
  <Toast {...props}>
    Easy come, easy go. <Unicorn />
  </Toast>
);

const WholesomeToast = props => (
  <PersistentToast {...props}>
    I&rsquo;ll stick around. <Unicorn />
  </PersistentToast>
);

const CoolToast = props => (
  <PersistentToast {...{ ToastComponent: RainbowToastComponent, ...props }}>
    See you space cowboy. <Unicorn />
  </PersistentToast>
);

const ToastExample = () => (
  <Layout>
    <ToastProvider>
      <h1>Toast</h1>
      <ToastConsumer>
        {({ createToast }) => (
          <>
            <section>
              <h2>Transient toast</h2>
              <button
                type="button"
                onClick={() => {
                  createToast(TransientToast);
                }}
              >
                Click
              </button>
            </section>
            <section>
              <h2>Wholesome toast</h2>
              <button
                type="button"
                onClick={() => {
                  createToast(WholesomeToast, { persistent: true });
                }}
              >
                Click
              </button>
            </section>
            <section>
              <h2>Cool toast</h2>
              <button
                type="button"
                onClick={() => {
                  createToast(CoolToast, { persistent: true });
                }}
              >
                Click
              </button>
            </section>
          </>
        )}
      </ToastConsumer>
    </ToastProvider>
  </Layout>
);

export default ToastExample;
