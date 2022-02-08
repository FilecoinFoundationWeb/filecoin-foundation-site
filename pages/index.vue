<template>
  <div class="page page-index">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-index-background-layers"
        layers-array="2_3_4_5_6"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import IndexPageData from '@/content/pages/index.json'
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
      tag: 'index',
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
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
      const content = CloneDeep(this.siteContent.index.page_content)
      // const len = content.length
      // const last = content[len - 1]
      // const replace = this.siteContent['section-dive-deeper'].concat(last)
      // content.splice(len - 1, 1, replace)
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
.page-index {
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
  padding-top: 7rem;
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
    background-color: $polar;
    border-radius: 13rem 0 0 5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 12rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 10.75rem;
    }
    @include tiny {
      border-top-left-radius: 5rem;
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
    top: 0;
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

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-index-background-layers {
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
}

::v-deep #intro_1 {
  padding-top: 7.5rem;
  @include small {
    padding-top: 3rem;
  }
  @include mini {
    padding-bottom: 3rem;
  }
  .blocks {
    &.right {
      padding: 2rem 0;
      color: white;
      @include small {
        margin-top: 5rem;
      }
      @include mini {
        margin-top: 2rem;
        padding: 3rem 0;
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -3rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    @include small {
      left: -2rem;
    }
    @include mini {
      left: -3rem;
    }
  }
}

::v-deep #intro_2 {
  padding: 10rem 0;
  @include small {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
  @include mini {
    padding-bottom: 0;
  }
  @include tiny {
    padding-top: 0;
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .blocks {
    &.left {
      @include small {
        margin-top: 2rem;
      }
    }
  }
}

::v-deep #banner_1 {
  @include small {
    padding-top: 10rem;
  }
  @include mini {
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
  @include tiny {
    padding-top: 3rem;
    padding-bottom: 1rem;
  }
  .blocks {
    &.left {
      padding: 2rem 0;
      color: white;
      @include mini {
        padding: 5rem 0;
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -7rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    @include small {
      left: -4rem;
    }
    @include mini {
      left: -3rem;
    }
  }
}

::v-deep #explore_1 {
  margin-top: 5rem;
  margin-bottom: 1rem;
  @include small {
    margin-top: 3rem;
    padding-top: 0;
    padding-bottom: 2rem;
  }
  .blocks {
    &.right {
      padding-top: 5rem;
      padding-bottom: 3rem;
      @include small {
        margin-top: 2rem;
      }
      @include tiny {
        padding-bottom: 5rem;
      }
    }
  }
  .column-content {
    &.right {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -5rem;
        width: 100vw;
        height: calc(100%);
        border-radius: 9.125rem 0 0 9.125rem;
        background-color: $blackPearl;
        @include tiny {
          left: -2.5rem;
        }
      }
    }
  }
}

::v-deep #team_video {
  padding-top: 0;
  @include small {
    padding-bottom: 0;
  }
}

::v-deep #grants {
  padding-bottom: 7.5rem;
  @include small {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .blocks {
    &.right {
      @include small {
        margin-top: 3rem;
      }
    }
  }
}

::v-deep #get_involved {
  @include small {
    padding-top: 3rem;
  }
  @include tiny {
    padding-top: 0;
    padding-bottom: 2rem;
  }
  .blocks {
    &.right {
      padding: 7rem 0;
      @include small {
        margin-top: 7rem;
        padding-bottom: 3rem;
      }
      @include mini {
        margin-top: 5rem;
        padding-bottom: 5rem;
      }
      @include tiny {
        margin-top: 3rem;
        padding-top: 5rem;
        padding-bottom: 3rem;
      }
    }
  }
  .card-list {
    @include small {
      padding-left: 4.1665%;
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
      top: -2rem;
      left: 0.5rem;
    }
    @include mini {
      left: -2rem;
    }
    @include tiny {
      top: 0;
      left: -2rem;
    }
  }
}

::v-deep #dive_deeper {
  padding-bottom: 10rem;
}

</style>
