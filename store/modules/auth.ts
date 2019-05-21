import { auth, googleProvider } from '~/plugins/firebaseApp'

interface State {
  isLoaded: boolean,
  authedUser: any
}

export default {
  namespaced: true,
  state(): State {
    return {
      isLoaded: false,
      authedUser: null
    }
  },
  mutations: {
    loadedUser(state, user) {
      state.authedUser = user
      state.isLoaded = true
    },
  },
  getters: {
    isAuthed: state => {
      return state.authedUser !== null
    },
    isLoaded: state => {
      return state.isLoaded
    },
  },
  actions: {
    signIn({ commit }): void {
      auth.signInWithRedirect(googleProvider)
    },
    async getCurrentUser({ commit }) {
      const currentUser: firebase.User | null = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged(authenticatedUser => {
          resolve(authenticatedUser)
        })
      })
      commit('loadedUser', currentUser)
    },
  }
}