// @flow

import 'raf/polyfill';
import 'jest-styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Field, reduxForm, reducer as formReducer } from 'redux-form';
import renderer from 'react-test-renderer';
import { Input, TextArea, Checkbox, Select } from '../../src';

const store = createStore(combineReducers({ form: formReducer }));

function FormComponents() {
  return (
    <form>
      <Field
        type="text"
        name="input"
        placeholder="Input"
        label="Input"
        component={Input}
      />
      <Field
        name="textarea"
        placeholder="Text Area"
        label="Text Area"
        component={TextArea}
      />
      <Field
        name="checkbox"
        label="Checkbox"
        placeholder="Checkbox"
        component={Checkbox}
      />
      <Field
        name="select"
        label="select"
        placeholder="select"
        component={Select}
      >
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
      </Field>
    </form>
  );
}

const Form = reduxForm({
  form: 'FormComponents',
})(FormComponents);

it('Form components (Input, TextArea, Checkbox, PaddedCheckbox) renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Form />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
