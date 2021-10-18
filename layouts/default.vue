<template>
  <div class="master-container">

    <SiteNavigation />

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import SiteNavigation from '@/components/SiteNavigation'
import SiteFooter from '@/components/SiteFooter'

// =================================================================== Functions
const setBackgroundLayerWidth = (instance) => {
  if (window.matchMedia('(max-width: 40rem)').matches) {
    if (instance.layerWidth !== 0.25) {
      instance.setLayerWidth(0.25)
    }
  } else {
    if (instance.layerWidth !== 1.375) {
      instance.setLayerWidth(1.375)
    }
  }
}

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteNavigation,
    SiteFooter
  },

  data () {
    return {
      resize: false
    }
  },

  computed: {
    ...mapGetters({
      layerWidth: 'global/layerWidth'
    })
  },

  mounted () {
    setBackgroundLayerWidth(this)
    this.resize = () => { setBackgroundLayerWidth(this) }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    ...mapActions({
      setLayerWidth: 'global/setLayerWidth'
    })
  }
}
</script>
