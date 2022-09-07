<template>
  <nav :class="['site-nav', { pdcPage }]" role="navigation">

    <div :class="['top-panel', { 'top-open': mobilePanelOpen }]">
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

    <div :class="[ 'mega-menu', { 'nav-panel-open': mobilePanelOpen } ]">
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
                      class="nav-link first-level">
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

  data () {
    return {
      mobilePanelOpen: false,
      pdcPage: false
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
      this.checkForPdcPage()
    },
    mobilePanelOpen (val) {
      this.$emit('panel-open', val)
    }
  },

  mounted () {
    this.checkForPdcPage()
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
    },
    checkForPdcPage () {
      const path = this.$route.path
      if (path.includes('public-data')) {
        this.pdcPage = true
      } else if (this.pdcPage) {
        this.pdcPage = false
      }
    }
  }
}

</script>

<style lang="scss" scoped>
// ////////////////////////////////////////////////////////////////// Containers
.site-nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  @include small {
    background-color: $blackPearl;
  }
  @include mini {
    flex-direction: column;
  }
  &.pdcPage {
    background-color: transparent;
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
  transition: 200ms ease;
  transition-delay: 200ms;
  background-color: transparent;
  &.top-open {
    @include small {
      background-color: $blackPearl;
    }
  }
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
  top: -1rem;
  left: 0;
  transform: translateY(-100%);
  overflow-y: scroll;
  transition: 250ms ease-in;
  z-index: 100;

  // --------
  // padding: $navigationHeight 3rem 3rem 3rem;
  // padding-top: $navigationHeight !important;
  // height: calc(100% + 1rem);
  // --------

  background-color: $denim;
  border: 5px solid $azureRadiance;
  border-radius: 0.875rem 0.875rem 5.25rem 5.25rem;
  color: $white;

  &.nav-panel-open {
    // left: calc(-0.041665 * 100vw - 2rem);
    transform: translateY(0);
  }
}

// //////////////////////////////////////////////////////////////////////// Logo
#logo-horizontal {
  height: 2.5rem;
  margin-right: 4rem;
}

// ////////////////////////////////////////////////////////////////// Navigation
.mobile-panel-wrapper {
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

.nav-link {
  color: $white;
  text-align: center;

  &.first-level {
    @include fontWeight_Medium;
    transition: 250ms ease-in-out;
  }
}

// /////////////////////////////////////////////////////////////////// Accordion
::v-deep .accordion {
  position: relative;
  z-index: 100;
  .accordion-section,
  .accordion-header {
    position: relative;
    z-index: 100;
  }
}

::v-deep .accordion-section {
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
::v-deep .accordion-header {
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
  .extras {
    min-width: 15rem;
  }
  .title{
    transition: 250ms ease-in-out;
    @include fontWeight_Medium;
    padding-left: 3.25rem;
  }
  .text {
    display: none;
  }
}

::v-deep .accordion-content {
  .image {
    display: none;
  }
  .title {
    display: none;
  }
  .text {
    @include leading_Large;
    @include fontSize_Small;
    padding-left: 4.5rem;
    padding-right: 1rem;
    margin-bottom: 1rem;
    letter-spacing: $letterSpacing_Large;
    transition: 250ms ease-in-out;
    transform: scale(1);
    &:hover {
      transform: scale(1.025);
    }
  }
  ul {
    list-style: none;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 4.5rem;
    &:hover {
      .nav-link.first-level {
        opacity: 0.5;
        transform: scale(1);
        transition: 250ms ease-in-out;
        &:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      }
    }
  }
  li {
    @include fontWeight_Medium;
    font-size: 0.875rem;
    list-style-type: none;
    letter-spacing: $letterSpacing_Large;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
}

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
    background-image: url("data:image/svg+xml,<svg class='middle' xmlns='http://www.w3.org/2000/svg' width='20' height='4' viewBox='0 0 20 4'><line x2='16' transform='translate(2 2)' fill='none' stroke='%23F0F7FD' stroke-linecap='round' stroke-width='3'/></svg>");
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

</style>
