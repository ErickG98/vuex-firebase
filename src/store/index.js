import Vue from 'vue'
import Vuex from 'vuex'

import {verifyToken} from './../services/auth'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    auth: false
  },
  mutations: {
    CHANGE_AUTH (state) {
      state.auth = true;
    },
    LOG_OUT (state) {
      state.auth = false;
    }
  },
  actions: {
    verifyAuth () {
      if ( sessionStorage.getItem ('token') ) {
        if ( verifyToken(sessionStorage.getItem ('token') ) ) {
          this.commit ('CHANGE_AUTH')
        }
      }
    },
    logOut(){
      this.commit ('LOG_OUT')
    }
  },
  getters: {
    auth: state => state.auth
  },
  modules: {
  }
})
