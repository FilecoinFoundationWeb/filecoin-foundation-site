<template>
  <div class="page page-governance">

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-governance-body-layer"
        :layers-array="[2]" />

      <BackgroundLayers
        id="page-governance-background-layers"
        :layers-array="[6, 5, 4, 3]"
        :reverse="true" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import GovernancePageData from '@/content/pages/governance.json'

import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageGovernance',

  components: {
    PageSection,
    BackgroundLayers
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'governance', data: GovernancePageData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    sections () {
      const content = CloneDeep(this.siteContent.governance.page_content)
      // const len = content.length
      // const last = content[len - 1]
      // const replace = this.siteContent['section-dive-deeper'].concat(last)
      // content.splice(len - 1, 1, replace)
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
$backgroundFill__Left: calc(50% - (#{$containerWidth} / 2) + (3 * 1.75rem));
$indentedFill__Left: calc(50% - (#{$containerWidth} / 2) + (13 * 1.75rem));

// ///////////////////////////////////////////////////////////////////// General

.page-governance {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  color: $white;
}

.main-content {
  position: relative;
  top: -2.5 * $backgroundLayers__Offset;
}

#section-1 {
  margin-bottom: $backgroundLayers__Offset - $navigationHeight;
}

#section-2 {
  padding-top: 7rem; // 1.75rem * 4
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $blackPearl;
    border-radius: 0 0 0 8.5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

#section-3 {
  padding-top: 7rem; // 1.75rem * 4
}

#section-3,
#section-4,
#section-5 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $indentedFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $blackPearl;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -10;
  }
}

#section-6 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $indentedFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $blackPearl;
    border-radius: 0 0 0 8.5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -10;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
#page-governance-body-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 16rem);
  height: calc(100% + #{$backgroundLayers__Top / 2} + 1.75rem * 2);
  z-index: -11;
}

#page-governance-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
}

// ////////////////////////////////////////////////////// Section Customizations
// ----------------------------------------------------------------- [Section] 2
::v-deep #hero {
  padding: 0;
  .column-content {
    &.left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .image {
    width: 40vw;
    border-radius: 20vw 0 0 20vw;
  }
}

::v-deep #hero_text {
  padding: 0;
}
// ----------------------------------------------------------------- [Section] 3
::v-deep #panel-1-title {
  padding: 0;
}

::v-deep #panel-1-info-top {
  padding: 0;
}

::v-deep #panel-1-banner-image {
  .image {
    width: 62vw;
    border-radius: 20vw 0 0 20vw;
  }
}

// ----------------------------------------------------------------- [Section] 4
::v-deep #panel-2-title {
  padding: 0;
}

::v-deep #panel-2-info-top {
  padding: 0;
}

::v-deep #panel-2-main {
  .column-content {
    padding: 5.75rem 0;
    &.left {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -9rem;
        width: 100vw;
        height: 100%;
        background-color: $blackPearl;
        border-radius: 9rem 0 0 9rem;
        filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
        z-index: 10;
      }
    }
    .image-wrapper {
      display: flex;
      flex-direction: row;
      .image {
        padding-right: 2rem;
        width: 50%;
      }
      .label {
        padding-right: 1rem;
        width: 50%;
        @include fontSize_ExtraLarge;
        @include fontWeight_Medium;
        letter-spacing: $letterSpacing_Regular;
        @include leading_Regular;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -9rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    .shadow__6 {
      filter: unset;
    }
  }
}

// ----------------------------------------------------------------- [Section] 5
::v-deep #panel-3-info-bottom {
  .card-list {
    flex-direction: column;
  }
  .card {
    margin: 0 0 4.5rem 0;
    width: 100%;
    .image {
      width: 3.375rem;
    }
    .title {
      @include fontSize_ExtraLarge;
      color: $white;
    }
    .description {
      @include fontSize_Large;
    }
  }
  a {
    color: $denim;
  }
}

// ----------------------------------------------------------------- [Section] 6
::v-deep #panel-4-title {
  padding: 0;
  img {
    width: 1.375rem;
    margin-right: 0.625rem;
  }
}

::v-deep #panel-4-info {
  padding: 0;
  a {
    color: $denim;
  }
}

::v-deep #panel-4-banner-image {
  .image {
    width: 62vw;
    border-radius: 20vw 0 0 20vw;
  }
}

</style>
