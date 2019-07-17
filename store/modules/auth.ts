import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { auth, googleProvider } from '~/plugins/firebaseApp'

@Module({ namespaced: true, name: 'auth' })
export default class authModule extends VuexModule {
  isLoaded: boolean = false
  authedUser = {
    uid: ''
  }
  @Mutation
  loadedUser({ uid }) {
    this.authedUser.uid = uid
    this.isLoaded = true
  }
  get isAuthed(): boolean {
    return this.authedUser.uid !== ''
  }
  get authedUserUid(): string {
    return this.authedUser.uid
  }
  @Action
  signIn(): void {
    auth.signInWithRedirect(googleProvider)
  }
  @Action
  signOut(): void {
    auth.signOut()
    this.context.commit('loadedUser', { uid: '' })
  }
  @Action
  async getCurrentUser() {
    const currentUser: firebase.User | null = await new Promise((resolve, reject) => {
      auth.onAuthStateChanged(authenticatedUser => {
        resolve(authenticatedUser)
      })
    })
    const uid: string = currentUser ? currentUser.uid : ''
    this.context.commit('loadedUser', { uid })
  }
}