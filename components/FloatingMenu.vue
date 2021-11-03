<template>
  <Zero_Core__FloatingWrapper
    :id="id"
    v-slot="scope"
    :thresholdoffset="offsettop"
    :cutoffid="cutoff"
    :bottomoffset="offsetbottom">

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

    <div
      v-if="content"
      class="custom-content"
      v-html="content">
    </div>

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
    offsettop: {
      type: Number,
      required: false,
      default: 120
    },
    offsetbottom: {
      type: Number,
      required: false,
      default: 120
    },
    cutoff: {
      type: String,
      required: true
    },
    entries: {
      type: Array,
      required: false,
      default: () => []
    },
    content: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.custom-content {
  width: 100%;
}

.image {
  display: block;
  width: 100%;
}

.anchor-container,
.floating-content,
.image {
  @include mini {
    z-index: -1;
  }
}

</style>
