<template>
  <div class="page page-filaustin">

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-filaustin-body-layer"
        layers-array="2"
        :offset="{ mini: 0.25 }" />

      <BackgroundLayers
        id="page-filaustin-background-layers"
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

import FilAustinPageData from '@/content/pages/filaustin.json'

import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageFilAuston',

  components: {
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'filaustin',
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
    await store.dispatch('global/getBaseData', { key: 'filaustin', data: FilAustinPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.filaustin.page_content)
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
.page-filaustin {
  color: $white;
}

.main-content {
  position: relative;
  top: -2.5 * $backgroundLayers__Offset;
  padding-top: 2.5 * $backgroundLayers__Offset;
}

#section_1 {
  padding-top: 7rem; // 1.75rem * 4
  &:before {
    content: '';
    position: absolute;
    top: -2.5 * $backgroundLayers__Offset;
    left: $backgroundFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 4.5rem + #{2.5 * $backgroundLayers__Offset});
    background-color: $blackPearl;
    border-radius: 0 0 0 8.5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
  @include small {
    padding-top: 0;
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

#section_2 {
  padding-top: 4.125rem;
}

#section_2,
#section_3,
#section_4,
#section_5,
#section_6 {
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

#section_3 {
  z-index: 2;
}

#section_4 {
  padding: 10rem 0;
  z-index: 5;
  @include small {
    padding: 7.5rem 0;
  }
  @include mini {
    padding: 3rem 0;
  }
}

#section_5 {
  z-index: 6;
}

#section_6 {
  z-index: 7;
  &:before {
    height: calc(100% + 5.25rem + 2px);
  }
}

::v-deep .heading {
  @include tiny {
    @include fontSize_ExtraExtraLarge;
  }
}

::v-deep .subheading {
  @include fontWeight_Medium;
  @include tiny {
    @include fontSize_Medium;
  }
}

::v-deep .description {
  a {
    @include fontWeight_Medium;
    color: $azureRadiance;
    &:hover {
      text-decoration: underline;
    }
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-filaustin-body-layer {
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

#page-filaustin-background-layers {
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
// ----------------------------------------------------------------- [Section] 1
::v-deep #mobile_hero_image {
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
  padding-top: 2rem;
  padding-bottom: 0;
  margin-bottom: 4.25rem;
  text-align: right;
  @include mini {
    text-align: left;
    margin-bottom: 0;
  }
  .description {
    font-size: 2.25rem;
    line-height: 2.8125rem;
  }
}
// ----------------------------------------------------------------- [Section] 2
::v-deep #filaustin-floating-menu {
  .floating-content {
    left: -4rem;
    .heading {
      @include fontSize_Larger;
      @include fontWeight_Medium;
      @include leading_ExtraExtraLarge;
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

::v-deep #section_2-heading {
  padding: 0;
  margin-bottom: 5rem;
  @include mini {
    margin-bottom: 0.5rem;
  }
}

::v-deep #section_2-info {
  padding: 0;
  .image {
    @include mini {
      margin-bottom: 1rem;
      width: 37%;
    }
  }
  .subheading {
    @include mini {
      @include fontSize_Large;
    }
  }
}

::v-deep #section_2-banner-image {
  padding-top: 7.5rem;
  padding-bottom: 0;
  @include tiny {
    padding-top: 3rem;
  }
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

// ----------------------------------------------------------------- [Section] 3
::v-deep #section_3-panel-1 {
  padding: 0;
  padding-top: 7.5rem;
  @include tiny {
    padding-top: 3rem;
  }
  .image {
    @include mini {
      margin-bottom: 1rem;
      width: 37%;
    }
  }
  .subheading {
    @include mini {
      @include fontSize_Large;
    }
  }
}

::v-deep #section_3-panel-2,
::v-deep #section_3-panel-3 {
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
    @include mini {
      margin: 0 0 1rem 0;
    }
  }
}

::v-deep #section_3-panel-2, {
  @include tiny {
    padding-top: 3rem;
  }
}

::v-deep #section_3-banner-image {
  padding: 10rem 0;
  @include mini {
    padding-top: 4rem;
    padding-bottom: 6rem;
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

::v-deep #section_3-panel-3 {
  padding: 0;
}

// ----------------------------------------------------------------- [Section] 4
::v-deep #subscribe_form {
  padding-top: 7rem;
  .text-block {
    margin-bottom: 1rem;
    .subheading {
      margin-bottom: 0.5rem;
      color: $kleinBlue;
    }
    .description {
      color: $blackPearl;
    }
  }
  .column-content {
    padding: 1rem 4rem;
    @include mini {
      padding: 2rem 4rem;
    }
    @include tiny {
      padding-right: 0;
    }
  }
  .background-layers {
    @include tiny {
      position: absolute;
      top: 0;
      left: -3rem;
      width: 150vw;
      height: 100%;
      z-index: 0;
    }
    .layer {
      &:last-child {
        filter: none;
      }
      &.border-radius-direction-reverse {
        border-radius: 16rem !important;
      }
    }
  }
}

// ----------------------------------------------------------------- [Section] 5
::v-deep #section_5-title-social {
  padding: 0;
  .social-icons {
    width: 75%;
    @include mini {
      width: 100%;
    }
  }
}

::v-deep #section_5-info {
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

::v-deep #section_5-banner-image {
  @include mini {
    display: none;
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

// ----------------------------------------------------------------- [Section] 6
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
