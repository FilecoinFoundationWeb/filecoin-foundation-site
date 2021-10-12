<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :class="['button', `type__${type}`, `action__${action}`, `theme__${theme}`]"
    @click="openModal">

    <div
      v-if="icon"
      :class="['icon', icon]">
      <IconPlay v-if="icon === 'play'" />
    </div>

    <span class="text">
      {{ text }}
    </span>

  </component>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconPlay from '@/components/icons/Play'

// ====================================================================== Export
export default {
  name: 'Button',

  components: {
    IconPlay
  },

  props: {
    button: { // (A) → Tier 1 | (B) → Tier 2 | (C) → Site navigation | (D) → Tier 2 w/o border
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
    },
    theme () {
      return this.button.theme || 'light'
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      if (this.action === 'video') {
        this.setModal({
          action: 'video',
          url: this.url
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$layerOffset: 0.25rem;

// ///////////////////////////////////////////////////////////////////// General
.button {
  @include leading_Tiny;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  svg {
    display: block;
  }
}

.text {
  display: block;
  position: relative;
  z-index: 15;
}

// ////////////////////////////////////////////////////////////////// Variations
// -------------------------------------------------------------------- [Type] A
.type__A {
  @include fontSize_Small;
  @include fontWeight_SemiBold;
  position: relative;
  margin: 0.5rem;
  border-radius: 3rem;
  &:hover {
    &:before,
    &:after {
      transition: 250ms ease-in;
    }
    &:before {
      background-color: $kleinBlue;
    }
    &:after {
      box-shadow: 0 0 6px rgba(214, 234, 251, 1) inset, 0 0 6px rgba(14, 29, 126, 1);
    }
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: inherit;
    transition: 250ms ease-out;
  }
  &:before {
    width: calc(100% + #{$layerOffset * 4});
    height: calc(100% + #{$layerOffset * 4});
    top: -$layerOffset * 2;
    left: -$layerOffset * 2;
    background-color: $hawkesBlue;
    box-shadow: 0 0 6px rgba(112, 180, 240, 1) inset;
    z-index: 5;
  }
  &:after {
    width: calc(100% + #{$layerOffset * 2});
    height: calc(100% + #{$layerOffset * 2});
    top: -$layerOffset;
    left: -$layerOffset;
    background-color: $polar;
    box-shadow: 0 0 6px rgba(214, 234, 251, 1) inset, 0 0 6px rgba(178, 215, 248, 1);
    z-index: 10;
  }
  &.theme__dark {
    &:hover {
      &:before {
        background-color: $kleinBlue;
      }
      &:after {
        background-color: $denim;
      }
    }
    &:before {
      background-color: $deepCove;
      box-shadow: 0 0 6px rgba(0, 9, 110, 0.45) inset;
    }
    &:after {
      background-color: $kleinBlue;
      box-shadow: 0 0 6px rgba(6, 33, 164, 0.5) inset, 0 0 6px rgba(6, 9, 78, 0.55);
    }
    .text {
      background-color: $denim;
      color: white;
      box-shadow: 0 0 6px rgba(6, 9, 78, 1);
    }
  }
  .text {
    padding: 10px 1.25rem 9px;
    background-color: white;
    color: $kleinBlue;
    box-shadow: 0 0 6px rgba(178, 215, 248, 1);
    border-radius: inherit;
  }
}

// ---------------------------------------------------------------- [Type] B & D
.type__B,
.type__D {
  @include fontWeight_Medium;
  color: white;
  &.theme__dark {
    color: $kleinBlue;
    border-color: $kleinBlue;
    ::v-deep .icon {
      svg {
        .triangle-outline {
          fill: $kleinBlue;
        }
      }
    }
  }
  ::v-deep .icon {
    margin-right: 0.5rem;
    &.play {
      width: 0.875rem;
    }
    &.info {
      width: 1rem;
    }
  }
}

.type__B {
  @include fontSize_Small;
  padding: 10px 1.125rem;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 3rem;
  .text {
    padding-top: 1px;
  }
}

.type__D {
  @include fontSize_Large;
}

// -------------------------------------------------------------------- [Type] C
.type__C {
  @include fontSize_Medium;
  @include fontWeight_Medium;
  color: white;
  &.theme__dark {
    color: $blackPearl;
  }
}
</style>
