<template>
  <div class="master-container">

    <SiteNavigation />

    <nuxt />

  </div>
</template>

<script>
// ===================================================================== Imports
import SiteNavigation from '@/components/SiteNavigation'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteNavigation
  }
}
</script>
