<template>
  <div id="app" class="position-relative">
    <global-loader />
    <custom-header />
    <main class="py-4">
      <base-page><router-view :key="$route.path" /></base-page>
    </main>
    <custom-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/semantic/Header.vue'
import Footer from './components/semantic/Footer.vue'
import BasePage from './components/semantic/BasePage.vue'
import GlobalLoader from './components/semantic/GlobalLoader.vue'

export default Vue.extend({
  name: 'scouts-wwdb',
  components: {
    'custom-header': Header,
    'custom-footer': Footer,
    'base-page': BasePage,
    'global-loader': GlobalLoader
  }
})
</script>

<style lang="scss">
@import 'src/assets/variables.scss';
#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app>main{
  min-height: 100vh;
}
</style>
