<template>
  <div class="page page-index">

    <PageSection
      v-for="(section, index) in sections"
      :id="`section-${index + 1}`"
      :key="index"
      :section="section" />

    <BackgroundLayers :layers-array="[2, 3, 4, 5, 6]" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import IndexPageData from '@/content/pages/index.json'

import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    PageSection,
    BackgroundLayers
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    sections () {
      return this.siteContent.index.page_content
    }
  },

  mounted () {
    console.log(this.sections)
  }
}
</script>

<style lang="scss" scoped>
.background-layers {
  position: absolute;
  top: 15rem;
  left: calc(50% - (68rem / 2) + 10rem);
  width: 100vw;
  height: 100vw;
}
</style>
