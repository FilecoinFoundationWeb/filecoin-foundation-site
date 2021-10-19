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
  }
}
</script>
