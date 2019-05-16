import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import todos from './modules/todos'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      users,
      todos
    }
  })
}

export default createStore