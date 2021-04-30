<template>
  <div>

    <div class="text-left">
      <label style="font-weight: 900;">
        Bijlages
      </label>
    </div>

    <div v-if="!isDetailView" class="d-flex">
      <b-form-file
        v-model="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button v-on:click="uploadFile(file)" variant="primary" class="add-button">Add file</b-button>
    </div>

    <div class="mt-4 mb-5">
      <div v-if="files.length == 0">
        <i>Geen bijlages geselecteerd</i>
      </div>
      <div v-else>
        <div v-for="file in files" :key='file.id'>
            <file-item v-on:deleteFileFromArray="deleteFileFromArray()" :file="file" :isDetailView="isDetailView" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import FileRepository from '@/repositories/entities/fileRepository'
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import FileItem from './FileItem.vue'
import FileEntityModel from '@/models/entities/fileEntityModel'

export default defineComponent({
  name: 'file-upload',
  components: {
    'file-item': FileItem
  },
  props: {
    inputFiles: {
      type: Array as PropType<FileEntityModel[]>,
      required: false
    },
    isDetailView: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup (props, context) {
    const files = ref<FileEntityModel[]>([])
    const file = ref<any>()

    if (props.inputFiles) {
      files.value = props.inputFiles
    }

    const uploadFile = (file: File) => {
      RepositoryFactory.get(FileRepository).uploadFile(file).then((res: FileEntityModel) => {
        res.contentType = file.type
        res.name = file.name
        res.size = file.size.toString()
        files.value.push(res)
      })
    }

    const deleteFileFromArray = (eventUuid: any) => {
      files.value.splice(files.value.findIndex(x => x.id === eventUuid), 1)
    }

    watch(() => files.value, () => {
      context.emit('addFiles', files.value)
    })

    return {
      files,
      file,
      uploadFile,
      deleteFileFromArray
    }
  }
})
</script>

<style lang="scss" scoped>
.add-button {
  min-width: 150px;
  margin-left: 20px;
}
</style>
