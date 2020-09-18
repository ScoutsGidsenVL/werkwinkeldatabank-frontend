<template>
<base-form
  :defaultValue="form"
  :type='WorkshopEntityModel'
  :repo='WorkshopRepository'
  paramIdentifier='workshopId'
  redirectRoute="MijnWerkwinkelOverview"
  v-on:submitSuccess='afterSubmit'
>
  <template v-slot:default="{ formData }">
    <b-row>
      <sub-title label='Algemene info' />
      <b-col cols="12" md="10" class="mb-3 text-left">
        <text-input
          v-model="formData.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
        <b-form-checkbox
          id="checkbox-1"
          v-model="formData.isSensitive"
          name="is-sensetive"
          value="true"
        >
          Gevoelige inhoud
        </b-form-checkbox>
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
  <template #actions='{handleSubmit, onSubmit, validate, formData}'>
    <b-button
      v-if="formData.workshopStatus === 'PRIVATE'"
      type="submit"
      @click.prevent='saveAndPublish(handleSubmit,onSubmit, validate, transitionTypes.requestPublication)'
      variant="light"
      size="lg"
      class="px-5 py-2 ml-2">
      Opslaan en vraag publicatie
      </b-button>
    <b-button
      v-if="formData.workshopStatus === 'PUBLICATION_REQUESTED'"
      type="submit"
      @click.prevent='saveAndPublish(handleSubmit,onSubmit, validate, transitionTypes.publish)'
      variant="light"
      size="lg"
      class="px-5 py-2 ml-2">
      Opslaan en publiceer
      </b-button>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import TimeInput from '../../components/inputs/timeInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlockInput from '../../components/inputs/buildingBlockInput.vue'
import ckEditor from '../../components/inputs/ckEditor.vue'
import ThemeRepository from '../../repositories/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import WorkshopRepository, { transitionTypes } from '../../repositories/workshopRepository'
import subTitle from '../../components/semantic/subTitle.vue'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import RepositoryFactory from '@/repositories/repositoryFactory'

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
      is_sensitive: false,
      buildingBlocks: [],
      workshop_status_type: 'PRIVATE'
    }))
    const publishWorkshop = ref<transitionTypes>(transitionTypes.noTransition)
    const afterSubmit = (result: WorkshopEntityModel) => {
      if (publishWorkshop.value !== transitionTypes.noTransition) {
        RepositoryFactory.get(WorkshopRepository).transitionWorkshop(result, publishWorkshop.value)
      }
    }

    const saveAndPublish = (handleSubmit, onSubmit, validate, transition : transitionTypes) => {
      validate().then((valid: boolean) => {
        if (valid) {
          publishWorkshop.value = transition
          handleSubmit(onSubmit)
        } else {
          publishWorkshop.value = transition
        }
      })
    }

    return {
      inputTypes,
      form,
      WorkshopRepository,
      ThemeRepository,
      WorkshopEntityModel,
      afterSubmit,
      saveAndPublish,
      transitionTypes
    }
  }
})
</script>
