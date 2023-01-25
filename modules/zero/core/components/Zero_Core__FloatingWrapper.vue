<template>
  <div ref="parent" class="anchor-container">
    <div
      :class="['floating-content', { 'info-fixed': sticky }]"
      :style="{ width, transform }">

      <slot :jump="jumpToSection"></slot>

    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

// =================================================================== Functions
const stickyElementInViewport = (instance) => {
  const anchorElement = instance.$refs.parent
  const cutoffElement = document.getElementById(instance.cutoffid)

  if (anchorElement && cutoffElement) {
    const anchor = getElementDocumentCoords(anchorElement)
    const anchorWidth = `${Math.round(anchor.width)}px`
    const cutoff = getElementDocumentCoords(cutoffElement)

    const thresholdTop = window.pageYOffset + instance.thresholdoffset
    const thresholdBottom = cutoff.top - instance.bottomoffset

    if (anchor.top < thresholdTop && thresholdBottom > thresholdTop) {
      if (!instance.sticky) {
        instance.sticky = true
      }
      if (instance.width !== anchorWidth) {
        instance.width = anchorWidth
      }
      instance.transform = `translate(${anchor.left}px, ${instance.thresholdoffset}px)` // outside of if statement for resize
    } else if (thresholdBottom < thresholdTop) {
      if (instance.sticky) {
        instance.sticky = false
        instance.width = 'inherit'
        instance.transform = `translate(0px, ${thresholdBottom - anchor.top}px)`
      }
    } else {
      if (instance.sticky) {
        instance.sticky = false
        instance.width = 'inherit'
        instance.transform = 'translate(0px, 0px)'
      }
    }
  }
}

const getElementDocumentCoords = (elem) => {
  const box = elem.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left), width: box.width }
}

// ====================================================================== Export
export default {
  name: 'FloatingWrapper',

  props: {
    thresholdoffset: {
      type: Number,
      required: false,
      default: 120
    },
    cutoffid: {
      type: String,
      required: false,
      default: ''
    },
    bottomoffset: {
      type: Number,
      required: false,
      default: 120
    }
  },

  data () {
    return {
      sticky: false,
      transform: 'translate(0px, 0px)',
      width: 'inherit'
    }
  },

  mounted () {
    this.scroll = () => { stickyElementInViewport(this) }
    window.addEventListener('scroll', Throttle(this.scroll, 1))
    this.resize = () => { stickyElementInViewport(this) }
    window.addEventListener('resize', Throttle(this.resize, 10))
  },

  beforeDestroy () {
    if (this.scroll) { window.removeEventListener('scroll', this.scroll) }
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    jumpToSection (id) {
      const element = document.getElementById(id) || document.querySelector(`[data-id='${id}']`)
      this.$scrollToElement(element, 0, -50)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.anchor-container {
  position: relative;
  z-index: 10000;
  width: 100%;
}

.floating-content {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  z-index: 10000;
  &.info-fixed {
    position: fixed;
  }
}

.heading {
  cursor: pointer;
  z-index: 10000;
}

</style>
