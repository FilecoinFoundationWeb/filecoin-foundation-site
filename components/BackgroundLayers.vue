<template>
  <div
    ref="container"
    class="background-layers"
    :style="`--animationDuration: ${duration}ms;`">

    <div
      v-for="(layer, i) in layers"
      :key="`layer-${i}_refresh-${key}`"
      :class="[
        'layer',
        `shadow__${layer.index}`,
        `shadow-strength-${shadowStrength}`,
        `border-radius-direction-${borderRadiusDirection}`,
        { reverse },
        { 'animate': animationEnabled },
        { 'top-layer': i === 0 },
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

  if (window.matchMedia(`(max-width: ${map.get('mini')})`).matches) {
    if (instance.desktop) {
      instance.desktop = false
    }
  } else {
    if (!instance.desktop) {
      instance.desktop = true
    }
  }
}

const viewportEntryCheck = (instance) => {
  if (instance.$refs.container && typeof window !== 'undefined' && typeof document !== 'undefined') {
    const rect = instance.$refs.container.getBoundingClientRect()
    const elementIsInViewport = (rect.top + rect.height / 2 >= 150 && rect.bottom - rect.height / 2 <= (window.innerHeight || document.documentElement.clientHeight) - 150)

    const element = document.getElementById(instance.resetElement)
    const reset = element ? element.getBoundingClientRect() : false
    const resetIsInViewport = reset ? reset.top >= 0 && reset.top <= (window.innerHeight || document.documentElement.clientHeight) : false

    if (!instance.startAnimation && elementIsInViewport) {
      instance.startAnimation = true
      setTimeout(() => {
        instance.endAnimation = true
      }, instance.duration + (instance.layers.length * instance.duration * instance.delayFactor))
    } else if (resetIsInViewport && instance.startAnimation && instance.endAnimation) {
      instance.startAnimation = false
      instance.endAnimation = false
      instance.key++
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
    },
    duration: { // animation duration in milliseconds
      type: Number,
      required: false,
      default: 700
    },
    resetElement: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      colors: ['#EFF6FC', '#D8EBFB', '#73B4ED', '#0090FF', '#154ED9', '#0621A4', '#06094E', '#08072E'],
      layerWidth: 1.375,
      borderRadius: 12.75,
      resize: false,
      scroll: false,
      startAnimation: false,
      endAnimation: false,
      key: 0,
      delayFactor: 0.23,
      desktop: true
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
    },
    animationEnabled () {
      return this.animate && this.desktop
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
      const t = `top: ${-1 * index * this.layerWidth}rem;`
      const l = `left: ${-1 * index * this.layerWidth}rem;`
      const z = `z-index: ${-1 * index};`
      const c = `background-color: ${color};`
      const b = `border-radius: ${this.borderRadius + (this.layerWidth * (index - 1))}rem;`

      if (!this.animate) {
        return `${w} ${h} ${t} ${l} ${z} ${c} ${b}`
      }

      const iw = `--initialWidth: calc(100% + ${2 * this.layerWidth}rem);`
      const fw = `--finalWidth: calc(100% + ${2 * index * this.layerWidth}rem);`
      const x = `--startPosX: ${(index - 1) * this.layerWidth}rem;`
      const y = `--startPosY: ${(index - 1) * this.layerWidth}rem;`
      const d = `animation-delay: ${(index - 1) * this.duration * this.delayFactor}ms;`

      return `${w} ${h} ${iw} ${fw} ${t} ${l} ${z} ${c} ${b} ${x} ${y} ${d}`
    }
  }
}

</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////////// Layers
.background-layers {
  --animationDuration: 1s;

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
    --initialWidth: 100%;
    --finalWidth: 100%;
    width: 100%;
    height: 100%;
    animation-duration: var(--animationDuration);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-name: bubble;
    animation-play-state: paused;
    // animation-timing-function: cubic-bezier(0.54, 1.81, 0.63, 0.73);
    animation-timing-function: cubic-bezier(0.8, 0.5, 0.2, 1.3);
    &:not(.top-layer) {
      opacity: 0;
    }
    &.is-in-viewport {
      animation-play-state: running;
    }
  }
}

@keyframes bubble {
  from {
    width: var(--initialWidth);
    height: var(--initialWidth);
    transform: translate(var(--startPosX), var(--startPosY));
    opacity: 1;
  }
  to {
    width: var(--finalWidth);
    height: var(--finalWidth);
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
