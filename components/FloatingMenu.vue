<template>
  <div id="sticky-info">
    <div class="sticky-content">
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
