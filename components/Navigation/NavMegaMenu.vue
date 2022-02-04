<template>
  <div
    ref="container"
    :class="['nav-dropdown-container']"
    :style="containerStyles">

    <div class="arrow">
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
    </div>

    <div class="relative-wrapper">
      <div
        ref="viewbox"
        class="dropdown-viewbox">
        <slot></slot>
      </div>
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
  instance.currentWidth = 'unset'
  instance.currentHeight = 'unset'

  if (instance.$refs.viewbox) {
    const panels = instance.$refs.viewbox.children
    for (let i = 0; i < panels.length; i++) {
      const { width, height } = panels[i].getBoundingClientRect()
      instance.childrenDimensions.push({ width, height })
    }
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
    activeIndex: {
      type: Number,
      required: true,
      default: 0
    },
    nestedDisplay: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      currentHeight: 'unset',
      currentWidth: 'unset',
      panelLeft: '50%',
      dropdownOpen: false,
      resize: false,
      childrenDimensions: []
    }
  },

  computed: {
    containerStyles () {
      return {
        left: this.panelLeft,
        width: this.currentWidth,
        height: this.currentHeight
      }
    }
  },

  watch: {
    activeIndex (newIndex) {
      if (newIndex >= 0) {
        this.setCurrentDimensions(newIndex)
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      getChildrenDimensions(this)
      detectPanelOutsideViewport(this)

      this.resize = () => {
        detectPanelOutsideViewport(this)
        getChildrenDimensions(this)
      }
      window.addEventListener('resize', Throttle(this.resize, 10))
    })
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    setCurrentDimensions (index) {
      const dimensions = this.childrenDimensions[index]
      this.currentWidth = dimensions.width + 'px'
      this.currentHeight = dimensions.height + 'px'
    }
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
  // transform: translate(-50%, 1rem) perspective(200px) rotateX(-10deg); *** can't have this for dimension calculations!!!
  transform: translate(-50%, 1rem);

  // z-index: -1;
  // transition: transform 250ms ease-in, opacity 250ms ease-in, visibility 0ms linear 250ms;
  transition: 250ms ease;
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

.relative-wrapper {
  position: relative;
  padding: 0 0.625rem;
}

.dropdown-viewbox {
  position: relative;
  overflow: hidden;
}

.relative-wrapper,
.dropdown-viewbox {
  width: 100%;
  height: 100%;
}

.arrow {
  position: absolute;
  // top: 29px;
  top: -0.5rem;
  left: 50%;
  visibility: visible;
  pointer-events: none;
  opacity: 1;
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
