<template>
<div>
     <b-col cols="12" class="text-left py-3">
        <h2>Bouwstenen</h2>
      </b-col>
      <b-col
       cols="12"
       v-for="block in buildingBlocks"
       :key='block.id'
      >
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
      </b-col>
      <b-col cols="12">
        <b-button
         v-b-modal.modal-1
         size="lg"
         variant="primary"
         class="mb-2">
            <b-icon icon="plus-circle" aria-label="Help" class="mr-2 mt-1"></b-icon>Bouwsteen toevoegen
        </b-button>
      </b-col>
      <b-modal id="modal-1" size="xl" title="Slecteer bouwsteen" v-model="showModal">
        <select-building-block v-model='selectedBlock' />
        <template v-slot:modal-footer>
            <b-button size="sm" variant="danger" @click="hideModel">
                Cancel
            </b-button>
            <b-button
              v-show="selectedBlock"
              size="sm"
              variant="success"
              @click="addBlock()">
                Selecteer
            </b-button>
        </template>
    </b-modal>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
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
  setup (props, { emit }) {
    const buildingBlocks = reactive<BuildingBlocksEntityModel[]>([])
    const selectedBlock = ref<BuildingBlocksEntityModel | undefined>()
    const showModal = ref<boolean>(false)

    const addBlock = () => {
      selectedBlock.value && buildingBlocks.push(selectedBlock.value)
      emit('input', buildingBlocks)
      hideModel()
    }

    const hideModel = () => { showModal.value = false }

    watch(buildingBlocks, value => {
      emit('input', buildingBlocks)
    })

    return {
      addBlock,
      buildingBlocks,
      selectedBlock,
      hideModel,
      showModal,
      inputTypes
    }
  }
})
</script>
