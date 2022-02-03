<template>
  <div
    ref="firstPane"
    :class="['nav-dropdown-container', { active: active }]"
    :style="`left: ${panelLeft};`">

    <div class="arrow">
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
      <div class="layer"></div>
    </div>

    <slot></slot>

  </div>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

// =================================================================== Functions
const detectPanelOutsideViewport = (instance) => {
  const rect = instance.$refs.firstPane.getBoundingClientRect()
  if (rect.left + rect.width > window.innerWidth) {
    instance.panelLeft = -1 * ((rect.left + rect.width) - window.innerWidth) + 'px'
  }
}

// ===================================================================== Exports
export default {
  name: 'NavMegaMenu',

  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },
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
      if (this.$refs.firstPane) {
        detectPanelOutsideViewport(this)
        this.resize = () => { detectPanelOutsideViewport(this) }
        window.addEventListener('resize', Throttle(this.resize, 10))
      }
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
  visibility: hidden;
  opacity: 0;
  transform-origin: top;
  transform: translate(-50%, 0rem) perspective(200px) rotateX(-10deg);
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
  &.active {
    visibility: visible;
    opacity: 1;
    transition: transform 250ms ease-out, opacity 250ms ease-out;
    transform: translate(-50%, 0rem) perspective(200px) rotateX(0deg);
    z-index: 5;
  }
}












ul {
  padding: 1rem;
  margin-top: 1rem;
}
.ul-second {
  padding: 0 1rem;
}
li {
  list-style-type: none;
  &:last-child {
    padding-bottom: 0.5rem;
  }
}

::v-deep .nav-dropdown {
  display: flex;
  flex-direction: row;
  top: 3.5rem;
  .extras {
    display: block;
    position: relative;
    z-index: 10;
  }
  .title {
    @include fontWeight_Medium;
    display: inline-block;
    margin-bottom: 1rem;
  }
  .social-icons {
    flex-direction: column;
    align-items: flex-start;
    .social-icon {
      align-items: center;
      width: auto;
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 1rem;
      }
      svg {
        width: 1.5rem;
        margin-right: 1rem;
      }
    }
    .label {
      @include fontSize_Small;
      @include fontWeight_SemiBold;
      display: block;
    }
  }
}

.nav-dropdown-panel-left {
  padding: 2rem 3rem 2rem 5rem;
  + .nav-dropdown-panel-right {
    margin-left: -2rem;
  }
}

.nav-dropdown-panel-right {
  position: relative;
  padding: 2rem 3rem 2rem 2rem;
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
    background: $deepCove;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 71px;
    z-index: 1;
  }
  .nav-dropdown-panel-right-wrapper {
    position: relative;
    z-index: 2;
    .panel-right-title {
      @include fontWeight_Medium;
      margin-bottom: 1rem;
      white-space: nowrap;
    }
  }
}

.nav-popout {
  top: -1rem;
  & li {
    padding: 0.5rem 0;
    &:last-child {
      padding-bottom: 1rem;
    }
  }
  &.scroll {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .inner-wrap {
    margin: 1.0rem 1.0rem 1.0rem 0;
  }
}

.scroll {
  overflow-x: hidden;
  overflow-y: scroll;
}

.nav-item-wrapper {
  @include small {
    display: block;
    &.has-nested-links {
      display: flex;
      flex-direction: column;
      padding-top: 0.75rem;
      .top-level {
        width: fit-content;
      }
    }
  }
  .nav-link.top-level {
    position: relative;
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
  }
  .nav-panel {
    display: inline-block;
    ul {
      display: flex;
      margin-top: 1.5rem;
      margin-left: 1rem;
      flex-direction: row;
      flex-wrap: wrap;
      @include mini {
        margin: 0;
      }
    }
    li {
      display: inline-block;
      margin: 0.25rem 0;
      width: 50%;
      @include small {
        margin: 0;
        width: 33%;
      }
      @include mini {
        margin: 0;
        width: 50%;
      }
    }
  }
}

.nav-link {
  white-space: nowrap;
  cursor: pointer;
}

$scrollbarBG: transparent;
$thumbBG: rgba(255, 255, 255, 0.4);
div::-webkit-scrollbar {
  width: 8px;
}
div {
  scrollbar-width: thin;
  scrollbar-color: $thumbBG $scrollbarBG;
}
div::-webkit-scrollbar-track {
  background: $scrollbarBG;
}
div::-webkit-scrollbar-thumb {
  background-color: $thumbBG;
  border-radius: 6px;
  border: 3px solid $scrollbarBG;
}

</style>
