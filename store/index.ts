import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import auth from './modules/auth'
import todos from './modules/todos'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations,
    },
    modules: {
      auth,
      todos
    }
  })
}

export default createStore