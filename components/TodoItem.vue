<template lang="pug">
  v-list-tile
    v-checkbox(v-model="done")
    v-list-tile-content
      v-list-tile-title {{todo.content}}
    v-icon(@click="deleteTodo") delete
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoItemComponent extends Vue {
  @Prop()
  readonly todo
  get done() {
    return this.todo.done
  }
  set done(val) {
    this.$store.dispatch('todos/updateDone', {
      id: this.todo.id,
      done: !!val
    })
  }
  deleteTodo(): void {
    this.$store.dispatch('todos/delete', this.todo.id)
  }
}
</script>
