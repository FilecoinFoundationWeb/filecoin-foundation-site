<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :class="['button', `type__${type}`, `action__${action}`]">

    <span class="text">
      {{ text }}
    </span>

  </component>
</template>

<script>
// ====================================================================== Import
// import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Button',

  // components: {
  //   Button
  // },

  props: {
    button: { // A → Tier 1, B → Tier 2, C → Site Navigation
      type: Object,
      required: true
    }
  },

  computed: {
    type () {
      return this.button.type
    },
    action () {
      return this.button.action || 'button'
    },
    tag () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'button'; break
      }
      return tag
    },
    icon () {
      return this.button.icon
    },
    text () {
      return this.button.text
    },
    url () {
      return this.button.url
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
  &.type__C { // Navigation link styling
    @include fontSize_Medium;
    @include fontWeight_Medium;
  }
}
</style>
