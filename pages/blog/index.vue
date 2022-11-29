<template>
  <div class="page page-blog">

    <Modal />

    <div class="main-content">

      <PageSection
        v-if="featuredPostImage"
        :section="featuredPostImage" />

      <PageSection
        v-if="featuredPostText"
        :section="featuredPostText" />

      <div class="grid-noBottom">
        <div class="col-8_sm-10_mi-9_ti-10" data-push-left="off-0_sm-2_ti-1">
          <Zero_Core__FilterBar
            id="zero-filter-bar"
            :filter-value="filterValue"
            :placeholder="searchBarPlaceholder"
            action="store">
            <template #icon>
              <div class="magnifying-glass"></div>
            </template>
          </Zero_Core__FilterBar>
        </div>
      </div>

      <PageSection
        v-if="blogPosts"
        id="blogposts-section"
        :section="blogPosts" />
<!--
      <BackgroundLayers
        id="page-blog-background-layers"
        layers-array="3_4_5_6"
        :breakpoints="pageLayersBreakpointData" /> -->

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// =================================================================== Functions
const unslugify = (slug, type = 'capitalize-first-character') => {
  if (type === 'capitalize-first-character') {
    const string = slug.toString().replace(/-/g, ' ')
    return string.charAt(0).toUpperCase() + string.substring(1)
  } else if (type === 'capitalize-all') {
    return slug.toString()
      .split('-')
      .map(a => a.charAt(0).toUpperCase() + a.substring(1))
      .join(' ')
  } else if (type === 'no-capitals') {
    return slug.toString().replace(/-/g, ' ')
  } else {
    return 'Incompatible "Type" specified. Must be type "capitalize-first-character", "capitalize-all" or "no-capitals". Default is "capitalize-first-character"'
  }
}

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
    await store.dispatch('global/getBaseData', 'settings')
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
    pageContent () {
      return this.siteContent.blog
    },
    searchBarPlaceholder () {
      return this.pageContent.searchBar.placeholder
    },
    blogpostsPerPage () {
      return this.pageContent.blogposts.display_amount
    },
    posts () {
      const arr = []
      for (let i = 0; i < this.markdownFiles.length; i++) {
        const post = this.markdownFiles[i]
        const card = {
          type: 'E',
          img: post.image,
          img_type: 'image',
          action: 'nuxt-link',
          url: `/blog/${post.slug}`,
          title: post.title,
          description: post.description,
          date: post.date || post.createdAt,
          tags: post.tags,
          cta: {
            type: 'H',
            text: 'Read more',
            url: `/blog/${post.slug}`
          }
        }
        arr.push(card)
      }
      return arr
    },
    featuredPostImage () {
      const featured = this.markdownFiles.find(file => file.hasOwnProperty('featured') && file.featured)
      if (featured) {
        const section = {
          grid: ['noGutter'],
          left: {
            type: 'image_block',
            src: featured.image,
            cols: {
              num: 'col-12',
              push_left: 'off-0'
            },
            customizations: {
              'background_layers': {
                name: 'BackgroundLayers',
                props: {
                  'layers-array': '2_3_4_5',
                  breakpoints: {
                    default: {
                      stroke: 0.75,
                      radius: 2.125
                    },
                    medium: {
                      stroke: 0.75,
                      radius: 2.125
                    },
                    mini: {
                      stroke: 0.25,
                      radius: 2.125
                    }
                  },
                  reverse: true,
                  'border-radius-direction': ''
                }
              }
            }
          }
        }
        return { 'featured-post-image': section }
      }
      return false
    },
    featuredPostText () {
      const featured = this.markdownFiles.find(file => file.hasOwnProperty('featured') && file.featured)
      if (featured) {
        const section = {
          left: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-6_sm-12',
              push_left: 'off-0'
            },
            theme: 'light',
            heading: featured.title,
            label: 'Featured Blog'
          },
          right: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-6_sm-12',
              push_left: 'off-0'
            },
            theme: 'light',
            subheading: featured.description,
            ctas: [
              {
                type: 'B',
                action: 'nuxt-link',
                text: 'Read more',
                icon: 'readme',
                url: `/blog/${featured.slug}`
              }
            ]
          }
        }
        return { 'featured-post-text': section }
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
          display: this.blogpostsPerPage,
          displayControls: true
        }
      }
      return { section }
    }
  },

  watch: {
    '$route' (route) {
      if (route.query.hasOwnProperty('tags')) {
        const value = unslugify(route.query.tags, 'capitalize-all')
        this.setFilterValue(value)
      }
    }
  },

  mounted () {
    if (this.$route.query.hasOwnProperty('tags')) {
      const value = unslugify(this.$route.query.tags, 'capitalize-all')
      this.setFilterValue(value)
    }
  },

  methods: {
    ...mapActions({
      setFilterValue: 'core/setFilterValue',
      setRouteQuery: 'filters/setRouteQuery'
    })
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 5;
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

  ::v-deep .card {
    transform: scale(1);
    transition: transform 200ms ease;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.main-content {
  position: relative;
  padding-top: 1rem;
  // margin-top: $backgroundLayers__Offset__Desktop;
  // @include medium {
  //   margin-top: $backgroundLayers__Offset__Medium;
  // }
  // @include mini {
  //   margin-top: $backgroundLayers__Offset__Mini;
  // }
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
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #featured-post-image {
  .image-block {
    .image {
      border-radius: 1.375rem;
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
    }
  }
}

::v-deep #featured-post-text {
  padding-top: 2rem;
  padding-bottom: 5rem;
  @include mini {
    padding-top: 5rem;
  }
  .text-block {
    padding: 0 2rem;
    .label,
    .heading,
    .description {
      margin-bottom: 0.8125rem;
    }
    .label {
      @include fontWeight_SemiBold;
      font-size: 0.9375rem;
      letter-spacing: toRem(0.45);
      line-height: leading(35, 15);
    }
    .heading {
      @include fontWeight_Medium;
      font-size: toRem(30);
      line-height: leading(40, 30);
      letter-spacing: toRem(1.2);
    }
    .description {
      @include fontSize_Regular;
      @include fontWeight_Regular;
      line-height: leading(28, 16);
      letter-spacing: toRem(0.48);
    }
  }
}

::v-deep #zero-filter-bar {
  position: relative;
  width: calc(100% - 1rem);
  height: toRem(60);
  &:before {
    content: '';
    position: absolute;
    top: -0.3125rem;
    left: -0.3125rem;
    width: calc(100% + 0.625rem);
    height: calc(100% + 0.625rem);
    transition: all 200ms ease;
    background-color: rgba($azureRadiance, 0);
    border-radius: 0.9375rem;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $hawkesBlue;
    border-radius: 0.625rem;
    border: 0.3125rem solid $jordyBlue;
  }
  &.focused {
    &:before {
      background-color: $azureRadiance;
    }
  }
  .icon-container {
    position: relative;
    margin: 0 1rem;
    height: 100%;
    width: 1.25rem;
    z-index: 10;
    .magnifying-glass {
      position: relative;
      width: 1.25rem;
      height: 1.25rem;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1060_8904)'%3e%3ccircle cx='8.5' cy='8.5' r='7.5' stroke='%2308072E' stroke-width='2' stroke-linecap='round'/%3e%3cpath d='M14 14L20 20' stroke='%2308072E' stroke-width='2' stroke-linecap='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1060_8904'%3e%3crect width='20' height='20' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
    }
  }
  .input {
    position: relative;
    left: -1px;
    font-size: toRem(17);
    @include fontWeight_Medium;
    font-style: italic;
    letter-spacing: toRem(0.48);
    line-height: leading(28, 17);
    color: #201F4B;
    background-color: transparent;
    outline: none;
    border: none;
    z-index: 10;
    &::placeholder {
      font-size: toRem(17);
      @include fontWeight_Medium;
      font-style: italic;
      letter-spacing: toRem(0.48);
      line-height: leading(28, 17);
      color: #201F4B;
    }
  }
}

::v-deep #blogposts-section {
  padding-top: 2.6875rem;
  .content-section {
    padding: 0;
  }
  .card.type__E {
    background-color: $hawkesBlue;
    border-radius: 0.625rem;
    padding: 0.625rem;
    .image {
      width: 100%;
      height: unset;
      border-radius: 0.3125rem;
    }
    .panel-left {
      position: relative;
    }
    .date {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-bottom: 0;
    }
    .button {
      align-self: flex-end;
    }
  }
}

</style>
