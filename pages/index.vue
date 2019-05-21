<template lang="pug">
  v-layout
    v-btn(@click="signOut") sign out
    todo-list
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TodoList: () => import('~/components/TodoList.vue')
  }
})
export default class Index extends Vue {
  signOut(): void {
    this.$store.dispatch('auth/signOut')
    this.$router.push('sign_in')
  }
}
</script>
