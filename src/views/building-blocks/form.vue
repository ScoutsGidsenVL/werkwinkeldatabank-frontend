<template>
<base-form
  :defaultValue="form"
  :type='BuildingBlocksEntityModel'
  :repo='BuildingBlocskRepository'
  paramIdentifier='buildingBlockId'
  redirectRoute='BuildingBlockOverview'
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
          id="checkbox-1"
          v-model="formData.isSensitive"
          name="is-sensetive"
          value="true"
        >
          Gevoelige inhoud
        </b-form-checkbox>
      </b-col>
      <b-col cols="12" md="8">
        <time-input
          label='Tijdsduur'
          id="duration"
          v-model="formData.duration"
        />
      </b-col>
      <b-col cols="12"  md="8">
        <select-input
          v-model='formData.category'
          label='Categorie'
          id="category"
          :repo='CategoryRepository'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12"  md="8">
        <select-input
          v-model='formData.theme'
          label='Thema'
          id="theme"
          :repo='ThemeRepository'
          :multiple='false'
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
      <b-col cols="12">
        <ck-editor
          v-model="formData.shortDescription"
          label="Korte omschrijving"
          id="shortDescription"
          :big='false'
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
          id="necessities"
          :rules='{}'
          :big="false"
        />
      </b-col>
    </b-row>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import TimeInput from '../../components/inputs/timeInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlocskRepository from '../../repositories/entities/buildingBlocskRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import CategoryRepository from '../../repositories/entities/categoriesRepository'
import ThemeRepository from '../../repositories/entities/themeRepository'

export default defineComponent({
  name: 'building-blocks-form',
  components: {
    BaseForm,
    TextInput,
    ckEditor,
    SelectInput,
    TimeInput
  },
  setup (props, { emit }) {
    const form = reactive<BuildingBlocksEntityModel>(BuildingBlocksEntityModel.deserialize({
      title: null,
      id: null,
      duration: '1:30:00',
      description: null,
      is_sensitive: false,
      category: null,
      theme: null,
      type: BuildingBlocksTypes.THEMATIC
    }))
    const types : String[] = BuildingBlocksEntityModel.getTypesArray()


    return {
      inputTypes,
      BuildingBlocksEntityModel,
      BuildingBlocskRepository,
      BuildingBlocksTypes,
      CategoryRepository,
      ThemeRepository,
      form,
      types
    }
  }
})
</script>
