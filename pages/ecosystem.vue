<template>
  <div class="page page-ecosystem">

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-ecosystem-background-layers"
        :layers-array="[3, 4, 5, 6]" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import EcosystemPageData from '@/content/pages/ecosystem.json'
import SectionDiveDeeperData from '@/content/sections/dive-deeper.json'

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
    await store.dispatch('global/getBaseData', { key: 'ecosystem', data: EcosystemPageData })
    await store.dispatch('global/getBaseData', { key: 'section-dive-deeper', data: SectionDiveDeeperData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    sections () {
      const content = CloneDeep(this.siteContent.ecosystem.page_content)
      const len = content.length
      const last = content[len - 1]
      const replace = this.siteContent['section-dive-deeper'].concat(last)
      content.splice(len - 1, 1, replace)
      return content
    }
  },

  mounted () {
    console.log(this.sections)
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset: 1.75rem * 5;
$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset});
$backgroundLayers__Left: calc(50% - (#{$containerWidth} / 2) + 1.75rem);

// ///////////////////////////////////////////////////////////////////// General
.page-ecosystem {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
}

.main-content {
  position: relative;
  margin-top: $backgroundLayers__Offset;
}

#section-1 {
  padding-top: 7rem; // 1.75rem * 4
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left;
    width: calc(100% + 3.5rem);
    height: 100%;
    background-color: $hawkesBlue;
    border-radius: 14rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

#section-2 {
  padding-top: 1rem;
}

#section-3 {
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: $backgroundLayers__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $polar;
    border-radius: 5rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
#page-ecosystem-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #hero {
  padding: 0;
  margin-bottom: 10rem;
  .subheading {
    line-height: 1.5;
  }
  .column-content {
    &.left {
      padding-top: 5.5rem;
    }
    &.right {
      width: 48vw;
      height: 100%;
      left: 1.75rem;
    }
  }
  .right,
  .image-block {
    width: 100%;
    height: 100%;
  }
  .image {
    width: 100%;
    height: 100%;
    border: 1.375rem solid #EFF6FC;
    border-radius: 200px;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
  }
}

::v-deep #intro_1 {
  margin-top: 3rem;
  margin-bottom: 7.5rem;
  .blocks {
    &.left {
      padding: 3.5rem 0;
      color: white;
      .description {
        @include fontSize_ExtraLarge;
        font-weight: $fontWeight_Regular;
        @include leading_Regular;
        letter-spacing: $letterSpacing_Regular;
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -8rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #cta_banner_1 {
  .blocks {
    &.right {
      margin-top: 1rem;
    }
  }
  .subheading {
    font-size: $fontSize_Regular;
  }
}

::v-deep #panel_1 {
  padding-bottom: 0;
}

::v-deep #panel_1_cards {
  padding-top: 0;
  padding-bottom: 9rem;
  .slider-block {
    margin-top: 6.75rem;
  }
  .card-list {
    position: relative;
    flex-wrap: unset;
  }
}

::v-deep #resources {
  .blocks {
    &.right {
      padding: 7rem 0;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -2rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #dive_deeper_intro,
::v-deep #dive_deeper_video_1,
::v-deep #dive_deeper_video_2 {
  padding-bottom: 0;
}
</style>
