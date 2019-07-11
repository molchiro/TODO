import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { auth, googleProvider } from '~/plugins/firebaseApp'

@Module({ namespaced: true, name: 'auth' })
export default class authModule extends VuexModule {
  isLoaded: boolean = false
  authedUser = {
    uid: ''
  }
  @Mutation
  loadedUser(user: firebase.User) {
    this.authedUser.uid = user.uid
    this.isLoaded = true
  }
  get isAuthed() {
    return this.authedUser.uid !== ''
  }
  get authedUserUid() {
    return this.authedUser.uid
  }
  @Action
  signIn() {
    auth.signInWithRedirect(googleProvider)
  }
  @Action
  signOut() {
    auth.signOut()
    this.context.commit('loadedUser', null)
  }
  @Action
  async getCurrentUser() {
    const currentUser: firebase.User | null = await new Promise((resolve, reject) => {
      auth.onAuthStateChanged(authenticatedUser => {
        resolve(authenticatedUser)
      })
    })
    this.context.commit('loadedUser', currentUser)
  }
}