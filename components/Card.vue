<template>
  <div :class="['card', `type__${type}`, { 'with-image': img }]">

    <div
      v-if="img && imgType === 'background_image'"
      :style="{ backgroundImage: `url('${img}')`, backgroundPosition: imgBackgroundPosition }"
      :class="['image', `size-${imgSize}`, { 'background-image': imgType === 'background_image' }]">
    </div>

    <img
      v-if="img && imgType !== 'background_image'"
      :src="img"
      :class="['image', `size-${imgSize}`]" />

    <div
      v-if="date && !img"
      class="date-large"
      v-html="getDate('large')">
    </div>

    <div class="content">

      <div class="panel-left">

        <slot name="card__A" />

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
          v-if="description && type !== 'D'"
          class="description"
          v-html="description">
        </div>

        <Button
          v-if="cta"
          :button="cta"
          class="cta" />

      </div>

      <div v-if="description" class="panel-right">
        <div
          class="description"
          v-html="description">
        </div>
      </div>

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
    },
    forceImageType: {
      type: String,
      required: false,
      default: 'img'
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
    imgType () {
      const force = this.forceImageType
      if (force !== 'img') { return force }
      return this.card.img_type
    },
    imgBackgroundPosition () {
      return this.card.img_background_position || 'center center'
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
      const date = this.date
      const start = Array.isArray(date) ? this.$moment.utc(new Date(date[0])) : this.$moment.utc(new Date(date))
      const end = Array.isArray(date) ? this.$moment.utc(new Date(date[1])) : false
      if (format === 'large') { // big date
        return `${start.format('MM/DD')}<br />${start.format('YYYY')}`
      }
      let isPast = this.$moment.utc(new Date()).isAfter(start, 'day')
      let pastTag = isPast ? '(Past) ' : ''
      if (end) { // range, two dates
        isPast = this.$moment.utc(new Date()).isAfter(end, 'day')
        pastTag = isPast ? '(Past) ' : ''
        if (start.year() === end.year()) { // same year
          return `${pastTag}${start.format('MMM D')} - ${end.format('MMM D YYYY')}`
        } else { // different years
          return `${pastTag}${start.format('MMM D YYYY')} - ${end.format('MMM D YYYY')}`
        }
      } else { // single date, no range
        return `${pastTag}${start.format('MMMM D YYYY')}`
      }
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
  &.background-image {
    background-size: cover;
    background-repeat: no-repeat;
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
  padding: 0 12px;
  margin: 0 0.5rem !important;
  width: 25% !important;
  .image {
    position: relative;
    width: 100%;
    transform: translateY(0);
    border-radius: 11.375rem;
    transition: ease-in-out 350ms;
    margin-bottom: 0;
  }
  &:hover {
    .image {
      transform: translateY(-100px);
    }
  }
  .title {
    position: absolute;
    bottom: -3rem;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    margin-top: 1.875rem;
    @include fontSize_Regular;
    @include fontWeight_SemiBold;
    color: $kleinBlue;
    text-align: center;
  }
  .description {
    position: absolute;
    text-align: center;
    padding: 0 1rem;
    width: calc(100% - 26px - 2rem);
    bottom: 1.25rem;
    color: white;
    z-index: -1;
    @include fontSize_Small;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 61%;
    left: 0;
    top: 39%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 36rem;
  padding: 0.25rem;
  color: white;
  background-color: $azureRadiance;
  &:not(.with-image) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content {
      height: auto;
    }
  }
  .image {
    @include borderRadius_Large;
    display: block;
    height: 16.25rem;
    margin-bottom: 4rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100% - 16.25rem - 4rem);
    padding: 2.5rem;
    padding-top: 0;
  }
  .panel-right {
    display: none;
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
    @include fontSize_Large;
    @include fontWeight_Medium;
    @include leading_Small;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .cta {
    margin-top: 0.5rem;
  }
}
</style>
