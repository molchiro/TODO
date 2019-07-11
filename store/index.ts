import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import authModule from './modules/auth'
import todos from './modules/todos'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations,
    },
    modules: {
      auth: authModule,
      todos
    }
  })
}

export default createStore