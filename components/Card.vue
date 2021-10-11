<template>
  <div :class="['card', `type__${type}`]">

    <img
      v-if="img"
      :src="img"
      :class="['image', `size-${imgSize}`]" />

    <div v-if="title" class="title">
      {{ title }}
    </div>

    <div v-if="description" class="description">
      {{ description }}
    </div>

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'Card',

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
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card {
  width: calc(50% - 1.5rem);
  margin-bottom: 3rem;
  &:nth-child(odd) {
    margin-right: 3rem;
  }
}

// ///////////////////////////////////////////////////////////////////// Content
.image {
  margin-bottom: 0.5rem;
  &.size-full {
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
</style>
