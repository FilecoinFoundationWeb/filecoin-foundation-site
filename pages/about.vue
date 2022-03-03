<template>
  <div class="page page-about">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-about-background-layers"
        layers-array="3_4_5_6"
        :breakpoints="pageLayersBreakpointData" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import AboutPageData from '@/content/pages/about.json'
import SectionDiveDeeperData from '@/content/sections/dive-deeper.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageAbout',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'about',
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
          radius: 12.75
        },
        ultralarge: {
          stroke: 1.75,
          radius: 12.75
        },
        medium: {
          stroke: 1,
          radius: 12.75
        },
        mini: {
          stroke: 0.25,
          radius: 5
        }
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'about', data: AboutPageData })
    await store.dispatch('global/getBaseData', { key: 'section-dive-deeper', data: SectionDiveDeeperData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.about.page_content)
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 5;
$backgroundLayers__Offset__Medium: 1rem * 5;
$backgroundLayers__Offset__Mini: 0.25rem * 5;

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.75rem);
$backgroundLayers__Left__Medium: 1rem * 6;
$backgroundLayers__Left__Mini: 0.25rem * 6;

// ///////////////////////////////////////////////////////////////////// General
.page-about {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  @include medium {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium} + 5rem);
  }
  @include mini {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini} + 5rem);
  }
}

.main-content {
  position: relative;
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
  }
}

#section_1 {
  padding-top: 8rem; // 1.75rem * 4
  @include mini {
    padding-top: 5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: 100%;
    background-color: $hawkesBlue;
    border-radius: 11.375rem 0 0 11.375rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 11.75rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 4.75rem;
    }
  }
}

#section_2 {
  padding-top: 3.5rem;
  padding-bottom: 3rem;
  @include small {
    padding-bottom: 0;
  }
}

#section_3 {
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.625rem);
    background-color: $polar;
    border-radius: 5rem 0 0 11.375rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-bottom-left-radius: 11.75rem;
      height: calc(100% + 3.5rem);
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-bottom-left-radius: 4.75rem;
    }
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-about-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #hero {
  padding: 0;
  padding-bottom: 2rem;
  margin-bottom: 9.875rem;
  @include small {
    margin-bottom: 3rem;
  }
  @include mini {
    margin-top: 3rem;
    margin-bottom: 0;
  }
  @include tiny {
    margin-top: 0;
  }
  .text-block {
    transform: translateX(-2vw);
    @include small {
      transform: translateX(0);
    }
  }
  .video-block {
    height: 100%;
    // padding: 0 0.25rem;
    transform: translate(5vw, 1rem);
    @include small {
      transform: translate(0, 0);
    }
    .preview-container {
      background-color: $jordyBlue;
    }
  }
}

::v-deep #intro_1 {
  margin-bottom: 7.5rem;
  @include small {
    margin-bottom: 0rem;
  }
  @include mini {
    padding-bottom: 0;
  }
  .blocks {
    &.left {
      padding: 3.5rem 0;
      color: white;
      .description {
        @include fontSize_ExtraLarge;
        font-weight: $fontWeight_Regular;
        @include leading_Regular;
        letter-spacing: $letterSpacing_Regular;
        @include mini {
          @include fontSize_Large;
        }
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
    @include small {
      left: -7rem;
    }
    @include mini {
      left: -5rem;
    }
  }
}

::v-deep #cta_1 {
  @include small {
    padding-bottom: 3rem;
  }
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
  @include mini {
    padding-top: 0;
    margin-bottom: 0rem;
  }
  .blocks {
    &.left {
      padding: 3.5rem 0;
      color: white;
      .description {
        @include fontSize_ExtraLarge;
        font-weight: $fontWeight_Regular;
        @include leading_Regular;
        letter-spacing: $letterSpacing_Regular;
        @include mini {
          @include fontSize_Large;
        }
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -12rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    @include small {
      left: -7rem;
    }
    @include mini {
      left: -5rem;
    }
  }
}

::v-deep #cta_2 {
  @include small {
    padding: 0;
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .image {
    @include small {
      margin-bottom: 4rem;
    }
    @include mini {
      margin-bottom: 3rem;
    }
    @include tiny {
      margin-bottom: 2rem;
    }
  }
}

::v-deep #panel_1 {
  padding-bottom: 0;
}

::v-deep #panel_1_cards {
  padding-top: 0;
  padding-bottom: 10rem;
  @include small {
    padding-bottom: 5rem;
  }
  .slider-block {
    margin-top: 6.75rem;
  }
  .card-list {
    position: relative;
    flex-wrap: unset;
    @include small {
      flex-wrap: wrap;
    }
  }
  .card {
    @include small {
      width: 40% !important;
      margin-bottom: 5rem !important;
    }
    @include tiny {
      width: 100% !important;
    }
  }
}

::v-deep #explore_1 {
  .blocks {
    &.left {
      @include small {
        margin-bottom: 9rem;
      }
      @include tiny {
        margin-bottom: 2rem;
      }
    }
    &.right {
      padding-top: 7rem;
      padding-bottom: 5rem;
      @include small {
        padding-top: 4rem;
        padding-bottom: 3rem;
      }
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

::v-deep #dive_deeper {
  padding-bottom: 10rem;
}
</style>
