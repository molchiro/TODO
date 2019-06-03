<template lang="pug">
  v-list-tile
    v-checkbox(
      v-model='done'
    )
    v-list-tile-content
      v-list-tile-title {{todo.content}}
    
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
    this.$store.dispatch('todos/update', {
      ...this.todo,
      id: this.todo.id,
      done: !!val
    })
  }
}
</script>
