<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    :class="['card', `type__${type}`, { 'with-image': img, 'is-link': tag !== 'div' }]"
    :data-id="dataIdAttribute">

    <div
      v-if="img && imgType === 'background_image'"
      :style="{ backgroundImage: `url('${img}')`, backgroundPosition: imgBackgroundPosition }"
      :class="['image', `size-${imgSize}`, { 'background-image': imgType === 'background_image' }]">
    </div>

    <img
      v-if="img && imgType !== 'background_image' && imgType !== 'nuxt_link'"
      :src="img"
      :class="['image', `size-${imgSize}`]" />

    <nuxt-link
      v-if="img && imgType === 'nuxt_link'"
      :to="cta.url"
      class="image-link">
      <img :src="img" :class="['image', `size-${imgSize}`]" />
    </nuxt-link>

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

        <template v-if="type === 'E'">
          <div class="title" v-html="shortenString(title, 50)"></div>
          <div class="description" v-html="shortenString(description, 50)"></div>
        </template>

        <div v-if="title && type !== 'E'" class="title">
          {{ title }}
        </div>

        <div
          v-if="description && type !== 'D' && type !== 'C' && type !== 'E'"
          class="description"
          v-html="description">
        </div>

        <Button
          v-if="cta"
          :button="cta"
          class="cta" />

      </div>

      <div
        v-if="description && type !== 'B' && type !== 'A' && type !== 'E'"
        class="panel-right">
        <div
          class="description"
          v-html="description">
        </div>
      </div>

    </div>

  </component>
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
    action () {
      return this.card.action || 'div'
    },
    tag () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'div'; break
      }
      return tag
    },
    target () {
      return this.card.target
    },
    url () {
      return this.card.url
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
    },
    dataIdAttribute () {
      return this.card.data_id
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
      } else if (this.type !== 'E') { // single date, no range
        return `${pastTag}${start.format('MMMM D YYYY')}`
      } else {
        return `${start.format('MMMM D YYYY')}`
      }
    },
    shortenString (string, n) {
      const chars = string.split('')
      if (chars.length > n) {
        const shortened = chars.slice(0, n)
        return `${shortened.join('')}...`
      }
      return chars.join('')
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
  &.is-link {
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
      top: -1.5rem;
      left: -1.5rem;
      width: calc(100% + 3rem);
      height: calc(100% + 3rem);
      border: 6px solid $azureRadiance;
      border-radius: 1.5rem;
      opacity: 0;
      transition: 250ms ease-out;
    }
  }
  .title {
    @include fontWeight_Medium;
    @include leading_Regular;
    color: $azureRadiance;
  }
  ::v-deep .description {
    color: white;
    a {
      color: $jordyBlue;
    }
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
      @include tiny {
        transform: translateY(-70px);
      }
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
    @include tiny {
      @include fontSize_Small;
    }
  }
  .description {
    position: absolute;
    text-align: center;
    padding: 0 1rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.25rem;
    color: white;
    z-index: -1;
    @include fontSize_Small;
    @include small {
      bottom: 2.25rem;
    }
    @include tiny {
      @include fontSize_Mini;
      bottom: 1.25rem;
    }
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
  width: calc(50% - 3rem);
  @include small {
    width: calc(50% - 3rem);
  }
  &:nth-child(odd) {
    @include small {
      margin-right: 2rem;
    }
    @include mini{
      margin-right: 4rem;
    }
    @include tiny{
      margin-right: 2rem;
    }
  }
  @include tiny {
    flex-direction: column;
  }
  .image {
    width: 4rem;
    height: 6.25rem;
    border-radius: 4rem;
    margin-bottom: unset;
    @include tiny {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .description {
    margin: 0 1rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 0.8125rem;
    @include tiny {
      margin: 1rem 0;
      text-align: center;
    }
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
  transform: scale(1);
  transition: 300ms ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.0);
  &:hover {
    transform: scale(1.03125);
    box-shadow: 3px 7px 10px rgba(10, 30, 82, 0.25);
  }
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
    @include mini {
      margin-bottom: 2rem;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100% - 16.25rem - 4rem);
    padding: 2.5rem;
    padding-top: 0;
    @include mini {
      height: calc(100% - 16.25rem - 2rem);
    }
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

// -------------------------------------------------------------------- [Type] E
.card.type__E {
  @include borderRadius_Large;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 27rem;
  margin: 0 1rem 3rem 0 !important;
  width: calc(33% - 1rem);
  padding: 0.75rem;
  color: $blackPearl;
  background-color: $white;
  @include small {
    width: calc(50% - 1rem);
  }
  @include mini {
    width: calc(100% - 1rem);
  }
  .image-link {
    height: 47%;
    @include borderRadius_Large;
    overflow: hidden;
  }
  .image {
    position: relative;
    @include borderRadius_Large;
    display: block;
    margin-bottom: auto;
    width: unset;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .content {
    display: block;
    padding: 0.625rem;
    padding-top: 1.25rem;
  }
  .panel-right {
    display: none;
  }
  .date,
  .label {
    @include fontSize_Small;
    @include fontWeight_Regular;
    letter-spacing: $letterSpacing_Large;
    margin-bottom: 0.5rem;
    opacity: 0.7;
  }
  .date-large {
    @include fontWeight_Bold;
    @include fontSize_ExtraExtraLarge;
    display: block;
    height: 12.875rem;
  }
  .title {
    @include fontSize_Regular;
    @include fontWeight_SemiBold;
    @include leading_Regular;
    letter-spacing: $letterSpacing_Large;
    color: $kleinBlue;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .description {
    @include fontSize_Small;
    @include fontWeight_Regular;
    @include leading_Medium;
    letter-spacing: $letterSpacing_Large;
  }
  .cta {
    margin-top: 0.5rem;
  }
}

</style>
