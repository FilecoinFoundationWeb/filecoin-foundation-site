<template>
  <div class="page page-singular">

    <Modal />

    <div class="main-content">

      <PageSection
        v-if="postHeading"
        id="post-heading-section"
        :section="postHeading" />

      <section id="post-body-section" :class="{ 'no-header-image': !postHasHeaderImage }">
        <section id="post-body" class="content-section">
          <div class="grid">

            <div class="col-10_ti-11" data-push-left="off-1_md-2_mi-1_ti-1">
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
        v-if="recommendations.recommended_posts.left.cards.length"
        id="blogposts-section"
        :section="recommendations" />

      <div class="button-row">
        <Button :button="viewAllPostsButton" />
      </div>

      <BackgroundLayers
        id="page-singular-background-layers"
        layers-array="2_3_4_5"
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
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'PageSingular',

  components: {
    Modal,
    PageSection,
    BackgroundLayers,
    SocialIcons,
    Button
  },

  async asyncData ({ $content, app, store, route, error }) {
    try {
      const markdown = await $content(`blog/${route.params.id}`).fetch()
      const markdownFiles = await $content('blog')
        .without(['body'])
        .sortBy('date', 'desc')
        .fetch()
      markdown.allPosts = markdownFiles
      await store.dispatch('global/getBaseData', { key: 'markdown', data: markdown })
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
    const head = CloneDeep(this.$CompileSeo(this.$GetSeo(this.tag)))
    head.title = this.markdown.title
    head.meta.forEach((item) => {
      if (item.hid === 'description' || item.hid === 'og:description' || item.hid === 'twitter:description') { item.content = this.markdown.description }
      if (item.hid === 'og:title' || item.hid === 'twitter:title') { item.content = this.markdown.title }
      if (item.hid === 'og:image' || item.hid === 'twitter:image') { item.content = `https://fil.org${this.markdown.image}` }
      if (item.hid === 'og:url') { item.content = `${item.content}/${this.markdown.slug}` }
    })
    head.link.forEach((item) => {
      item.href = `${item.href}/${this.markdown.slug}`
    })
    return head
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
    postHasHeaderImage () {
      return this.markdown.image
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
              num: 'col-10_md-8_mi-12',
              push_left: 'off-1_md-2_mi-0',
              push_right: 'off-1_md-2_mi-0'
            },
            heading: this.markdown.title,
            subheading: this.markdown.author,
            label: this.markdown.featured ? 'Featured Blog' : '',
            date: this.markdown.date || this.markdown.createdAt
          },
          right: {
            type: 'image_block',
            src: this.markdown.image,
            cols: {
              num: 'col-10_md-8_sm-10_mi-12',
              push_left: 'off-1_md-2_sm-1_mi-0',
              push_right: 'off-1_md-2_sm-1_mi-0'
            },
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
        const slug = this.allPosts[index - 1].slug
        return `/blog/${slug}`
      }
      return false
    },
    nextPost () {
      const index = this.postIndex
      if (index < this.allPosts.length - 1) {
        const slug = this.allPosts[index + 1].slug
        return `/blog/${slug}`
      }
      return false
    },
    viewAllPostsButton () {
      return {
        type: 'E',
        action: 'a',
        url: '/blog',
        theme: 'light',
        text: 'View all posts'
      }
    },
    recommendations () {
      const recommendedPosts = []
      if (Array.isArray(this.markdown.recommendedPosts)) {
        this.allPosts.forEach((post) => {
          if (this.markdown.recommendedPosts.includes(post.slug)) {
            recommendedPosts.push({
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
$backgroundLayers__Offset__Desktop: 1.75rem * 5;
$backgroundLayers__Offset__Medium: 1rem * 5;
$backgroundLayers__Offset__Mini: 0.25rem * 8;

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
#post-heading-section {
  padding-top: 0;
  ::v-deep .content-section {
    padding-bottom: 0;
    @include mini {
      padding-top: 3rem;
    }
  }
  ::v-deep .text-block {
    text-align: center;
    @include mini {
      padding: 0 1rem;
    }
    .date,
    .heading {
      margin-bottom: 1.625rem;
    }
    .date {
      @include fontSize_Large;
      @include fontWeight_Medium;
      letter-spacing: toRem(0.48);
      line-height: leading(21, 20);
    }
    .heading {
      @include fontWeight_Medium;
      font-size: toRem(35);
      line-height: leading(50, 35);
      letter-spacing: toRem(1.2);
      @include small {
        font-size: 1.8rem;
        line-height: 1.3;
      }
    }
    .subheading {
      font-size: toRem(18);
      @include fontWeight_SemiBold;
      line-height: leading(28, 16);
      letter-spacing: toRem(0.48);
      color: #2F2DAE;
      margin-bottom: 2rem;
    }
  }
  ::v-deep .image-block {
    @include mini {
      padding: 0 0.75rem;
    }
    .image {
      border-radius: 1.25rem;
      border: 0.5rem solid $polar;
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15));
    }
  }
}

#post-body-section {
  position: relative;
  padding: 5rem 0;
  @include mini {
    padding-top: 1.75rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: -10rem;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: calc(100% + 10rem);
    background-color: $white;
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
      top: -6rem;
      height: calc(100% + 6rem);
    }
  }
  &.no-header-image {
    &:before {
      top: 0;
      height: 100%;
    }
  }
}

::v-deep #post-body {
  ::-moz-selection { background: $deepCove; color: $white; }
  ::selection { background: $deepCove; color: $white; }
  h1 {
    margin-bottom: 3rem;
  }
  h2 {
    margin-bottom: 1.5rem;
  }
  a {
    position: relative;
  }
  p {
    margin-bottom: 3rem;
    font-weight: 350;
    font-size: 1.2rem;
    &:first-child {
      @include fontWeight_Medium;
    }
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
    @include fontSize_Large;
    @include fontWeight_SemiBold;
    text-align: center;
    color: $kleinBlue;
    transition: 200ms ease;
    transform: scale(1);
    &:hover {
      transform: scale(1.075);
    }
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

.button-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
  margin-top: 4rem;
  ::v-deep .button {
    transition: 200ms ease;
    &:hover {
      transform: scale(1.05);
    }
  }
}

::v-deep #blogposts-section {
  .card.type__E {
    width: unset;
    margin: unset !important;
    background-color: $white;
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
    }
    .title {
      @include fontWeight_Medium;
      font-size: toRem(19);
      line-height: leading(25, 19);
      letter-spacing: toRem(0.5);
      margin-bottom: 0.625rem;
      color: #0A07E2;
    }
    .description {
      font-size: toRem(15);
      line-height: leading(24, 15);
      letter-spacing: toRem(0.5);
    }
    .button {
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
      }
      .text {
        font-size: toRem(15);
        line-height: leading(23, 15);
        letter-spacing: toRem(0.42);
      }
    }
  }
}

::v-deep #recommended_posts {
  padding-bottom: 0rem;
}
</style>
