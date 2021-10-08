<template>
  <div>
    <div
      v-for="(layer, i) in layers"
      :key="layer.color"
      :class="`layer shadow-${layer.index}`"
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
      default: 50
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
      const b = `border-radius: ${(2 * this.offset) + (1 * this.offset * index)}rem;`
      return `${w} ${h} ${t} ${l} ${z} ${c} ${b}`
    }
  }
}

</script>

<style lang="scss" scoped>

.layer {
  position: absolute;
}

.shadow-1 {
  filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
}

.shadow-2 {
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.2));
}

.shadow-3 {
  filter: drop-shadow(0 0 0.55rem rgba(0, 0, 0, 0.3));
}

.shadow-4 {
  filter: drop-shadow(0 0 0.60rem rgba(0, 0, 0, 0.4));
}

.shadow-5 {
  filter: drop-shadow(0 0 0.7rem rgba(0, 0, 0, 0.5));
}

.shadow-6 {
  filter: drop-shadow(0 0 0.9rem rgba(0, 0, 0, 0.6));
}

.shadow-7 {
  filter: drop-shadow(0 0 0.9rem rgba(0, 0, 0, 0.7));
}

.shadow-8 {
  filter: drop-shadow(0 0 0.9rem rgba(0, 0, 0, 0.8));
}

</style>
