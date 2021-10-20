<template>
  <div class="block card-list-block">

    <div class="grid-start">

      <div
        v-for="(card, index) in list"
        :key="index"
        :class="['card-column', index === 0 ? firstColumnNum : 'col-4_sm-6_mi-12']">

        <Card
          :card="card"
          :force-image-type="forceImageType">
          <template v-if="card.event_type === 'hackathon'" #card__A>
            <IconCode class="icon-code" />
          </template>
        </Card>

      </div>

    </div>

    <div
      v-if="showLoadMoreButton"
      class="button-row">
      <Button
        :button="loadMoreButton"
        @buttonClicked="loadMoreCards" />
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Card from '@/components/Card'
import Button from '@/components/Button'
import IconCode from '@/components/icons/Code'

// ====================================================================== Export
export default {
  name: 'CardListBlock',

  components: {
    Card,
    Button,
    IconCode
  },

  props: {
    block: {
      type: Object,
      required: true
    },
    firstColumnNum: {
      type: String,
      required: false,
      default: 'col-4_sm-6_mi-12'
    },
    forceImageType: {
      type: String,
      required: false,
      default: 'img'
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

  watch: {
    cards (newCards) {
      this.list = this.cards.slice(0, this.current)
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
.icon-code {
  width: 1.25rem;
}
</style>
