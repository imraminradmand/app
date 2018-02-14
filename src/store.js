import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import appReducer from './containers/App/reducer'
import appSaga from './containers/App/saga'
import createMapathonReducer from './containers/CreateMapathonPage/reducer'
import createMapathonSaga from './containers/CreateMapathonPage/saga'
import createTeamReducer from './containers/CreateTeamPage/reducer'
import createTeamSaga from './containers/CreateTeamPage/saga'
import forgottenPasswordReducer from './containers/ForgottenPasswordPage/reducer'
import forgottenPasswordSaga from './containers/ForgottenPasswordPage/saga'
import languageProviderReducer from './containers/LanguageProvider/reducer'
import mapathonReducer from './containers/MapathonPage/reducer'
import mapathonSaga from './containers/MapathonPage/saga'
import mapathonsReducer from './containers/MapathonsPage/reducer'
import mapathonsSaga from './containers/MapathonsPage/saga'
import notificationReducer from './containers/Notification/reducer'
import petitionsReducer from './containers/PetitionsPage/reducer'
import petitionsSaga from './containers/PetitionsPage/saga'
import progressBarReducer from './containers/ProgressBar/reducer'
import resetPasswordReducer from './containers/ResetPasswordPage/reducer'
import resetPasswordSaga from './containers/ResetPasswordPage/saga'
import signInReducer from './containers/SignInPage/reducer'
import signInSaga from './containers/SignInPage/saga'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSaga from './containers/SignUpPage/saga'
import socialAuthReducer from './containers/SocialAuthPage/reducer'
import teamReducer from './containers/TeamPage/reducer'
import teamSaga from './containers/TeamPage/saga'
import teamsReducer from './containers/TeamsPage/reducer'
import teamsSaga from './containers/TeamsPage/saga'
import topBarReducer from './containers/TopBar/reducer'
import topBarSaga from './containers/TopBar/saga'
import venueReducer from './containers/VenuePage/reducer'
import venueSaga from './containers/VenuePage/saga'
import venuesReducer from './containers/VenuesPage/reducer'
import venuesSaga from './containers/VenuesPage/saga'
import {
  watchFacebookAuth,
  watchGoogleAuth
} from './containers/SocialAuthPage/saga'

const sagas = [
  appSaga,
  createMapathonSaga,
  createTeamSaga,
  forgottenPasswordSaga,
  mapathonSaga,
  mapathonsSaga,
  petitionsSaga,
  resetPasswordSaga,
  signInSaga,
  signUpSaga,
  teamSaga,
  teamsSaga,
  topBarSaga,
  venueSaga,
  venuesSaga,
  watchFacebookAuth,
  watchGoogleAuth
]

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}

const rootReducer = combineReducers({
  app: appReducer,
  createMapathon: createMapathonReducer,
  createTeam: createTeamReducer,
  forgottenPassword: forgottenPasswordReducer,
  language: languageProviderReducer,
  mapathon: mapathonReducer,
  mapathons: mapathonsReducer,
  notification: notificationReducer,
  petitions: petitionsReducer,
  progressBar: progressBarReducer,
  resetPassword: resetPasswordReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  socialAuth: socialAuthReducer,
  team: teamReducer,
  teams: teamsReducer,
  topBar: topBarReducer,
  venue: venueReducer,
  venues: venuesReducer
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store
