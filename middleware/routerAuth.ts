export default async function({ store, redirect, route }) {
  if (store.getters['auth/isLoaded'] === false) {
    await store.dispatch('auth/getCurrentUser')
  }
  if (store.getters['auth/isAuthed']) {
    if (route.name === 'sign_in')
    redirect({ name: 'index' })
  } else {
    if (route.name !== 'sign_in')
    redirect({ name: 'sign_in' })
  }
}