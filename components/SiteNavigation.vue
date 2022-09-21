<template>
  <div id="site-navigation" :class="{ 'noscroll': mobilePanelOpen }">
    <div class="grid-noGutter">
      <div class="col">
        <div :class="['content', { breadcrumbs }]">

          <component
            :is="navigationComponentType"
            :is-pdc-page="pdcPage"
            @panel-open="toggleScrollClass" />

          <Breadcrumbs v-if="breadcrumbs" />

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
import Breadcrumbs from '@/components/Breadcrumbs'

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
    NavDesktop,
    Breadcrumbs
  },

  data () {
    return {
      mobile: false,
      mobilePanelOpen: false,
      pdcPage: false
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
    },
    breadcrumbs () {
      return this.$route.path !== '/'
    }
  },

  watch: {
    '$route' () {
      this.checkForPdcPage()
    }
  },

  mounted () {
    setNavigationType(this)
    this.resize = () => { setNavigationType(this) }
    window.addEventListener('resize', Throttle(this.resize, 10))
    this.checkForPdcPage()
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    toggleScrollClass (val) {
      this.mobilePanelOpen = val
    },
    checkForPdcPage () {
      const path = this.$route.path
      if (path.includes('public-data')) {
        this.pdcPage = true
      } else if (this.pdcPage) {
        this.pdcPage = false
      }
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
  display: block;
  height: $navigationHeight;
  &.breadcrumbs {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(#{$navigationHeight} + 0.125rem);
    ::v-deep .site-nav {
      height: auto;
    }
  }
  .nuxt-link-active {
    z-index: 10;
  }
}

</style>
