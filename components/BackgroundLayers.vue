<template>
  <div class="background-layers">

    <div
      v-for="(layer, i) in layers"
      :key="layer.color"
      :class="[`layer shadow__${layer.index} shadow-strength-${shadowStrength} border-radius-direction-${borderRadiusDirection}`, { reverse }]"
      :style="layerStyle(i + 1, i, layer.color)">
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import Throttle from 'lodash/throttle'

// =================================================================== Functions
const setBackgroundLayerWidth = (instance) => {
  let reset = true
  for (const breakpoint in instance.breakpoints) {
    if (window.matchMedia(`(max-width: ${breakpoint})`).matches) {
      if (reset) { reset = false }
      if (instance.layerWidth !== instance.breakpoints[breakpoint]) {
        instance.layerWidth = instance.breakpoints[breakpoint]
      }
    } else if (reset) {
      if (instance.layerWidth !== 1.375) {
        instance.layerWidth = 1.375
      }
    }
  }
}

// ====================================================================== Export
export default {
  name: 'BackgroundLayers',

  props: {
    borderRadius: {
      type: Number,
      required: false,
      default: 10
    },
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
    offset: {
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
    }
  },

  data () {
    return {
      colors: ['#EFF6FC', '#D8EBFB', '#73B4ED', '#0090FF', '#154ED9', '#0621A4', '#06094E', '#08072E'],
      layerWidth: 1.375,
      resize: false
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
    breakpoints () {
      const data = {}
      if (this.offset.hasOwnProperty('ultralarge')) { data['140.625rem'] = this.offset.ultralarge }
      if (this.offset.hasOwnProperty('xlarge')) { data['90rem'] = this.offset.xlarge }
      if (this.offset.hasOwnProperty('large')) { data['75rem'] = this.offset.large }
      if (this.offset.hasOwnProperty('medium')) { data['64rem'] = this.offset.medium }
      if (this.offset.hasOwnProperty('small')) { data['53.125rem'] = this.offset.small }
      if (this.offset.hasOwnProperty('mini')) { data['40rem'] = this.offset.mini }
      if (this.offset.hasOwnProperty('tiny')) { data['25.9375rem'] = this.offset.tiny }
      return data
    }
  },

  mounted () {
    setBackgroundLayerWidth(this)
    this.resize = () => { setBackgroundLayerWidth(this) }
    window.addEventListener('resize', Throttle(this.resize, 50))
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    layerStyle (index, order, color) {
      const w = `width: calc(100% + ${2 * index * this.layerWidth}rem);`
      const h = `height: calc(100% + ${2 * index * this.layerWidth}rem);`
      const t = `top: ${-1 * index * this.layerWidth}rem;`
      const l = `left: ${-1 * index * this.layerWidth}rem;`
      const z = `z-index: ${-1 * (order + 1)};`
      const c = `background-color: ${color};`
      const b = `border-radius: ${this.borderRadius + (2 * this.layerWidth) + (1 * this.layerWidth * index)}rem;`
      return `${w} ${h} ${t} ${l} ${z} ${c} ${b}`
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
</style>
