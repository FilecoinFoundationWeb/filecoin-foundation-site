<template>
  <div class="block card-list-block">

    <div class="grid-start">

      <div
        v-for="(card, index) in list"
        :key="index"
        class="col-4 card-column">

        <Card :card="card" />

      </div>

    </div>

    <div class="button-row">
      <Button
        v-if="showLoadMoreButton"
        :button="loadMoreButton"
        @buttonClicked="loadMoreCards" />
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'CardListBlock',

  components: {
    Card,
    Button
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      list: [],
      current: 0
    }
  },

  computed: {
    cards () {
      return this.block.cards
    },
    loadMoreButton () {
      return this.block.load_more_button
    },
    initialDisplayCount () {
      return this.block.display.initial
    },
    nextDisplayCount () {
      return this.block.display.next
    },
    showLoadMoreButton () {
      return this.cards.length > this.current
    }
  },

  created () {
    const display = this.initialDisplayCount
    this.list = this.cards.slice(0, display)
    this.current = display
  },

  methods: {
    loadMoreCards () {
      if (this.showLoadMoreButton) {
        const current = this.current + this.nextDisplayCount
        this.list = this.cards.slice(0, current)
        this.current = current
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card-column {
  &:nth-child(3n + 2) {
    margin-top: -3rem;
  }
  &:nth-child(2n + 1),
  &:nth-child(6n - 2) {
    .card {
      background-color: $kleinBlue;
    }
  }
  &:nth-child(6n + 1),
  &:nth-child(6n - 1) {
    .card {
      background-color: $deepCove;
    }
  }
}

.button-row {
  justify-content: center;
  margin-top: -2rem;
}
</style>
