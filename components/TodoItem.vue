<template lang="pug">
  v-list-tile
    v-btn.mx-0(
      @click="raisePriority"
      icon
      small
    )
      v-icon arrow_upward
    v-btn.ml-0(
      @click="lowerPriority"
      icon
      small
    )
      v-icon arrow_downward
    v-checkbox(
      v-model='done'
    )
    v-list-tile-content
      v-list-tile-title {{todo.content}} {{todo.priority}}
    v-icon(@click='deleteTodo') delete
    
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
      ...this.todo,
      id: this.todo.id,
      done: !!val
    })
  }
  deleteTodo(): void {
    this.$store.dispatch('todos/delete', this.todo.id)
  }
  raisePriority(): void {
    this.$store.dispatch('todos/raisePriority', this.todo.id)
  }
  lowerPriority(): void {
    this.$store.dispatch('todos/lowerPriority', this.todo.id)
  }
}
</script>
