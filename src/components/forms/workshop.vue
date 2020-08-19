<template>
<validation-observer ref="observer" v-slot="{ handleSubmit }">
  <b-form  @submit.stop.prevent="handleSubmit(onSubmit)">
    <b-row>
      <b-col cols="12" md="8">
        <text-input
          v-model="form.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <b-col cols="12" md="8">
           <text-input
            v-model="form.duration"
            label="Tijdsduur"
            id='duration'
            :type="inputTypes.text"
          />
      </b-col>
      <b-col cols="12" md="8">
        <select-input
          v-model='form.theme'
          label='Thema'
          id="theme"
          :repo='ThemeRepository'
          :multiple='false'
        />
      </b-col>
      <b-col cols="12">
        <ck-editor
          v-model="form.description"
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
  </b-form>
</validation-observer>
</template>

<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../inputs/textInput.vue'
import SelectInput from '../inputs/selectInput.vue'
import ckEditor from '../inputs/ckEditor.vue'
import ThemeRepository from '../../repositories/themeRepository'
import BaseEntityModel from '../../models/entities/baseEntityModel'
import { PropType } from 'vue'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'

export default defineComponent({
  name: 'workshop-form',
  components: {
    TextInput,
    SelectInput,
    ckEditor
  },
  props: {
    value: Object
  },
  setup ({ value }, { emit }) {
    let form = ref<WorkshopEntityModel>(value)

    const onSubmit = () : void => {
      emit('input', form.value)
      emit('submit')
    }

    return {
      onSubmit,
      inputTypes,
      form,
      ThemeRepository
    }
  }
})
</script>
