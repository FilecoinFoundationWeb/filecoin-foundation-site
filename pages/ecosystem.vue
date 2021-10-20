<template>
  <div class="page page-ecosystem">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-ecosystem-background-layers"
        :layers-array="[3, 4, 5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import EcosystemPageData from '@/content/pages/ecosystem.json'
import SectionDiveDeeperData from '@/content/sections/dive-deeper.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
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
.page-ecosystem {
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

#section-1 {
  padding-top: 7rem; // 1.75rem * 4
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
    border-radius: 14rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 12.75rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 10.75rem;
    }
    @include tiny {
      border-radius: 5rem 0 0 5rem;
    }
  }
}

#section-2 {
  padding-top: 1rem;
  @include small {
    padding-bottom: 0;
  }
}

#section-3 {
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: calc(100% + 4rem);
    background-color: $polar;
    border-radius: 5rem 0 0 13rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-bottom-left-radius: 12rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-bottom-left-radius: 10.75rem;
    }
    @include tiny {
      border-bottom-left-radius: 5rem;
    }
  }
}

::v-deep .heading {
  @include tiny {
    @include fontSize_ExtraLarge;
  }
}
::v-deep .subheading {
  @include tiny {
    @include fontSize_Medium;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-ecosystem-background-layers {
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
  @include tiny {
    .layer {
      border-top-left-radius: 5rem !important;
      border-bottom-left-radius: 5rem !important;
    }
  }
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #hero {
  padding: 0;
  margin-bottom: 10rem;
  @include small {
    margin-bottom: 5rem;
  }
  @include mini {
    margin-bottom: 0;
  }
  @include tiny {
    .heading {
      @include fontSize_ExtraExtraLarge;
    }
  }
  .subheading {
    line-height: 1.5;
  }
  .column-content {
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
    width: 50vw;
    border-radius: 25vw 3rem 3rem 25vw;
    border: 1.375rem solid #EFF6FC;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
    @include medium {
      width: 80vw;
      border-radius: 40vw 3rem 3rem 40vw;
    }
    @include mini {
      width: 100vw;
      border: 0.25rem solid #EFF6FC;
      border-radius: 50vw 3rem 3rem 50vw;
    }
  }
}

::v-deep #intro_1 {
  margin-top: 3rem;
  margin-bottom: 7.5rem;
  @include small {
    margin-top: 0;
    margin-bottom: 2rem;
  }
  @include mini {
    margin-bottom: 0;
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
          @include fontSize_Medium;
        }
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
    @include small {
      left: -4rem;
    }
    @include tiny {
      left: -5rem;
    }
  }
}

::v-deep #cta_banner_1 {
  @include small {
    padding-top: 4rem;
  }
  @include mini {
    padding-top: 2rem;
  }
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
  @include small {
    padding-top: 2rem;
  }
  @include mini {
    padding-top: 0;
  }
}

::v-deep #panel_1_cards {
  padding-top: 0;
  padding-bottom: 9rem;
  @include tiny {
    padding-bottom: 0;
  }
  .slider-block {
    margin-top: 6.75rem;
  }
  .card-list {
    position: relative;
    flex-wrap: unset;
    @include tiny {
      flex-wrap: wrap;
    }
  }
  .card {
    @include small {
      width: unset !important;
    }
    @include tiny {
      width: calc(50% - 3rem) !important;
      margin-bottom: 7rem !important;
    }
  }
}

::v-deep #resources {
  .blocks {
    &.left {
      @include small {
        margin-bottom: 5rem;
      }
      @include mini {
        margin-bottom: 3rem;
      }
      .heading {
        @include tiny {
          @include fontSize_ExtraLarge;
        }
      }
    }
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
    @include small {
      left: -4rem;
    }
  }
}

::v-deep #dive_deeper_intro,
::v-deep #dive_deeper_video_1,
::v-deep #dive_deeper_video_2 {
  padding-bottom: 0;
}
</style>
