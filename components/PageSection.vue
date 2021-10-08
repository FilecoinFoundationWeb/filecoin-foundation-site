<template>
  <div class="page-section">

    {{ section.length }}

  </div>
</template>

<script>
// ====================================================================== Import
// ====================================================================== Export
export default {
  name: 'PageSection',

  props: {
    section: {
      type: Array,
      required: true
    }
  }

  // components: {
  //   PageSection
  // },

  // async fetch ({ store }) {
  //   await store.dispatch('global/getBaseData', 'general')
  //   await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  // },

  // computed: {
  //   ...mapGetters({
  //     siteContent: 'global/siteContent'
  //   }),
  //   seo () {
  //     return this.$GetSeo(this.tag)
  //   },
  //   sections () {
  //     return this.siteContent.index.page_content
  //   }
  // },

  // mounted () {
  //   console.log(this.sections)
  // }
}
</script>

<style lang="scss" scoped>
</style>
