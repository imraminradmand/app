import { array, bool, func, object, string } from 'prop-types'
import React from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Footer from '../Footer'
import NavBar from '../NavBar'
import Spinner from '../Spinner'
import TopBar from '../../containers/TopBar'
import Wrp from '../Wrapper'

import Details from './Details'
import Edit from './Edit'
import messages from './messages'

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`

export default class Mapathon extends React.Component {
  static propTypes = {
    history: object.isRequired,
    loadingMapathon: bool.isRequired,
    mapathon: object.isRequired,
    poster: string.isRequired,
    isAuthenticated: bool.isRequired,
    userData: object.isRequired,
    editIsVisible: bool.isRequired,
    sendingRequest: bool.isRequired,
    getMapathon: func.isRequired,
    clearState: func.isRequired,
    errors: object.isRequired,
    loadingTeamsManagers: bool.isRequired,
    teamsManagers: array.isRequired,
    loadingUsers: bool.isRequired,
    users: array.isRequired,
    loadingTeams: bool.isRequired,
    teams: array.isRequired,
    clearErrors: func.isRequired,
    setNotificationMessage: func.isRequired,
    joinMapathon: func.isRequired,
    showEditMapathon: func.isRequired,
    clearError: func.isRequired,
    createPoster: func.isRequired,
    deletePoster: func.isRequired,
    setLocationCoordinates: func.isRequired,
    getTeamsManagers: func.isRequired,
    removeManager: func.isRequired,
    promoteParticipant: func.isRequired,
    removeParticipant: func.isRequired,
    removeTeam: func.isRequired,
    clearInvitationsState: func.isRequired,
    getUsers: func.isRequired,
    invite: func.isRequired,
    getTeams: func.isRequired,
    hideEditMapathon: func.isRequired,
    editMapathon: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    this.props.getMapathon()
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  render() {
    const {formatMessage} = this.context.intl

    let pageTitle = <Helmet title={formatMessage(messages.defaultPageTitle)} />
    if (this.props.editIsVisible) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.editPageTitle, {
            mapathonName: this.props.mapathon.name
          })}
        />
      )
    } else if (!this.props.loadingMapathon && this.props.mapathon.id) {
      pageTitle = (
        <Helmet
          title={formatMessage(messages.detailsPageTitle, {
            mapathonName: this.props.mapathon.name
          })}
        />
      )
    } else if (!this.props.loadingMapathon && !this.props.mapathon.id) {
      pageTitle = <Helmet title={formatMessage(messages.notFoundPageTitle)} />
    }

    let headerTitle = formatMessage(messages.detailsHeader)
    if (this.props.editIsVisible) {
      headerTitle = formatMessage(messages.editHeader)
    }

    let container = (
      <Details
        {...this.props.mapathon}
        isAuthenticated={this.props.isAuthenticated}
        userData={this.props.userData}
        sendingRequest={this.props.sendingRequest}
        joinMapathon={this.props.joinMapathon}
        showEditMapathon={this.props.showEditMapathon}
      />
    )
    if (this.props.editIsVisible) {
      container = (
        <Edit
          mapathon={this.props.mapathon}
          poster={this.props.poster}
          errors={this.props.errors}
          loadingTeamsManagers={this.props.loadingTeamsManagers}
          teamsManagers={this.props.teamsManagers}
          sendingRequest={this.props.sendingRequest}
          loadingUsers={this.props.loadingUsers}
          users={this.props.users}
          loadingTeams={this.props.loadingTeams}
          teams={this.props.teams}
          clearErrors={this.props.clearErrors}
          setNotificationMessage={this.props.setNotificationMessage}
          clearError={this.props.clearError}
          createPoster={this.props.createPoster}
          deletePoster={this.props.deletePoster}
          setLocationCoordinates={this.props.setLocationCoordinates}
          getTeamsManagers={this.props.getTeamsManagers}
          removeManager={this.props.removeManager}
          promoteParticipant={this.props.promoteParticipant}
          removeParticipant={this.props.removeParticipant}
          removeTeam={this.props.removeTeam}
          clearInvitationsState={this.props.clearInvitationsState}
          getUsers={this.props.getUsers}
          invite={this.props.invite}
          getTeams={this.props.getTeams}
          hideEditMapathon={this.props.hideEditMapathon}
          editMapathon={this.props.editMapathon}
        />
      )
    }

    return (
      <Wrapper>
        {pageTitle}

        <TopBar hideOn="phone,tablet" />

        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={headerTitle}
          goBackHandler={() => this.props.history.goBack()}
        />

        {this.props.loadingMapathon ? <Spinner /> : container}

        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    )
  }
}
