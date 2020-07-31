// @flow

import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';
import {
  Button,
  Modal,
  ModalClose,
  ModalFooter,
  ModalHeader,
  UnbuttonLink,
} from '.';

type $Props = {
  children: React.Node,
  color?: string,
};

type $State = {
  isOpen: boolean,
};

const ContentContainer = styled.div`
  font-size: ${rem(15)};

  ${styles.media.lessThan('small')`
    font-size: ${rem(14)};
  `};
`;

class TermsAndConditionsModal extends React.Component<$Props, $State> {
  state = { isOpen: false };

  render() {
    const { children, color } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <UnbuttonLink
          type="button"
          onClick={() =>
            this.setState({
              isOpen: true,
            })
          }
          {...{ color }}
        >
          {children}
        </UnbuttonLink>
        <Modal
          isOpen={isOpen}
          onRequestClose={() =>
            this.setState({
              isOpen: false,
            })
          }
        >
          <ModalHeader>
            World’s Greatest Shave Terms & Conditions
            <ModalClose
              isOpen={isOpen}
              onClick={() =>
                this.setState({
                  isOpen: false,
                })
              }
            />
          </ModalHeader>
          <ContentContainer>
            <p>
              In confirming my registration (participant) for World&apos;s
              Greatest Shave (campaign), I acknowledge that I understand the
              activities and risks involved in participating. Certain risks or
              dangers may occure which may include, amongst others: bodily or
              psychological injury, defect, failure or inadequacy of equipment
              associated with activities such as shaving, cutting, colouring and
              or waxing, changing weather condtions and environmental dangers
              and the possiblitly of accident or illness requiring the
              assistance of medial and rescue services which many not be readily
              available.
            </p>
            <p>
              I acknowledge and agree, in consideration of permission to
              participate in the activities, to release and indemnify the
              Leukaemia Foundation (organiser), its officers, employees and
              volunteers and all sponsors (be they individuals or organisations,
              singularly or collectively) from and against all liabilities,
              claims, damages, suits, expenses, causes of action, injuries,
              losses or inconvenience of any description whatsoever arising in
              any way from my participation in the activities.
            </p>
            <p>
              I agree to ensure that any fundraising I undertake for
              World&apos;s Greatest Shave will follow the Leukaemia Foundation’s
              Fundraising Guidelines and will comply with any relevant federal,
              state or local legislation. The Leukaemia Foundation reserves the
              right to withdraw your authority to fundraise at any time if your
              fundraising activities could harm the image or reputation of the
              Leukaemia Foundation. If you wish to conduct additional
              fundraising activities other than receiving donations through the
              personal fundraising page provided, please contact us to arrange
              an authority to fundraise letter to cover your full fundraising
              activity.
            </p>
            <p>
              I confirm that I am over the age of eighteen (18) years, or, if I
              am under the age of eighteen (18) years I have obtained permission
              to participate from my parent / guardian.
            </p>
            <p>
              I also give permission for the free use by the Leukaemia
              Foundation of my name, image and voice in any broadcast, or any
              other account on social media, the World&apos;s Greatest Shave
              website or any media, of World&apos;s Greatest Shave.
            </p>
            <p>
              We will use your personal information for the purposes of the
              Event (including communicating with you and sending you
              information about the Event through various platforms including
              email, SMS, Facebook, Instagram, Twitter and other social media
              platforms), re-marketing to you after the Event, for other
              purposes explained in our Privacy Policy or as the law permits.
              You can unsubscribe or modify your preferences for how and when
              you are contacted at any time via the respective platform or by
              contacting Leukaemia Foundation{' '}
              <a href="https://www.leukaemia.org.au/about-us/contact-us/">
                https://www.leukaemia.org.au/about-us/contact-us/
              </a>
              .
            </p>
            <br />
            <br />
          </ContentContainer>
          <ModalFooter>
            <div>
              <Button
                type="button"
                buttonType="primary"
                buttonSize="small"
                onClick={() => this.setState({ isOpen: false })}
              >
                Close
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default TermsAndConditionsModal;
