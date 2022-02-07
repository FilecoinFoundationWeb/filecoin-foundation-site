<template>
  <nav class="site-nav" role="navigation">

    <div :class="['top-panel', { 'top-open': mobilePanelOpened }]">
      <nuxt-link to="/">
        <LogoHorizontal id="logo-horizontal" />
      </nuxt-link>

      <div
        :class="['hamburger-icon', {'close-icon' : mobilePanelOpen}]"
        tabindex="0"
        @click="toggleMobileNav"
        @keyup.enter="toggleMobileNav">
        <div class="top"></div>
        <div class="middle"></div>
      </div>
    </div>

    <div :class="[ 'mega-menu', { 'nav-panel-open': mobilePanelOpened } ]">
      <div class="mobile-panel-wrapper">
        <Zero_Core__Accordion
          v-slot="{ active }">
          <Zero_Core__Accordion_Section
            v-for="(link, index) in links"
            :key="index"
            :active="active"
            :selected="true"
            class="nav-accordion-item">
            <Zero_Core__Accordion_Header>
              <div
                class="mobile-nav-heading"
                v-html="link.description">
              </div>
            </Zero_Core__Accordion_Header>
            <Zero_Core__Accordion_Content>
              <div class="accordion-content-wrapper">
                <div v-html="link.description"></div>
                <ul v-if="Array.isArray(link.links)">
                  <li @click="toggleMobileNav">
                    <Button
                      :button="convertMainLinkToSublink(link)"
                      class="nav-link first-level">
                      {{ link.text }}
                    </Button>
                  </li>
                  <li
                    v-for="sublink in link.links"
                    :key="`${link.text}-${sublink.text}`">

                    <Button
                      :button="sublink"
                      :class="['nav-link', 'first-level', { 'has-second-level': sublink.hasOwnProperty('links') }]">
                      {{ sublink.text }}
                    </Button>

                  </li>
                </ul>
              </div>
            </Zero_Core__Accordion_Content>
          </Zero_Core__Accordion_Section>
        </Zero_Core__Accordion>
      </div>
    </div>

  </nav>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import Button from '@/components/Button'
import LogoHorizontal from '@/components/LogoHorizontal'

// ===================================================================== Exports
export default {
  name: 'NavMobile',

  components: {
    LogoHorizontal,
    Button
  },

  props: {
    mobilePanelOpened: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      mobilePanelOpen: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation
    }
  },

  watch: {
    '$route' (newRoute, oldRoute) {
      const newHash = newRoute.hash
      const oldHash = oldRoute.hash
      if (newHash !== oldHash) {
        this.toggleMobileNav()
      }
    }
  },

  methods: {
    toggleMobileNav () {
      this.mobilePanelOpen = !this.mobilePanelOpen
    },
    convertMainLinkToSublink (link) {
      return {
        type: 'X',
        action: 'nuxt-link',
        url: link.url,
        text: link.text
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.site-nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  @include mini {
    flex-direction: column;
  }
}

.top-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  height: 100%;
  min-width: 85%;
  z-index: 1000;
  @include small {
    padding: 0 1rem;
    margin-bottom: 0;
  }
  @include tiny {
    width: 100%;
  }
}

.mega-menu {
  display: block;
  position: fixed;
  // padding: 3rem 5rem 3rem 5rem;
  width: 100vw;
  // height: 100vh;
  max-height: calc(100vh + 1rem);
  top: 0;
  left: 0;
  // left: 100vw;
  transform: translateY(-100%);
  // background-color: rgba(0, 0, 0, 0.9);
  overflow-y: scroll;
  transition: 250ms ease-in;
  z-index: 100;

  // --------
  // padding: $navigationHeight 3rem 3rem 3rem;
  // padding-top: $navigationHeight !important;
  top: -1rem;
  // height: calc(100% + 1rem);
  // --------

  &.nav-panel-open {
    // left: calc(-0.041665 * 100vw - 2rem);
    transform: translateY(0);
  }

  .accordion-section {
    &.open {
      margin-bottom: 1rem;
      .accordion-header {
        &:after {
          transition: 250ms ease-in;
          transform: rotate(0deg);
        }
      }
    }
  }
  .accordion-header {
    padding: 1rem 0;
    position: relative;
    cursor: pointer;
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0.3125rem;
      width: 1.125rem;
      height: 100%;
      background: url('~assets/svgs/chevrondown.svg') no-repeat right center;
      transform: rotate(-180deg);
      transition: 250ms ease-out;
    }
    .image {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2rem;
    }
    .title {
      @include fontWeight_Medium;
      padding-left: 3.25rem;
    }
    .text {
      display: none;
    }
  }
  .accordion-content {
    .image {
      display: none;
    }
    .title {
      display: none;
    }
    .text {
      @include leading_Large;
      padding-left: 4.5rem;
      padding-right: 1rem;
      margin-bottom: 1rem;
      letter-spacing: $letterSpacing_Large;
    }
    ul {
      padding-left: 4.5rem;
      list-style: none;
    }
    li {
      @include fontWeight_Medium;
      font-size: 0.875rem;
      letter-spacing: $letterSpacing_Large;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  }
}

// .mobile-panel {
//   display: none;
//   &.open {
//     display: block;
//   }
// }

// /////////////////////////////////////////////////////////// mobile nav toggle
.hamburger-icon {
  position: relative;
  z-index: 1000;
  height: 14px;
  width: 2rem;
  @include small {
    display: inline;
  }
  .top,
  .middle,
  &:after {
    position: absolute;
    width: 20px;
    height: 4px;
    background-image: url("data:image/svg+xml,<svg class='middle' xmlns='http://www.w3.org/2000/svg' width='20' height='4' viewBox='0 0 20 4'><line x2='16' transform='translate(2 2)' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-width='3'/></svg>");
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1.0);
  }
  .middle {
    top: 9px;
  }
  &.close-icon {
    .top {
      transform: rotate(45deg) translate(3px, 3px);
    }
    .middle {
      transform: rotate(-45deg) translate(3px, -3px);
    }
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }
  &:hover {
    cursor: pointer;
  }
}

::v-deep .accordion {
  position: relative;
  z-index: 100;
  .accordion-section,
  .accordion-header {
    position: relative;
    z-index: 100;
  }
}

// ///////////////////////////////////////////////////////////////////// General
#site-navigation {
  position: relative;
  z-index: 1000;
  @include small {
  }
  &.noscroll {
    @include small {
      position: fixed;
      z-index: 10000;
      top: 0;
      width: 100%;
    }
  }
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: $navigationHeight;
  .nuxt-link-active {
    z-index: 10;
  }
}

.site-nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  @include medium {
    justify-content: space-between;
  }
}

// //////////////////////////////////////////////////////////////////////// Logo
#logo-horizontal {
  height: 2.5rem;
  margin-right: 4rem;
}

// ////////////////////////////////////////////////////////////////// Navigation

.navigation {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
}

::v-deep .navigation {
  &:hover {
    .nav-dropdown-container {
      opacity: 1;
      transition: 250ms ease;
      visibility: visible;
      z-index: 5;
    }
  }
}


.nav-hover-wrapper {
  position: relative;
  padding: 1rem 0;
  flex-grow: 1;
  // height: calc(100% + 2rem);
  @include small {
    padding: 0.375rem 0;
  }
}

::v-deep .nav-item-wrapper {
  .top-level {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      opacity: 0;
      top: calc(-14px - 0.375rem);
      left: 0;
      width: 100%;
      height: 14px;
      transition: 200ms ease;
      border-radius: 3px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='47.5' height='15' viewBox='0 0 47.5 15'%3e%3cline id='Line_81' data-name='Line 81' x2='47.5' transform='translate(47.5 7.5) rotate(180)' fill='none' stroke='%231890fd' stroke-width='3'/%3e%3cline id='Line_84' data-name='Line 84' x2='47.5' transform='translate(47.5 4.5) rotate(180)' fill='none' stroke='%23154ed9' stroke-width='3'/%3e%3cline id='Line_85' data-name='Line 85' x2='47.5' transform='translate(47.5 1.5) rotate(180)' fill='none' stroke='%230520a2' stroke-width='3'/%3e%3cline id='Line_82' data-name='Line 82' x2='47.5' transform='translate(47.5 10.5) rotate(180)' fill='none' stroke='%2373b4ed' stroke-width='3'/%3e%3cline id='Line_83' data-name='Line 83' x2='47.5' transform='translate(47.5 13.5) rotate(180)' fill='none' stroke='%23eff6fc' stroke-width='3'/%3e%3c/svg%3e ");
      transform: translateY(-1rem);
    }
  }
  &:hover {
    .top-level {
      &:before {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}

::v-deep .nav-link {
  color: $white;
  text-align: center;

  &.top-level {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  &.first-level {
    @include fontWeight_Medium;
    transition: 250ms ease-in-out;
  }
}


// ////////////////////////////////////////////////////// mobile navigation menu
::v-deep .site-nav {
  @include small {
    background-color: $blackPearl;
  }
}

::v-deep .top-panel {
  transition: 200ms ease;
  transition-delay: 200ms;
  background-color: transparent;
  &.top-open {
    @include small {
      background-color: $blackPearl;
    }
  }
}

.mega-menu {
  left: 0;
  background-color: $denim;
  border: 5px solid $azureRadiance;
  border-radius: 0.875rem 0.875rem 5.25rem 5.25rem;
  color: $white;
}

::v-deep .mobile-panel-wrapper {
  display: block;
  overflow: auto;
  position: relative;
  width: calc(100% - 10px);
  min-height: calc(100% + 5px);
  left: 5px;
  top: -5px;
  padding: $navigationHeight 2.5rem 2.5rem 2.5rem;
  background-color: $blackPearl;
  border: 5px solid $kleinBlue;
  border-radius: 0.625rem 0.625rem 4.75rem 4.75rem;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background-color: $blackPearl;
    z-index: 100;
  }
}

::v-deep .mobile-panel {
  display: block;
  overflow-y: scroll;
  height: 100vh;
  padding: 3rem 2rem 2rem 3rem;
  padding-top: calc(6.25rem + 15px);
}
</style>
