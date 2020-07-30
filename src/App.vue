<template>
  <div id="app">
  <custom-header />
  <main>
     <base-page><router-view></router-view></base-page>
  </main>
 <custom-footer />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/semantic/Header.vue'
import Footer from './components/semantic/Footer.vue'
import BasePage from './components/semantic/BasePage.vue'

export default Vue.extend({
  name: 'scouts-wwdb',
  components: {
    'custom-header': Header,
    'custom-footer': Footer,
    'base-page': BasePage
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
