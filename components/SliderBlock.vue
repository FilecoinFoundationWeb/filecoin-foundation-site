<template>
  <div class="block slider-block">

    <div class="card-list">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :card="card" />
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'

// ====================================================================== Export
export default {
  name: 'SliderBlock',

  components: {
    Card
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    cards () {
      return this.block.cards
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
