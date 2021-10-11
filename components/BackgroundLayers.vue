<template>
  <div class="background-layers">

    <div
      v-for="(layer, i) in layers"
      :key="layer.color"
      :class="[`layer shadow__${layer.index} shadow-strength-${shadowStrength}`, { reverse }]"
      :style="layerStyle(i + 1, i, layer.color)">
    </div>

  </div>
</template>

<script>
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
      type: Array,
      required: false,
      default: () => [1, 2, 3, 4, 5, 6]
    },
    offset: {
      type: Number,
      required: false,
      default: 1.75
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false
    },
    shadowStrength: {
      type: String, // 'small', 'large'
      required: false,
      default: 'large'
    }
    // shadowsArray: {
    //   type: Array,
    //   required: false,
    //   default: () => [1, 2, 3, 4, 5, 6]
    // }
  },

  data () {
    return {
      colors: ['#EFF6FC', '#D8EBFB', '#73B4ED', '#0090FF', '#154ED9', '#0621A4', '#06094E', '#08072E']
    }
  },

  computed: {
    layers () {
      const arr = []
      for (let i = 0; i < this.layersArray.length; i++) {
        const ind = Math.max(Math.min(this.layersArray[i], 8), 1)
        arr.push({ index: ind, color: this.colors[ind - 1] })
      }
      return arr
    }
    // shadows () {
    //   const arr = []
    //   for (let i = 0; i < this.layersArray.length; i++) {
    //     const ind = Math.max(Math.min(this.layersArray[i], 6), 1)
    //     arr.push({ index: ind, color: this.colors[ind - 1] })
    //   }
    //   return arr
    // }
  },

  methods: {
    layerStyle (index, order, color) {
      const w = `width: calc(100% + ${2 * index * this.offset}rem);`
      const h = `height: calc(100% + ${2 * index * this.offset}rem);`
      const t = `top: ${-1 * index * this.offset}rem;`
      const l = `left: ${-1 * index * this.offset}rem;`
      const z = `z-index: ${-1 * (order + 1)};`
      const c = `background-color: ${color};`
      const b = `border-radius: ${this.borderRadius + (2 * this.offset) + (1 * this.offset * index)}rem;`
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
}
</style>
