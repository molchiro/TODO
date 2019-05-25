<template lang="pug">
  v-card.px-2
    v-layout
      v-checkbox(
        v-model='done'
      )
      v-flex {{todo.content}}
    
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
      done: !!val
    })
  }
}
</script>
