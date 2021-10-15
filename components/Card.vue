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
        v-if="date && !label"
        class="date"
        v-html="getDate('small')">
      </div>

      <div v-else class="label">
        {{ label }}
      </div>

      <div v-if="title" class="title">
        {{ title }}
      </div>

      <div
        v-if="description"
        class="description"
        v-html="description">
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
    label () {
      return this.card.label
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
.card.type__A {
  &:nth-child(odd) {
    margin-right: 3rem;
  }
  .title {
    @include fontWeight_Medium;
    @include leading_Regular;
    color: $azureRadiance;
  }
  .description {
    color: white;
  }
}

// -------------------------------------------------------------------- [Type] B
.card.type__B {
  position: relative;
  padding: 0 13px;
  margin: 0 0.5rem;
  .image {
    position: relative;
    width: 11.375rem;
    height: 17.25rem;
    top: 0;
    border-radius: 11.375rem;
    transition: ease-in-out 350ms;
  }
  &:hover {
    .image {
      top: calc(-6rem - 13px);
    }
  }
  .title {
    margin-top: 1.875rem;
    @include fontWeight_SemiBold;
    color: $kleinBlue;
    text-align: center;
  }
  .description {
    position: absolute;
    text-align: center;
    padding: 0 1rem;
    width: calc(100% - 26px - 2rem);
    bottom: 6.25rem;
    color: white;
    z-index: -1;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: calc(10.25rem + 13px);
    left: 0;
    top: 7rem;
    background-color: $kleinBlue;
    z-index: -1;
    border-radius: 0 0 calc(11.375rem + 26px) calc(11.375rem + 26px);
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.2));
  }
}

// -------------------------------------------------------------------- [Type] C
.card.type__C {
  display: flex;
  flex-direction: row;
  width: 50%;
  .image {
    width: 4rem;
    height: 6.25rem;
    border-radius: 4rem;
    margin-bottom: unset;
  }
  .description {
    margin: 0 1rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 0.8125rem;
  }
}

// -------------------------------------------------------------------- [Type] D
.card.type__D {
  @include borderRadius_Large;
  height: 36rem;
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
  .date,
  .label {
    @include fontSize_Small;
    @include fontWeight_Bold;
    margin-bottom: 0.5rem;
    opacity: 0.7;
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
