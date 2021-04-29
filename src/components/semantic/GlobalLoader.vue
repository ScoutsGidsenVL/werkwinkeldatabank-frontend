<template>
<div class="global-loader" v-show="this.$store.state.notifications.loading">
    <b-spinner
    label="Spinning" />
</div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'global-laoder'
})
</script>

<style lang='scss' scoped>
  @import 'src/assets/variables.scss';
  .global-loader {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
    min-height: 100vh;
  }
</style>
