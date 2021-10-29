<template>
  <div class="page page-blog">

    <Modal />

    <div class="main-content">

      <PageSection
        v-if="featuredPost"
        id="featured-section"
        :section="featuredPost">
      </PageSection>

      <div class="grid">
        <div class="col-8_mi-9_ti-10" data-push-left="off-0_md-1_sm-2_ti-1">
          <Zero_Core__FilterBar
            id="zero-filter-bar"
            :filter-value="filterValue">
            <template #icon>
              <img src="~assets/svgs/searchicon.svg" />
            </template>
          </Zero_Core__FilterBar>
        </div>
      </div>

      <PageSection
        v-if="blogPosts"
        id="blogposts-section"
        :section="blogPosts">
      </PageSection>

      <BackgroundLayers
        id="page-blog-background-layers"
        :layers-array="[3, 4, 5, 6]"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageBlog',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  async asyncData ({ $content }) {
    const markdownFiles = await $content('blog').without(['body']).fetch()
    return { markdownFiles }
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
      siteContent: 'global/siteContent',
      filterValue: 'core/filterValue'
    }),
    posts () {
      const arr = []
      for (let i = 0; i < this.markdownFiles.length; i++) {
        const post = this.markdownFiles[i]
        const card = {
          type: 'E',
          img: post.image,
          img_type: 'nuxt_link',
          title: post.title,
          description: post.description,
          date: post.date || post.createdAt,
          cta: {
            type: 'H',
            action: 'nuxt-link',
            text: 'Read more',
            url: `/${post.slug}`
          }
        }
        arr.push(card)
      }
      return arr
    },
    featuredPost () {
      let featured
      for (let i = 0; i < this.markdownFiles.length; i++) {
        if (this.markdownFiles[i].featured) {
          featured = this.markdownFiles[i]
          break
        }
      }
      if (featured) {
        const section = {
          id: 'featured-post',
          grid: ['middle'],
          left: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-5_md-9_mi-10',
              push_left: 'off-0_md-2_ti-1'
            },
            heading: featured.title,
            subheading: featured.description,
            label: 'Featured Blog',
            ctas: [
              {
                type: 'B',
                action: 'nuxt-link',
                text: 'Read more',
                icon: 'play',
                url: `/${featured.slug}`
              }
            ]
          },
          right: {
            type: 'image_block',
            src: featured.image,
            cols: {
              num: 'col-7_md-9_mi-10',
              push_left: 'off-0_md-2_mi-1'
            }
          }
        }
        return [section]
      }
      return false
    },
    blogPosts () {
      const section = {
        id: 'blogposts-list',
        left: {
          type: 'paginated_cards',
          cols: {
            num: 'col-12_md-11_sm-10_mi-9_ti-10',
            push_left: 'off-0_md-1_sm-2_ti-1'
          },
          cards: this.posts,
          displayControls: true
        }
      }
      return [section]
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
.page-blog {
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

#featured-section {
  padding-top: 7rem;
  @include mini {
    padding-top: 5rem;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-blog-background-layers {
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
::v-deep #featured-post {
  padding: 0;
  margin-bottom: 5.5rem;
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
      @include medium {
        margin-bottom: 3rem;
      }
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

::v-deep #zero-filter-bar {
  margin-left: 0.5rem;
  width: calc(100% - 2rem);
  height: 2.5rem;
  background-color: $denim;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 .5rem $azureRadiance;
  .icon-container {
    margin: 0 0.5rem;
  }
  .input {
    font-size: 14px;
    @include fontWeight_Medium;
    letter-spacing: $letterSpacing_Large;
    color: $white;
    background-color: $denim;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    &::placeholder {
      font-size: 14px;
      color: $azureRadiance;
      @include fontWeight_Medium;
      letter-spacing: $letterSpacing_Large;
    }
  }
}

::v-deep #blogposts-list {
  padding-top: 1.75rem;
}

</style>
