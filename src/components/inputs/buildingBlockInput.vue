<template>
<b-col cols="12">
  <b-row>
    <b-col
      cols="12"
      v-for="(block, index) in buildingBlocks"
      :key='block.id'
    >
      <div class="border p-4 my-4">
        <div class="w-100 text-right">
          <b-button
            size="sm"
            @click="deleteBlock(index)"
            variant="outline-danger"
            class="mb-2 p-1 border-0">
              <b-icon icon="trash" aria-label="Help" class="mx-1"></b-icon>
          </b-button>
        </div>
        <text-input
          v-model="block.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
        />
        <ck-editor
          v-model="block.description"
          label="Omschrijving"
          id="description"
          :big="false"
        />
      </div>
    </b-col>
    <b-col cols="12">
      <b-button
        v-b-modal.modal-1
        size="lg"
        variant="secondary"
        class="mb-2 p-4">
          <b-icon icon="plus-circle" aria-label="Help" class="mr-2 mt-1"></b-icon>Bouwsteen toevoegen
      </b-button>
    </b-col>
    <b-modal id="modal-1" size="xl" title="Selecteer bouwsteen" v-model="showModal" >
      <select-building-block v-model='selectedBlock' />
      <template v-slot:modal-footer>
        <b-button
            v-show='selectedBlock ? false : true'
            variant="outline-dark"
            size="md"
            class="px-5 py-2"
            @click="hideModel"
          >
              Sluit
          </b-button>
          <b-button
            v-show='selectedBlock ? true : false'
            variant="outline-dark"
            size="md"
            class="px-5 py-2"
            @click="goBack"
          >
              Terug
          </b-button>
          <b-button
            v-show="selectedBlock"
            size="md"
            class="px-5 py-2"
            variant="success"
            @click="addBlock()">
              Selecteer
          </b-button>
      </template>
    </b-modal>
  </b-row>
</b-col>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, PropType } from '@vue/composition-api'
import selectBuildingBlock from './selectBuildingBlock.vue'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import ckEditor from '../../components/inputs/ckEditor.vue'

export default defineComponent({
  name: 'builing-blocks',
  components: {
    selectBuildingBlock,
    TextInput,
    ckEditor
  },
  props: {
    value: Array as PropType<BuildingBlocksEntityModel[]>
  },
  setup ({ value }, { emit }) {
    let buildingBlocks = reactive<BuildingBlocksEntityModel[]>(value || [])
    const selectedBlock = ref<BuildingBlocksEntityModel | undefined>()
    const showModal = ref<boolean>(false)

    const addBlock = () => {
      selectedBlock.value && buildingBlocks.push(BuildingBlocksEntityModel.createNewFromTemplate(selectedBlock.value))
      selectedBlock.value = undefined
      emit('input', buildingBlocks)
      hideModel()
    }

    const hideModel = () => { showModal.value = false }

    const deleteBlock = (indexToDelete: number) => {
      buildingBlocks.splice(indexToDelete, 1)
    }

    const goBack = () => { selectedBlock.value = undefined }


    return {
      addBlock,
      buildingBlocks,
      selectedBlock,
      hideModel,
      showModal,
      inputTypes,
      deleteBlock,
      goBack
    }
  }
})
</script>

<style lang='scss' scoped>
  ::v-deep .modal-body{
    background-color: #f8f9fa;
    min-height: 30rem;
  }
</style>
