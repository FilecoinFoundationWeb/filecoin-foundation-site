<template>
  <div
    ref="container"
    class="background-layers">

    <div
      v-for="(layer, i) in layers"
      :key="layer.color"
      :class="[
        'layer',
        `shadow__${layer.index}`,
        `shadow-strength-${shadowStrength}`,
        `border-radius-direction-${borderRadiusDirection}`,
        { reverse },
        { animate },
        { 'is-in-viewport': startAnimation }
      ]"
      :style="layerStyle(i + 1, layer.color)">
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

// =================================================================== Functions
const setBackgroundLayerWidth = (instance) => {
  const map = new Map([
    ['ultralarge', '140.625rem'],
    ['xlarge', '90rem'],
    ['large', '75rem'],
    ['medium', '64rem'],
    ['small', '53.125rem'],
    ['mini', '40rem'],
    ['tiny', '25.9375rem']
  ])

  let reset = true
  for (const breakpoint in instance.breakpoints) {
    if (window.matchMedia(`(max-width: ${map.get(breakpoint)})`).matches) {
      if (reset) { reset = false }
      if (instance.layerWidth !== instance.breakpoints[breakpoint].stroke) {
        instance.layerWidth = instance.breakpoints[breakpoint].stroke
      }
      if (instance.borderRadius !== instance.breakpoints[breakpoint].radius) {
        instance.borderRadius = instance.breakpoints[breakpoint].radius
      }
    } else if (reset) {
      if (instance.breakpoints.default) {
        instance.layerWidth = instance.breakpoints.default.stroke || 1.375
        instance.borderRadius = instance.breakpoints.default.radius || 12.75
      } else {
        instance.layerWidth = 1.375
        instance.borderRadius = 12.75
      }
    }
  }
}

const viewportEntryCheck = (instance) => {
  if (instance.$refs.container && typeof window !== 'undefined' && typeof document !== 'undefined') {
    const rect = instance.$refs.container.getBoundingClientRect();
    const elementIsInViewport = (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    if (!instance.startAnimation && elementIsInViewport) {
      instance.startAnimation = true
    }
  }
}

// ====================================================================== Export
export default {
  name: 'BackgroundLayers',

  props: {
    layersArray: {
      type: String,
      required: false,
      default: '1_2_3_4_5_6'
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false
    },
    print: {
      type: Boolean,
      required: false,
      default: false
    },
    breakpoints: {
      type: Object,
      required: false,
      default: () => {
        return { tiny: 0.25 }
      }
    },
    shadowStrength: {
      type: String, // 'small', 'large'
      required: false,
      default: 'large'
    },
    borderRadiusDirection: {
      type: String, // 'forward', 'reverse'
      required: false,
      default: 'forward'
    },
    animate: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      colors: ['#EFF6FC', '#D8EBFB', '#73B4ED', '#0090FF', '#154ED9', '#0621A4', '#06094E', '#08072E'],
      layerWidth: 1.375,
      borderRadius: 12.75,
      resize: false,
      scroll: false,
      startAnimation: false
    }
  },

  computed: {
    layers () {
      const arr = []
      const layersArray = this.layersArray.split('_').map((x) => { return parseInt(x) })
      for (let i = 0; i < layersArray.length; i++) {
        const ind = Math.max(Math.min(layersArray[i], 8), 1)
        arr.push({ index: ind, color: this.colors[ind - 1] })
      }
      return arr
    }
  },

  mounted () {
    setBackgroundLayerWidth(this)
    this.resize = () => { setBackgroundLayerWidth(this) }
    window.addEventListener('resize', Throttle(this.resize, 50))

    if (this.animate) {
      this.scroll = () => { viewportEntryCheck(this) }
      window.addEventListener('scroll', this.scroll)
    }
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
    if (this.scroll) { window.removeEventListener('scroll', this.scroll) }
  },

  methods: {
    layerStyle (index, color) {
      const w = `width: calc(100% + ${2 * index * this.layerWidth}rem);`
      const h = `height: calc(100% + ${2 * index * this.layerWidth}rem);`
      const fw = `--finalWidth: calc(100% + ${2 * index * this.layerWidth}rem);`
      const fh = `--finalHeight: calc(100% + ${2 * index * this.layerWidth}rem);`
      const t = `top: ${-1 * index * this.layerWidth}rem;`
      const l = `left: ${-1 * index * this.layerWidth}rem;`
      const z = `z-index: ${-1 * index};`
      const c = `background-color: ${color};`
      const b = `border-radius: ${this.borderRadius + (this.layerWidth * (index - 1))}rem;`
      const x = `--startPosX: ${index * this.layerWidth}rem;`
      const y = `--startPosY: ${index * this.layerWidth}rem;`
      const d = `animation-delay: ${index * 75}ms`
      return `${w} ${h} ${fw} ${fh} ${t} ${l} ${z} ${c} ${b} ${x} ${y} ${d}`
    }
  }
}

</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Layers
.layer {
  position: absolute;
  &.shadow-strength-small {
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
  }
  &.shadow-strength-large {
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
  }
  &.reverse {
    filter: none;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.15) inset;
  }
  &.border-radius-direction-forward {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  &.border-radius-direction-reverse {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}

.animate {
  --startPosX: 0;
  --startPosY: 0;
  --finalWidth: 100%;
  --finalHeight: 100%;
  animation-duration: 0.75s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: bubble;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.54, 1.81, 0.63, 0.73);
  &.is-in-viewport {
    animation-play-state: running;
  }
}

@keyframes bubble {
  from {
    width: 100%;
    height: 100%;
    transform: translate(var(--startPosX), var(--startPosY));
  }
  to {
    width: --finalWidth;
    height: --finalHeight;
    transform: translate(0, 0);
  }
}
</style>
