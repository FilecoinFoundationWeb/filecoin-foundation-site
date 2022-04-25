<template>
  <div class="error-page">

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-error-background-layers"
        layers-array="2_3_4_5_6"
        :breakpoints="pageLayersBreakpointData" />

    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import PageSection from '../components/PageSection'
import BackgroundLayers from '../components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'ErrorPage',

  components: {
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      pageLayersBreakpointData: {
        default: {
          stroke: 1.5,
          radius: 21
        },
        mini: {
          stroke: 1,
          radius: 12
        },
        tiny: {
          stroke: 0.25,
          radius: 8
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.general.error_page)
      return {
        section_1: {
          error_message: {
            left: content
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.main-content {
  position: relative;
  padding: 14.5rem 0;
  margin-bottom: 7.5rem;
  @include mini {
    padding: 8rem 0;
    margin-bottom: 2rem;
  }
  @include tiny {
    padding: 0;
    margin-bottom: 4rem;
  }
}

::v-deep #error_message {
  .text-block {
    .label-textual,
    .heading {
      @include fontWeight_SemiBold;
      letter-spacing: 0.82px;
    }
    .label-textual {
      @include fontSize_ExtraExtraLarge;
      line-height: 1.6;
      @include mini {
        @include fontSize_ExtraMediumLarge;
      }
    }
    .heading {
      @include fontSize_Huge;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      @include mini {
        @include fontSize_ExtraExtraLarge;
      }
    }
    .button {
      position: relative;
      color: $blackPearl;
      font-size: 14px;
      @include fontWeight_Medium;
      line-height: 2;
      letter-spacing: 0.28px;
      margin-left: 0.75rem;
      &:before {
        content: '‹';
        position: absolute;
        left: -0.75rem;
        top: 50%;
        transform: translate(0, -50%);
        transition: 200ms ease;
      }
      &:hover {
        &:before {
          transform: translate(-1rem, -50%);
        }
      }
    }
  }
}
// /////////////////////////////////////////////////////////// Background Layers
$backgroundLayers__Offset: 1.5rem;
$backgroundLayers__Offset__Mini: calc(#{$navigationHeight} - 1rem);
$backgroundLayers__Offset__Tiny: calc(#{$navigationHeight} - 5rem);
$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.75rem);
$backgroundLayers__Left__Medium: 1.5rem * 6;
$backgroundLayers__Left__Mini: 1rem * 5;
$backgroundLayers__Left__Tiny: 2.5rem;

::v-deep #page-error-background-layers {
  position: absolute;
  top: $backgroundLayers__Top;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% - (#{$backgroundLayers__Offset} * 10));
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
    top: $backgroundLayers__Offset__Mini;
    height: calc(100% - (#{$navigationHeight} * 2));
  }
  @include tiny {
    left: $backgroundLayers__Left__Tiny;
    top: $backgroundLayers__Offset__Tiny;
    height: calc(100% - 2rem);
  }
}

</style>
