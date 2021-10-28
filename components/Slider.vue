<template>
  <div class="slider">

    <slot :content="content" />

  </div>
</template>

<script>
// =================================================================== Functions
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

  data () {
    return {
      slideWidth: 0,
      slideHeight: 0,
      resize: false
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
        const content = this.slides[this.selected]
        content.width = this.slideWidth
        content.height = this.slideHeight
        return content
      }
      return false
    }
  },

  watch: {
    selected () {
      this.slideDimensions()
    }
  },

  mounted () {
    setTimeout(() => { this.slideDimensions() }, 200)
    this.resize = () => { this.slideDimensions() }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    slideDimensions () {
      if (this.$parent.$refs.display) {
        this.$nextTick(() => {
          const rect = this.$parent.$refs.display.getBoundingClientRect()
          this.slideWidth = Math.round(rect.width)
          this.slideHeight = Math.round(rect.height)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
