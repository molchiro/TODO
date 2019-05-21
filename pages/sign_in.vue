<template lang="pug">
  v-layout(justify-center)
    v-progress-circular(
      v-if='loadingAuth'
      indeterminate
    )
    v-btn(
      v-else
      @click='signIn'
    ) sign in
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class logIn extends Vue {
  get loadingAuth(): boolean {
    return this.$store.getters['auth/isLoading']
  }
  signIn(): void {
    this.$store.dispatch('auth/signIn')
  }
}
</script>
