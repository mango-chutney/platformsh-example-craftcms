// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pickBy from 'lodash/pickBy';
import isFunction from 'lodash/isFunction';
import first from 'lodash/first';
import { destroy } from 'redux-form';
import StageOneForm from './StageOneForm';
import StageTwoForm from './StageTwoForm';
import StageThreeForm from './StageThreeForm';
import { HiddenLoginForm, FormLoader } from '../components';
import type { $State as $AppState } from '../reducers';
import type { $Action, $Dispatch, $ReceiveGetTeams } from '../actions';
import * as actions from '../actions';
import { formKeys } from '../constants';

type $Props = {
  getTeams: () => Promise<$ReceiveGetTeams>,
  isJoiningTeam: (joiningTeam: any) => $Action,
  isCreatingTeam: boolean => $Action,
  isCreatingSchoolTeam: boolean => $Action,
  match: any,
  shouldLogin: boolean,
  setFormKey: (formKey: typeof formKeys) => $Action,
} & $PropertyType<$AppState, 'app'>;

type $State = {
  loading: boolean,
};

class Form extends React.Component<$Props, $State> {
  hiddenLoginForm = React.createRef();

  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      getTeams,
      isJoiningTeam,
      isCreatingTeam,
      isCreatingSchoolTeam,
      match: { params, path },
      formKey,
    } = this.props;

    if (formKey === formKeys.stageOne) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: `signup-page`,
          page: `2`,
        });
      }
    }

    if (params.teamId) {
      getTeams()
        .then(response => {
          const team = response.teams.rows.find(row =>
            row.find(value => value === parseInt(params.teamId, 10)),
          );

          isJoiningTeam(team);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      if (first(path.split('/').slice(1)) === 'team') {
        isCreatingTeam(true);
      }

      if (first(path.split('/').slice(1)) === 'school') {
        isCreatingTeam(true);
        isCreatingSchoolTeam(true);
      }

      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { shouldLogin, destroyForm, formKey } = this.props;

    if (formKey !== prevProps.formKey) {
      const stageToNumber = key => {
        switch (key) {
          case formKeys.stageOne:
            return 2;
          case formKeys.stageTwo:
            return 3;
          case formKeys.stageThree:
            return 4;
          default:
            return undefined;
        }
      };
      const pageNumber = stageToNumber(formKey);
      if (pageNumber) {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: `signup-page`,
            page: `${pageNumber}`,
          });
        }
      }
    }

    if (shouldLogin !== prevProps.shouldLogin) {
      const { participant } = this.props;

      if (shouldLogin && participant) {
        window.onbeforeunload = () => undefined;
        destroyForm();

        this.handleHiddenLoginForm({
          username: participant.username,
          password: participant.password,
        });
      }
    }
  }

  handleHiddenLoginForm = ({ username, password }) => {
    if (this.hiddenLoginForm.current) {
      const inputs = this.hiddenLoginForm.current.elements;

      inputs.txtUserID.value = username;
      inputs.txtPassword.value = password;

      this.hiddenLoginForm.current.submit();
    }
  };

  render() {
    const { formKey } = this.props;

    const { loading } = this.state;

    if (loading) {
      return <FormLoader />;
    }

    return (
      <>
        {formKey === formKeys.stageOne && <StageOneForm />}
        {formKey === formKeys.stageTwo && <StageTwoForm />}
        {formKey === formKeys.stageThree && <StageThreeForm />}
        <HiddenLoginForm ref={this.hiddenLoginForm} />
      </>
    );
  }
}

const mapStateToProps = (state: $AppState) => {
  const { app, form } = state;

  const shouldLogin =
    (form[formKeys.stageThree] && form[formKeys.stageThree].submitSucceeded) ||
    app.existingRegistrant;

  return {
    ...app,
    shouldLogin,
  };
};

const mapDispatchToProps = (dispatch: $Dispatch) => ({
  ...bindActionCreators(
    pickBy(actions.appActionCreators, isFunction),
    dispatch,
  ),
  ...bindActionCreators(
    pickBy(actions.regapiActionCreators, isFunction),
    dispatch,
  ),
  destroyForm: () => dispatch(destroy(...Object.values(formKeys))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
