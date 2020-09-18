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
            @click="deleteBlock(index, block.order)"
            variant="outline-danger"
            class="mb-2 p-1 border-0">
              <b-icon icon="trash" aria-label="Help" class="mx-1"></b-icon>
          </b-button>
        </div>
        <div class="w-100 text-left">
        <text-input
          v-model="block.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
          :disabled='!block.editable'
        />
        <ck-editor
          v-model="block.description"
          label="Omschrijving"
          id="description"
          :big="false"
          :disabled='!block.editable'
        />
        </div>
        <div class="d-flex w-100">
          <b-button
            @click="enableEditBlock(block)"
            :disabled='block.editable'
            size="sm"
            variant="secondary"
            class="mr-1">
              <b-icon icon="pencil-square" aria-label="Help" class="mx-2 mt-1"></b-icon>bewerken
          </b-button>
          <b-button
            @click="orderUp(block)"
            :disabled='isFirstBlock(block.order)'
            size="sm"
            variant="secondary"
            class="mr-1">
              <b-icon icon="arrow-up" aria-label="Help" class="ml-2 mt-1"></b-icon>Verplaats naar boven
          </b-button>
          <b-button
            @click="orderDown(block)"
            :disabled='isLastBlock(block.order)'
            size="sm"
            variant="secondary"
            class="">
              <b-icon icon="arrow-down" aria-label="Help" class="ml-2 mt-1"></b-icon>Verplaats naar onder
          </b-button>
        </div>
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
import { defineComponent, reactive, ref, watch, PropType, computed } from '@vue/composition-api'
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
    let buildingBlocks = ref<BuildingBlocksEntityModel[]>(value || [])
    const selectedBlock = ref<BuildingBlocksEntityModel | undefined>()
    const showModal = ref<boolean>(false)

    const addBlock = () => {
      const order : number = buildingBlocks.value.length > 0 ? buildingBlocks.value.length : 0
      selectedBlock.value && buildingBlocks.value.push(BuildingBlocksEntityModel.createNewFromTemplate(selectedBlock.value, order))
      selectedBlock.value = undefined
      emit('input', buildingBlocks)
      hideModel()
    }

    const hideModel = () => { showModal.value = false }

    const deleteBlock = (indexToDelete: number, order: number) => {
      buildingBlocks.value.splice(indexToDelete, 1)

      buildingBlocks.value.forEach((block: BuildingBlocksEntityModel) => {
        if (block.order && block.order > order) {
          block.order = block.order - 1
        }
      })

    }

    const goBack = () => { selectedBlock.value = undefined }

    const enableEditBlock = (block: BuildingBlocksEntityModel) => { block.editable = true }

    const compare = (a, b) => {
      if (a.order < b.order) {
        return -1
      }
      if (a.order > b.order) {
        return 1
      }
      return 0
    }

    buildingBlocks.value.sort(compare)


    const isLastBlock = (order: number) : Boolean => order === buildingBlocks.value.length - 1
    const isFirstBlock = (order: number) : Boolean => order === 0

    const orderDown = (block: BuildingBlocksEntityModel) => {
      if (block.order !== undefined && !isLastBlock(block.order)) {
        const newOrder = block.order + 1
        updateOrder(block, newOrder)
      }
    }
    const orderUp = (block: BuildingBlocksEntityModel) => {
      if (block.order && !isFirstBlock(block.order)) {
        const newOrder = block.order - 1
        updateOrder(block, newOrder)
      }
    }

    const updateOrder = (block: BuildingBlocksEntityModel, newOrder: number) => {
      const orgOrder = block.order
      const blockUp = buildingBlocks.value.filter((filterBlock: BuildingBlocksEntityModel) => {
        if (filterBlock.order === newOrder) {
          filterBlock.order = orgOrder
        }
      })
      block.order = newOrder
      buildingBlocks.value.sort(compare)
    }

    return {
      addBlock,
      buildingBlocks,
      selectedBlock,
      hideModel,
      showModal,
      inputTypes,
      deleteBlock,
      goBack,
      enableEditBlock,
      orderUp,
      orderDown,
      isFirstBlock,
      isLastBlock
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
