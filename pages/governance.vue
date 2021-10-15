<template>
  <div class="page page-governance">

    <div class="main-content">

      <PageSection
        v-for="(section, index) in sections"
        :id="`section-${index + 1}`"
        :key="index"
        :section="section" />

      <BackgroundLayers
        id="page-governance-body-layer"
        :layers-array="[2]" />

      <BackgroundLayers
        id="page-governance-background-layers"
        :layers-array="[6, 5, 4, 3]"
        :reverse="true" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import GovernancePageData from '@/content/pages/governance.json'

import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// =================================================================== Functions
const stickyElementInViewport = () => {
  const element = document.getElementById('sticky-info')
  const coords = getElementDocumentCoords(element)
  const elementTop = coords.top
  const elementLeft = coords.left
  const sticky = element.firstChild
  const threshold = window.pageYOffset + 120

  const section = document.getElementById('section-6')
  const sectionTop = getElementDocumentCoords(section).top

  if (elementTop < threshold && sectionTop > threshold) {
    if (!sticky.classList.contains('info-fixed')) {
      sticky.classList.add('info-fixed')
    }
    sticky.style.transform = `translate(${elementLeft}px, 0px)` // outside of if statement for resize
  } else if (sectionTop < threshold) {
    if (sticky.classList.contains('info-fixed')) {
      sticky.classList.remove('info-fixed')
      sticky.style.transform = `translate(0px, ${sectionTop - elementTop}px)`
    }
  } else {
    if (sticky.classList.contains('info-fixed')) {
      sticky.classList.remove('info-fixed')
      sticky.style.transform = 'translate(0px, 0px)'
    }
  }
}

const getElementDocumentCoords = (elem) => {
  const box = elem.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left) }
}

// ====================================================================== Export
export default {
  name: 'PageGovernance',

  components: {
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      scroll: false,
      resize: false
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'governance', data: GovernancePageData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    sections () {
      const content = CloneDeep(this.siteContent.governance.page_content)
      return content
    }
  },

  mounted () {
    this.scroll = () => { stickyElementInViewport() }
    window.addEventListener('scroll', this.scroll)
    this.resize = () => { stickyElementInViewport() }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.scroll) { window.removeEventListener('scroll', this.scroll) }
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset: 1.75rem * 5;
$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset});
$backgroundLayers__Left: calc(50% - (#{$containerWidth} / 2) + 1.75rem);
$backgroundFill__Left: calc(50% - (#{$containerWidth} / 2) + (4 * 1.75rem));
$indentedFill__Left: calc(50% - (#{$containerWidth} / 2) + (14 * 1.75rem));

// ///////////////////////////////////////////////////////////////////// General

.page-governance {
  // padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  color: $white;
}

.main-content {
  position: relative;
  top: -2.5 * $backgroundLayers__Offset;
}

#section-1 {
  margin-bottom: $backgroundLayers__Offset - $navigationHeight;
}

#section-2 {
  padding-top: 7rem; // 1.75rem * 4
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 4.5rem);
    background-color: $blackPearl;
    border-radius: 0 0 0 8.5rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
  }
}

#section-3 {
  padding-top: 4.125rem;
}

#section-3,
#section-4,
#section-5,
#section-6,
#section-7 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $indentedFill__Left;
    width: calc(100% + 3.5rem);
    height: calc(100% + 3.5rem);
    background-color: $blackPearl;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -10;
  }
}

#section-7 {
  &:before {
    border-radius: 0 0 0 8.5rem;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
#page-governance-body-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 16rem);
  height: calc(100% + #{$backgroundLayers__Top / 2} + 1.75rem * 2);
  z-index: -11;
}

#page-governance-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
}

// ////////////////////////////////////////////////////// Section Customizations
// ----------------------------------------------------------------- [Section] 2
::v-deep #hero {
  padding: 0;
  margin-bottom: 2.4375rem;
  .column-content {
    &.left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .image {
    width: 40vw;
    border-radius: 20vw 0 0 20vw;
  }
}

::v-deep #hero_text {
  padding: 0;
  margin-bottom: 4.25rem;
  text-align: right;
}
// ----------------------------------------------------------------- [Section] 3

::v-deep #sticky-info {
  position: relative;
  .sticky-content {
    position: absolute;
    top: 0;
    left: -4rem;
    &.info-fixed {
      position: fixed;
      top: 120px;
    }
  }
}

::v-deep #panel-1-title {
  padding: 0;
  margin-bottom: 1.5rem;
  .column-content {
    &.left {
      .description {
        position: sticky;
        top: 10px;
        p {
          margin: 0.625rem 0;
          @include fontSize_ExtraLarge;
          @include fontWeight_Medium;
          letter-spacing: $letterSpacing_Regular;
          line-height: $leading_Regular;
        }
        ul {
          padding-left: 0.75rem;
          margin: 0;
        }
        li {
          margin: 0.625rem 0;
          @include fontSize_Regular;
          @include fontWeight_Medium;
          letter-spacing: $letterSpacing_Large;
          line-height: $leading_MediumLarge;
          list-style: none;
        }
      }
    }
  }
}

::v-deep #panel-1-info-top {
  padding: 0;
  margin-bottom: 3.25rem;
  .image {
    transform: rotateZ(6deg) translate(2rem, 4.375rem) scale(1.2);
  }
}

::v-deep #panel-1-info-middle {
  padding: 0;
  margin-bottom: 3.25rem;
}

::v-deep #panel-1-info-bottom {
  padding: 0;
  margin-bottom: 3.25rem;
}

::v-deep #panel-1-banner-image {
  padding: 0;
  .image {
    width: 62vw;
    border-radius: 20vw 0 0 20vw;
  }
}

// ----------------------------------------------------------------- [Section] 4
::v-deep #panel-2-title {
  padding: 5.5rem 0 0 0;
  margin-bottom: 1rem;
}

::v-deep #panel-2-info-top {
  padding: 0;
  .image {
    transform: scale(0.85) translateX(2rem);
  }
}

::v-deep #panel-2-main {
  .column-content {
    padding: 5.75rem 0;
    &.left {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -9rem;
        width: 100vw;
        height: 100%;
        background-color: $blackPearl;
        border-radius: 9rem 0 0 9rem;
        filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
        z-index: 10;
      }
    }
    .image-wrapper {
      display: flex;
      flex-direction: row;
      margin: 4.5rem 0 2rem 0;
      .image {
        padding-right: 2rem;
        width: 50%;
      }
      .label {
        padding-right: 1rem;
        width: 50%;
        @include fontSize_ExtraLarge;
        @include fontWeight_Medium;
        letter-spacing: $letterSpacing_Regular;
        @include leading_Regular;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -9rem;
    width: 100vw;
    height: 100%;
    z-index: 5;
    .shadow__6 {
      filter: unset;
    }
  }
}

// ----------------------------------------------------------------- [Section] 5
::v-deep #panel-3-title {
  padding: 3.75rem 0 0 0;
}

::v-deep #panel-3-info-top {
  padding: 3.75rem 0 0 0;
  .column-content {
    &.left {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .image {
    transform: scale(1.3);
  }
}

::v-deep #panel-3-info-middle {
  padding: 3.75rem 0 0 0;
  .subheading {
    @include fontSize_ExtraLarge;
    letter-spacing: $letterSpacing_Large;
  }
}

::v-deep #panel-3-info-bottom {
  padding: 3.75rem 0 0 0;
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

// ----------------------------------------------------------------- [Section] 6
::v-deep #panel-4-title {
  padding: 0;
  .social-icons {
    width: 75%;
  }
}

::v-deep #panel-4-info {
  padding: 1rem 0 0 0;
  margin-bottom: 4rem;
  .image {
    transform: scale(1.2) translate(0.75rem, 1.25rem);
  }
  .subheading {
    @include fontSize_ExtraLarge;
    line-height: $leading_Small;
  }
  .description {
    @include fontSize_Large;
    line-height: $leading_Regular;
    letter-spacing: $letterSpacing_Large;
  }
  a {
    color: $denim;
  }
}

::v-deep #panel-4-banner-image {
  .image {
    width: 62vw;
    border-radius: 20vw 0 0 20vw;
  }
}

// ----------------------------------------------------------------- [Section] 7
::v-deep #events-hackathons {
  .events {
    margin-top: 11rem;
  }
}

</style>
