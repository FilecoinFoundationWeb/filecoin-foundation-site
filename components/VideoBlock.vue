<template>
  <div class="block video-block">

    <img :src="preview_image" class="preview-image" />

  </div>
</template>

<script>
// ====================================================================== Import
// import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'TextBlock',

  // components: {
  //   Button
  // },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    preview_image () {
      return this.block.preview_image
    },
    url () {
      return this.block.url
    },
    icon () {
      return this.block.icon
    },
    subtext () {
      return this.block.subtext
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.video-block {
  @include borderRadius_Large;
  padding: 1rem;
  background-color: $hawkesBlue;
  box-shadow: 3px 3px 6px rgb(0 0 0 / 10%) inset;
}

.preview-image {
  @include borderRadius_Large;
  display: block;
  width: 100%;
}
</style>
