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
// /////////////////////////////////////////////////////////////////////// Cards
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: calc(50% - 1.5rem);
  margin-bottom: 3rem;
  @include mini {
    width: 100%;
    margin-bottom: 2rem;
  }
  &:nth-child(odd) {
    &:not(.type__B) {
      margin-right: 3rem;
      @include mini {
        margin-right: 0;
      }
    }
  }
}
</style>
