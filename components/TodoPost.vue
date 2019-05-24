<template lang="pug">
  v-form
    v-layout(row)
      v-text-field(
        v-model="content"
        @click:append="add"
        append-icon="create"
        solo
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TodoPostComponent extends Vue {
  content: string = ''
  add(): void {
    this.$store.dispatch('todos/add', this.content)
    this.content = ''
  }
}
</script>
