<template>
  <div
    ref="container"
    :class="['nav-dropdown-container']"
    :style="`left: ${panelLeft};`">

    <div class="arrow">
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
    </div>

    <div
      ref="viewbox"
      class="dropdown-viewbox">
      <slot></slot>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

// =================================================================== Functions
const detectPanelOutsideViewport = (instance) => {
  if (instance.$refs.container) {
    const rect = instance.$refs.container.getBoundingClientRect()
    if (rect.left + rect.width > window.innerWidth) {
      instance.panelLeft = -1 * ((rect.left + rect.width) - window.innerWidth) + 'px'
    }
  }
}

const getChildrenDimensions = (instance) => {
  if (instance.$refs.viewbox) {
    const panels = instance.$refs.viewbox.children
    console.log(panels)
  }
}

// ===================================================================== Exports
export default {
  name: 'NavMegaMenu',

  props: {
    panel: {
      type: Boolean,
      required: false,
      default: false
    },
    nestedDisplay: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      maxHeight: 'unset',
      minWidth: 'unset',
      panelLeft: '50%',
      popoutLeft: '100%',
      dropdownOpen: false,
      resize: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      getChildrenDimensions(this)
      detectPanelOutsideViewport(this)
      this.resize = () => { detectPanelOutsideViewport(this) }
      window.addEventListener('resize', Throttle(this.resize, 10))
    })
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  }
}

</script>

<style lang="scss" scoped>

.nav-dropdown-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 3.5rem;
  // visibility: hidden;
  opacity: 0;
  transform-origin: top;
  transform: translate(-50%, 1rem) perspective(200px) rotateX(-10deg);
  // z-index: -1;
  transition: transform 250ms ease-in, opacity 250ms ease-in, visibility 0ms linear 250ms;
  background-color: $denim;
  border: 5px solid $azureRadiance;
  border-radius: 0.875rem 0.875rem 5.25rem 5.25rem;
  color: $white;
  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background-color: $blackPearl;
    border: 5px solid $kleinBlue;
    border-radius: 0.625rem 0.625rem 4.75rem 4.75rem;
  }
  // &.active {
  //   // visibility: visible;
  //   opacity: 1;
  //   transition: transform 250ms ease-out, opacity 250ms ease-out;
  //   transform: translate(-50%, 0rem) perspective(200px) rotateX(0deg);
  //   z-index: 5;
  //   .arrow {
  //     visibility: visible;
  //     opacity: 1;
  //     transition: opacity 100ms ease-in;
  //     transform: translate(-50%, 0rem) rotate(45deg);
  //     z-index: 10;
  //   }
  // }
}

.dropdown-viewbox {
  position: relative;
}

.arrow {
  position: absolute;
  top: 29px;
  left: 50%;
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  z-index: 2;
  transform: translate(-50%, 0rem) rotate(45deg);
  transition: opacity 250ms ease-in, visibility 0ms linear 250ms;
  // transition: 100ms ease-in;
  @include small {
    display: none;
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 21px;
    padding-bottom: 21px;
    overflow: hidden;
    transform-origin: 100% 0;
    border-top-left-radius: 1px;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 8px;
      width: 100%;
      height: 141%;
      transform-origin: inherit;
      transform: rotate(45deg);
    }
    &:first-child {
      transform: translate(-2px, -2px);
      z-index: 0;
      &:after {
        background-color: $azureRadiance;
      }
    }
    &:nth-child(2) {
      transform: translate(2px, 2px);
      z-index: 1;
      &:after {
        background-color: $denim;
      }
    }
    &:nth-child(3) {
      transform: translate(6px, 6px);
      z-index: 2;
      &:after {
        background-color: $kleinBlue;
      }
    }
    &:last-child {
      transform: translate(9px, 9px);
      z-index: 3;
      &:after {
        background-color: $blackPearl;
      }
    }
  }
}

</style>
