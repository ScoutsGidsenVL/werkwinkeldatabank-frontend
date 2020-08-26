<template>
<base-form
  :defaultValue="form"
  :type='ThemeEntityModel'
  :repo='ThemeRepository'
  paramIdentifier='themeId'
  redirectRoute='ThemeOverview'
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
import ThemeRepository from '../../repositories/themeRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import ThemeEntityModel from '@/models/entities/themeEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'

export default defineComponent({
  name: 'theme-form',
  components: {
    BaseForm,
    TextInput,
    ckEditor
  },
  setup (props, { emit }) {
    const form = reactive<ThemeEntityModel>(ThemeEntityModel.deserialize({
      title: null,
      id: null
    }))

    return {
      inputTypes,
      ThemeEntityModel,
      ThemeRepository,
      form
    }
  }
})
</script>
