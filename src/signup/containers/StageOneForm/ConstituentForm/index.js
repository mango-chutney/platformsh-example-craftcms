// @flow

import * as React from 'react';
import ConstituentRegistrationForm from './ConstituentRegistrationForm';
import ConstituentLoginForm from './ConstituentLoginForm';
import { Section } from '../../../components';
import { formKeys } from '../../../constants';

export const ConstituentFormContext = React.createContext({
  formKey: formKeys.constituentLogin,
  toggleFormKey: () => {},
});

type $Props = {};

type $State = {
  formKey: string,
  toggleFormKey: Function,
};

class ConstituentForm extends React.Component<$Props, $State> {
  /* eslint-disable react/no-unused-state */
  constructor(props: $Props) {
    super(props);

    this.toggleFormKey = () => {
      this.setState(state => ({
        formKey:
          state.formKey === formKeys.constituentLogin
            ? formKeys.constituentRegistration
            : formKeys.constituentLogin,
      }));
    };

    this.state = {
      formKey: formKeys.constituentLogin,
      toggleFormKey: this.toggleFormKey,
    };
  }
  /* eslint-enable react/no-unused-state */

  toggleFormKey: Function;

  render() {
    const { formKey } = this.state;

    return (
      <ConstituentFormContext.Provider value={this.state}>
        <Section>
          {formKey === formKeys.constituentLogin && (
            <ConstituentFormContext.Consumer>
              {({ toggleFormKey }) => (
                <ConstituentLoginForm {...{ toggleFormKey }} />
              )}
            </ConstituentFormContext.Consumer>
          )}
          {formKey === formKeys.constituentRegistration && (
            <ConstituentRegistrationForm />
          )}
        </Section>
      </ConstituentFormContext.Provider>
    );
  }
}

export default ConstituentForm;
