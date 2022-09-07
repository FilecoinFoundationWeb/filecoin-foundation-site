<template>
  <div class="ticker">

    <span class="text-before">
      {{ textBefore }}
    </span>

    <span class="ticker-slot">

      <span class="spacer-text">{{ longestValue }}</span>

      <span
        v-for="string in strings"
        :key="string"
        :class="['ticker-text', { visible: string === currentValue }]">
        {{ string }}
      </span>

    </span>

    <br>

    <span class="text-after">
      {{ textAfter }}
    </span>

  </div>
</template>

<script>
// =================================================================== Functions
const updateTickerValue = (instance) => {
  const values = instance.strings
  if (instance.currentValue) {
    const currentIndex = values.indexOf(instance.currentValue)
    const index = (currentIndex + 1) % instance.indices
    instance.currentValue = values[index]
  } else {
    instance.currentValue = values[0]
  }
}

// ====================================================================== Export
export default {
  name: 'Ticker',

  props: {
    textBefore: {
      type: String,
      required: false,
      default: ''
    },
    strings: {
      type: Array,
      required: true,
      default: () => []
    },
    textAfter: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      interval: false,
      currentValue: ''
    }
  },

  computed: {
    indices () {
      return this.strings.length
    },
    longestValue () {
      return this.strings.reduce((a, b) => a.length > b.length ? a : b)
    }
  },

  mounted () {
    this.$nextTick(() => {
      updateTickerValue(this)
      this.interval = setInterval(() => {
        updateTickerValue(this)
      }, 1200)
    })
  },

  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.text-before,
.ticker-slot,
.text-after,
.ticker-text {
  display: inline;
  font-size: 2.125rem;
  @include fontWeight_SemiBold;
  letter-spacing: 1.1px;
  line-height: leading(40, 34);
  color: $white;
  @include mini {
    @include fontSize_ExtraLarge;
  }
}

.ticker-slot {
  position: relative;
  white-space: nowrap;
  width: fit-content;
  height: fit-content;
}

.spacer-text {
  opacity: 0;
  white-space: nowrap;
}

.ticker-text {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 100%;
  color: #0090FF;
  opacity: 0;
  white-space: nowrap;
  transition: 250ms ease;
  @include mini {
    top: -1px;
  }
  &.visible {
    opacity: 1;
  }
}
</style>
