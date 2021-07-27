<template>
     <validation-provider
        :rules="rules"
        v-slot="validationContext"
        :name='label'
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
      <b-form-invalid-feedback v-for="error in validationContext.errors" :key="error">{{ error }}</b-form-invalid-feedback>
    </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import Link from '@ckeditor/ckeditor5-link/src/link'
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'


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

    let config : any = {
      plugins: [
        EssentialsPlugin,
        Bold,
        Italic,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Link,
        ListStyle,
        Paragraph,
        SimpleUploadAdapter,
        Alignment,
        Table,
        TableToolbar
      ],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h3', title: 'Heading 1', class: 'ck-heading_heading3' },
          { model: 'heading2', view: 'h4', title: 'Heading 2', class: 'ck-heading_heading4' },
          { model: 'heading3', view: 'h5', title: 'Heading 3', class: 'ck-heading_heading5' }
        ]
      },
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'imageUpload',
          'undo',
          'redo',
          'insertTable'
        ]
      },
      image: {
        // maxFileSize: 102400,
        toolbar: [
          'imageStyle:full',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: root.$store.state.config.config.api.baseUrl + '/' + root.$store.state.config.config.api.apiSuffix + 'files/upload/',
        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          Authorization: 'Bearer ' + root.$store.state.openid.accessToken
        }
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

 .not-valid ~ .invalid-feedback{
    display: block;
    text-align: left;
  }

  ::v-deep .ck.ck-tooltip .ck-tooltip__text {
    color: white !important;
}
</style>
