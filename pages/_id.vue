<template>
  <div class="page page-singular">

    <Modal />

    <div class="main-content">

      <PageSection
        v-if="postHeading"
        id="post-heading-section"
        :section="postHeading" />

      <section id="post-body-section">
        <section id="post-body" class="content-section">
          <div class="grid">

            <div class="col-10_ti-11" data-push-left="off-1_md-2_ti-1">
              <nuxt-content :document="postBody" class="basic-template-block-format" />
            </div>

            <div class="col-10_ti-11" data-push-left="off-1_md-2_ti-1">
              <div id="bottom-controls">

                <div
                  v-if="postTags"
                  class="tags-container">
                  <div
                    v-for="(item, index) in postTags"
                    :key="`${item}-${index}`"
                    class="tag"
                    @click="setTagsQuery(item)">
                    {{ item }}
                  </div>
                </div>

                <div class="share-socials">
                  <div class="share-to">
                    Share to:
                  </div>
                  <SocialIcons :force-list="shareSocials" />
                </div>

                <div class="controls-wrapper">

                  <nuxt-link
                    v-if="previousPost"
                    :to="previousPost"
                    class="button">
                    Back
                  </nuxt-link>

                  <nuxt-link
                    v-if="nextPost"
                    :to="nextPost"
                    class="button">
                    Next article
                  </nuxt-link>

                </div>

              </div>
            </div>

          </div>
        </section>
      </section>

      <PageSection
        v-if="recommendations"
        id="blogposts-section"
        :section="recommendations" />

      <BackgroundLayers
        id="page-singular-background-layers"
        layers-array="3_4_5_6"
        :breakpoints="pageLayersBreakpointData" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'
import SocialIcons from '@/components/SocialIcons'

// ====================================================================== Export
export default {
  name: 'PageSingular',

  components: {
    Modal,
    PageSection,
    BackgroundLayers,
    SocialIcons
  },

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content(`blog/${route.params.id}`).fetch()
      const posts = await $content('blog').without(['body']).fetch()
      markdown.allPosts = posts.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
      return { markdown }
    } catch (e) {
      return error('This project does not exist')
    }
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
      siteContent: 'global/siteContent'
    }),
    shareSocials () {
      const socials = CloneDeep(this.siteContent.blog.social)
      socials.forEach((item) => {
        if (item.hasOwnProperty('url')) {
          const url = `${this.siteContent.general.og.url + this.$route.path}`
          item.url = item.url.replace(/slug/i, url)
        }
      })
      return socials
    },
    allPosts () {
      return this.markdown.allPosts
    },
    postHeading () {
      return {
        post_heading: {
          id: 'post-heading',
          grid: ['middle'],
          left: {
            type: 'text_block',
            layout: 'large',
            cols: {
              num: 'col-5_md-9_mi-10',
              push_left: 'off-0_md-2_ti-1'
            },
            heading: this.markdown.title,
            subheading: this.markdown.description,
            label: this.markdown.featured ? 'Featured Blog' : '',
            date: this.markdown.date || this.markdown.createdAt,
            ctas: [
              {
                type: 'H',
                action: 'nuxt-link',
                text: this.markdown.author,
                icon: 'play',
                url: `/${this.markdown.slug}`
              }
            ]
          },
          right: {
            type: 'image_block',
            src: this.markdown.image,
            cols: {
              num: 'col-7_md-9_mi-10',
              push_left: 'off-0_md-2_mi-1'
            }
          }
        }
      }
    },
    postBody () {
      return this.markdown
    },
    postTags () {
      if (Array.isArray(this.markdown.tags)) {
        return this.markdown.tags
      }
      return false
    },
    postIndex () {
      return this.allPosts.findIndex(post => post.slug === this.markdown.slug)
    },
    previousPost () {
      const index = this.postIndex
      if (index > 0) {
        const slug = this.allPosts[index].slug
        return `/${slug}`
      }
      return false
    },
    nextPost () {
      const index = this.postIndex
      if (index < this.allPosts.length - 1) {
        const slug = this.allPosts[index].slug
        return `/${slug}`
      }
      return false
    },
    recommendations () {
      const recommendedPosts = []
      if (Array.isArray(this.markdown.recommendedPosts)) {
        this.allPosts.forEach((post) => {
          if (this.markdown.recommendedPosts.includes(post.slug)) {
            recommendedPosts.push({
              type: 'E',
              img: post.image,
              img_type: 'background_image',
              action: 'nuxt-link',
              url: `/${post.slug}`,
              title: post.title,
              description: post.description,
              date: post.date || post.createdAt,
              tags: post.tags,
              cta: {
                type: 'H',
                text: 'Read more',
                url: `/${post.slug}`
              }
            })
          }
        })
      }
      return {
        recommended_posts: {
          id: 'blogposts-list',
          left: {
            type: 'card_list_block',
            cols: {
              num: 'col-12_md-11_sm-10_mi-9_ti-10',
              push_left: 'off-0_md-1_sm-2_ti-1'
            },
            display: {
              initial: 3,
              next: 3
            },
            cards: recommendedPosts
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      clearAllTags: 'filters/clearAllTags',
      setRouteQuery: 'filters/setRouteQuery'
    }),
    setTagsQuery (val) {
      const slug = this.$Slugify(val)
      this.clearAllTags()
      this.setRouteQuery({ key: 'tags', data: slug })
      this.$router.push('/blog')
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
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
  }
}

#post-heading-section {
  padding-top: 5rem; // 1.75rem * 4
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
    border-radius: 11.375rem 0 0 11.375rem;
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
      border-top-left-radius: 4.75rem;
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
  z-index: -10;
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #post-heading-section {
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

::v-deep #post-body {
  h1 {
    margin-bottom: 3rem;
  }
  h2 {
    margin-bottom: 1.5rem;
  }
  a {
    position: relative;
  }
  p > a {
    &:before {
      content: attr(href);
      position: absolute;
      top: -1.75rem;
      left: calc(100% - 1.25rem);
      background-color: $white;
      @include fontSize_Small;
      border-radius: $borderRadius_Medium;
      @include leading_ExtraLarge;
      padding: 0 0.5rem;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.15));
      opacity: 0;
      transition: 200ms ease;
    }
    &:after {
      content: url('~/assets/svgs/toolTipIcon.svg');
      margin-left: 0.375rem;
    }
    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }
  img {
    margin: 3rem 0;
    border-radius: 0.5rem;
    box-shadow: 0 0 0 .5rem $jordyBlue;
    width: 100%;
  }
  blockquote {
    margin-top: 3rem;
    margin-left: 2rem;
    margin-bottom: 3rem;
    p {
      border-left: 3px solid $polar;
      padding-left: 2rem;
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
  .nuxt-content-highlight {
    position: relative;
    @include blogPageOutline;
    &:before {
      background-color: $jordyBlue;
      z-index: -1;
    }
    &:after {
      content: unset;
    }
  }
  pre {
    padding: 1.5rem;
    margin: 3rem 0;
    border-radius: 0.5rem;
    background-color: $blackPearl;
  }
  code {
    font-family: 'Suisse Intl Mono';
    color: #9AB6CE;

  }
  hr {
    border-top: 3px solid $polar;
    border-left: none;
    border-right: none;
    border-bottom: none;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
}

::v-deep .social-icons {
  path,
  ellipse {
    fill: $kleinBlue;
  }
}

#bottom-controls {
  .button {
    font-size: 14px;
    text-align: center;
    color: $kleinBlue;
  }
}

.tags-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 3.125rem;
}

.tag {
  @include fontWeight_Medium;
  @include leading_Small;
  padding: 0.625rem 1.25rem;
  margin-right: 0.625rem;
  font-size: 14px;
  letter-spacing: $letterSpacing_Large;
  border-radius: 1.5rem;
  color: $polar;
  background-color: $denim;
  cursor: pointer;
  transition: 250ms ease-out;
  &:hover {
    transition: 250ms ease-in;
    transform: scale(1.05);
  }
}

.share-socials {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2.625rem;
  color: $kleinBlue;
}

.share-to {
  @include fontWeight_SemiBold;
  @include leading_ExtraExtraLarge;
  margin-right: 1rem;
  font-size: 14px;
}

.controls-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

::v-deep #blogposts-section {
  padding-bottom: 3rem;
  .card {
    &.type__E {
      width: unset;
      margin: unset !important;
      .image {
        height: 47%;
        @include borderRadius_Large;
        overflow: hidden;
      }
    }
  }
}
</style>
