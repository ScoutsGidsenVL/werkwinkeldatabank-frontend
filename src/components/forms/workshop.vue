<template>
<validation-observer ref="observer" v-slot="{ handleSubmit }">
  <b-form  @submit.stop.prevent="handleSubmit(onSubmit)">
    <b-row>
      <b-col cols="12" md="8">
        <text-input
          v-model="form.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="8">
           <text-input
            v-model="form.duration"
            label="Tijdsduur"
            id='duration'
            :type="inputTypes.text"
          />
      </b-col>
      <b-col cols="12" md="8">
            <select-input
              v-model='form.theme'
              label='Thema'
              id="theme"
              :repo='ThemeRepository'
              :selectOptions='[ "thema1", "thema2"]'
            ></select-input>
      </b-col>
      <b-col cols="12">
          <ckeditor :editor="state.editor" v-model="form.description"></ckeditor>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left mt-4" >
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-col>
    </b-row>
  </b-form>
</validation-observer>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import TextInput, { inputTypes } from '../inputs/textInput.vue'
import SelectInput from '../inputs/selectInput.vue'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import ThemeRepository from '../../repositories/themeRepository'

export default defineComponent({
  components: {
    'text-input': TextInput,
    'select-input': SelectInput
  },
  setup () {
    const state = reactive({
      editor: ClassicEditor
    })

    const form = reactive(WorkshopEntityModel.deserialize({
      title: null,
      id: null,
      duration: null,
      description: null,
      theme: null
    }))

    const onSubmit = () : void => console.log(form.serialize())

    return {
      state,
      onSubmit,
      form,
      inputTypes,
      ThemeRepository
    }
  }
})
</script>
