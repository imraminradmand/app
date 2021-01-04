import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Mapathons from '../../components/Mapathons'

import {
  clearState,
  getMapathons,
  setFilters,
  setPopupVisibility,
  clearFilters,
  setMapathons,
  setNextPage,
  setLoadingMapathons
} from './actions'
import makeSelectMapathons from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingMapathons: makeSelectMapathons('loadingMapathons'),
  nextPage: makeSelectMapathons('nextPage'),
  mapathons: makeSelectMapathons('mapathons'),
  filters: makeSelectMapathons('filters'),
  listVisibility: makeSelectMapathons('listVisibility'),
  popupVisibility: makeSelectMapathons('popupVisibility')
})

const mapDispatchToProps = dispatch => ({
  getMapathons: () => {
    dispatch(getMapathons())
  },
  clearState: () => {
    dispatch(clearState())
  },
  hideFilters: () => {
    dispatch(setFilters('visible', false))
  },
  clearFilters: () => {
    dispatch(clearFilters())
    dispatch(setMapathons([]))
    dispatch(setNextPage(''))
    dispatch(getMapathons())
  },
  applyFilters: filters => {
    dispatch(setFilters('visible', false))
    dispatch(setFilters('numberOfReviews', filters.numberOfReviews))
    dispatch(setFilters('date', filters.date))
    dispatch(setFilters('geolocation', filters.geolocation))
    dispatch(setFilters('hideZeroReviews', filters.hideZeroReviews))
    dispatch(setFilters('hideInactiveMapathons', filters.hideInactiveMapathons))
    dispatch(setLoadingMapathons(true))
    dispatch(setMapathons([]))
    dispatch(setNextPage(1))
    dispatch(getMapathons(filters))
  },
  showPopup: () => {
    dispatch(setPopupVisibility(true))
  },
  hidePopup: () => {
    dispatch(setPopupVisibility(false))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  }
})

const MapathonsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mapathons)

export default MapathonsPage
