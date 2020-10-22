<template>
<base-form
  :defaultValue="form"
  :type='BuildingBlocksEntityModel'
  :repo='BuildingBlocskRepository'
  editRoute='BuildingBlockEdit'
  paramIdentifier='buildingBlockId'
  :redirectRoute='redirectRoute'
  v-on:submitSuccess='afterSubmit'
  :historyModal="true"
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
      <b-col cols="12" md="10" class="mb-3 text-left">
        <b-form-checkbox
          id="is-sensetive"
          v-model="formData.isSensitive"
          name="is-sensetive"
          value="true"
        >
          Gevoelige inhoud
        </b-form-checkbox>
      </b-col>
      <b-col cols="12" md="10" class="mb-3 text-left" can='scouts_auth.access_disabled_entities'>
        <b-form-checkbox
          id="is-disabled"
          v-model="formData.isDisabled"
          name="is-disabled"
          value="true"
        >
          Verborgen
        </b-form-checkbox>
      </b-col>
      <b-col cols="12" md="8">
         <text-input
          v-model="formData.duration"
          label="Tijdsduur"
          id='duration'
          :type="inputTypes.time"
        />
      </b-col>
      <b-col cols="12" md="8">
        <select-input
          label='Type'
          id="type"
          v-model="formData.type"
          :options='types'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12"  md="8">
        <select-input
          v-model='formData.category'
          label='Soorten werkvormen'
          id="category"
          :repo='CategoryRepository'
          :multiple='false'
          v-show="formData && formData.type === BuildingBlocksTypes.METHODIC"
          :rules="(formData && formData.type === BuildingBlocksTypes.METHODIC) ? { required: true } : {}"
        />
        <select-input
          v-model='formData.theme'
          label='Thema'
          :searchable="true"
          id="theme"
          :repo='ThemeRepository'
          :multiple='false'
          v-show="formData && formData.type === BuildingBlocksTypes.THEMATIC"
          :rules="(formData && formData.type === BuildingBlocksTypes.THEMATIC) ? { required: true } : {}"
        />
      </b-col>
      <b-col cols="12">
        <text-input
          v-model="formData.shortDescription"
          label="Korte omschrijving"
          id="shortDescription"
          :rules='{}'
          :textarea="true"
        />
      </b-col>
      <b-col cols="12">
        <ck-editor
          v-model="formData.description"
          label="Omschrijving"
          id="description"
        />
      </b-col>
      <b-col cols="12">
        <ck-editor
          v-model="formData.necessities"
          label="Benodigdheden"
          :toolbarItems='["bulletedList"]'
          id="necessities"
          :rules='{}'
          :big="false"
        />
      </b-col>
    </b-row>
  </template>
   <template #actions='{ saveWithoutRedirect, onSubmit, validate, formData}'>
    <b-button
      v-if="formData.BuildingblockStatus === 'PRIVATE'"
      type="submit"
      @click.prevent='saveAndPublish(saveWithoutRedirect,onSubmit, validate, transitionTypes.requestPublication)'
      variant="light"
      size="md"
      class="px-5 py-2 ">
      Opslaan en vraag publicatie
      </b-button>
    <b-button
      v-if="formData.BuildingblockStatus === 'PUBLICATION_REQUESTED' && can('workshops.publish_buildingblocktemplate')"
      type="submit"
      @click.prevent='saveAndPublish(saveWithoutRedirect,onSubmit, validate, transitionTypes.publish)'
      variant="light"
      size="md"
      class="px-5 py-2">
      Opslaan en publiceer
      </b-button>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import TimeInput from '../../components/inputs/timeInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import { transitionTypes } from '../../repositories/withTransitionRepository'
import BuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import CategoryRepository from '../../repositories/entities/categoriesRepository'
import ThemeRepository from '../../repositories/entities/themeRepository'
import usePermissions from '@/composables/usePermissions'
import useTransitions from '@/composables/useTransitions'

import BuildingBlocksRepository from '@/repositories/entities/buildingBlocskRepository'

export default defineComponent({
  name: 'building-blocks-form',
  components: {
    BaseForm,
    TextInput,
    ckEditor,
    SelectInput,
    TimeInput
  },
  setup (props, { emit, root }) {
    const form = reactive<BuildingBlocksEntityModel>(BuildingBlocksEntityModel.deserialize({
      title: null,
      id: null,
      duration: '1:30:00',
      description: null,
      is_sensitive: false,
      category: null,
      theme: null,
      type: BuildingBlocksTypes.THEMATIC,
      is_disabled: false
    }))
    const types : String[] = BuildingBlocksEntityModel.getTypesArray()
    const { can } = usePermissions()
    const redirectRoute = 'BuildingBlockView'
    const { afterSubmit, saveAndPublish } = useTransitions(BuildingBlocksRepository, redirectRoute, root)

    return {
      BuildingBlocksEntityModel,
      BuildingBlocskRepository,
      BuildingBlocksTypes,
      CategoryRepository,
      ThemeRepository,
      transitionTypes,
      saveAndPublish,
      redirectRoute,
      afterSubmit,
      inputTypes,
      types,
      form,
      can
    }
  }
})
</script>
