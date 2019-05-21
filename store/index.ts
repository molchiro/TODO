import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import todos from './modules/todos'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      todos
    }
  })
}

export default createStore