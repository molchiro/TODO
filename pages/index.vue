<template lang="pug">
  v-layout(column)
    v-flex(shrink)
      v-btn( 
        @click="signOut"
        block
      ) sign out
    v-flex(shrink)
      todo-post
    v-flex(grow)
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
