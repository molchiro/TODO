<template lang="pug">
  div
    div Prop {{inherited}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  @Prop()
  public inherited!: string
}
</script>
