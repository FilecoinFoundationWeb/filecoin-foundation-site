<template>
  <div class="block card-list-block">

    <div v-if="heading" class="heading" v-html="heading"></div>

    <div :class="`grid-start${forceGrid}`">

      <div
        v-for="(card, index) in list"
        :key="index"
        :class="['card-column', getColumns(index)]">

        <component
          :is="cardType"
          :card="card"
          :force-image-type="forceImageType">
          <template v-if="card.event_type === 'hackathon'" #card__A>
            <IconCode class="icon-code" />
          </template>
        </component>

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
import CaseStudyCard from '@/components/CaseStudyCard'
import Button from '@/components/Button'
import IconCode from '@/components/icons/Code'
// =================================================================== Functions
const setColumnWidths = (instance) => {
  if (window.matchMedia('(max-width: 53.125rem)').matches) {
    if (instance.pattern !== 3) {
      instance.pattern = 3
    }
  } else if (window.matchMedia('(max-width: 40rem)').matches) {
    if (instance.pattern !== 0) {
      instance.pattern = 0
    }
  } else {
    if (instance.pattern !== 6) {
      instance.pattern = 6
    }
  }
}

// ====================================================================== Export
export default {
  name: 'CardListBlock',

  components: {
    Card,
    CaseStudyCard,
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
      current: 0,
      pattern: 6,
      resize: false
    }
  },

  computed: {
    heading () {
      return this.block.heading
    },
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
    },
    caseStudy () {
      return this.block.case_study
    },
    cardType () {
      return this.caseStudy ? 'CaseStudyCard' : 'Card'
    },
    forceGrid () {
      return this.block.forceGrid ? `-${this.block.forceGrid}` : ''
    },
    forceCardColumns () {
      return this.block.forceCardColumns
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

  mounted () {
    if (this.caseStudy) {
      this.resize = () => { setColumnWidths(this) }
      window.addEventListener('resize', this.resize)
    }
  },

  beforeDestroy () {
    if (this.resize) {
      window.removeEventListener('resize', this.resize)
    }
  },

  methods: {
    loadMoreCards () {
      if (this.showLoadMoreButton) {
        const current = this.current + this.nextDisplayCount
        this.list = this.cards.slice(0, current)
        this.current = current
      }
    },
    getColumns (index) {
      if (this.forceCardColumns) { return this.forceCardColumns }
      if (this.caseStudy) { return (index % this.pattern === 0) ? 'col-8_sm-12' : 'col-4_sm-6_mi-12' }
      return index === 0 ? this.firstColumnNum : 'col-4_sm-6_mi-12'
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  color: white;
  font-size: 2.8125rem;
  @include fontWeight_SemiBold;
  letter-spacing: 0.4px;
  line-height: leading(65, 45);
  margin-bottom: 3.4375rem;
}

.icon-code {
  width: 1.25rem;
}
</style>
