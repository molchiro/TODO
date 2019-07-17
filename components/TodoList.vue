<template lang="pug">
  v-card
    draggable(
      :value="todos"
      @end="moved($event)"
      delay="100"
    )
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
    TodoItem: () => import('~/components/TodoItem.vue'),
    draggable: () => import('vuedraggable')
  }
})
export default class TodoListComponent extends Vue {
  get todos() {
    return this.$store.state.todos.todos
  }
  created(): void {
    this.$store.dispatch('todos/bind')
  }
  moved(event): void {
    this.$store.dispatch('todos/updatePriority', event)
  }
}
</script>
