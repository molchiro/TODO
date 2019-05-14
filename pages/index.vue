<template lang="pug">
  v-layout
    MyComponent(inherited="Hello World!!!!")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    MyComponent: () => import('~/components/MyComponent.vue')
  }
})
export default class Index extends Vue {}
</script>
