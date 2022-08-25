<template>
  <div class="page page-public-data-awards">

    <Modal />

    <PageSection
      id="section_0"
      key="section_0"
      :section="headerSection" />

    <div class="main-intro-wrapper-section">

      <PageSection
        id="section_1"
        key="section_1"
        :section="introSection" />

      <BackgroundLayers
        id="page-basic-2-background-layers"
        layers-array="5_6"
        :breakpoints="pageLayersBreakpointData" />

      <div class="main-content-section">
        <PageSection
          id="section_2"
          key="section_2"
          :section="mainSection" />
        <BackgroundLayers
          id="page-basic-2-background-layers"
          layers-array="3_4"
          :breakpoints="pageLayersBreakpointData" />
      </div>

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import PublicDataAwardsPageData from '@/content/pages/public-data-awards.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PublicDataAwardsPage',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'public_data_awards',
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
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
    await store.dispatch('global/getBaseData', { key: 'public_data_awards', data: PublicDataAwardsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageContent () {
      const content = CloneDeep(this.siteContent.public_data_awards.page_content)
      return content
    },
    headerSection () {
      return this.pageContent.section_0
    },
    introSection () {
      return this.pageContent.section_1
    },
    mainSection () {
      return this.pageContent.section_2
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
.main-intro-wrapper-section {
  position: relative;
  z-index: 1;
}

.main-content-section {
  position: relative;
  z-index: 2;
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
  }
}

#section_2 {
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
  padding-top: 1rem;
  @include small {
    padding-bottom: 0;
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
::v-deep #page-basic-2-background-layers {
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
::v-deep #intro_2,
::v-deep #basic_content_1,
::v-deep #basic_content_2,
::v-deep #basic_content_3 {
  img {
    border-radius: unset;
    box-shadow: unset;
  }
}

::v-deep #intro_2 {
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

::v-deep #basic_content_1 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_2 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_3 {
  padding-top: 0;
  padding-bottom: 4rem;
}

</style>
