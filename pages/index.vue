<template lang="pug">
  v-layout(column)
    v-btn(@click="signOut") sign out
    todo-post
    todo-list
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TodoList: () => import('~/components/TodoList.vue'),
    TodoPost: () => import('~/components/TodoPost.vue')
  }
})
export default class Index extends Vue {
  signOut(): void {
    this.$store.dispatch('auth/signOut')
    this.$router.push('sign_in')
  }
}
</script>
