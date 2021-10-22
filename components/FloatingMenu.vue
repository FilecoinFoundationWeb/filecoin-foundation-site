<template>
  <div id="sticky-info" ref="parent">
    <div
      :class="['sticky-content', { 'info-fixed': sticky }]"
      :style="`transform: ${transform}`">
      <div
        v-for="(entry, entryIndex) in entries"
        :key="`entry-${entryIndex}`">
        <div
          class="heading"
          @click="jumpToSection(entry.id)">
          {{ entry.heading }}
        </div>
        <ul>
          <li
            v-for="(item, itemIndex) in entry.items"
            :key="`entry-${itemIndex}`"
            @click="jumpToSection(item.id)">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// =================================================================== Functions
const stickyElementInViewport = (instance, lowerBoundElementID) => {
  const element = instance.$refs.parent
  const coords = getElementDocumentCoords(element)
  const elementTop = coords.top
  const elementLeft = coords.left
  const threshold = window.pageYOffset + 120

  const section = document.getElementById(lowerBoundElementID)
  const sectionTop = getElementDocumentCoords(section).top

  if (elementTop < threshold && sectionTop > threshold) {
    if (!instance.sticky) {
      instance.sticky = true
    }
    instance.transform = `translate(${elementLeft}px, 0px)` // outside of if statement for resize
  } else if (sectionTop < threshold) {
    if (instance.sticky) {
      instance.sticky = false
      instance.transform = `translate(0px, ${sectionTop - elementTop}px)`
    }
  } else {
    if (instance.sticky) {
      instance.sticky = false
      instance.transform = 'translate(0px, 0px)'
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

  return { top: Math.round(top), left: Math.round(left) }
}

// ====================================================================== Export
export default {
  name: 'FloatingMenu',

  props: {
    entries: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      sticky: false,
      transform: 'translate(0px, 0px)'
    }
  },

  mounted () {
    this.scroll = () => { stickyElementInViewport(this, 'section-6') }
    window.addEventListener('scroll', this.scroll)
    this.resize = () => { stickyElementInViewport(this, 'section-6') }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.scroll) { window.removeEventListener('scroll', this.scroll) }
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    jumpToSection (section) {
      const element = document.getElementById(section) || document.querySelector(`[data-id='${section}']`)
      this.$scrollToElement(element, 0, -50)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  cursor: pointer;
  z-index: 10000;
}

</style>
