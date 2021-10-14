<template>
  <div class="page page-grants">

    <Modal />

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
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

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'

// ====================================================================== Export
export default {
  name: 'PageGrants',

  components: {
    Modal,
    PageSection
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'grants', data: GrantsPageData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
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
  color: white;
}

.main-content {
  position: relative;
}

#section-1 {
  padding-top: 9rem + $navigationHeight;
}

#section-2 {
  padding-top: 15rem;
  margin-bottom: 1.5rem;
}

#section-3 {
  margin-bottom: 7.625rem;
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
  }
}

// ////////////////////////////////////////////////////// Section Customizations
// ----------------------------------------------------------------- [Section] 1
::v-deep #hero {
  padding: 0;
  .column-content {
    &.right {
      width: 48vw;
      height: 100%;
      left: 3rem;
    }
  }
  .right,
  .image-block {
    width: 100%;
    height: 100%;
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: 20vw;
  }
}

// ----------------------------------------------------------------- [Section] 2
::v-deep #gallery-1-header {
  padding: 0;
}

::v-deep #gallery-1-cards {
  padding: 4rem 0 0 0;
  .column-content {
    &.left {
      .image {
        transform: scale(1.4) translateY(25%);
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
    }
    .description {
      .more-info {
        @include fontSize_Large;
      }
    }
  }
  a {
    color: $azureRadiance;
  }
}

::v-deep #banner-1 {
  padding: 2rem;
  .blocks {
    &.left {
      padding: 2.625rem;
      .label {
        font-size: 0.9375rem;
      }
      .description {
        @include fontSize_ExtraLarge;
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
  }
}

::v-deep #gallery-2 {
  padding: 0;
  .blocks {
    &.right {
      .slider-block {
        margin-top: 17.125rem;
      }
    }
  }
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

::v-deep #info-1 {
  .blocks {
    &.left {
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
  .column-content {
    &.right {
      padding: 5.375rem 0 1.375rem 0;
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -2rem;
    width: 100vw;
    height: 100%;
  }
}

::v-deep #get_involved {

}

</style>
