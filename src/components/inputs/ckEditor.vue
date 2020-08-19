/* eslint-disable no-unused-vars */
<template>
     <validation-provider
        :rules="{ required: true, min: 3 }"
    >
      <b-form-group
        :id='id'
        :label='label'
        class="text-left"
        :class="{'ck-editor-big': big}"
        label-for="title"
      >
        <ckeditor :editor="editor" v-model="input"></ckeditor>
      </b-form-group>
    </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


export enum inputTypes {
    text = 'text',
    email = 'email'
}

export default defineComponent({
  name: 'ck-editor',
  props: {
    value: String,
    label: String,
    id: String,
    big: {
      type: Boolean,
      default: true
    }
  },
  setup ({ value }, { emit }) {
    let input = ref<String | undefined>(value)
    const editor = ref<ClassicEditor>(ClassicEditor)

    watch(input, value => {
      emit('input', value)
    })

    return {
      getValidationState,
      input,
      editor
    }
  }
})
</script>

<style lang='scss' scoped>
::v-deep .ck-editor-big .ck-editor__editable {
min-height: 500px;
}

::v-deep .ck-editor__editable {
min-height: 250px;
}
</style>
