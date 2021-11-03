<template>
  <div class="page page-basic-1">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-basic-1-background-layers"
        :layers-array="[3, 4, 5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import BasicPageOneData from '@/content/pages/basic-template-1.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageBasicOne',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'basic-page-1',
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', 'settings')
    await store.dispatch('global/getBaseData', { key: 'basic_one', data: BasicPageOneData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.basic_one.page_content)
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 3;
$backgroundLayers__Offset__Medium: 1rem * 5;
$backgroundLayers__Offset__Mini: 0.25rem * 5;

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) - (1.75rem * 2));
$backgroundLayers__Left__Medium: 1rem * 6;
$backgroundLayers__Left__Mini: 0.25rem * 6;

// ///////////////////////////////////////////////////////////////////// General
.page-basic-1 {
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
  padding-top: 5rem; // 1.75rem * 4
  @include mini {
    padding-top: 5rem;
  }
}

#section-2 {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: 100%;
    background-color: $hawkesBlue;
    border-radius: 14rem 0 0 14rem;
    z-index: -1;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 12.75rem;
    }
    @include small {
      border-top-left-radius: 8rem;
      border-bottom-left-radius: 8rem;
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

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-basic-1-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  z-index: -10;
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
  margin-bottom: 3.5rem;
  .heading {
    @include fontSize_ExtraExtraLarge;
    @include fontWeight_Bold;
    @include leading_Small;
    letter-spacing: $letterSpacing_Large;
  }
  .subheading {
    @include fontSize_Regular;
    @include leading_MediumLarge;
    letter-spacing: $letterSpacing_Large;
  }
  .column-content {
    &.left {
      margin-bottom: 3rem;
    }
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
    width: 70vw;
    border-radius: 35vw 3rem 3rem 35vw;
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

::v-deep #basic_content_1,
::v-deep #banner_image,
::v-deep #basic_content_2,
::v-deep #basic_content_3,
::v-deep #basic_content_4,
::v-deep #basic_content_5 {
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
    @include fontSize_Large;
    @include fontWeight_Regular;
    @include leading_Regular;
    margin-bottom: 1.5rem;
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
    list-style-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3e%3cg id='Group_3307' data-name='Group 3307' transform='translate(-289 -1136)'%3e%3ccircle id='Ellipse_63' data-name='Ellipse 63' cx='5.5' cy='5.5' r='5.5' transform='translate(289 1136)' fill='%23144dd8'/%3e%3ccircle id='Ellipse_60' data-name='Ellipse 60' cx='3.5' cy='3.5' r='3.5' transform='translate(291 1138)' fill='%23d8ebfb'/%3e%3c/g%3e%3c/svg%3e");
  }
  img {
    border-radius: 0.5rem;
    box-shadow: 0 0 0 .5rem $jordyBlue;
    width: 100%;
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

::v-deep #basic_content_1 {
  padding-top: 7rem;
  padding-bottom: 3rem;
}

::v-deep #banner_image {
  padding: 0;
  margin-bottom: 5rem;
}

::v-deep #basic_content_2 {
  padding: 0;
  margin-bottom: 3.75rem;
}

::v-deep #panels_1 {
  padding: 0;
  margin-bottom: 3.25rem;
}

::v-deep #basic_content_3 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_4 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_5 {
  padding-top: 0;
  padding-bottom: 9rem;
}

</style>
