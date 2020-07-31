// @flow

import * as React from 'react';
import getTeams from './getTeams';
import {
  Anchor,
  AnchorButton,
  FormHeading,
  FormSubheading,
  Heading,
  Loader,
  Paragraph,
} from '../../signup/components';
import {
  CardButton,
  CardButtonsContainer,
  CardContent,
  CardHeading,
  CardImage,
  CardImageContainer,
  CardLink,
  Container,
  ContentContainer,
  JoinTeamWrapper,
  JoinTeamContainerMobile,
  JoinTeamWrapperMobile,
  Row,
  Wrapper,
} from './components';
import TeamSearchForm from './TeamSearchForm';
import { teamSearchRegColumns } from '../../signup/constants';

type $Props = {};

type $State = {
  activeChildIndex: number,
  selectedTeam: any,
  teams: any,
  teamSearchLoading: boolean,
};

const hideSignupContainer = (hide: boolean) => {
  const element = document.getElementsByClassName(
    'footer-registration-container',
  )[0];
  const arr = element.className.split(' ');

  if (hide) {
    if (arr.indexOf('hide') === -1) {
      element.className += ` ${'hide'}`;
    }
  }

  if (arr.indexOf('hide') >= 0) {
    element.className = element.className.replace(/\\hide\b/g, '');
  }
};

class RegistrationSelection extends React.Component<$Props, $State> {
  state = {
    activeChildIndex: 0,
    selectedTeam: undefined,
    teams: undefined,
    teamSearchLoading: true,
  };

  fetchTeams() {
    const { teamSearchLoading } = this.state;

    if (teamSearchLoading) {
      getTeams().then(teams => {
        this.setState({ teams, teamSearchLoading: false });
      });
    }
  }

  render() {
    const {
      activeChildIndex,
      selectedTeam,
      teamSearchLoading,
      teams,
    } = this.state;

    const JoinTeamButton = () => (
      <AnchorButton
        href={
          selectedTeam &&
          selectedTeam[teamSearchRegColumns.teamId] &&
          `/signup/${selectedTeam[teamSearchRegColumns.teamId]}`
        }
        buttonType="secondary"
        wide
        disabled={!(selectedTeam && selectedTeam[teamSearchRegColumns.teamId])}
      >
        Join this team!
      </AnchorButton>
    );

    return (
      <Wrapper>
        <Container>
          <Row>
            <div>
              <FormHeading>How will you take part?</FormHeading>
              <FormSubheading>
                Sign up and fundraise as an individual or take part together
                with others
              </FormSubheading>
            </div>
          </Row>
          <Row>
            <CardButtonsContainer>
              <CardLink href="/signup" active={activeChildIndex === 0}>
                <CardImageContainer>
                  <CardImage
                    style={{
                      backgroundImage:
                        'url("/assets/img/signup-individual.svg")',
                    }}
                  />
                </CardImageContainer>
                <CardHeading>Individual</CardHeading>
                <CardContent>
                  Shave or colour your hair as an individual and fundraise for
                  the Leukaemia Foundation.
                </CardContent>
              </CardLink>
              <CardButton
                active={activeChildIndex === 1}
                onClick={() => {
                  this.fetchTeams();
                  this.setState({ activeChildIndex: 1 });
                  hideSignupContainer(true);
                }}
              >
                <CardImageContainer>
                  <CardImage
                    style={{
                      backgroundImage:
                        'url("/assets/img/signup-join-a-team.svg")',
                    }}
                  />
                </CardImageContainer>
                <CardHeading>Join a Team</CardHeading>
                <CardContent>
                  Search for an existing team to join and fundraise together
                  with friends, family, at work or at school.
                </CardContent>
                <JoinTeamWrapperMobile>
                  {activeChildIndex === 1 && teamSearchLoading && <Loader />}
                  {activeChildIndex === 1 && !teamSearchLoading && teams && (
                    <JoinTeamContainerMobile>
                      <TeamSearchForm
                        handleOnSelect={(selectedItem: any) => {
                          this.setState({ selectedTeam: selectedItem });
                        }}
                        teams={teams}
                        label="Team name"
                        placeholder="Start typing team name to search"
                      />
                      <JoinTeamButton />
                    </JoinTeamContainerMobile>
                  )}
                </JoinTeamWrapperMobile>
              </CardButton>
              <CardLink href="team/signup" active={activeChildIndex === 2}>
                <CardImageContainer>
                  <CardImage
                    style={{
                      backgroundImage:
                        'url("/assets/img/signup-start-a-team.svg")',
                    }}
                  />
                </CardImageContainer>
                <CardHeading>Start a Team</CardHeading>
                <CardContent>
                  Start your own team as team captain to organise fundraising
                  with friends, family, at work or at school.
                </CardContent>
              </CardLink>
            </CardButtonsContainer>
          </Row>
          {activeChildIndex === 0 && (
            <Row>
              <ContentContainer>
                <div className="text-center">
                  <AnchorButton
                    className="hide-for-small-only"
                    href="/signup"
                    buttonType="secondary"
                    wide
                  >
                    Sign up
                  </AnchorButton>
                </div>
              </ContentContainer>
            </Row>
          )}
          <JoinTeamWrapper>
            {activeChildIndex === 1 && teamSearchLoading && <Loader />}
            {activeChildIndex === 1 && !teamSearchLoading && (
              <Row>
                <ContentContainer>
                  <div className="text-center">
                    <Heading type="h2">Search for a team to join</Heading>
                    <Heading type="h4">
                      If you know someone who’s already started a team, search
                      for their team below.
                    </Heading>
                  </div>
                  {teams && (
                    <TeamSearchForm
                      handleOnSelect={(selectedItem: any) => {
                        this.setState({ selectedTeam: selectedItem });
                      }}
                      teams={teams}
                      placeholder="Start typing your team name and select from the list"
                    />
                  )}
                  <div className="text-center">
                    <JoinTeamButton />
                    <Paragraph>
                      Can’t find the team you’re looking for?
                    </Paragraph>
                    <Paragraph>
                      No worries, you can{' '}
                      <Anchor href="/signup">register as an individual</Anchor>{' '}
                      and start or join a team later!
                    </Paragraph>
                  </div>
                </ContentContainer>
              </Row>
            )}
          </JoinTeamWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default RegistrationSelection;
