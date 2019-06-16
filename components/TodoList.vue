<template lang="pug">
  v-card
    todo-item(
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TodoItem: () => import('~/components/TodoItem.vue')
  }
})
export default class TodoListComponent extends Vue {
  get todos() {
    return this.$store.state.todos.todos
  }
  created(): void {
    this.$store.dispatch('todos/bind')
  }
  // destroyed(): void {
  //   this.$store.dispatch('todos/stopListener')
  // }
}
</script>
