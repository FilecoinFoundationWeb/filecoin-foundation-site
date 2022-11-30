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
        <div class="col-8_sm-10_mi-12" data-push-left="off-0">
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

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'

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
    PageSection
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
            url: `/blog/${post.slug}`,
            icon: 'book'
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
              background_layers: {
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
                      radius: 1.625
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
                icon: 'book',
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
            num: 'col-12',
            push_left: 'off-0'
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
// ///////////////////////////////////////////////////////////////////// General
.main-content {
  position: relative;
  padding-top: 1rem;
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #featured-post-image {
  @include mini {
    padding-top: 2.25rem;
    padding-bottom: 0;
  }
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
    padding-top: 3.5rem;
  }
  .text-block {
    padding: 0 2rem;
    @include small {
      padding: 0;
    }
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
    .subheading {
      @include fontSize_Regular;
      @include fontWeight_Regular;
      line-height: leading(28, 16);
      letter-spacing: toRem(0.48);
    }
    .button {
      .icon.book {
        display: block;
        margin-right: 0.625rem;
        width: 0.9375rem;
        height: 0.75rem;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0.9375 1.76935C1.76719 1.43052 2.95687 1.06514 4.11375 0.951584C5.36063 0.828873 6.41813 1.00928 7.03125 1.64023V10.5651C6.15469 10.0798 5.04375 10.0129 4.01906 10.1137C2.91281 10.2236 1.79719 10.5358 0.9375 10.8564V1.76935ZM7.96875 1.64023C8.58187 1.00928 9.63938 0.828873 10.8863 0.951584C12.0431 1.06514 13.2328 1.43052 14.0625 1.76935V10.8564C13.2019 10.5358 12.0872 10.2227 10.9809 10.1146C9.95531 10.0129 8.84531 10.0789 7.96875 10.5651V1.64023ZM7.5 0.81239C6.57656 0.0367481 5.23781 -0.0786366 4.01906 0.0404111C2.59969 0.180521 1.16719 0.655796 0.274687 1.05232C0.192796 1.0887 0.123352 1.14733 0.0746447 1.22121C0.0259375 1.29509 2.49107e-05 1.38111 0 1.46898L0 11.5423C2.17144e-05 11.6189 0.0197223 11.6942 0.0572973 11.7615C0.0948722 11.8287 0.14912 11.8857 0.215073 11.9272C0.281025 11.9686 0.356573 11.9932 0.434797 11.9988C0.513021 12.0043 0.59142 11.9906 0.662813 11.9589C1.48969 11.5926 2.82188 11.1521 4.11281 11.0249C5.43375 10.8948 6.54094 11.1045 7.13438 11.828C7.1783 11.8814 7.23395 11.9246 7.29724 11.9543C7.36052 11.9839 7.42981 11.9993 7.5 11.9993C7.57019 11.9993 7.63948 11.9839 7.70276 11.9543C7.76605 11.9246 7.8217 11.8814 7.86563 11.828C8.45906 11.1045 9.56625 10.8948 10.8863 11.0249C12.1781 11.1521 13.5113 11.5926 14.3372 11.9589C14.4086 11.9906 14.487 12.0043 14.5652 11.9988C14.6434 11.9932 14.719 11.9686 14.7849 11.9272C14.8509 11.8857 14.9051 11.8287 14.9427 11.7615C14.9803 11.6942 15 11.6189 15 11.5423V1.46898C15 1.38111 14.9741 1.29509 14.9254 1.22121C14.8766 1.14733 14.8072 1.0887 14.7253 1.05232C13.8328 0.655796 12.4003 0.180521 10.9809 0.0404111C9.76219 -0.0795524 8.42344 0.0367481 7.5 0.81239Z' fill='white'/%3e%3c/svg%3e ");
      }
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
  padding-bottom: 12rem;
  .content-section {
    padding: 0;
  }
  .card.type__E {
    background-color: $hawkesBlue;
    border-radius: 0.625rem;
    padding: 0.625rem;
    transform: scale(1);
    transition: transform 200ms ease;
    &:hover {
      transform: scale(1.05);
    }
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
      padding-bottom: 0.0625rem;
      margin-bottom: 0;
      font-size: toRem(14);
      @include fontWeight_Regular;
      line-height: leading(21, 14);
      letter-spacing: toRem(0.5);
      opacity: 1;
      @include medium {
        font-size: toRem(13);
      }
    }
    .title {
      @include fontWeight_Medium;
      font-size: toRem(19);
      line-height: leading(25, 19);
      letter-spacing: toRem(0.5);
      margin-bottom: 0.625rem;
    }
    .description {
      font-size: toRem(15);
      line-height: leading(24, 15);
      letter-spacing: toRem(0.5);
    }
    .button {
      padding-top: 1rem;
      align-self: flex-end;
      align-items: center;
      .icon.book {
        display: block;
        margin-right: 0.625rem;
        width: 1rem;
        height: 0.8125rem;
        transform: translateY(-1px);
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='13' viewBox='0 0 16 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.4375 2.26935C2.26719 1.93052 3.45688 1.56514 4.61375 1.45158C5.86063 1.32887 6.91813 1.50928 7.53125 2.14023V11.0651C6.65469 10.5798 5.54375 10.5129 4.51906 10.6137C3.41281 10.7236 2.29719 11.0358 1.4375 11.3564V2.26935ZM8.46875 2.14023C9.08187 1.50928 10.1394 1.32887 11.3863 1.45158C12.5431 1.56514 13.7328 1.93052 14.5625 2.26935V11.3564C13.7019 11.0358 12.5872 10.7227 11.4809 10.6146C10.4553 10.5129 9.34531 10.5789 8.46875 11.0651V2.14023ZM8 1.31239C7.07656 0.536748 5.73781 0.421363 4.51906 0.540411C3.09969 0.680521 1.66719 1.1558 0.774687 1.55232C0.692796 1.5887 0.623352 1.64733 0.574645 1.72121C0.525938 1.79509 0.500025 1.88111 0.5 1.96898V12.0423C0.500022 12.1189 0.519722 12.1942 0.557297 12.2615C0.594872 12.3287 0.64912 12.3857 0.715073 12.4272C0.781025 12.4686 0.856573 12.4932 0.934797 12.4988C1.01302 12.5043 1.09142 12.4906 1.16281 12.4589C1.98969 12.0926 3.32188 11.6521 4.61281 11.5249C5.93375 11.3948 7.04094 11.6045 7.63438 12.328C7.6783 12.3814 7.73395 12.4246 7.79724 12.4543C7.86052 12.4839 7.92981 12.4993 8 12.4993C8.07019 12.4993 8.13948 12.4839 8.20276 12.4543C8.26605 12.4246 8.3217 12.3814 8.36563 12.328C8.95906 11.6045 10.0663 11.3948 11.3863 11.5249C12.6781 11.6521 14.0113 12.0926 14.8372 12.4589C14.9086 12.4906 14.987 12.5043 15.0652 12.4988C15.1434 12.4932 15.219 12.4686 15.2849 12.4272C15.3509 12.3857 15.4051 12.3287 15.4427 12.2615C15.4803 12.1942 15.5 12.1189 15.5 12.0423V1.96898C15.5 1.88111 15.4741 1.79509 15.4254 1.72121C15.3766 1.64733 15.3072 1.5887 15.2253 1.55232C14.3328 1.1558 12.9003 0.680521 11.4809 0.540411C10.2622 0.420448 8.92344 0.536748 8 1.31239Z' fill='%232D2BA9'/%3e%3c/svg%3e ");
        @include medium {
          display: none;
        }
        @include small {
          display: block;
        }
      }
      .text {
        font-size: toRem(15);
        line-height: leading(23, 15);
        letter-spacing: toRem(0.42);
        @include medium {
          font-size: toRem(13);
        }
      }
    }
  }
  .pagination-controls {
    .page-button,
    .control-button,
    .breaker {
      color: white;
    }
  }
}

</style>
