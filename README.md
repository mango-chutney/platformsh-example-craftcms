# Mango components

A repository of re-useable styled components

## Usage

The files in this repo need transpiling. Make sure you have the following packages:

```
yarn add --dev "@babel/core" "@babel/preset-env" "@babel/preset-flow" "@babel/preset-react" "@babel/plugin-proposal-class-properties" "babel-plugin-styled-components"
```

Sample `babel.config.js`:

```js
module.exports = api => {
  api.cache(true);

  return {
    presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['styled-components', { displayName: false }],
    ],
  };
};
```

Make sure you whitelist this module in `babel-loader`'s `include` key, for example:

```js
const path = require('path');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(
            path.join(__dirname, 'node_modules', 'mango-components'),
          ),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
});
```

#### Using default styles

```js
import { Input } from 'mango-components';
import { Field } from 'redux-form';

export default () => (
  <Field
    type="email"
    name="email"
    placeholder="Please enter your email"
    label="Email address"
    component={Input}
  />
);
```

## Composition of styles

### Either replace individual components

```js
import { Input } from 'mango-components';
import styled from 'styled-components';
import { Field } from 'redux-form';

const InputComponent = styled.input`
  position: relative;
`;

const InputDecoratorComponent = styled.span`
  &::after {
    content: '🙅';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledInput = (props: $Props) => (
  <Input
    {...{
      InputDecoratorComponent,
      ...props,
    }}
  />
);

export default () => (
  <Field
    type="email"
    name="email"
    placeholder="Please enter your email"
    label="Email address"
    component={StyledInput}
  />
);
```

### Or recompose the whole thing

This way, the default styles don't need to end up in the bundle at all.

```js
import {
  InputComposer,
  createFormControlElementProps,
  createInputDecoratorProps,
  createLabelProps,
} from 'mango-components';
import { Field } from 'redux-form';

const InputComponent = styled.input``;
const InputDecoratorComponent = styled.span``;
const InputLabelComponent = styled.label``;

const StyledInput = (props: $Props) => (
  <InputComposer
    {...{
      InputComponent,
      InputDecoratorComponent,
      InputLabelComponent,
      createFormControlElementProps,
      createInputDecoratorProps,
      createLabelProps,
      ...props,
    }}
  />
);

export default () => (
  <Field
    type="email"
    name="email"
    placeholder="Please enter your email"
    label="Email address"
    component={StyledInput}
  />
);
```

## Hacking

Install dependencies and peer dependencies:

```
# You need to run this install-peers command again each time you run `yarn`.
$ yarn && yarn run install-peers
```

Make changes and run tests:

```
$ yarn run test
```

Run the examples:

```
$ cd examples
$ yarn && yarn run start
```
