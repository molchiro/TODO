<template lang="pug">
  div {{todo.content}}
    div {{todo.done}}
    div {{todo.priority}}
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoItemComponent extends Vue {
  @Prop()
  readonly todo
}
</script>
