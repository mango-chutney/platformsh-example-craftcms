// @flow

import * as React from 'react';
import styled from 'styled-components';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import loadImage from 'blueimp-load-image';
import 'blueimp-canvas-to-blob';
import {
  reduxForm,
  Field,
  SubmissionError,
  setSubmitSucceeded,
} from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { regapi } from '../../api';
import { formKeys } from '../../constants';
import {
  TextArea,
  Button,
  UnbuttonLink,
  FormHeading,
  Section,
  Row,
  Modal,
  ModalClose,
  ModalHeader,
  Column,
  SubmitButton,
} from '../../components';
import * as styles from '../../styles';
import * as actions from '../../actions';
import { valueify } from '../../lib';
import type { $Action, $Dispatch } from '../../actions';
import type { $State as $AppState } from '../../reducers';

const escapeHTML = html => {
  const temporaryElement = document.createElement('div');
  temporaryElement.appendChild(document.createTextNode(html));
  return temporaryElement.innerHTML;
};

const serializeHTML = message =>
  escapeHTML(message)
    .split('\n')
    .filter(
      element => !Number.isNaN(element.charCodeAt(0)) && !/^\s+$/.test(element),
    )
    .map(element => `<p>${element}</p>`)
    .join('\n');

const deserializeHTML = message =>
  message.replace(/&lt;p&gt;/g, '').replace(/&lt;\/p&gt;/g, '');

const onSubmit = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    const { uri, message } = values;

    if (!uri && !message) {
      return resolve();
    }

    const {
      participant: { registrationId },
    } = props;

    return regapi
      .putRegistrations(
        registrationId,
        valueify({
          PersonalMessage: serializeHTML(message),
        }),
      )
      .then(() => {
        if (!uri) {
          return resolve();
        }

        return dispatch(actions.regapiActionCreators.uploadImageItem(uri)).then(
          ({ thumbnailID, imageID }) =>
            dispatch(
              actions.regapiActionCreators.setImageItem({
                imageID,
                thumbnailID,
              }),
            ),
        );
      })
      .then(() => resolve())
      .catch(error =>
        reject(
          new SubmissionError({
            _error: error.reason || 'An unknown error occured',
          }),
        ),
      );
  });

const StyledFormHeading = styled(FormHeading)`
  margin: 0 0 1rem;
  color: #7f8fa4;
  font-weight: 500;

  ${styles.media.greaterThan('medium')`
    margin: 0 0 3.5rem;
  `};
`;

const CustomProfileImage = styled.img`
  border-radius: 100%;
  max-width: 170px;
  width: 100%;
  cursor: pointer;
`;

const CustomImageContainer = styled.div`
  margin: 1.25rem auto 0 auto;
  max-width: calc(170px + 1rem);
  padding: 0 0.5rem;
  position: relative;
`;

const CustomProfileImageButton = styled(UnbuttonLink)`
  margin-top: 0.75rem;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
  font-weight: ${styles.fontWeight.semibold};
  font-size: 0.875rem;

  ${styles.media.greaterThan('medium')`
    margin-bottom: 0;
  `};
`;

const ImageOverlay = styled.div`
  background-color: rgba(26, 145, 235, 0.4);
  border-radius: 100%;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  height: calc(100% - 0.5rem);
  left: 0.5rem;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 0;
  transition: all 0.3s ease;
  width: calc(100% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;

  ${CustomImageContainer}:hover & {
    opacity: 1;
  }
`;

const ButtonSuccess = styled(Button).attrs({
  buttonSize: 'small',
})`
  background-color: #00bb28;
  width: 100%;
  color: #fff;
  transition: all 300ms ease;

  &:hover {
    background-color: #4ed634;
  }
`;

const ButtonOutlineWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ButtonOutline = styled(Button).attrs({
  buttonSize: 'small',
})`
  background-color: #fff;
  border: 1px solid rgba(127, 143, 164, 0.5);
  color: rgba(127, 143, 164, 0.4);
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: rgba(127, 143, 164, 0.4);
    border: 1px solid rgba(127, 143, 164, 0.5);
    color: #fff;
  }
  &:focus {
    background-color: rgba(127, 143, 164, 0.4);
    border: 1px solid rgba(127, 143, 164, 0.5);
    color: #fff;
  }

  ${styles.media.greaterThan('medium')`
    margin-top: 0;
    width: auto;
  `};
`;

const CenterAlignColumn = styled(Column)`
  text-align: center;
`;

const StyledModalClose = styled(ModalClose)``;

const StyledDropzone = styled(Dropzone)`
  background-color: #e2e7ee;
  border: 3px dashed #7f8fa4;
  border-radius: 6px;
  cursor: pointer;
`;

const DropzoneHelp = styled.div`
  color: #7f8fa4;
  font-size: 1.5rem;
  margin: 0 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${styles.media.greaterThan('small')`
    font-size: 1.8rem;
    margin: 0 3rem;
  `};
`;

const ZoomSlider = styled.input.attrs({
  type: 'range',
  min: '40',
  max: '300',
  value: props => props.value || 100,
  id: 'zoomRange',
})`
  -webkit-appearance: none;
  -webkit-transition: 0.2s;
  background: #d3d3d3;
  height: 25px;
  margin: 1.5rem 0 1.5rem 0;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  width: 100%;

  &:hover {
    opacity: 1;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #08142e;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #08142e;
    cursor: pointer;
  }
`;

const StyledAvatarEditor = styled(AvatarEditor)`
  height: 200px !important;
  width: auto !important;

  ${styles.media.greaterThan('small')`
    height: 270px !important
  `}
`;

const StyledColumn = styled(Column)`
  ${styles.media.lessThan('medium')`
    order: ${props => props.order || '1'};
  `}
`;

type $State = {
  fileError: boolean,
  isOpen: boolean,
  previewImage: any,
  scaledImage: any,
  zoomValue: number,
};

type $Props = {
  skipForm: () => $Action,
  getMobileParticipant: () => any,
} & FormProps;

class StageThreeForm extends React.Component<$Props, $State> {
  state = {
    fileError: false,
    isOpen: false,
    previewImage: '',
    scaledImage: '/assets/img/avatar.svg',
    zoomValue: 100,
  };

  componentDidMount() {
    const { mobileParticipant, change } = this.props;
    if (mobileParticipant) {
      const {
        personalization: { PersonalizedMessage },
      } = mobileParticipant;
      change('message', deserializeHTML(PersonalizedMessage));
    }
  }

  handleDrop = (acceptedFiles: Array<any>, rejectedFiles: Array<any>) => {
    if (acceptedFiles.length) {
      // Convert file to orientate proper
      loadImage(
        acceptedFiles[0],
        canvas =>
          canvas.toBlob(
            blob =>
              this.setState({
                previewImage: window.URL.createObjectURL(blob),
                fileError: false,
              }),
            'image/jpeg',
            1,
          ),
        { orientation: true },
      );
    }
    if (rejectedFiles.length) {
      this.setState({ fileError: true });
    }
  };

  onImageSet = () => {
    if (this.croppedAvatar) {
      const canvasScaled = this.croppedAvatar.getImageScaledToCanvas();

      // Convert the canvas to a blob
      canvasScaled.toBlob(
        blob => {
          const imgUrl = URL.createObjectURL(blob);

          this.setState({
            scaledImage: imgUrl,
            isOpen: false,
          });

          const { change } = this.props;

          change('uri', blob);
        },
        'image/jpeg',
        1,
      );
    }
  };

  croppedAvatar: any;

  render() {
    const {
      isOpen,
      previewImage,
      fileError,
      scaledImage,
      zoomValue,
    } = this.state;

    const { handleSubmit, skipForm, submitting } = this.props;

    return (
      <>
        <Section>
          <FormHeading type="h1">Setup your page</FormHeading>
          <StyledFormHeading type="h2">
            A personalised profile page makes all the difference.
          </StyledFormHeading>
          <form onSubmit={handleSubmit}>
            <Row>
              <CenterAlignColumn medium={4}>
                <CustomImageContainer>
                  <CustomProfileImage
                    alt="loading..."
                    src={scaledImage}
                    onClick={() => {
                      this.setState({ isOpen: true });
                    }}
                  />
                  {scaledImage !== '/assets/img/avatar.svg' && (
                    <ImageOverlay>Edit</ImageOverlay>
                  )}
                </CustomImageContainer>
                {scaledImage === '/assets/img/avatar.svg' ? (
                  <CustomProfileImageButton
                    type="button"
                    onClick={() => {
                      this.setState({ isOpen: true, previewImage: '' });
                    }}
                  >
                    Upload image
                  </CustomProfileImageButton>
                ) : (
                  <CustomProfileImageButton
                    type="button"
                    onClick={() => {
                      this.setState({
                        scaledImage: '/assets/img/avatar.svg',
                        previewImage: '',
                        zoomValue: 100,
                      });
                    }}
                  >
                    Remove image
                  </CustomProfileImageButton>
                )}
              </CenterAlignColumn>
              <Column medium={8}>
                <Field
                  type="textarea"
                  name="message"
                  placeholder="Leave a personalized message here"
                  label="Your personal message"
                  component={TextArea}
                />
              </Column>
            </Row>
            <Row>
              <StyledColumn order={2} medium={6}>
                <ButtonOutlineWrapper>
                  <ButtonOutline
                    type="button"
                    buttonType="primary"
                    onClick={() => skipForm()}
                  >
                    {`I'll do this later`}
                  </ButtonOutline>
                </ButtonOutlineWrapper>
              </StyledColumn>
              <StyledColumn order={1} medium={6}>
                <SubmitButton
                  buttonType="secondary"
                  type="submit"
                  submitting={submitting}
                  expanded
                >
                  Finish
                </SubmitButton>
              </StyledColumn>
            </Row>
          </form>
        </Section>
        <Modal isOpen={isOpen}>
          <ModalHeader>
            Upload Profile Image
            <StyledModalClose
              onClick={() =>
                this.setState({
                  isOpen: false,
                })
              }
            />
          </ModalHeader>
          {!previewImage && (
            <StyledDropzone
              onDrop={this.handleDrop}
              style={{ height: '300px', width: '100%' }}
              accept="image/*"
              multiple={false}
            >
              <DropzoneHelp>
                {fileError
                  ? "Looks like we can't upload that image, try a different one"
                  : 'Drop an image here or click to upload'}
              </DropzoneHelp>
            </StyledDropzone>
          )}
          {previewImage && (
            <>
              <Dropzone
                onDrop={this.handleDrop}
                disableClick
                accept="image/*"
                multiple={false}
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <StyledAvatarEditor
                  ref={ref => {
                    this.croppedAvatar = ref;
                  }}
                  width={270}
                  height={270}
                  image={previewImage}
                  scale={zoomValue / 100}
                  borderRadius={270}
                />
              </Dropzone>
              <ZoomSlider
                value={zoomValue}
                onChange={e => {
                  this.setState({ zoomValue: e.target.value });
                }}
              />
              <Row>
                <StyledColumn order={2} medium={8}>
                  <ButtonOutline
                    type="button"
                    onClick={() =>
                      this.setState({
                        previewImage: '',
                        scaledImage: '/assets/img/avatar.svg',
                        zoomValue: 100,
                      })
                    }
                  >
                    Reset
                  </ButtonOutline>
                </StyledColumn>
                <StyledColumn order={1} medium={4}>
                  <ButtonSuccess type="button" onClick={this.onImageSet}>
                    Set
                  </ButtonSuccess>
                </StyledColumn>
              </Row>
            </>
          )}
        </Modal>
      </>
    );
  }
}

const Form = reduxForm({
  form: formKeys.stageThree,
  onSubmit,
  initialValues: {
    uri: undefined,
    message: undefined,
  },
})(StageThreeForm);

const mapDispatchToProps = (dispatch: $Dispatch) => ({
  skipForm: () => {
    window.onbeforeunload = () => undefined;
    dispatch(setSubmitSucceeded(formKeys.stageThree));
  },
});

const mapStateToProps = (state: $AppState) => ({
  participant: state.app.participant,
  mobileParticipant: state.artez.mobileParticipant,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
