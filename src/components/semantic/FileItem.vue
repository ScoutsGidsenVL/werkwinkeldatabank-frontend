<template>
  <div class="d-flex justify-content-center container mt-1">
    <div class="w-50 grid-container" v-if="file">
      <div>{{file.name}}</div>
      <div>{{(file.size / (1024*1024)).toFixed(2)}} MB</div>
      <div>{{file.contentType}}</div>
      <div>
        <b-icon v-on:click="downloadFile()" class="icon mr-2" font-scale="1.3" icon="arrow-down-circle-fill" variant="success"></b-icon>
        <b-icon v-on:click="deleteFromArray()" v-if="!isDetailView" class="icon" font-scale="1.3" icon="x-circle-fill" variant="danger"></b-icon>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileEntityModel from '@/models/entities/fileEntityModel'
import FileRepository from '@/repositories/entities/fileRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, ref, PropType } from '@vue/composition-api'
import { saveAs } from 'file-saver'

export default defineComponent({
  name: 'file-item',
  props: {
    file: {
      type: Object as PropType<FileEntityModel>,
      required: true
    },
    isDetailView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup (props, context) {

    const downloadFile = () => {
      if (props?.file?.id) {
        RepositoryFactory.get(FileRepository).downloadFile(props.file.id).then((file: Blob) => {
          saveAs(file, props.file.name)
        })
      }
    }

    const deleteFromArray = () => {
      context.emit('deleteFileFromArray', props.file.id)
    }

    return {
      downloadFile,
      deleteFromArray
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 5px 0px 5px 0px;
  min-width: 100%;
  border: 1px solid #ced4da;
}

.grid-container {
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
}

.icon {
  margin-top: 3px;
  cursor: pointer;
}
</style>
