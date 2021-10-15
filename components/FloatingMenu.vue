<template>
  <div id="sticky-info">
    <div class="sticky-content">
      <div
        v-for="entry in entries"
        :key="entry.heading">
        <div
          class="heading"
          @click="jumpToSection(entry.heading)">
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
      console.log(section)
      this.$scrollToY(0)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  cursor: pointer;
}

</style>
