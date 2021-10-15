<template>
  <div id="sticky-info">
    <div class="sticky-content">
      <div
        v-for="entry in entries"
        :key="entry.heading">
        <div
          class="heading"
          @click="jumpToSection(entry.id)">
          {{ entry.heading }}
        </div>
        <ul>
          <li
            v-for="item in entry.items"
            :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// =================================================================== Functions
const getElementTop = (elem) => {
  const box = elem.getBoundingClientRect()
  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const clientTop = docEl.clientTop || body.clientTop || 0
  const top = box.top + scrollTop - clientTop

  return Math.round(top)
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

  methods: {
    jumpToSection (section) {
      const element = document.getElementById(section)
      const top = getElementTop(element)
      this.$scrollToY(top)
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
