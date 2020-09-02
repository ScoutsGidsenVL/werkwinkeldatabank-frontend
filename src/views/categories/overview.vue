<template>
<base-overview
    :repo='CategoriesRepository'
    label="categorie"
    createRoute="CategoryCreate"
  >
    <template #content='{ results }'>
      <b-row
        v-for="category in results"
        class="border border-left-0 border-top-0 border-right-0 p-4"
        :key='category.id'>
        <b-col
          cols='10'
        >
            {{ category.title }}
        </b-col>
        <b-col
          cols='2'
          class="text-right">
             <router-link :to="{name: 'CategoryEdit', params: { categoryId: category.id }}"  >
                bewerken
            </router-link>
        </b-col>
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CategoriesRepository from '../../repositories/categoriesRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'

export default defineComponent({
  name: 'categories-overview',
  components: {
    BaseOverview
  },
  setup () {
    return {
      CategoriesRepository
    }
  }
})
</script>
