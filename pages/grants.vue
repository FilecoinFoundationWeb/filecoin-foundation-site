<template>
  <div class="page page-grants">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, key) in sections"
        :id="key"
        :key="key"
        :section="section" />

      <div class="stripes">
        <div
          v-for="n in 5"
          :key="`stripe-${n}`"
          class="line">
        </div>
      </div>

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import GrantsPageData from '@/content/pages/grants.json'
import EventListData from '@/content/data/event-list.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'

// ====================================================================== Export
export default {
  name: 'PageGrants',

  components: {
    Modal,
    PageSection
  },

  data () {
    return {
      tag: 'grants'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'grants', data: GrantsPageData })
    await store.dispatch('global/getBaseData', { key: 'event_list', data: EventListData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    sections () {
      const content = CloneDeep(this.siteContent.grants.page_content)
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page-grants {
  position: relative;
  top: -1 * $navigationHeight;
  color: $white;
}

.main-content {
  position: relative;
}

#section_1 {
  padding-top: 9rem + $navigationHeight;
  @include small {
    padding-top: 3rem + $navigationHeight;
  }
  @include mini {
    padding-top: 1.5rem + $navigationHeight;
  }
}

#section_2 {
  padding-top: 15rem;
  margin-bottom: 1.5rem;
  @include small {
    padding-top: 5rem;
  }
}

#section_3 {
  margin-bottom: 7.625rem;
  @include mini {
    margin-bottom: 4.75rem;
  }
}

#section_6 {
  padding-top: 6rem;
}

.stripes {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  .line {
    margin: 0 0.4375rem;
    width: 3.125rem;
    height: 100%;
    background: linear-gradient(180deg, $deepCove 0%, $kleinBlue 32%, $azureRadiance 61%, $hawkesBlue 100%);
    @include small {
      background: linear-gradient(180deg, $deepCove 0%, $kleinBlue 100%);
    }
    @include mini {
      display: none;
    }
  }
}

::v-deep {
  .subheading {
    @include mini {
      @include fontSize_Medium;
      @include leading_Medium;
      letter-spacing: $letterSpacing_Large;
    }
  }
}

// ////////////////////////////////////////////////////// Section Customizations
// ----------------------------------------------------------------- [Section] 1
::v-deep #hero {
  padding: 0;
  .column-content {
    &.right {
      left: 3rem;
      @include small {
        left: 0;
        margin-bottom: 5rem;
      }
      @include mini {
        margin-bottom: 3rem;
      }
    }
  }
  .image {
    width: 50vw;
    max-width: 858px;
    border-radius: 11.375rem 0rem 0rem 11.375rem;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
    @include small {
      width: 100vw;
    }
    @include mini {
      border-radius: 4.25rem 0rem 0rem 4.25rem;
    }
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + 25rem);
    height: 100%;
  }
  .subheading {
    @include mini {
      margin-bottom: 2.25rem;
    }
  }
}

// ----------------------------------------------------------------- [Section] 2
::v-deep #gallery-1-header {
  padding: 0;
}

::v-deep #gallery-1-cards {
  padding: 4rem 0 0 0;
  @include mini {
    padding: 3rem 0 0 0;
  }
  .column-content,
  .blocks {
    &.left {
      width: 100%;
      .image {
        width: 100%;
        @include mini {
          opacity: 0.5;
        }
      }
    }
  }
  .card-list {
  flex-direction: column;
  }
  .card {
    width: 100%;
    &:last-child {
      margin: 0;
    }
    .image {
      width: 3.375rem;
    }
    .title {
      @include fontSize_ExtraLarge;
      color: $white;
      @include mini {
        @include fontSize_Large;
        margin-bottom: 0.75rem;
      }
    }
    .description {
      @include mini {
        margin-bottom: 2rem;
      }
    }
  }
  a {
    @include fontWeight_Medium;
    color: $azureRadiance;
    &.lighter {
      color: $jordyBlue;
    }
  }
}

::v-deep #more-info {
  @include fontSize_Large;
}

::v-deep #banner-1 {
  padding: 2rem;
  @include tiny {
    padding: 2rem 0;
  }

  .blocks {
    &.left {
      padding: 2.625rem;
      @include tiny {
        padding: 4rem 0;
      }
      .label {
        font-size: 0.9375rem;
      }
      .description {
        @include fontSize_ExtraLarge;
        @include mini {
          @include fontSize_Large;
        }
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -4rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    @include tiny {
      .layers {
        border-radius: 5rem 0 0 5rem;
      }
    }
  }
}

::v-deep #gallery-2 {
  padding: 0;
  .blocks {
    &.right {
      .slider-block {
        margin-top: 17.125rem;
        @include mini {
          margin-top: 0;
        }
      }
    }
  }
  .card-list {
  flex-direction: column;
  }
  .card {
    margin: 0 0 4.5rem 0;
    width: 100%;
    @include mini {
      margin-bottom: 1.5rem;
    }
    .image {
      width: 3.375rem;
    }
    .title {
      margin: 0;
      @include fontSize_ExtraLarge;
      color: $white;
    }
    .description {
      @include fontSize_Large;
      ul {
        padding-left: 0.5rem;
        @include fontSize_Regular;
        @include leading_ExtraLarge;
        letter-spacing: $letterSpacing_Large;
      }
      li {
        margin: 0 0.625rem;
      }
    }
  }
  a {
    color: $azureRadiance;
  }
}

::v-deep #tabbed-slider {
  padding: 3.875rem 0 2rem 0;
  .tab:focus-visible {
    outline: 0;
  }
  @include small {
    padding-top: 0;
  }
  @include mini {
    padding-top: 3rem;
  }
  .background-layers {
    @include mini {
      left: -3rem;
    }
  }
}

::v-deep #info-1 {
  @include small {
    padding-top: 0;
  }
  [class~="grid"], [class*="grid-"], [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
    }
  }
  .blocks {
    &.left {
      @include small {
        margin-top: 2rem;
      }
      .preview-container {
        background-color: $kleinBlue;
      }
    }
    &.right {
      .subheading {
        @include fontSize_ExtraLarge;
        @include leading_Regular;
      }
    }
  }
}

::v-deep #explore-panel {
  @include mini {
    padding-top: 0;
  }
  .column-content {
    &.left {
      @include small {
        padding-bottom: 3rem;
      }
    }
    &.right {
      padding: 5.375rem 0 1.375rem 0;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -1rem;
    width: 100vw;
    height: 100%;
  }
}

::v-deep #events-hackathons {
  padding-bottom: 0;
  .events {
    margin-top: 6rem;
    @include small {
      margin-top: 2rem;
    }
    @include mini {
      margin-top: 0;
    }
  }
}
</style>
