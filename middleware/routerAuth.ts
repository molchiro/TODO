import { getModule } from 'vuex-module-decorators'
import authModule from '@/store/modules/auth'

export default async function({ store, redirect, route }) {
  const authStore = getModule(authModule, store)
  if (authStore.isLoaded === false) {
    await authStore.getCurrentUser()
  }
  if (authStore.isAuthed) {
    if (route.name === 'sign_in')
    redirect({ name: 'index' })
  } else {
    if (route.name !== 'sign_in')
    redirect({ name: 'sign_in' })
  }
}