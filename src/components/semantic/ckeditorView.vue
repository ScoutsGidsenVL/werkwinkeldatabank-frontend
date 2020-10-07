<template>
   <div class="w-100 text-left" v-html='content' />
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'


export default defineComponent({
  name: 'ckeditor-view',
  props: {
    content: String
  }
})
</script>

<style lang='scss' scoped>
    ::v-deep .image{
        width: 100%;

        img{
            width: 100%;
        }
    }

    ::v-deep .image-style-side{
        float: right;
        margin-left: var(--ck-image-style-spacing);
        max-width: 50%;

        img{
            display: block;
            margin: 0 auto;
            max-width: 100%;
            min-width: 50px;
        }
    }
</style>
