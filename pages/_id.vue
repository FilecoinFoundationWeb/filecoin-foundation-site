<template>
  <div class="page page-singular">

    <Modal />

    <div class="main-content">

      <PageSection
        v-if="postHeading"
        id="post-heading-section"
        :section="postHeading">
      </PageSection>

      <section id="post-body-section">
        <section id="post-body" class="content-section">
          <div class="grid">
            <div class="col-10" data-push-left="off-1">
              <nuxt-content :document="postBody" />
            </div>
          </div>
        </section>
      </section>

      <BackgroundLayers
        id="page-singular-background-layers"
        :layers-array="[3, 4, 5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
// import CloneDeep from 'lodash/cloneDeep'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageSingular',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content(`blog/${route.params.id}`).fetch()
      return { markdown }
    } catch (e) {
      return error('This project does not exist')
    }
  },

  data () {
    return {
      tag: 'blog',
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'blog', data: BlogPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    postHeading () {
      const section = {
        id: 'post-heading',
        grid: ['middle'],
        left: {
          type: 'text_block',
          layout: 'large',
          cols: {
            num: 'col-5'
          },
          heading: this.markdown.title,
          subheading: this.markdown.description,
          label: this.markdown.featured ? 'Featured Blog' : '',
          date: this.markdown.date || this.markdown.createdAt,
          description: this.markdown.author
        },
        right: {
          type: 'image_block',
          src: this.markdown.image,
          cols: {
            num: 'col-7',
            push_left: 'off-0'
          }
        }
      }
      return [section]
    },
    postBody () {
      return this.markdown
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
.page-singular {
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

#post-heading-section {
  padding-top: 7rem; // 1.75rem * 4
  @include mini {
    padding-top: 5rem;
  }
}

#post-body-section {
  position: relative;
  padding: 6.625rem 0;
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

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-singular-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  z-index: -1;
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
::v-deep #post-heading {
  padding: 0;
  margin-bottom: 10rem;
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
  // @include small {
  //   margin-bottom: 5rem;
  // }
  // @include mini {
  //   margin-bottom: 0;
  // }
  // @include tiny {
  //   .heading {
  //     @include fontSize_ExtraExtraLarge;
  //   }
  // }
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

::v-deep #post-body {
  h1,
  h2 {
    @include fontSize_ExtraLarge;
    @include fontWeight_Medium;
    @include leading_Regular;
  }
  p {
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
  li {
    @include fontSize_Large;
    @include leading_Regular;
    letter-spacing: $letterSpacing_Large;
    list-style-type: circle;
    &:before {
      color: $kleinBlue;
    }
  }
  img {
    border-radius: 0.5rem;
    box-shadow: 0 0 0 .5rem $jordyBlue;
  }
  blockquote {
    p {
      @include fontSize_ExtraLarge;
      @include fontWeight_Medium;
      @include leading_Small;
      letter-spacing: $letterSpacing_Large;
    }
  }
  table {
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
    border-radius: 0.5rem;
    background-color: $blackPearl;
    box-shadow: 0 0 0 .5rem $jordyBlue;
  }
  code {
    font-family: 'Suisse Intl Mono';
    color: #9AB6CE;
  }
}


</style>
