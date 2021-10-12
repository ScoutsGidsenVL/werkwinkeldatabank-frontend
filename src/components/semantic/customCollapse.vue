<template>
  <div class="w-100">
    <div class="mb-5">
      <b-btn
      block
      href="#"
      v-b-toggle="'accordion-' + id"
      variant="white"
      class="pt-3 d-flex justify-content-between  text-dark pb-4 pb-sm-0"
      v-bind:class="{ 'border-collapse': border, 'bg-light': extraClass } ">
        <h3 class="d-inline-block">{{ title }}</h3>
        <span class="when-opened">
            <b-icon variant="secondary" icon="chevron-down" aria-label="edit" class="mx-2 mt-2"></b-icon>
        </span>
        <span class="when-closed">
            <b-icon variant="secondary" icon="chevron-right" aria-label="edit" class="mx-2 mt-2"></b-icon>
        </span>
      </b-btn>
      <div class="text-right custom-header">
        <slot name="header"></slot>
      </div>
    </div>

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
    },
    border: {
      type: Boolean,
      default: true
    },
    extraClass: {
      type: String,
      required: false
    }
  }
})
</script>

<style scoped lang='scss'>
.collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
      display: none;
  }

  .border-collapse{
    border: 0px;
    border-bottom: 2px solid #572600;
  }

  .custom-header {
    margin-top: -2.2em;
    margin-right: 5em;
  }
</style>
