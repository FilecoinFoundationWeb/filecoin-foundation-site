<template>
  <div class="page page-terms">

    <div class="main-content">

      <div class="grid">
        <div class="col-10_mi-11" data-push-left="off-2_mi-1">
          <div class="content">

            <nuxt-content :document="markdown" />

          </div>
        </div>
      </div>

      <BackgroundLayers
        id="page-terms-background-layers"
        layers-array="3_4_5_6"
        :breakpoints="pageLayersBreakpointData" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import TermsPageData from '@/content/pages/terms.json'

import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageTerms',

  components: {
    BackgroundLayers
  },

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content('terms-of-use').fetch()
      return { markdown }
    } catch (e) {
      return error('Could not find terms content')
    }
  },

  data () {
    return {
      tag: 'terms',
      pageLayersBreakpointData: {
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
    await store.dispatch('global/getBaseData', { key: 'terms', data: TermsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
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
.page-terms {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  @include medium {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium} + 5rem);
  }
  @include mini {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini} + 5rem);
  }
}

[class~="grid"],
[class*="grid-"],
[class*="grid_"] {
  position: relative;
  z-index: 10;
}

::v-deep h1,
::v-deep p {
  margin-bottom: 2rem;
}

::v-deep h2 {
  @include fontSize_Large;
  @include fontWeight_SemiBold;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

::v-deep p a {
  @include fontWeight_Bold;
  &:hover {
    text-decoration: underline;
  }
}

.main-content {
  position: relative;
  padding-top: 7rem; // 1.75rem * 4
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
    padding-top: 5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: calc(100% + 5.5rem);
    background-color: $hawkesBlue;
    border-radius: 11.375rem 0 0 11.375rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: 0;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 11.75rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 4.75rem;
      border-bottom-left-radius: 4.75rem;
    }
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-terms-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 2rem);
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}
</style>
