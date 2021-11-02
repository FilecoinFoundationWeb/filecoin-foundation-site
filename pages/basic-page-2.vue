<template>
  <div class="page page-basic-2">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-basic-2-background-layers"
        :layers-array="[3, 4, 5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import BasicPageTwoData from '@/content/pages/basic_two.json'
import SectionDiveDeeperData from '@/content/sections/dive-deeper.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageBasicTwo',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'basic-page-2',
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'basic_two', data: BasicPageTwoData })
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
      const content = CloneDeep(this.siteContent.basic_two.page_content)
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
.page-basic-2 {
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
    height: calc(100% + 3.5rem);
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
  @include tiny {
    .layer {
      border-top-left-radius: 5rem !important;
      border-bottom-left-radius: 5rem !important;
    }
  }
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #basic-hero {
  padding: 0;
  margin-bottom: 7rem;
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
  margin-bottom: 1.5rem;
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

::v-deep #cta_banner_1,
::v-deep #panels_1,
::v-deep #basic-content-1,
::v-deep #basic-content-2,
::v-deep #basic-content-3 {
  h1,
  h2 {
    @include fontSize_ExtraLarge;
    @include fontWeight_Medium;
    @include leading_Regular;
  }
  h1 {
    margin-bottom: 1.25rem;
  }
  h2 {
    margin-bottom: 1.25rem;
  }
  p {
    margin-bottom: 1.5rem;
    @include fontSize_Large;
    @include fontWeight_Regular;
    @include leading_Regular;
    letter-spacing: $letterSpacing_Large;
  }
  a {
    @include fontSize_Large;
    @include fontWeight_SemiBold;
    @include leading_Regular;
    letter-spacing: $letterSpacing_Large;
    color: $denim;
  }
  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.125rem;
  }
  li {
    margin-bottom: 1.5rem;
    padding-left: 0.875rem;
    @include fontSize_Large;
    @include leading_Regular;
    letter-spacing: $letterSpacing_Large;
    list-style-type: circle;
    list-style-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3e%3cg id='Group_3306' data-name='Group 3306' transform='translate(-289 -1136)'%3e%3ccircle id='Ellipse_63' data-name='Ellipse 63' cx='5.5' cy='5.5' r='5.5' transform='translate(289 1136)' fill='%23144dd8'/%3e%3ccircle id='Ellipse_60' data-name='Ellipse 60' cx='3.5' cy='3.5' r='3.5' transform='translate(291 1138)' fill='%230520a3'/%3e%3c/g%3e%3c/svg%3e");
    &::marker {
      color: $kleinBlue;
      left: 0;
    }
  }
  ul li ul li {
    list-style-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3e%3cg id='Group_3307' data-name='Group 3307' transform='translate(-289 -1136)'%3e%3ccircle id='Ellipse_63' data-name='Ellipse 63' cx='5.5' cy='5.5' r='5.5' transform='translate(289 1136)' fill='%23144dd8'/%3e%3ccircle id='Ellipse_60' data-name='Ellipse 60' cx='3.5' cy='3.5' r='3.5' transform='translate(291 1138)' fill='%23d8ebfb'/%3e%3c/g%3e%3c/svg%3e ");
  }
  blockquote {
    margin-top: 3rem;
    margin-bottom: 3rem;
    p {
      @include fontSize_ExtraLarge;
      @include fontWeight_Medium;
      @include leading_Small;
      letter-spacing: $letterSpacing_Large;
    }
  }
  table {
    margin: 3rem 0;
    border-radius: 2px;
    th,
    tr {
      @include fontSize_Regular;
      @include fontWeight_Regular;
      @include leading_Regular;
      letter-spacing: $letterSpacing_Large;
    }
    th {
      @include fontSize_Medium;
      @include fontWeight_Medium;
      background: $polar;
      text-align: left;
    }
    th,
    td {
      padding: 0.5rem 1rem;
    }
    tr:nth-child(even) {
      background: $polar;
    }
    tr:nth-child(odd) {
      background: $hawkesBlue;
    }
  }
  pre {
    margin: 3rem 0;
    border-radius: 0.5rem;
    background-color: $blackPearl;
    box-shadow: 0 0 0 .5rem $jordyBlue;
  }
  code {
    font-family: 'Suisse Intl Mono';
    color: #9AB6CE;
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

::v-deep #basic-content-1 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic-content-2 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic-content-3 {
  padding-top: 0;
  padding-bottom: 4rem;
}

::v-deep #panels_1 {
  padding-top: 0;
  padding-bottom: 7rem;
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
