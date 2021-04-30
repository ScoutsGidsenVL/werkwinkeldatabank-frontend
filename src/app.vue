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
  font-family: $body-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  main {

    button {
      padding: 8px 35px 8px 35px;
      font-weight: 900;
      color: $white !important;
    }

    button:hover {
      border-radius: 10px;
      background-color: $dark-green !important;
      border-color: $dark-green !important;
    }

    h2 {
      font-weight: 900;
    }

    h3 {
      color: $primary;
      font-weight: 900;
    }

    a.btn {
      color: $white !important;
      font-weight: 900;
    }

    .ck {
      color: $primary;
      button {
        padding: 2.3px 2.3px 2.3px 2.3px;
      }
    }

    .custom-control-input:checked ~ .custom-control-label::before {
      color: #fff;
      border-color: $dark-green !important;
      background-color: $dark-green !important;
    }

    .form-group label {
      font-weight: 900;
    }

    .multiselect__select {
      width: 16px;
      border-radius: 37px;
      height: 16px;
      top: 9px;
      right: 7px;
      background-color: $primary;
    }

    .multiselect__select:before {
      border: none;
      top: -94%;
      color: $white;
      font-size: 22px;
      right: 9px;
      content: "⌄";
    }

    .multiselect__tags {
      color: $primary;
      background: $white !important;
      border-radius: 0px;
      border: 0px;
      border-bottom: 3px solid $primary;
      min-height: 38px;
      max-height: 38px;
    }

    .multiselect__option {
      border-bottom: 1px solid $gray;
    }

    .form-control {
      border: none;
      border-bottom: 3px solid $primary;
    }
  }
}

#app>main{
  min-height: 100vh;
}
</style>
