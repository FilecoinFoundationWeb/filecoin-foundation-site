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
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageGrants',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
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
  padding-top: 7rem + $navigationHeight;
}

#section-2 {
  padding-top: 3.5rem;
  padding-bottom: 3rem;
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
  // .background-layers {
  //   width: 40vw;
  // }
}

::v-deep #gallery-1-header {

}

::v-deep #gallery-1-cards {
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

::v-deep #banner-1 {

}

::v-deep #gallery-2 {
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

::v-deep #team_video {
}

::v-deep #team_intro {
}

::v-deep #get_involved {

}

</style>
