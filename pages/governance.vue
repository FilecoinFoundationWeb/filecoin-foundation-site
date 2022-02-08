<template>
  <div class="page page-governance">

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-governance-body-layer"
        layers-array="2"
        :offset="{ mini: 0.25 }" />

      <BackgroundLayers
        id="page-governance-background-layers"
        layers-array="6_5_4_3"
        :reverse="true"
        :offset="pageBackgroundLayersOffset" />

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

  data () {
    return {
      tag: 'governance',
      scroll: false,
      resize: false,
      pageBackgroundLayersOffset: {
        medium: 0.5,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'governance', data: GovernancePageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.governance.page_content)
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset: 1.75rem * 5;
$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.75rem);
$backgroundLayers__Left__Medium: 0.5rem * 5;
$backgroundLayers__Left__Mini: 0.25rem * 5;

$backgroundFill__Left: calc(50% - (#{$containerWidth} / 2) + (4 * 1.75rem));
$indentedFill__Left: calc(50% - (#{$containerWidth} / 2) + (14 * 1.75rem));

// ///////////////////////////////////////////////////////////////////// General

.page-governance {
  // padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  color: $white;
}

.main-content {
  position: relative;
  top: -2.5 * $backgroundLayers__Offset;
}

#section_1 {
  margin-bottom: $backgroundLayers__Offset - $navigationHeight;
}

#section_2 {
  padding-top: 7rem; // 1.75rem * 4
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 4.5rem);
    background-color: $blackPearl;
    border-radius: 0 0 0 8.5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
  @include small {
    &:before {
      left: 1.25rem;
    }
  }
  @include mini {
    &:before {
      border-radius: 0;
    }
  }
}

#section_3 {
  padding-top: 4.125rem;
}

#section_3,
#section_4,
#section_5,
#section_6,
#section_7 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $indentedFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 1.5rem);
    background-color: $blackPearl;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -10;
  }
  @include mini {
    &:before {
      left: 1.25rem;
    }
  }
}
#section_4,
#section_5,
#section_6 {
  z-index: 1;
}

#section_7 {
  &:before {
    border-radius: 0 0 0 8.5rem;
    @include mini {
      border-radius: 0 0 0 10rem;
    }
  }
}

::v-deep .heading {
  @include tiny {
    @include fontSize_ExtraExtraLarge;
  }
}

::v-deep .subheading {
  @include tiny {
    @include fontSize_Medium;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-governance-body-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 16rem);
  height: calc(100% + #{$backgroundLayers__Top / 2} + 1.75rem * 2);
  z-index: -11;
  @include small {
    .layer {
      border-radius: 0 !important;
    }
  }
  @include mini {
    left: -12rem;
    width: calc(100% + 24rem);
  }
}

#page-governance-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: calc(100% + 20rem);
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}

// ////////////////////////////////////////////////////// Section Customizations
// ----------------------------------------------------------------- [Section] 2
::v-deep #mobile_image_banner {
  display: none;
  @include mini {
    display: block;
    padding: 0 0 2.625rem 0;
    .image {
      width: 100vw;
      border-radius: 50vw 0 0 50vw;
    }
  }
}

::v-deep #hero {
  padding: 0;
  margin-bottom: 2.4375rem;
  @include mini {
    margin-bottom: 0;
  }
  .column-content {
    &.left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .heading {
        @include small {
          @include fontSize_ExtraExtraLarge;
        }
        @include tiny {
          margin: 0;
        }
      }
    }
  }
  .image {
    width: 40vw;
    border-radius: 20vw 3rem 3rem 20vw;
    @include medium {
      width: 50vw;
      border-radius: 25vw 0 0 25vw;
    }
  }
}

::v-deep #hero_text {
  padding: 0;
  margin-bottom: 4.25rem;
  text-align: right;
  @include mini {
    text-align: left;
    margin-bottom: 0;
  }
}
// ----------------------------------------------------------------- [Section] 3

::v-deep #governance-floating-menu {
  .floating-content {
    left: -4rem;
    .heading {
      @include fontSize_ExtraLarge;
      @include fontWeight_Medium;
      @include leading_Regular;
    }
    ul {
      padding-left: 0.75rem;
    }
    li {
      margin: 0.5rem 0;
      list-style: none;
      @include fontSize_Regular;
      @include fontWeight_Medium;
      @include leading_MediumLarge;
      letter-spacing: $letterSpacing_Large;
      cursor: pointer;
      &:last-child {
        margin-bottom: 1rem;
      }
    }
  }
}

::v-deep #panel-1-title {
  padding: 0;
  margin-bottom: 1.5rem;
  @include mini {
    margin-bottom: 0.5rem;
  }
}

::v-deep #panel-1-info-top {
  padding: 0;
  margin-bottom: 3.25rem;
  .image {
    transform: rotateZ(6deg) translate(2rem, 4.375rem) scale(1.2);
    @include mini {
      margin-bottom: 1rem;
      width: 37%;
      transform: rotateZ(6deg) translate(2rem, 0rem) scale(1.2);
    }
  }
  .subheading {
    @include mini {
      @include fontSize_Large;
    }
  }
}

::v-deep #panel-1-info-middle {
  padding: 0;
  margin-bottom: 3.25rem;
  .subheading {
    @include mini {
      @include fontSize_Large;
    }
  }
}

::v-deep #panel-1-info-bottom {
  padding: 0;
  margin-bottom: 3.25rem;
  @include mini {
    margin-bottom: 1.25rem;
  }
  .subheading {
    @include mini {
      @include fontSize_Large;
    }
  }
}

::v-deep #panel-1-banner-image {
  padding: 0;
  .image {
    width: 64vw;
    border-radius: 22vw 3rem 3rem 22vw;
    @include large {
      width: 80vw;
      border-radius: 40vw 0 0 40vw;
    }
    @include mini {
      width: 90vw;
      border-radius: 50vw 0 0 50vw;
    }
  }
}

// ----------------------------------------------------------------- [Section] 4
::v-deep #panel-2-title {
  padding: 5.5rem 0 0 0;
  margin-bottom: 1rem;
  @include mini {
    padding-top: 1.5rem;
    margin-bottom: 0;
  }
}

::v-deep #panel-2-info-top {
  padding: 0;
  .image {
    transform: scale(0.85) translateX(2rem);
    @include small {
      transform: scale(1) translateX(2rem);
    }
    @include mini {
      transform: unset;
      margin-bottom: 0.5rem;
    }
  }
}

::v-deep #panel-2-main {
  @include mini {
    padding: 1.5rem 0;
  }
  .column-content {
    padding: 5.75rem 0;
    @include mini {
      padding: 4rem 0;
    }
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
      @include small {
        &:before {
          left: -6rem;
        }
      }
      @include mini {
        &:before {
          left: -3.125rem;
          border-radius: 7rem 0 0 7rem;
        }
      }
    }
    .image-wrapper {
      display: flex;
      flex-direction: row;
      margin: 4.5rem 0 2rem 0;
      @include mini {
        flex-direction: column;
        margin: 2rem 0 0.5rem 0;
      }
      .image {
        padding-right: 2rem;
        width: 70%;
        transform: translateX(-2rem);
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
        @include mini {
          margin-top: 1rem;
          width: 100%;
          @include fontSize_Large;
        }
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
    @include small {
      left: -6rem;
    }
    @include mini {
      left: -3.125rem;
      width: 140vw;
    }
  }
}

// ----------------------------------------------------------------- [Section] 5
::v-deep #panel-3-title {
  padding: 3.75rem 0 0 0;
  @include mini {
    padding: 1rem 0 0 0;
  }
}

::v-deep #panel-3-info-top {
  padding: 3.75rem 0 0 0;
  @include mini {
    padding: 0;
  }
  .column-content {
    &.left {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .image {
    transform: scale(1.3);
    @include mini {
      transform: scale(1);
      margin: 0 0 1rem 0;
    }
  }
}

::v-deep #panel-3-info-middle {
  padding: 3.75rem 0 0 0;
  @include mini {
    padding: 2rem 0 0 0;
  }
  .subheading {
    @include fontSize_ExtraLarge;
    letter-spacing: $letterSpacing_Large;
  }
}

::v-deep #panel-3-info-bottom {
  padding: 3.75rem 0 0 0;
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
  .social-icons {
    width: 75%;
    @include mini {
      width: 100%;
    }
  }
}

::v-deep #panel-4-info {
  padding: 1rem 0 0 0;
  margin-bottom: 4rem;
  @include mini {
    margin-bottom: 0;
  }
  .image {
    transform: scale(1.2) translate(0.75rem, 1.25rem);
    @include mini {
      transform: scale(1) translate(0);
      margin-bottom: 2rem;
    }
  }
  .subheading {
    @include fontSize_ExtraLarge;
    line-height: $leading_Small;
    @include mini {
      @include fontSize_Large;
    }
  }
  .description {
    @include fontSize_Large;
    line-height: $leading_Regular;
    letter-spacing: $letterSpacing_Large;
  }
  a {
    color: $denim;
  }
}

::v-deep #panel-4-banner-image {
  @include mini {
    padding: 4rem 0 0 0;
  }
  .image {
    width: 62vw;
    border-radius: 20vw 3rem 3rem 20vw;
    @include medium {
      width: 80vw;
      border-radius: 40vw 0 0 40vw;
    }
    @include mini {
      width: 140vw;
      border-radius: 70vw 0 0 70vw;
    }
  }
}

// ----------------------------------------------------------------- [Section] 7
::v-deep #events-hackathons {
  padding-top: 0;
  @include small {
    padding-bottom: 0;
  }
  @include mini {
    padding-top: 5rem;
  }
  .events {
    margin-top: 11rem;
    @include small {
      margin-top: 0;
    }
    @include mini {
      flex-direction: column;
    }
    .card {
      &.type__D {
        @include mini {
          width: 100%;
        }
      }
    }
  }
}
</style>
