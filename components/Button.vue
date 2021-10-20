<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    :class="['button', `type__${type}`, `action__${action}`, `theme__${theme}`, { selected }]"
    @click="openModal">

    <div
      v-if="type !== 'X' && icon"
      :class="['icon', icon]">
      <IconPlay v-if="icon === 'play'" />
      <IconInfo v-if="icon === 'info'" />
      <IconPlus v-if="icon === 'plus'" />
      <IconCode v-if="icon === 'code'" />
      <IconTicket v-if="icon === 'ticket'" />
    </div>

    <span v-if="type !== 'X'" class="text">
      {{ text }}
    </span>

    <slot v-if="type === 'X'" />

  </component>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconPlay from '@/components/icons/Play'
import IconInfo from '@/components/icons/Info'
import IconPlus from '@/components/icons/Plus'
import IconCode from '@/components/icons/Code'
import IconTicket from '@/components/icons/Ticket'

// ====================================================================== Export
export default {
  name: 'Button',

  components: {
    IconPlay,
    IconInfo,
    IconPlus,
    IconCode,
    IconTicket
  },

  props: {
    /*
      (A) → Tier 1
      (B) → Tier 2
      (C) → Site navigation
      (D) → Tier 2 w/o border
      (E) → Load more
      (F) → Footer
      (G) → Events & Hackathons navigation
      (X) → No styling + slot
    */
    button: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
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
    target () {
      return this.button.target
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
      this.$emit('buttonClicked', this.button)
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
  .icon {
    display: none;
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
  &:hover {
    ::v-deep .icon {
      svg {
        .icon__play__triangle-inner,
        .icon__info__circle-inner {
          fill: white;
        }
        .icon__info__letter-i {
          fill: $kleinBlue;
        }
      }
    }
  }
  &.theme__dark {
    color: $kleinBlue;
    border-color: $kleinBlue;
    &:hover {
      ::v-deep .icon {
        svg {
          .icon__play__triangle-inner,
          .icon__info__circle-inner {
            fill: $kleinBlue;
          }
          .icon__info__letter-i {
            fill: white;
          }
        }
      }
    }
    ::v-deep .icon {
      svg {
        .icon__play__triangle-outer,
        .icon__info__circle-outer,
        .icon__info__letter-i {
          fill: $kleinBlue;
        }
        .icon__plus__line {
          stroke: $kleinBlue;
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
  ::v-deep .icon {
    &.plus {
      width: 0.75rem;
    }
    &.ticket {
      width: 1.125rem;
    }
  }
}

.type__D {
  @include fontSize_Large;
  @include leading_Small;
  align-items: center;
  ::v-deep .icon {
    &.plus {
      width: 1rem;
    }
    &.ticket {
      width: 1.375rem;
    }
  }
  .text {
    text-align: left;
  }
}

// -------------------------------------------------------------------- [Type] C
.type__C {
  @include fontSize_Medium;
  @include fontWeight_Medium;
  color: white;
  &.theme__dark {
    color: $blackPearl;
  }
  .icon {
    display: none;
  }
}

// -------------------------------------------------------------------- [Type] E
.type__E {
  @include borderRadius_ExtraLarge;
  @include fontSize_Small;
  @include fontWeight_SemiBold;
  position: relative;
  margin: 0.5rem;
  padding: 1.25rem 2.25rem;
  background-color: $kleinBlue;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15) inset;
  &:before {
    @include borderRadius_Large;
    content: '';
    position: absolute;
    width: calc(100% - 0.5rem * 2);
    height: calc(100% - 0.5rem * 2);
    top: 0.5rem;
    left: 0.5rem;
    background-color: $denim;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15) inset;
    z-index: 5;
  }
  .icon {
    display: none;
  }
}

// -------------------------------------------------------------------- [Type] F
.type__F {
  @include fontSize_Small;
  opacity: 0.85;
  @include small {
    @include fontSize_Regular;
  }
  &:hover {
    opacity: 1;
  }
}

// -------------------------------------------------------------------- [Type] E
.type__G {
  @include fontSize_ExtraExtraLarge;
  @include fontWeight_Medium;
  @include leading_Tiny;
  position: relative;
  align-items: center;
  opacity: 0.5;
  @include mini {
    @include fontSize_ExtraLarge;
  }
  @include tiny {
    @include fontSize_Large;
  }
  &:hover,
  &.selected {
    opacity: 1;
  }
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0.25rem;
    background-color: $denim;
    border-radius: 0.25rem;
    transform: translateY(0.5rem);
    opacity: 0;
    pointer-eventS: none;
  }
  &.selected {
    &:after {
      opacity: 1;
    }
  }
  .icon {
    margin-right: 0.5rem;
    &.code {
      width: 2.25rem;
      @include mini {
        width: 1.5rem;
      }
    }
  }
}
</style>
