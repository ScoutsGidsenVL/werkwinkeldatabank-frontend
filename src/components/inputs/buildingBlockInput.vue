<template>
<b-col cols="12">
  <b-row>
    <b-col
      cols="12 p-0"
      v-for="(block, index) in buildingBlocks"
      class="bg-light mb-4"
      :key='block.id'
    >
    <custom-collapse
          :id='block.id'
          :title='block.title'
          :visible="true"
          :border='true'
          :extraClass="'bg-light'"
        >
      <div class="p-sm-4 p-1 mt-0 mb-4">
        <div class="w-100 text-right">
          <div
            @click="deleteBlock(index, block.order)"
            class="mb-2 p-1 border-0 trash">
              <b-icon icon="trash" aria-label="Help" class="mx-1 trash-icon"></b-icon>
          </div>
        </div>
        <div class="w-100 text-left">
        <text-input
          class="custom-margin"
          v-model="block.title"
          label="Titel"
          id='title'
          :type="inputTypes.text"
          :disabled='!block.editable'
          :isRequired="true"
        />
        <text-input
          class="custom-margin"
          v-model="block.duration"
          label="Tijdsduur"
          id='duration'
          :type="inputTypes.time"
          :disabled='!block.editable'
        />
        <select-input
          class="custom-margin"
          v-model='block.category'
          label='Soort werkvorm'
          id="category"
          :repo='CategoryRepository'
          :multiple='false'
          v-show="block && block.type === BuildingBlocksTypes.METHODIC"
          :rules="(block && block.type === BuildingBlocksTypes.METHODIC) ? { required: true } : {}"
        />
        <select-input
          label='Thema'
          id="theme"
          :searchable="true"
          :multiple='false'
          :repo='ThemeRepository'
          v-model='block.theme'
          :rules="(block && block.type === BuildingBlocksTypes.THEMATIC) ? { required: true } : {}"

          class="custom-margin"
          v-show="block && block.type === BuildingBlocksTypes.THEMATIC"
          :isRequired="true"
        />
        <ck-editor
          class="custom-margin"
          v-model="block.description"
          label="Omschrijving"
          id="description"
          :big="false"
          :disabled='!block.editable'
          :isRequired="true"
        />
        <ck-editor
          class="custom-margin"
          v-model="block.necessities"
          label="Benodigdheden"
          :toolbarItems='["bulletedList"]'
          id="necessities"
          :rules='{}'
          :big="false"
          :disabled='!block.editable'
        />
        </div>
        <div class="flex flex-column flex-sm-row w-100 mt-5">
          <b-button
            @click="enableEditBlock(block)"
            v-show='block.isSensitive'
            :disabled='block.editable'
            size="sm"
            class="mb-1 mb-md-0 mr-0 mr-md-1"
            v-b-tooltip.hover title="De gegevens in dit blok worden autmatisch up to date gehouden. Bij wijzigingen verlies je de link naar de meest recente informatie."
            variant="primary">
              <b-icon icon="pencil-square" aria-label="Help" class="mx-2 mt-1"></b-icon>bewerken
          </b-button>
          <b-button
            @click="orderUp(block)"
            :disabled='isFirstBlock(block.order)'
            size="sm"
            class="mb-1 mb-md-0 mr-0 mr-md-1"
            variant="primary">
              <b-icon icon="arrow-up" aria-label="Help" class="ml-2 mt-1"></b-icon>Verplaats naar boven
          </b-button>
          <b-button
            @click="orderDown(block)"
            :disabled='isLastBlock(block.order)'
            size="sm"
            variant="primary"
            class="">
              <b-icon icon="arrow-down" aria-label="Help" class="ml-2 mt-1"></b-icon>Verplaats naar onder
          </b-button>
        </div>
      </div>
      </custom-collapse>
    </b-col>
    <b-col cols="12" class="text-center">
      <b-button
        v-b-modal.modal-building-block-input
        size="lg"
        :variant='validationState === false ? "danger" : "primary"'
        class="mb-2 mt-4 p-4 text-dark">
          <b-icon icon="plus-circle" aria-label="Help" class="mr-2 mt-1"></b-icon>Bouwsteen toevoegen
      </b-button>
    </b-col>
    <b-modal
      id="modal-building-block-input"
      size="xl"
      title="Selecteer bouwsteen" v-model="showModal"
      header-bg-variant='light'
      header-text-variant="primary"
      footer-bg-variant='light'
      footer-text-variant="primary"
      >
      <div class="w-100 text-right">
        <b-button
            v-show="selectedBlock"
            size="md"
            class="px-5 py-2 text-white"
            variant="primary"
            @click="addSelectedBlock()">
              Selecteer
          </b-button>
      </div>
      <select-building-block v-model='selectedBlock' v-on:selectBlock='emitBlock' />
      <template v-slot:modal-footer>
        <b-button
            v-show='selectedBlock ? false : true'
            variant="secondary"
            size="md"
            class="px-5 py-2"
            @click="hideModel"
          >
              Sluit
          </b-button>
          <b-button
            v-show='selectedBlock ? true : false'
            variant="primary"
            size="md"
            class="px-5 py-2"
            @click="goBack"
          >
              Terug
          </b-button>
          <b-button
            v-show="selectedBlock"
            size="md"
            class="px-5 py-2 text-white"
            variant="primary"
            @click="addSelectedBlock()">
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
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import ckEditor from '../../components/inputs/ckEditor.vue'
import TimeInput from '../../components/inputs/timeInput.vue'
import CategoryRepository from '../../repositories/entities/categoriesRepository'
import ThemeRepository from '../../repositories/entities/themeRepository'
import customCollapse from '../../components/semantic/customCollapse.vue'

export default defineComponent({
  name: 'builing-blocks',
  components: {
    selectBuildingBlock,
    TextInput,
    ckEditor,
    TimeInput,
    SelectInput,
    customCollapse
  },
  props: {
    value: Array as PropType<BuildingBlocksEntityModel[]>,
    validationState: {
      type: Boolean,
      default: false
    }
  },
  setup ({ value }, { emit }) {
    let buildingBlocks = ref<BuildingBlocksEntityModel[]>(value || [])
    const selectedBlock = ref<BuildingBlocksEntityModel | undefined>()
    const showModal = ref<boolean>(false)

    const emitBlock = (block: BuildingBlocksEntityModel) => {
      const order : number = buildingBlocks.value.length > 0 ? buildingBlocks.value.length : 0
      buildingBlocks.value.push(BuildingBlocksEntityModel.createNewFromTemplate(block, order))
      // emit('input', buildingBlocks)
      hideModel()
    }

    const addSelectedBlock = () => {
      selectedBlock.value && emitBlock(selectedBlock.value)
      selectedBlock.value = undefined
    }

    const hideModel = () => { showModal.value = false }

    const deleteBlock = (indexToDelete: number, order: number) => {
      buildingBlocks.value.splice(indexToDelete, 1)

      buildingBlocks.value.forEach((block: any) => {
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
      const blockUp = buildingBlocks.value.filter((filterBlock: any) => {
        if (filterBlock.order === newOrder) {
          filterBlock.order = orgOrder
        }
      })
      block.order = newOrder
      buildingBlocks.value.sort(compare)
    }

    return {
      addSelectedBlock,
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
      isLastBlock,
      BuildingBlocksTypes,
      CategoryRepository,
      ThemeRepository,
      emitBlock
    }
  }
})
</script>

<style lang='scss' scoped>
  @import 'src/assets/variables.scss';

  ::v-deep .modal-body{
    background-color: white;
    min-height: 30rem;
  }

  .trash-icon {
    color: $red !important;
    &hover {
      color: $white !important;
    }
  }

  .trash {
    float: right;
    cursor: pointer;
    width: 30px
  }

  .trash:hover {
    border-radius: 0px !important;
    background-color: $red;
    .trash-icon {
      color: $white !important;
    }
  }

  .custom-margin {
    margin-top: 2.5em;
    margin-bottom: 2em;
  }
</style>
