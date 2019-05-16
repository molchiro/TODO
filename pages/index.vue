<template lang="pug">
  v-layout
    todo-list
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TodoList: () => import('~/components/TodoList.vue')
  }
})
export default class Index extends Vue {}
</script>
