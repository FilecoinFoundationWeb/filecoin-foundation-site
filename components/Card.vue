<template>
  <div :class="['card', `type__${type}`]">

    <img
      v-if="img"
      :src="img"
      :class="['image', `size-${imgSize}`]" />

    <div v-if="title" class="title">
      {{ title }}
    </div>

    <div
      v-if="description"
      class="description"
      v-html="description">
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
  // &:nth-child(odd) {
  //   margin-right: 3rem;
  // }
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
  &:nth-child(odd) {
    margin-right: 3rem;
  }
  .title {
    @include titleBlue;
  }
  .description {
    color: white;
  }
}

// -------------------------------------------------------------------- [Type] B
.type__B {
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
.type__C {
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
</style>
