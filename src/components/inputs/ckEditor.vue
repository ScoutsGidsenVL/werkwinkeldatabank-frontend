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
        :config='config'
        :disabled="disabled"></ckeditor>
      </b-form-group>
    </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'
import ClassicEditor from 'ckeditor5-build-classic-with-upload-image'

export default defineComponent({
  name: 'ck-editor',
  props: {
    value: String,
    label: String,
    id: String,
    disabled: Boolean,
    toolbarItems: Array,
    big: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Object,
      default: () => { return { required: true, min: 3 } }
    }
  },
  setup ({ value, toolbarItems }, { emit, root }) {
    let input = ref<string | undefined>(value)
    const editor = ref<ClassicEditor>(ClassicEditor)

    watch(input, value => {
      emit('input', value)
    })

    let config = {
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: root.$store.state.config.config.api.baseUrl + '/' + root.$store.state.config.config.api.apiSuffix,

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          Authorization: 'Bearer ' + root.$store.state.openid.accessToken
        }
      },
      toolbar: {

      }
    }

    if (toolbarItems) {
      config['toolbar'] = {
        items: toolbarItems
      }
    }

    return {
      getValidationState,
      input,
      editor,
      config
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
