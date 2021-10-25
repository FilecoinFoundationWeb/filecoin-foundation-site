<template>
  <div class="master-container">

    <SiteNavigation />

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import SiteNavigation from '@/components/SiteNavigation'
import SiteFooter from '@/components/SiteFooter'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteNavigation,
    SiteFooter
  },

  mounted () {
    const hash = this.$route.hash.replace('#', '')
    const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
    if (element) {
      this.$scrollToElement(element, 0, -50)
    }
  }
}
</script>
