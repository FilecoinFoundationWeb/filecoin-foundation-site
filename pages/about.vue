<template>
  <div class="page page-about">

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-about-background-layers"
        :layers-array="[3, 4, 5, 6]" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import AboutPageData from '@/content/pages/about.json'
import SectionDiverDeeperData from '@/content/sections/dive-deeper.json'

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
    await store.dispatch('global/getBaseData', { key: 'about', data: AboutPageData })
    await store.dispatch('global/getBaseData', { key: 'section-dive-deeper', data: SectionDiverDeeperData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    sections () {
      const content = CloneDeep(this.siteContent.about.page_content)
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
.page-about {
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
    height: calc(100% + 3.5rem);
    background-color: $hawkesBlue;
    border-radius: 14rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

#section-2 {
  padding: 7.5rem 0;
}

#section-3 {
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: $backgroundLayers__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $hawkesBlue;
    border-radius: 5rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
#page-about-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #hero {
  padding: 0;
  margin-bottom: 9.875rem;
  .video-block {
    background-color: $jordyBlue;
  }
}

::v-deep #intro_1 {
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
    left: -11rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #cta_1 {
  .blocks {
    &.right {
      margin-top: 1rem;
    }
  }
  .subheading {
    font-size: $fontSize_Regular;
  }
  .image-block {
    @include borderRadius_Large;
    position: relative;
    padding: 1rem;
    background-color: $jordyBlue;
    box-shadow: 3px 3px 6px rgb(0 0 0 / 10%) inset;
  }
}

::v-deep #banner_1 {
  margin-bottom: 5.5rem;
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
    left: -16rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #panel_1 {
  .slider-block {
    margin-top: 12.75rem;
  }
  .card-list {
    position: relative;
    flex-wrap: unset;
    left: -6rem;
  }
}

::v-deep #explore_1 {
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
