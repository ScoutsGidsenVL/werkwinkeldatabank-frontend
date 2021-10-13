<template>
<base-form
  :defaultValue="form"
  :type='WorkshopEntityModel'
  :repo='WorkshopRepository'
  paramIdentifier='workshopId'
  :redirectRoute="redirectRoute"
  :cancelRoute='cancelRoute'
  editRoute='WerkwinkelEdit'
  v-on:submitSuccess='afterSubmit'
  :historyModal="true"
>
  <template v-slot:default="{ formData }">
    <b-row>
      <b-col cols="12" class="text-left">
        <span class="w-100 h6 text-left d-inline-block" v-if="formData.createdBy && can('workshops.change_buildingblocktemplate')">Gemaakt door: {{ formData.createdBy.firstName }} {{ formData.createdBy.lastName }}</span>
      </b-col>
      <b-col cols='12' class='text-left pl-2 mt-1'>
         <status-badge v-if="formData.workshopStatus" :status='formData.workshopStatus' />
      </b-col>
      <sub-title label='Algemene info' />
      <b-col cols="12" md="8" class="mt-3 mb-2 text-left">
        <text-input
          v-model="formData.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
          :isRequired="true"
        />
      </b-col>
      <b-col cols="12" md="8" class="mt-4 mb-2 text-left" v-if="can('scouts_auth.access_disabled_entities')">
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
      <b-col class="mt-4 mb-2" cols="12"  md="8">
        <div class="multi-select-container">
          <div class="w-100">
            <select-input
              v-model='formData.theme'
              label='Thema'
              id="theme"
              :searchable="true"
              :repo='ThemeRepository'
              :multiple='true'
              :isRequired="true"
            />
          </div>
          <div
            class="w-100"
            v-if="formData.workshopStatus === 'PUBLICATION_REQUESTED' || formData.workshopStatus === 'PUBLISHED' && can('workshops.change_buildingblocktemplate')"
          >
            <select-input
              :disabled="!can('workshops.change_buildingblocktemplate')"
              v-model='formData.approvingTeam'
              label='Ploeg'
              id="team"
              :repo='TeamRepository'
              :multiple='false'
            />
          </div>
        </div>
      </b-col>
      <b-col class="mt-4 mb-2" cols="12" md="8">
        <text-input
          v-model="formData.shortDescription"
          label="Korte omschrijving"
          id='shortDescription'
          :textarea="true"
          :rules='{}'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="8" class="mt-4 mb-2">
        <file-upload :inputFiles="formData.files" v-on:addFiles="addFiles($event, formData)" />
      </b-col>
      <b-col class="mt-4 mb-2" cols="12" md="12">
        <ck-editor
          v-model="formData.description"
          label="Omschrijving"
          id="description"
          :big="false"
          :isRequired="true"
        />
      </b-col>
      <validation-provider
        tag="div"
        class="col-12"
        name='Bouwblokken'
        :rules="{ required: true }"
        :customMessages="{required: 'Minstens 1 bouwblok is verplicht'}"
        v-slot="validationContext"
      >
      <sub-title
        :class='{"not-valid": getValidationState(validationContext) === false}'
        label='Bouwstenen *' />
        <b-form-invalid-feedback v-for="error in validationContext.errors" :key="error">{{ error }}</b-form-invalid-feedback>
        <div class="p-3">
          <building-block-input v-model='formData.buildingBlocks' :validationState='getValidationState(validationContext)' />
        </div>
       </validation-provider>
       <b-col cols="12" offset="0" md="12" class="mt-5">
        <ck-editor
          v-model="formData.necessities"
          label="Extra benodigdheden"
          :toolbarItems='["bulletedList"]'
          id="necessities"
          :rules ={}
          :big="false"
        />
      </b-col>
    </b-row>
  </template>
  <template #actions='{ saveWithoutRedirect, onSubmit, validate, formData}'>
    <b-button
      v-if="formData.workshopStatus === 'PRIVATE'"
      type="submit"
      @click.prevent='saveAndPublish(saveWithoutRedirect,onSubmit, validate, transitionTypes.requestPublication)'
      variant="primary"
      size="md"
      class="px-4 py-2 text-light">
      Opslaan en vraag publicatie
      </b-button>
    <b-button
      v-if="formData.workshopStatus === 'PUBLICATION_REQUESTED' && can('workshops.publish_workshop')"
      type="submit"
      @click.prevent='saveAndPublish(saveWithoutRedirect,onSubmit, validate, transitionTypes.publish)'
      variant="primary"
      size="md"
      class="px-5 py-2 text-light">
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
import ThemeRepository from '../../repositories/entities/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import { transitionTypes } from '../../repositories/withTransitionRepository'
import WorkshopRepository from '../../repositories/entities/workshopRepository'
import subTitle from '../../components/semantic/subTitle.vue'
import getValidationState from '../../composables/useValidationState'
import statusBadge from '../../components/semantic/statusBadge.vue'
import TeamRepository from '../../repositories/entities/teamRepository'
import usePermissions from '@/composables/usePermissions'
import useTransitions from '@/composables/useTransitions'
import { useRouter } from '@/composables/useRouter'
import { RETRY_REDIRECT } from '../../composables/useRepository'
import FileUpload from '@/components/semantic/FileUpload.vue'

export default defineComponent({
  name: 'workshop-form',
  components: {
    TextInput,
    SelectInput,
    ckEditor,
    BaseForm,
    TimeInput,
    BuildingBlockInput,
    subTitle,
    statusBadge,
    'file-upload': FileUpload
  },
  setup (props, { root }) {
    sessionStorage.setItem(RETRY_REDIRECT, 'werkwinkels/nieuw')
    const { route } = useRouter()
    const isEdit = ref<boolean>()
    isEdit.value = !!route.value.params['workshopId']
    const form = reactive<WorkshopEntityModel>(WorkshopEntityModel.deserialize({
      title: null,
      id: null,
      shortDescription: null,
      description: null,
      necessities: null,
      theme: null,
      buildingBlocks: [],
      workshop_status_type: 'PRIVATE',
      approvingTeam: null
    }))
    const { can } = usePermissions()
    const redirectRoute = 'WerkwinkelView'
    const { afterSubmit, saveAndPublish } = useTransitions(WorkshopRepository, redirectRoute, root)
    const cancelRoute = ref<String>('MijnWerkwinkelOverview')
    if (route.value.meta.from) {
      cancelRoute.value = route.value.meta.from
    }
    const addFiles = (event: any, formData: any) => {
      formData.files = event
    }
    return {
      inputTypes,
      form,
      WorkshopRepository,
      ThemeRepository,
      WorkshopEntityModel,
      afterSubmit,
      saveAndPublish,
      transitionTypes,
      getValidationState,
      TeamRepository,
      redirectRoute,
      can,
      cancelRoute,
      isEdit,
      addFiles
    }
  }
})
</script>

<style lang='scss' scoped>
  ::v-deep .badge.badge-pill{
    font-size: 14px;
    padding: 0.75rem 1.5rem;
  }

  .not-valid ~ .invalid-feedback{
    display: block;
    text-align: left;
    padding-left: 1rem;
    margin-top: -1rem;
  }

  .multi-select-container {
    display: flex;
    gap: 40px;
    @media (max-width: 575px) {
      display: block;
    }
  }

  .p-3 {
    padding: 0px !important;
  }
</style>
