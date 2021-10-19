<template>
  <div class="slider">

    <slot :content="content" />

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'Slider',

  props: {
    selected: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },

  computed: {
    slides () {
      const data = {}
      this.options.forEach((slide) => {
        data[slide.label] = slide
      })
      return data
    },
    content () {
      if (this.slides.hasOwnProperty(this.selected)) {
        return this.slides[this.selected]
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
