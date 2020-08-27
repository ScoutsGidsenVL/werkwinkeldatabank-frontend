<template>
<base-form
  :defaultValue="form"
  :type='WorkshopEntityModel'
  :repo='WorkshopRepository'
  paramIdentifier='workshopId'
  redirectRoute="WerkwinkelOverview"
>
  <template v-slot:default="{ formData }">
    <b-row>
      <sub-title label='Algemene info' />
      <b-col cols="12" md="10" class="mb-3">
        <text-input
          v-model="formData.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="3">
        <time-input
          label='Tijdsduur'
          id="duration"
          v-model="formData.duration"
        />
      </b-col>
      <b-col cols="12"  md="7">
        <select-input
          v-model='formData.theme'
          label='Thema'
          id="theme"
          :repo='ThemeRepository'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12" md="10">
        <ck-editor
          v-model="formData.necessities"
          label="Benodigdheden"
          id="necessities"
          :big="false"
        />
      </b-col>
      <b-col cols="12" md="10">
        <ck-editor
          v-model="formData.description"
          label="Omschrijving"
          id="description"
          :big="false"
        />
      </b-col>
      <sub-title label='Bouwstenen' />
      <building-block-input v-model='formData.buildingBlocks' />
    </b-row>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import TimeInput from '../../components/inputs/timeInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlockInput from '../../components/inputs/buildingBlockInput.vue'
import ckEditor from '../../components/inputs/ckEditor.vue'
import ThemeRepository from '../../repositories/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import WorkshopRepository from '../../repositories/workshopRepository'
import subTitle from '../../components/semantic/subTitle.vue'

export default defineComponent({
  name: 'workshop-form',
  components: {
    TextInput,
    SelectInput,
    ckEditor,
    BaseForm,
    TimeInput,
    BuildingBlockInput,
    subTitle
  },
  setup ({ value }, { emit }) {
    const form = reactive<WorkshopEntityModel>(WorkshopEntityModel.deserialize({
      title: null,
      id: null,
      duration: '1:30:00',
      description: null,
      necessities: null,
      theme: null,
      buildingBlocks: []
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
