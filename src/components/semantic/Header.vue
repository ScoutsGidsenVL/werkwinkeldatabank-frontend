<template>
<header>
 <header>
    <div class="container">
      <div class="row">
        <div class="col-12">
              <h1>{{$route.meta.title}}</h1>
        </div>
        <div class="col-12">
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'WerkwinkelOverview'}" >Werkwinkels</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Header'
})
</script>
