<template>
  <div id="site-navigation" :class="{ 'noscroll': mobilePanelOpen }">
    <div class="grid-noGutter">
      <div class="col">
        <div class="content">
          <component
            :is="navigationComponentType"
            @panel-open="toggleScrollClass"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import Throttle from 'lodash/throttle'

import NavMobile from '@/components/Navigation/NavMobile'
import NavDesktop from '@/components/Navigation/NavDesktop'

// =================================================================== Functions
const setNavigationType = (instance) => {
  if (window.matchMedia('(max-width: 53.125rem)').matches) {
    if (!instance.mobile) {
      instance.mobile = true
    }
  } else {
    if (instance.mobile) {
      instance.mobile = false
    }
  }
}

// ====================================================================== Export
export default {
  name: 'SiteNavigation',

  components: {
    NavMobile,
    NavDesktop
  },

  data () {
    return {
      mobile: false,
      mobilePanelOpen: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation
    },
    navigationComponentType () {
      return this.mobile ? 'NavMobile' : 'NavDesktop'
    }
  },

  mounted () {
    setNavigationType(this)
    this.resize = () => { setNavigationType(this) }
    window.addEventListener('resize', Throttle(this.resize, 10))
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    toggleScrollClass (val) {
      this.mobilePanelOpen = val
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-navigation {
  position: relative;
  z-index: 1000;
  @include small {
  }
  &.noscroll {
    @include small {
      position: fixed;
      z-index: 10000;
      top: 0;
      width: 100%;
    }
  }
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: $navigationHeight;
  .nuxt-link-active {
    z-index: 10;
  }
}

</style>
