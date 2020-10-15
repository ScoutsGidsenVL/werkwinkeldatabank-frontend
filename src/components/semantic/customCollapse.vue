<template>
    <div class="w-100">
        <b-btn block href="#" v-b-toggle="'accordion-' + id" variant="white" class="pt-3 d-flex justify-content-between">
          <h3 class="d-inline-block">{{ title }}</h3>
            <span class="when-opened">
                <b-icon icon="chevron-down" aria-label="edit" class="mx-2 mt-2"></b-icon>
            </span>
            <span class="when-closed">
                <b-icon icon="chevron-right" aria-label="edit" class="mx-2 mt-2"></b-icon>
            </span>
        </b-btn>
        <b-collapse :visible='visible' :id="'accordion-' + id" role="tabpanel">
         <slot/>
        </b-collapse>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'custom-collapse',
  props: {
    title: String,
    id: String,
    visible: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang='scss'>
.collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
      display: none;
  }
</style>
