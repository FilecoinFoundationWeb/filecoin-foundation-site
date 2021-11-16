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

            <div class="col-10_ti-11" data-push-left="off-1_md-2_ti-1">
              <nuxt-content :document="postBody" class="basic-template-block-format" />
            </div>

            <div class="col-10_ti-11" data-push-left="off-1_md-2_ti-1">
              <div id="bottom-controls">
                <div class="share-socials">
                  <div class="share-to">
                    Share to:
                  </div>
                  <SocialIcons />
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
        :section="recommendations">
      </PageSection>

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
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
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
    allPosts () {
      return this.markdown.allPosts
    },
    postHeading () {
      const section = {
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
          description: this.markdown.author
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
      return [section]
    },
    postBody () {
      return this.markdown
    },
    previousPost () {
      for (let i = 1; i < this.allPosts.length; i++) {
        if (this.allPosts[i].updatedAt === this.markdown.updatedAt) {
          return `/${this.allPosts[i - 1].slug}`
        }
      }
      return false
    },
    nextPost () {
      for (let i = 0; i < (this.allPosts.length - 1); i++) {
        if (this.allPosts[i].updatedAt === this.markdown.updatedAt) {
          return `/${this.allPosts[i + 1].slug}`
        }
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
            })
          }
        })
      }

      const section = {
        id: 'blogposts-list',
        left: {
          type: 'paginated_cards',
          cols: {
            num: 'col-12_md-11_sm-10_mi-9_ti-10',
            push_left: 'off-0_md-1_sm-2_ti-1'
          },
          cards: recommendedPosts,
          displayControls: false
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
    border-radius: 14rem 0 0 14rem;
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
  z-index: -10;
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
  }
}

::v-deep .social-icons {
  path,
  ellipse {
    fill: $kleinBlue;
  }
}

#bottom-controls {
  .share-socials {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2.625rem;
    color: $kleinBlue;
    .share-to {
      font-size: 14px;
      @include fontWeight_SemiBold;
      @include leading_ExtraExtraLarge;
      margin-right: 1rem;
    }
  }
  .controls-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .button {
    font-size: 14px;
    text-align: center;
    color: $kleinBlue;
  }
}

::v-deep #blogposts-list {
  padding-bottom: 3rem;
}

</style>
