<template>
<base-form
  :defaultValue="form"
  :type='WorkshopEntityModel'
  :repo='WorkshopRepository'
  paramIdentifier='workshopId'
  :redirectRoute="redirectRoute"
  editRoute='WerkwinkelEdit'
  v-on:submitSuccess='afterSubmit'
  :historyModal="true"
>
  <template v-slot:default="{ formData }">
    <b-row>
      <b-col cols="6" class="text-left">
        <span class="w-100 h6 text-left d-inline-block" v-if="formData.createdBy && can('workshops.change_buildingblocktemplate')">Gemaakt door: {{ formData.createdBy.firstName }} {{ formData.createdBy.lastName }}</span>
      </b-col>
      <b-col cols='6' class='text-right'>
         <status-badge v-if="formData.workshopStatus" :status='formData.workshopStatus' />
      </b-col>
      <sub-title label='Algemene info' />
      <b-col cols="12" md="10" class="mb-3 text-left">
        <text-input
          v-model="formData.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="10" class="mb-3 text-left" v-if="can('scouts_auth.access_disabled_entities')">
        <b-form-checkbox
          id="is-disabled"
          v-model="formData.isDisabled"
          name="is-disabled"
          value="true"
        >
          Verborgen
        </b-form-checkbox>
      </b-col>
      <b-col cols="12"  md="7">
        <select-input
          v-model='formData.theme'
          label='Thema'
          id="theme"
          :searchable="true"
          :repo='ThemeRepository'
          :multiple='true'
        />
      </b-col>
      <b-col
        v-if="formData.workshopStatus === 'PUBLICATION_REQUESTED' && can('workshops.change_buildingblocktemplate')"
        cols="12"
        md="7">
        <select-input
          v-model='formData.approvingTeam'
          label='Team'
          id="team"
          :repo='TeamRepository'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12" md="10">
        <text-input
          v-model="formData.shortDescription"
          label="Korte omschrijving"
          id='shortDescription'
          :textarea="true"
          :rules='{}'
          :type="inputTypes.text"
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
       <validation-provider
        tag="div"
        class="col-12"
        :rules="{ required: true }"
        v-slot="validationContext"
      >
        <building-block-input v-model='formData.buildingBlocks' :validationState='getValidationState(validationContext)' />
       </validation-provider>
       <b-col cols="10" offset="0" md="10" class="mt-5">
        <ck-editor
          v-model="formData.necessities"
          label="Benodigdheden"
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
      variant="light"
      size="md"
      class="px-5 py-2 ">
      Opslaan en vraag publicatie
      </b-button>
    <b-button
      v-if="formData.workshopStatus === 'PUBLICATION_REQUESTED' && can('workshops.publish_workshop')"
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
import BaseEntityModel from '@/models/entities/baseEntityModel'
import RepositoryFactory from '@/repositories/repositoryFactory'
import getValidationState from '../../composables/useValidationState'
import statusBadge from '../../components/semantic/statusBadge.vue'
import TeamRepository from '../../repositories/entities/teamRepository'
import usePermissions from '@/composables/usePermissions'
import useTransitions from '@/composables/useTransitions'
import { useRouter } from '@/composables/useRouter'

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
    statusBadge
  },
  setup ({ value }, { emit, root }) {
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
      can
    }
  }
})
</script>

<style lang='scss' scoped>
  ::v-deep .badge.badge-pill{
    font-size: 14px;
    padding: 0.75rem 1.5rem;
  }
</style>
