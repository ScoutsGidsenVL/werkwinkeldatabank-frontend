<template>
<header class="border border-top-0 border-left-0 border-right-0 mb-0 pt-5 bg-light">
    <div class="header-container">
      <div class="row">
        <b-col cols="12" class="mt-3">
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'WerkwinkelOverview'}" >Werkwinkels</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'BuildingBlockOverview'}" >Bouwstenen</router-link>
            </li>
             <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'MijnWerkwinkelOverview'}" >Mijn werkwinkels</router-link>
            </li>
             <li class="nav-item">
              <b-dropdown v-show="can('workshops.publish_workshop') || can('workshops.publish_workshop')" variant="link"  text="Klaar voor publicatie">
                <b-dropdown-item class="nav-link"  v-show="can('workshops.publish_workshop')" :to="{name: 'PublicatieAangevraagdWerkwinkelOverview'}">
                  Te publiceren werkwinkels
                </b-dropdown-item>
                <b-dropdown-item class="nav-link"  v-show="can('workshops.publish_workshop')" :to="{name: 'PublicatieAangevraagdBouwstenenOverview'}">
                  Te publiceren bouwstenen
                </b-dropdown-item>
              </b-dropdown>
            </li>
            <li class="nav-item" v-show="can('workshops.add_theme')">
              <router-link class="nav-link" :to="{name: 'ThemeOverview'}" >Thema's</router-link>
            </li>
            <li class="nav-item" v-show="can('workshops.add_category')">
              <router-link class="nav-link" :to="{name: 'CategorieesOverview'}" >Soorten werkvormen</router-link>
            </li>
          </ul>
        </b-col>
      </div>
    </div>
</header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import usePermissions from '../../composables/usePermissions'

export default defineComponent({
  name: 'custom-header',
  setup () {
    const { can } = usePermissions()

    return {
      can
    }
  }
})
</script>

<style lang="scss" scoped>
  @import 'src/assets/variables.scss';
  .header-container {
    padding-left: 1em;
    max-width: none;
  }
  ::v-deep .router-link-exact-active,
  ::v-deep .router-link-active{
    border-bottom: 2px solid $secondary !important;
    color: $secondary !important;
    font-weight: 700;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
