<template>
<base-overview
    :repo='CategoriesRepository'
    label="categorie"
    :showFilters="false"
    createRoute="CategoryCreate"
    createPermission="workshops.add_category"
  >
    <template #content='{ results }'>
      <b-row
        v-for="category in results"
        class="category-item bg-light mb-3 p-4"
        :key='category.id'>
        <b-col
          cols='10'
        >
            {{ category.title }}
            <disabled-badge  v-show='category.isDisabled && can("scouts_auth.access_disabled_entities")' />
        </b-col>
        <b-col
          cols='2'
          class="text-right">
            <b-button variant="primary text-dark"
              v-if='can("workshops.change_category")'
              :to="{name: 'CategoryEdit', params: { categoryId: category.id }}"  >
                bewerken
            </b-button>
        </b-col>
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CategoriesRepository from '../../repositories/entities/privateCategoriesRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import DisabledBadge from '../../components/semantic/disabledBadge.vue'
import usePermissions from '@/composables/usePermissions'

export default defineComponent({
  name: 'categories-overview',
  components: {
    BaseOverview,
    'disabled-badge': DisabledBadge
  },
  setup () {
    const { can } = usePermissions()

    return {
      CategoriesRepository,
      can
    }
  }
})
</script>

<style scoped lang='scss'>
  @import 'src/assets/variables.scss';
  .category-item{
    border-bottom: 4px solid $secondary;
  }
</style>

