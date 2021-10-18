// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import GeneralSiteData from '@/content/pages/general.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  siteContent: {},
  modal: false,
  layerWidth: 1.375
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  siteContent: state => state.siteContent,
  modal: state => state.modal,
  layerWidth: state => state.layerWidth
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // //////////////////////////////////////////////////////////////// clearStore
  clearStore ({ commit }) {
    commit('CLEAR_STORE')
  },
  // /////////////////////////////////////////////////////////////// getBaseData
  async getBaseData ({ commit }, payload) {
    const key = typeof payload === 'string' ? payload : payload.key
    let data = false
    switch (key) {
      case 'general': data = GeneralSiteData; break
      default : data = payload.data; break
    }
    if (data) {
      await this.dispatch('global/setSiteContent', { key, data })
    }
  },
  // //////////////////////////////////////////////////////////// setSiteContent
  setSiteContent ({ commit }, payload) {
    commit('SET_SITE_CONTENT', payload)
  },
  // ////////////////////////////////////////////////////////////////// setModal
  setModal ({ commit }, payload) {
    commit('SET_MODAL', payload)
  },
  // ///////////////////////////////////////////////////////////// setLayerWidth
  setLayerWidth ({ commit }, payload) {
    commit('SET_LAYER_WIDTH', payload)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.siteContent = {}
  },
  SET_SITE_CONTENT (state, payload) {
    state.siteContent[payload.key] = payload.data
  },
  SET_MODAL (state, payload) {
    state.modal = payload
  },
  SET_LAYER_WIDTH (state, payload) {
    state.layerWidth = payload
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default {
  state,
  getters,
  actions,
  mutations
}
