<template>
  <div class="block slider-block">

    <Zero_Core__Slider
      :collection="cards"
      :rows="rowDisplayNumber"
      :display-options="columnDisplayNumber">

      <Card
        v-for="(card, index) in cards"
        :slot="`column-${index}`"
        :key="index"
        :card="card" />

      <Zero_Core__Icon_PrevArrow
        slot="icon-previous"
        class="chevron left" />

      <div
        slot="icon-next"
        class="selector-next">

        MORE

        <Zero_Core__Icon_NextArrow class="chevron right" />
      </div>

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
    },
    rowDisplayNumber () {
      return this.block.rows
    },
    columnDisplayNumber () {
      return this.block.display
    }
  }
}
</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Slider
::v-deep .chevron {
  stroke: #73B4ED;
}

::v-deep .selector-next,
::v-deep .chevron.left {
  cursor: pointer;
  opacity: 0.8;
  transition: 200ms ease;
  &:hover {
    opacity: 1.0;
  }
}

// /////////////////////////////////////////////////////////////////////// Cards
::v-deep .card {
  margin-bottom: 3rem;
  &.is-link {
    &:before {
      content: unset !important;
    }
  }
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

::v-deep .click-wrapper {
  padding: 1rem 1.5rem;
  position: relative;
  &:hover {
    &:before {
      transition: 250ms ease-in;
      opacity: 1;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 6px solid $azureRadiance;
    border-radius: 1.5rem;
    opacity: 0;
    transition: 250ms ease-out;
  }
}

::v-deep .slide-selector {
  justify-content: space-between;
  svg {
    transform: scale(2);
  }
}

::v-deep .selector-next {
  color: $jordyBlue;
  font-size: 12px;
  letter-spacing: $letterSpacing_Large;
  line-height: 2.5;
  @include fontWeight_Bold;
  svg {
    margin-left: 1rem;
  }
}

</style>
