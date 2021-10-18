<template>
  <div class="page page-index">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-index-background-layers"
        :layers-array="[2, 3, 4, 5, 6]"
        :offset="{ mini: 0.25 }" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import IndexPageData from '@/content/pages/index.json'
import SectionDiverDeeperData from '@/content/sections/dive-deeper.json'

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

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
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
      const content = CloneDeep(this.siteContent.index.page_content)
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
$backgroundLayers__Offset: 1.75rem * 5;
$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset});
$backgroundLayers__Left: calc(50% - (#{$containerWidth} / 2) + 1.75rem);

// ///////////////////////////////////////////////////////////////////// General
.page-index {
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
    background-color: rgb(239, 246, 252);
    border-radius: 14rem 0 0 5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

#section-2 {
  padding-top: 3.5rem;
  padding-bottom: 3rem;
}

#section-3 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: rgb(239, 246, 252);
    border-radius: 5rem 0 0 14rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
#page-index-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #hero {
  padding: 0;
}

::v-deep #intro_1 {
  padding-top: 7.5rem;
  .blocks {
    &.right {
      padding: 2rem 0;
      color: white;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -3rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #intro_2 {
  padding: 10rem 0;
}

::v-deep #banner_1 {
  .blocks {
    &.left {
      padding: 2rem 0;
      color: white;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -7rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
  }
}

::v-deep #explore_1 {
  margin-top: 5rem;
  margin-bottom: 1rem;
  .blocks {
    &.right {
      padding-top: 5rem;
      padding-bottom: 3rem;
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
      }
    }
  }
}

::v-deep #team_video {
  padding-top: 0;
}

::v-deep #team_intro {
  padding-bottom: 7.5rem;
}

::v-deep #get_involved {
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
::v-deep #dive_deeper_video_2,
::v-deep #events-hackathons {
  padding-bottom: 0;
}
</style>
