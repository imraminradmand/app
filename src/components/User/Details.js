import { array, bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Cnt from '../Container'
import Icon from '../Icon'
import { colors, media } from '../../styles'

import DetailsInfo from './DetailsInfo'
import DetailsHeader from './DetailsHeader'
import DetailsMapathons from './DetailsMapathons'
import DetailsReviews from './DetailsReviews'
import DetailsTeams from './DetailsTeams'
import messages from './messages'

const Container = styled(Cnt)`
  justify-content: flex-start;
  padding: ${props => (props.canEdit ? '2rem 0 7rem 0' : '2rem 0')};
  margin-left: auto;
  margin-right: auto;
  
  ${media.desktop`
    padding: 2rem 0;
  `};
`

const ButtonsWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  padding: 0 1rem;
  width: 100%;

  ${media.desktop`
    position: static;
    margin-top: 2rem;
    padding: 0;
  `};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default class Details extends React.Component {
  static propTypes = {
    id: string,
    avatar: string,
    firstName: string,
    lastName: string,
    description: string,
    showEmail: bool,
    showPhone: bool,
    email: string,
    phone: string,
    ranking: number,
    reviewsAmount: number,
    teams: array,
    events: array,
    sendingRequest: bool.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    signOut: func.isRequired,
    showEditUser: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const {formatMessage} = this.context.intl

    let canEditUser = false
    if (
      this.props.isAuthenticated &&
      this.props.userData.id === this.props.id
    ) {
      canEditUser = true
    }

    return (
      <Container canEdit={canEditUser} className="mx-auto">
        <DetailsHeader
          avatar={this.props.avatar}
          description={this.props.description}
          name={`${this.props.firstName} ${this.props.lastName}`}
        />

        <DetailsInfo
          showEmail={this.props.showEmail}
          email={this.props.email}
          showPhone={this.props.showPhone}
          phone={this.props.phone}
        />

        <DetailsReviews
          ranking={this.props.ranking}
          amount={this.props.reviewsAmount}
        />

        {this.props.teams && this.props.teams.length > 0 ? (
          <DetailsTeams
            teams={this.props.teams}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}

        {this.props.events && this.props.events.length > 0 ? (
          <DetailsMapathons
            mapathons={this.props.events}
            sendingRequest={this.props.sendingRequest}
          />
        ) : null}

        {canEditUser ? (
          <ButtonsWrapper>
            <Button
              float
              backgroundColor={colors.alert}
              color="white"
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.signOut}
            >
              <ButtonContent>
                <Icon glyph="exit" size={1} color="white" />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.signOutButton)}
                </p>
              </ButtonContent>
            </Button>

            <Button
              float
              backgroundColor={colors.primary}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.showEditUser}
            >
              <ButtonContent>
                <Icon glyph="edit" size={1} color={colors.darkestGrey} />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.editUserButton)}
                </p>
              </ButtonContent>
            </Button>
          </ButtonsWrapper>
        ) : null}
      </Container>
    )
  }
}
