<template>
<base-form
  :defaultValue="form"
  :type='CategoryEntityModel'
  :repo='CategoriesRepository'
  editRoute='CategoryEdit'
  paramIdentifier='categoryId'
  redirectRoute='CategorieesOverview'
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
    </b-row>
  </template>
</base-form>
</template>

<script lang="ts">
import { reactive, defineComponent } from '@vue/composition-api'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import CategoriesRepository from '../../repositories/entities/categoriesRepository'
import ckEditor from '../../components/inputs/ckEditor.vue'
import CategoryEntityModel from '@/models/entities/categoryEntityModel'
import BaseForm from '../../components/base-views/baseForm.vue'
import usePermissions from '@/composables/usePermissions'

export default defineComponent({
  name: 'category-form',
  components: {
    BaseForm,
    TextInput,
    ckEditor
  },
  setup (props, { emit }) {
    const form = reactive<CategoryEntityModel>(CategoryEntityModel.deserialize({
      title: null,
      id: null
    }))
    const { can } = usePermissions()

    return {
      inputTypes,
      CategoryEntityModel,
      CategoriesRepository,
      form,
      can
    }
  }
})
</script>
