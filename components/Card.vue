<template>
  <div :class="['card', `type__${type}`, { 'with-image': img }]">

    <img
      v-if="img"
      :src="img"
      :class="['image', `size-${imgSize}`]" />

    <div
      v-if="date && !img"
      class="date-large"
      v-html="getDate('large')">
    </div>

    <div class="content">

      <div
        v-if="date"
        class="date"
        v-html="getDate('small')">
      </div>

      <div v-if="title" class="title">
        {{ title }}
      </div>

      <div v-if="description" class="description">
        {{ description }}
      </div>

      <Button
        v-if="cta"
        :button="cta"
        class="cta" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button
  },

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  computed: {
    type () {
      return this.card.type
    },
    img () {
      return this.card.img
    },
    imgSize () {
      return this.card.img_size || 'full'
    },
    title () {
      return this.card.title
    },
    description () {
      return this.card.description
    },
    date () {
      return this.card.date
    },
    cta () {
      return this.card.cta
    }
  },

  methods: {
    getDate (format) {
      const date = new Date(this.date)
      const moment = this.$moment.utc(date)
      if (format === 'large') { return `${moment.format('MM/DD')}<br />${moment.format('YYYY')}` }
      return moment.format('MMMM DD, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// Content
.image {
  margin-bottom: 0.5rem;
  &.size-full {
    width: 100%;
  }
  &.size-regular {
    width: 2.5rem;
  }
  &.size-mini {
    width: 1.375rem;
  }
}

.title {
  margin-bottom: 0.5rem;
}

// ////////////////////////////////////////////////////////////////// Variations
// -------------------------------------------------------------------- [Type] A
.type__A {
  .title {
    @include titleBlue;
  }
  .description {
    color: white;
  }
}

// -------------------------------------------------------------------- [Type] D
.type__D {
  @include borderRadius_Large;
  padding: 0.25rem;
  color: white;
  background-color: $azureRadiance;
  &:not(.with-image) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .image {
    @include borderRadius_Large;
    display: block;
    margin-bottom: 5rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .content {
    padding: 2.5rem;
    padding-top: 0;
  }
  .date {
    @include fontSize_Small;
    @include fontWeight_Bold;
    margin-bottom: 0.5rem;
  }
  .date-large {
    @include fontWeight_Bold;
    @include fontSize_ExtraExtraLarge;
    padding: 3.5rem;
    margin-bottom: 1.5rem;
    line-height: 1;
  }
  .title {
    @include fontSize_ExtraLarge;
    @include fontWeight_Medium;
    @include leading_Small;
  }
  .cta {
    margin-top: 0.5rem;
  }
}
</style>
