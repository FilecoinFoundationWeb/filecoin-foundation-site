<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    :class="['card', `type__${type}`, { 'with-image': img, 'is-link': tag !== 'div' }, { pastEvent }]"
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
      v-if="date && !img && type !== 'F'"
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
          <div class="title" v-html="title"></div>
          <div class="description" v-html="description"></div>
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
          v-if="cta && (cta.text || cta.icon)"
          :button="cta"
          class="cta" />

      </div>

      <div
        v-if="description && type !== 'B' && type !== 'A' && type !== 'E' && type !== 'F'"
        class="panel-right">
        <div
          v-if="type === 'D'"
          class="description"
          v-html="shortenString(description, 175)">
        </div>
        <div
          v-else
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
      if (this.card.date_start && this.card.date_end) {
        return [this.card.date_start, this.card.date_end]
      }
      if (this.card.date_start && !this.card.date) {
        return this.card.date_start
      }
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
    },
    pastEvent () {
      const date = this.date
      const end = Array.isArray(date) ? this.$moment.utc(new Date(date[1])) : this.$moment.utc(new Date(date))
      return this.$moment.utc(new Date()).isAfter(end, 'day')
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
.card:focus {
  outline: none;
}
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
    &:hover, &:focus-visible {
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
    color: $white;
    a {
      color: $jordyBlue;
    }
  }

}

@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {
    .safari_only {
      .card.type__A {
        &:focus {
          &:before {
            transition: 250ms ease-in;
            opacity: 1;
          }
        }
      }
    }
  }
}

// -------------------------------------------------------------------- [Type] B
.card.type__B {
  position: relative;
  padding: 0 12px;
  margin: 0 0.5rem;
  overflow: visible;
  margin-top: 10rem;
  .content {
    height: 100%;
    width: 100%;
  }
  .panel-left {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }
  .image {
    position: absolute;
    width: calc(100% - 1rem);
    left: 0.5rem;
    bottom: 3rem;
    transform: translateY(0);
    border-radius: 11.375rem;
    transition: ease-in-out 350ms;
    margin-bottom: 0;
  }
  &:focus-visible {
    outline: 0;
  }
  &:hover, &:focus-visible {
    .image {
      bottom: 100%;
    }
  }
  .title {
    position: absolute;
    bottom: 0rem;
    width: calc(100% - 1.5rem);
    transform: translateY(calc(100% - 0.5rem));
    @include fontSize_Regular;
    @include fontWeight_SemiBold;
    color: $kleinBlue;
    text-align: center;
    @include tiny {
      @include fontSize_Small;
    }
  }
  .description {
    text-align: center;
    padding: 1rem 0.5rem 1rem 0.5rem;
    margin-bottom: 4rem;
    color: $white;
    z-index: -1;
    @include fontSize_Small;
    @include small {
      bottom: 2.25rem;
    }
    @include mini {
      @include fontSize_Mini;
    }
    @include tiny {
      font-size: 10pt;
      bottom: 1.25rem;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: calc(100% - 2.5rem);
    min-height: calc((11.375rem + 0.5rem) / 2);
    left: 0;
    bottom: 2.5rem;
    background-color: $kleinBlue;
    z-index: -1;
    border-radius: 0 0 calc(11.375rem + 0.5rem) calc(11.375rem + 0.5rem);
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
    object-fit: cover;
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
    color: $white;
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
  color: $white;
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
    flex: 1;
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
  .description {
    @include mini {
      @include fontSize_Small;
    }
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
  min-height: 27rem;
  margin: 0 1rem 1.25rem 0 !important;
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
    flex-grow: 1;
  }
  .panel-left {
    height: 100%;
    display: flex;
    flex-direction: column;
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
  }
  .description {
    @include fontSize_Small;
    @include fontWeight_Regular;
    @include leading_Medium;
    letter-spacing: $letterSpacing_Large;
  }
  .cta {
    margin-top: auto;
  }
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-flex: 1;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}

// -------------------------------------------------------------------- [Type] F
.card.type__F {
  color: $white;
  border-top: 2px solid #73B4ED;
  padding-top: 1.25rem;
  padding-bottom: 1.75rem;
  .image {
    display: none;
  }
  .date {
    @include fontSize_Small;
    @include fontWeight_Bold;
    color: $polar;
    line-height: leading(40, 13);
    opacity: 0.7;
  }
  .title {
    @include fontSize_Large;
    @include fontWeight_Medium;
    color: $white;
    line-height: leading(32, 20);
    margin-bottom: 0.5rem;
  }
  .description {
    @include fontSize_Regular;
    @include fontWeight_Regular;
    color: $white;
    line-height: leading(28, 16);
    margin-bottom: 1.125rem;
  }
  &.pastEvent {
    .content {
      opacity: 0.7;
    }
  }
}

</style>
