<template>
  <div class="page page-basic-2">

    <Modal />

    <div class="main-content">

      <PageSection
        id="hero-header"
        key="hero-header"
        :section="header" />

      <!-- ======================================================= SECTION A -->
      <section class="main-content-section-A">

        <PageSection
          v-for="(section, key) in introSections"
          :id="key"
          :key="key"
          :section="section" />

        <BackgroundLayers
          id="section-a-background-layers"
          layers-array="5_6"
          :breakpoints="pageLayersBreakpointData" />

      </section>

      <!-- ======================================================= SECTION B -->
      <section class="main-content-section-B">

        <PageSection
          id="section_3"
          key="section_3"
          :section="callout" />

        <PageSection
          id="section_4"
          key="section_4"
          :section="caseStudies" />

        <PageSection
          v-for="(section, key) in finalSections"
          :id="key"
          :key="key"
          :section="section" />

      </section>

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import PublicDataCommonsPageData from '@/content/pages/public-data-commons.json'
import CaseStudyData from '@/content/data/case-studies.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// =================================================================== Functions
const positionFeaturedFirst = (events) => {
  const index = events.findIndex(item => item.featured)
  if (index === 0 || index > 0) {
    const featured = events[index]
    events.splice(index, 1)
    events.unshift(featured)
  }
  return events
}

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
      tag: 'public_data_commons',
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
          radius: 22.875
        },
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
    await store.dispatch('global/getBaseData', { key: 'public_data_commons', data: PublicDataCommonsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageContent () {
      const content = CloneDeep(this.siteContent.public_data_commons.page_content)
      return content
    },
    header () {
      return this.pageContent.section_0
    },
    introSections () {
      return {
        section_1: this.pageContent.section_1,
        section_2: this.pageContent.section_2
      }
    },
    callout () {
      return this.pageContent.section_3
    },
    cards () {
      const cards = CloneDeep(CaseStudyData)
      return positionFeaturedFirst(cards)
    },
    caseStudies () {
      const section = CloneDeep(this.pageContent.section_4)
      section.case_studies.left.cards = this.cards
      return section
    },
    finalSections () {
      return {
        section_5: this.pageContent.section_5,
        section_6: this.pageContent.section_6
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
// .page-basic-2 {
//   padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
//   @include medium {
//     padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium} + 5rem);
//   }
//   @include mini {
//     padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini} + 5rem);
//   }
// }
//
// .main-content {
//   position: relative;
//   margin-top: $backgroundLayers__Offset__Desktop;
//   @include medium {
//     margin-top: $backgroundLayers__Offset__Medium;
//   }
//   @include mini {
//     margin-top: $backgroundLayers__Offset__Mini;
//   }
// }

.main-content-section-A,
.main-content-section-B {
  position: relative;
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
$backgroundLayers__Offset__Desktop: 1.75rem * 5;// TODO
$backgroundLayers__Offset__Medium: 1rem * 5; // TODO
$backgroundLayers__Offset__Mini: 0.25rem * 5; // TODO

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop}); // TODO

$backgroundLayers__Left__Desktop: calc(50vw - (#{$containerWidth} / 2) - 9rem);
$backgroundLayers__Left__Medium: 1rem * 6; // TODO
$backgroundLayers__Left__Mini: 0.25rem * 6; // TODO


::v-deep #section-a-background-layers {
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
}

::v-deep #section-1-background-layers {
  position: absolute;
  top: 4.125rem;
  left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
  width: 100%;
  height: calc(100% - 4.125rem);
  // height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  // @include medium {
  //   left: $backgroundLayers__Left__Medium;
  // }
  // @include mini {
  //   left: $backgroundLayers__Left__Mini;
  // }
}

// /////////////////////////////////////////////////////////////////// Section 1
#section_1 {
  padding-top: 4.125rem; // 1.375rem * 3
  @include mini {
    padding-top: 5rem;
  }
  // &:before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: $backgroundLayers__Left__Desktop;
  //   width: calc(100% + 3.5rem);
  //   height: 100%;
  //   background-color: $hawkesBlue;
  //   border-radius: 11.375rem 0 0 11.375rem;
  //   filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
  //   z-index: -1;
  //   @include medium {
  //     left: $backgroundLayers__Left__Medium;
  //     border-top-left-radius: 11.75rem;
  //   }
  //   @include mini {
  //     left: $backgroundLayers__Left__Mini;
  //     border-top-left-radius: 4.75rem;
  //   }
  // }
}

::v-deep #intro_1 {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: 100%;
    height: 100%;
    background-color: $polar;
    border-top-left-radius: 17.375rem;
    border-bottom-left-radius: 5rem;
  }
}

::v-deep #banner_1 {
  position: relative;
  margin-top: 3rem;
  @include small {
    margin-top: 0;
    margin-bottom: 2rem;
  }
  @include mini {
    margin-bottom: 0;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: 100%;
    height: 100%;
    background-color: $polar;
    border-top-left-radius: 5rem;
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

::v-deep #intro_3, {
  position: relative;
  padding-top: 0;
  padding-bottom: 7rem;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: 100%;
    height: 100%;
    background-color: $polar;
    border-bottom-left-radius: 17.375rem;
  }
  img {
    border-radius: unset;
    box-shadow: unset;
  }
}

// /////////////////////////////////////////////////////////////////// Section 2
#section_2 {
  padding-top: 1rem;
  @include small {
    padding-bottom: 0;
  }
}

// /////////////////////////////////////////////////////////////////// Section 3
#section_3 {
  // &:before {
  //   content: '';
  //   position: absolute;
  //   top: 0.5rem;
  //   left: $backgroundLayers__Left__Desktop;
  //   width: calc(100% + 3.5rem);
  //   height: calc(100% + 3.5rem);
  //   background-color: $polar;
  //   border-radius: 5rem 0 0 11.375rem;
  //   filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
  //   z-index: -1;
  //   @include medium {
  //     left: $backgroundLayers__Left__Medium;
  //     border-bottom-left-radius: 11.75rem;
  //   }
  //   @include mini {
  //     left: $backgroundLayers__Left__Mini;
  //     border-bottom-left-radius: 4.75rem;
  //   }
  // }
}

// /////////////////////////////////////////////////////////////////// Section 4
#section_4 {

}

::v-deep #case_studies {
  .card-list-block {
    .button-row {
      justify-content: center;
    }
  }
}

::v-deep #section_5 {
  position: relative;
  z-index: 2;
  .text-block {
    margin-left: 3.125rem;
    .heading {
      @include fontSize_Huge;
      @include fontWeight_SemiBold;
      letter-spacing: 1.1px;
      line-height: leading(65, 55);
      margin-bottom: 2.25rem;
    }
  }
  .background-layers {
    position: absolute;
    width: 200vw;
    height: calc(100% + 8.25rem);
    top: -4.125rem;
    left: calc(-1 * (#{math.div($containerWidth, 6)}) );
  }
}

::v-deep #section_6 {
  position: relative;
  z-index: 1;
  .column-content.left {
    padding: 4rem 6.25rem;
    padding-bottom: 3rem;
    background-color: $kleinBlue;
    border-radius: 12rem;
    border: 4px solid $jordyBlue;
    .heading {
      font-size: 2.8125rem;
    }
    .button-row {
      justify-content: flex-end;
    }
  }
}

::v-deep #callout-2 {
  padding-top: 11.625rem;
  padding-bottom: 18.75rem;
}

</style>
