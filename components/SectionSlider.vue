<template>
  <div class="block slider-block">

    <Zero_Core__Slider
      :collection="cards">

      <Card
        v-for="(card, index) in cards"
        :slot="`column-${index}`"
        :key="index"
        :card="card" />

      <Zero_Core__Icon_PrevArrow
        slot="icon-previous"
        class="chevron" />

      <Zero_Core__Icon_NextArrow
        slot="icon-next"
        class="chevron" />

    </Zero_Core__Slider>

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'

// ====================================================================== Export
export default {
  name: 'SectionSlider',

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
  },

  mounted () {
    console.log(this.cards)
  }
}
</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Slider
::v-deep .chevron {
  stroke: #73B4ED;
}

// /////////////////////////////////////////////////////////////////////// Cards
.card {
  width: calc(50% - 1.5rem);
  margin-bottom: 3rem;
  @include mini {
    width: 100%;
    margin-bottom: 2rem;
  }
  &:nth-child(odd) {
    margin-right: 3rem;
    @include mini {
      margin-right: 0;
    }
  }
}
</style>
