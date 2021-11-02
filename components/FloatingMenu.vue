<template>
  <Zero_Core__FloatingWrapper
    :id="id"
    v-slot="scope"
    :thresholdoffset="threshold"
    :cutoffid="cutoff">

    <template v-if="entries.length">
      <div
        v-for="(entry, entryIndex) in entries"
        :key="`entry-${entryIndex}`">
        <div
          class="heading"
          @click="scope.jump(entry.id)">
          {{ entry.heading }}
        </div>
        <ul>
          <li
            v-for="(item, itemIndex) in entry.items"
            :key="`entry-${itemIndex}`"
            @click="scope.jump(item.id)">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </template>

    <template v-if="block.type === 'image_block'">
      <img :src="block.src" class="image" />
    </template>

  </Zero_Core__FloatingWrapper>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'FloatingMenu',

  props: {
    id: {
      type: String,
      required: false,
      default: 'floating-menu'
    },
    cutoff: {
      type: String,
      required: true
    },
    threshold: {
      type: Number,
      required: false,
      default: 120
    },
    entries: {
      type: Array,
      required: false,
      default: () => []
    },
    block: {
      type: Object,
      required: false,
      default: () => {}
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
