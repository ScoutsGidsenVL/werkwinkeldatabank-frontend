<template>
<base-form
  :defaultValue="form"
  :type='BuildingBlocksEntityModel'
  :repo='BuildingBlocskRepository'
  paramIdentifier='buildingBlockId'
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
        <select-input
          label='Type'
          id="type"
          v-model="formData.type"
          :options='["THEMATIC", "METHODIC"]'
          :multiple='false'
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
import BuildingBlocskRepository from '../../repositories/buildingBlocskRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'

export default defineComponent({
  name: 'building-blocks-form',
  components: {
    BaseForm,
    TextInput,
    ckEditor,
    SelectInput
  },
  setup (props, { emit }) {
    const form = reactive<BuildingBlocksEntityModel>(BuildingBlocksEntityModel.deserialize({
      title: null,
      id: null,
      duration: null,
      description: null,
      type: BuildingBlocksTypes.THEMATIC
    }))

    return {
      inputTypes,
      BuildingBlocksEntityModel,
      BuildingBlocskRepository,
      BuildingBlocksTypes,
      form
    }
  }
})
</script>
