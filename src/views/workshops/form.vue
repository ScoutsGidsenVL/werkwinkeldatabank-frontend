<template>
<base-form
  :defaultValue="form"
  :type='WorkshopEntityModel'
  :repo='WorkshopRepository'
  paramIdentifier='workshopId'
>
  <template v-slot:default="{ formData }">
    <b-row>
      <b-col cols="12" md="8">
        <text-input
          v-model="formData.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="8">
           <text-input
            v-model="formData.duration"
            label="Tijdsduur"
            id='duration'
            :type="inputTypes.text"
          />
      </b-col>
      <b-col cols="12" md="8">
        <select-input
          v-model='formData.theme'
          label='Thema'
          id="theme"
          :repo='ThemeRepository'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12" md="8">
        <ck-editor
          v-model="formData.necessities"
          label="Benodigdheden"
          id="necessities"
          :big="false"
        />
      </b-col>
      <b-col cols="12">
        <ck-editor
          v-model="formData.description"
          label="Omschrijving"
          id="description"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left mt-4" >
        <b-button type="submit" variant="primary">Opslaan</b-button>
      </b-col>
    </b-row>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import ckEditor from '../../components/inputs/ckEditor.vue'
import ThemeRepository from '../../repositories/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseForm from '../../components/forms/baseForm.vue'
import WorkshopRepository from '../../repositories/workshopRepository'

export default defineComponent({
  name: 'workshop-form',
  components: {
    TextInput,
    SelectInput,
    ckEditor,
    BaseForm
  },
  setup ({ value }, { emit }) {
    const form = reactive<WorkshopEntityModel>(WorkshopEntityModel.deserialize({
      title: null,
      id: null,
      duration: null,
      description: null,
      necessities: null,
      theme: null
    }))

    return {
      inputTypes,
      form,
      WorkshopRepository,
      ThemeRepository,
      WorkshopEntityModel
    }
  }
})
</script>
