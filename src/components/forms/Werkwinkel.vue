<template>
<validation-observer ref="observer" v-slot="{ handleSubmit }">
  <b-form  @submit.stop.prevent="handleSubmit(onSubmit)">
    <b-row>
      <b-col cols="12" md="8">
        <validation-provider
          name="Name"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
        <b-form-group
            id="title"
            label="Titel"
            label-for="title"
          >
          <b-form-input
            id="title"
            type="text"
            v-model="form.title"
            :state="getValidationState(validationContext)"
          ></b-form-input>
        </b-form-group>
        </validation-provider>
      </b-col>
      <b-col cols="12" md="8">
          <b-form-group
            id="time"
            label="Tijdsduur"
            label-for="time"
          >
            <b-form-input
              id="time"
              type="text"
            ></b-form-input>
          </b-form-group>
      </b-col>
      <b-col cols="12" md="8">
          <b-form-group id="theme" label="Thema:" label-for="theme">
            <b-form-select
              id="theme"
              :options='[{text: "thema 1", value: "thema1"},{text: "thema 2", value: "thema2"}]'
            ></b-form-select>
          </b-form-group>
      </b-col>
      <b-col cols="12">
          <ckeditor :editor="state.editor"></ckeditor>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="align-left" >
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-col>
    </b-row>
  </b-form>
</validation-observer>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default defineComponent({
  setup () {
    const state = reactive({
      editor: ClassicEditor
    })

    const form = reactive({
      title: null
    })

    const onSubmit = () : void => console.log()

    const getValidationState = ({ dirty, validated, valid = null }) => {
      return dirty || validated ? valid : null
    }

    return {
      state,
      onSubmit,
      getValidationState,
      form
    }
  }
})
</script>
