<template>
<header class="border border-top-0 border-left-0 border-right-0 mb-0 pt-5 ">
    <div class="container">
      <div class="row">
        <b-col cols="12" class="text-left">
              <h1>{{$route.meta.title}}</h1>
        </b-col>
        <b-col cols="12" class="mt-3">
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'WerkwinkelOverview'}" >Werkwinkels</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'ThemeOverview'}" >Thema's</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'BuildingBlockOverview'}" >Bouwstenen</router-link>
            </li>
          </ul>
        </b-col>
      </div>
    </div>
</header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'custom-header'
})
</script>

<style lang="scss" scoped>
  ::v-deep .router-link-exact-active,
  ::v-deep .router-link-active{
    border-bottom: 2px solid black;
    color: black;
    font-weight: 700;
  }
</style>
