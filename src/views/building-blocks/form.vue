<template>
<base-form
  :defaultValue="form"
  :type='BuildingBlocksEntityModel'
  :repo='BuildingBlocskRepository'
  editRoute='BuildingBlockEdit'
  paramIdentifier='buildingBlockId'
  :redirectRoute='redirectRoute'
  cancelRoute='BuildingBlockOverview'
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
          :isRequired="true"
        />
      </b-col>
      <b-col cols="12" md="10" class="mt-3 mb-2 text-left" v-if="can('workshops.view_field_is_sensitive_workshop')">
        <b-form-checkbox
          id="is-sensetive"
          v-model="formData.isSensitive"
          name="is-sensetive"
          value="true"
        >
          Gevoelig om snel gedateerd te zijn
        </b-form-checkbox>
      </b-col>
      <b-col cols="12" md="10" class="mt-4 mb-2 text-left" v-if="can('scouts_auth.access_disabled_entities')">
        <b-form-checkbox
          v-show="isEdit"
          id="is-disabled"
          v-model="formData.isDisabled"
          name="is-disabled"
          value="true"
        >
          Verborgen
        </b-form-checkbox>
      </b-col>
      <b-col cols="12" md="8" class="mt-4 mb-2">
         <text-input
          v-model="formData.duration"
          label="Tijdsduur"
          id='duration'
          :type="inputTypes.time"
        />
      </b-col>
      <b-col cols="12" md="8" class="mt-4 mb-2">
        <div class="multi-select-container d-flex flex-md-row flex-column">
          <div class="w-100">
            <select-input
              label='Type'
              id="type"
              v-model="formData.type"
              :options='types'
              :multiple='false'
              :isRequired="true"
            />
          </div>
          <div class="w-100">
            <select-input
            :isRequired="true"
              v-model='formData.category'
              label='Soorten werkvormen'
              id="category"
              :searchable="true"
              :repo='CategoryRepository'
              :multiple='false'
              v-show="formData && formData.type === BuildingBlocksTypes.METHODIC"
              :rules="(formData && formData.type === BuildingBlocksTypes.METHODIC) ? { required: true } : {}"
            />
            <select-input
            :isRequired="true"
              v-model='formData.theme'
              label='Thema'
              :searchable="true"
              id="theme"
              :repo='ThemeRepository'
              :multiple='false'
              v-show="formData && formData.type === BuildingBlocksTypes.THEMATIC"
              :rules="(formData && formData.type === BuildingBlocksTypes.THEMATIC) ? { required: true } : {}"
            />
          </div>
        </div>
      </b-col>
      <b-col cols="12" class="mt-4 mb-2">
        <text-input
          v-model="formData.shortDescription"
          label="Korte omschrijving"
          id="shortDescription"
          :rules='{}'
          :textarea="true"
        />
      </b-col>
      <b-col cols="12" class="mt-4 mb-2">
        <ck-editor
          v-model="formData.description"
          label="Omschrijving"
          id="description"
          :isRequired="true"
        />
      </b-col>
      <b-col cols="12" class="mt-4 mb-2">
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
      @click.prevent='saveAndPublish(saveWithoutRedirect, onSubmit, validate, transitionTypes.requestPublication)'
      variant="primary"
      size="md"
      class="text-light">
      Opslaan en vraag publicatie
      </b-button>
    <b-button
      v-if="formData.BuildingblockStatus === 'PUBLICATION_REQUESTED' && can('workshops.publish_buildingblocktemplate')"
      type="submit"
      @click.prevent='saveAndPublish(saveWithoutRedirect,onSubmit, validate, transitionTypes.publish)'
      variant="primary"
      size="md"
      class="text-dark">
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
import { transitionTypes } from '../../repositories/withTransitionRepository'
import BuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import CategoryRepository from '../../repositories/entities/categoriesRepository'
import ThemeRepository from '../../repositories/entities/themeRepository'
import usePermissions from '@/composables/usePermissions'
import useTransitions from '@/composables/useTransitions'
import { useRouter } from '@/composables/useRouter'
import BuildingBlocksRepository from '@/repositories/entities/buildingBlocskRepository'
import { useEnum } from '@/composables/useEnum'
import { RETRY_REDIRECT } from '../../composables/useRepository'

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
    sessionStorage.setItem(RETRY_REDIRECT, 'bouwblokken/nieuw')
    const { route } = useRouter()
    const isEdit = ref<boolean>()
    isEdit.value = !!route.value.params['buildingBlockId']
    const form = reactive<BuildingBlocksEntityModel>(BuildingBlocksEntityModel.deserialize({
      title: null,
      id: null,
      duration: '1:30:00',
      description: null,
      is_sensitive: false,
      category: null,
      theme: null,
      type: BuildingBlocksTypes.THEMATIC,
      is_disabled: false,
      status: {
        id: 'PRIVATE',
        label: 'Privé',
        value: 'PRIVATE'
      }
    }))
    const { getTypesArray } = useEnum(BuildingBlocksTypes)
    const types : String[] = getTypesArray()
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
      can,
      isEdit
    }
  }
})
</script>

<style lang="scss" scoped>
.multi-select-container {
  display: flex;
  gap: 40px;
}
</style>
