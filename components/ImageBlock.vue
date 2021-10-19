<template>
  <div v-if="src" class="block image-block">

    <img :src="src" class="image" />

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'ImageBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    src () {
      return this.block.src
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.image {
  display: block;
  width: 100%;
}
</style>
