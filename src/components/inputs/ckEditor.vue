/* eslint-disable no-unused-vars */
<template>
     <validation-provider
        :rules="rules"
        v-slot="validationContext"
    >
      <b-form-group
        :id='id'
        :label='label'
        class="text-left"
        :class="{'ck-editor-big': big, 'not-valid': getValidationState(validationContext) === false}"
        label-for="title"
      >
        <ckeditor
        :editor="editor"
        v-model="input"
        :disabled="disabled"></ckeditor>
      </b-form-group>
    </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default defineComponent({
  name: 'ck-editor',
  props: {
    value: String,
    label: String,
    id: String,
    disabled: Boolean,
    big: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Object,
      default: () => { return { required: true, min: 3 } }
    }
  },
  setup ({ value }, { emit }) {
    let input = ref<string | undefined>(value)
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

::v-deep .not-valid .ck-editor {
  border: solid 1px red;
}
</style>
