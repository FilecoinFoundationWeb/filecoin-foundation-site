<template>
  <div class="page page-get-involved">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-get-involved-background-layers"
        :layers-array="[5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import GetInvolvedPageData from '@/content/pages/get-involved.json'
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
    await store.dispatch('global/getBaseData', { key: 'get_involved', data: GetInvolvedPageData })
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
      const content = CloneDeep(this.siteContent.get_involved.page_content)
      const diveDeeperContent = CloneDeep(this.siteContent['section-dive-deeper'])
      diveDeeperContent.forEach((section) => {
        if (section.left && section.left.type === 'text_block') {
          section.left.theme = 'light'
          section.left.button_theme = 'light'
        }
        if (section.right && section.right.type === 'text_block') {
          section.right.theme = 'light'
          section.right.button_theme = 'light'
        }
      })
      return [content[0].concat(diveDeeperContent)]
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 2;
$backgroundLayers__Offset__Medium: 1rem * 2;
$backgroundLayers__Offset__Mini: 0.25rem * 2;

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.5rem);
$backgroundLayers__Left__Medium: 1rem * 6;
$backgroundLayers__Left__Mini: 0.25rem * 6;

// ///////////////////////////////////////////////////////////////////// General
.page-get-involved {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  color: white;
  @include medium {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium});
  }
  @include mini {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini});
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

// /////////////////////////////////////////////////////////// Background Layers
#page-get-involved-background-layers {
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
  padding-top: 10rem;
  @include small {
    padding-bottom: 2.5rem;
  }
  @include mini {
    padding-top: 5rem;
    padding-bottom: 0;
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .blocks {
    &.left {
      @include small {
        margin-top: 3rem;
      }
      @include tiny {
        margin-top: 1rem;
      }
    }
  }
}

::v-deep #careers_intro {
  padding-top: 2.5rem;
  @include mini {
    padding-bottom: 0;
  }
}

::v-deep #careers_list {
  @include small {
    padding-top: 0;
  }
  .card-column {
    &:nth-child(3n + 2) {
      margin-top: -3rem;
      @include small {
        margin-top: 0;
      }
    }
    &:nth-child(2n + 1),
    &:nth-child(6n - 2) {
      .card {
        background-color: $kleinBlue;
      }
    }
    &:nth-child(6n + 1),
    &:nth-child(6n - 1) {
      .card {
        background-color: $deepCove;
      }
    }
  }
  .button-row {
    justify-content: center;
    margin-top: -2rem;
    @include small {
      margin-top: 0;
    }
  }
}

::v-deep #get_involved {
  padding: 0;
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
::v-deep #dive_deeper_video_1 {
  padding-bottom: 0;
}

::v-deep #dive_deeper_intro {
  @include tiny {
    padding-top: 3rem;
  }
}

::v-deep #dive_deeper_video_1,
::v-deep #dive_deeper_video_2 {
  @include small {
    padding-top: 2rem;
  }
}
</style>
