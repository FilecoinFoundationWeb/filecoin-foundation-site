<template>
  <div class="page page-get-involved">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <BackgroundLayers
        id="page-get-involved-background-layers"
        layers-array="5_6"
        :breakpoints="pageLayersBreakpointData" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import GetInvolvedPageData from '@/content/pages/get-involved.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageGetInvolved',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'get_involved',
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
          radius: 12.75
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
    await store.dispatch('global/getBaseData', { key: 'get_involved', data: GetInvolvedPageData })
    await store.dispatch('global/getLeverPostings')
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      postings: 'global/jobPostings'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.get_involved.page_content)
      const jobs = this.postings
      const cardCustomizations = content.section_1.careers_list.left.card_customizations
      content.section_1.careers_list.left.cards = []
      content.section_1.careers_list.left.display = { initial: cardCustomizations.number_job_postings, next: cardCustomizations.number_job_postings }
      const cards = content.section_1.careers_list.left.cards
      const cardsLength = jobs.length > cardCustomizations.number_job_postings ? cardCustomizations.number_job_postings : jobs.length
      for (let i = 0; i < cardsLength; i++) {
        const cardObj = {
          type: cardCustomizations.type,
          action: cardCustomizations.action,
          target: cardCustomizations.target,
          url: jobs[i].hostedUrl,
          label: jobs[i].categories.location,
          title: jobs[i].text,
          cta: {
            type: cardCustomizations.cta.type,
            target: cardCustomizations.cta.target,
            icon: cardCustomizations.cta.icon,
            text: cardCustomizations.cta.text,
            url: jobs[i].hostedUrl
          }
        }
        cards.push(cardObj)
      }
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 2;
$backgroundLayers__Offset__Medium: 1rem * 2;
$backgroundLayers__Offset__Mini: 0.25rem * 2;

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.5rem);
$backgroundLayers__Left__Medium: 1rem * 6;
$backgroundLayers__Left__Mini: 0.25rem * 6;

// ///////////////////////////////////////////////////////////////////// General
.page-get-involved {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  color: $white;
  @include medium {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium});
  }
  @include mini {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini});
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

// /////////////////////////////////////////////////////////// Background Layers
#page-get-involved-background-layers {
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
  padding-top: 10rem;
  @include small {
    padding-bottom: 2.5rem;
  }
  @include mini {
    padding-top: 5rem;
    padding-bottom: 0;
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .blocks {
    &.left {
      @include small {
        margin-top: 3rem;
      }
      @include tiny {
        margin-top: 1rem;
      }
    }
  }
}

::v-deep #careers_intro {
  padding-top: 2.5rem;
  @include mini {
    padding-bottom: 0;
  }
}

::v-deep #careers_list {
  @include small {
    padding-top: 0;
  }
  .card-column {
    &:nth-child(3n + 2) {
      margin-top: -3rem;
      @include small {
        margin-top: 0;
      }
    }
    &:nth-child(2n + 1),
    &:nth-child(6n - 2) {
      .card {
        background-color: $kleinBlue;
      }
    }
    &:nth-child(6n + 1),
    &:nth-child(6n - 1) {
      .card {
        background-color: $deepCove;
      }
    }
  }
  .button-row {
    justify-content: center;
    margin-top: -2rem;
    @include small {
      margin-top: 0;
    }
  }
}

::v-deep #get_involved {
  padding: 0;
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

::v-deep #dive_deeper {
  padding-bottom: 10rem;
  a {
    @include fontWeight_SemiBold;
    @include leading_Regular;
    color: $white;
  }
}

</style>
