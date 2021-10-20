<template>
  <div id="site-navigation" :class="{ 'noscroll': mobilePanelOpen }">
    <div class="grid-noGutter">
      <div class="col">
        <div class="content">
          <component
            :is="navigationComponentType"
            :mobile-panel-opened="mobilePanelOpen">

            <template #sitelogo>
              <nuxt-link to="/">
                <LogoHorizontal id="logo-horizontal" />
              </nuxt-link>
            </template>

            <template #navitems>
              <nav
                v-if="!mobile"
                :class="navItemsClasses">
                <NavDropdown
                  v-for="(link, index) in links"
                  :key="index"
                  :link="link"
                  :panel="true"
                  :scroll="false"
                  :nested-display="!mobile"
                  behavior="hover"
                  class="nav-item-wrapper">
                </NavDropdown>
              </nav>

              <Zero_Core__Accordion
                v-if="mobile"
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
                        <li v-for="sublink in link.links" :key="`${link.text}-${sublink.text}`">
                          {{ sublink.text }}
                        </li>
                      </ul>
                    </div>
                  </Zero_Core__Accordion_Content>
                </Zero_Core__Accordion_Section>
              </Zero_Core__Accordion>
            </template>

            <template #action>
              <div
                v-if="mobile"
                :class="['hamburger-icon', {'close-icon' : mobilePanelOpen}]"
                tabindex="0"
                @click="toggleMobileNav"
                @keyup.enter="toggleMobileNav">
                <div class="top"></div>
                <div class="middle"></div>
              </div>
            </template>

          </component>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import NavMobile from '@/components/Navigation/NavMobile'
import NavDesktop from '@/components/Navigation/NavDesktop'
import NavDropdown from '@/components/Navigation/NavDropdown'

import Button from '@/components/Button'
import LogoHorizontal from '@/components/LogoHorizontal'

// =================================================================== Functions
const setNavigationType = (instance) => {
  if (window.matchMedia('(max-width: 53.125rem)').matches) {
    if (!instance.mobile) {
      instance.mobile = true
    }
  } else {
    if (instance.mobile) {
      instance.mobile = false
    }
  }
}

// ====================================================================== Export
export default {
  name: 'SiteNavigation',

  components: {
    LogoHorizontal,
    NavMobile,
    NavDesktop,
    NavDropdown,
    Button
  },

  data () {
    return {
      mini: false,
      mobile: false,
      mobilePanelOpen: false,
      resize: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation
    },
    navigationComponentType () {
      return this.mobile ? 'NavMobile' : 'NavDesktop'
    },
    navItemsClasses () {
      const classes = this.mobilePanelOpen ? 'mobile-panel open' : 'mobile-planel closed'
      return this.mobile ? classes : 'navigation'
    }
  },

  mounted () {
    setNavigationType(this)
    this.resize = () => { setNavigationType(this) }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    toggleMobileNav () {
      this.mobilePanelOpen = !this.mobilePanelOpen
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-navigation {
  &.noscroll {
    @include small {
      position: fixed;
      z-index: 10000;
      top: 0;
      overflow-y: scroll;
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

// //////////////////////////////////////////////////////////////////////// Logo
#logo-horizontal {
  height: 2.5rem;
  margin-right: 4rem;
}

// ////////////////////////////////////////////////////////////////// Navigation
.navigation {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
}

::v-deep .nav-item-wrapper {
  &:before {
    content: '';
    position: absolute;
    opacity: 0;
    top: -0.125rem;
    left: 0;
    width: 100%;
    height: 14px;
    transition: 200ms ease;
    border-radius: 3px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='47.5' height='15' viewBox='0 0 47.5 15'%3e%3cline id='Line_81' data-name='Line 81' x2='47.5' transform='translate(47.5 7.5) rotate(180)' fill='none' stroke='%231890fd' stroke-width='3'/%3e%3cline id='Line_84' data-name='Line 84' x2='47.5' transform='translate(47.5 4.5) rotate(180)' fill='none' stroke='%23154ed9' stroke-width='3'/%3e%3cline id='Line_85' data-name='Line 85' x2='47.5' transform='translate(47.5 1.5) rotate(180)' fill='none' stroke='%230520a2' stroke-width='3'/%3e%3cline id='Line_82' data-name='Line 82' x2='47.5' transform='translate(47.5 10.5) rotate(180)' fill='none' stroke='%2373b4ed' stroke-width='3'/%3e%3cline id='Line_83' data-name='Line 83' x2='47.5' transform='translate(47.5 13.5) rotate(180)' fill='none' stroke='%23eff6fc' stroke-width='3'/%3e%3c/svg%3e ");
    transform: translateY(-1rem);
  }
  &:hover {
    &:before {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

::v-deep .nav-link {
  color: $white;
  &.first-level {
    @include fontWeight_Medium;
    transition: 250ms ease-in-out;
  }
}

::v-deep {
  .nav-dropdown,
  .mega-menu {
    // padding: 2rem 3.375rem 2rem 5.375rem;
    background-color: $denim;
    border: 5px solid $azureRadiance;
    border-radius: 0.875rem 0.875rem 5.25rem 5.25rem;
    color: $white;
    &:before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      background-color: $blackPearl;
      border: 5px solid $kleinBlue;
      border-radius: 0.625rem 0.625rem 4.75rem 4.75rem;
    }
    .extras {
      min-width: 15rem;
    }
    .text {
      @include fontSize_Small;
    }
    .image {
      position: absolute;
      left: -3rem;
      top: 0;
      width: 2rem;
    }
    ul {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      &:hover {
        .nav-link.first-level {
          opacity: 0.75;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .first-level-wrapper {
      padding: 0.25rem 0;
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
    width: 34px;
    height: 4px;
    background-image: url("data:image/svg+xml,<svg class='middle' xmlns='http://www.w3.org/2000/svg' width='34' height='4' viewBox='0 0 34 4'><line x2='30' transform='translate(2 2)' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-width='2'/></svg>");
    transition: 300ms cubic-bezier(0.4, 0.0, 0.2, 1.0);
  }
  .middle {
    top: 9px;
  }
  &:after {
    content: '';
    top: 18px;
    opacity: 1;
    transform: scale(1);
    background-image: url("data:image/svg+xml,<svg class='middle' xmlns='http://www.w3.org/2000/svg' width='34' height='4' viewBox='0 0 34 4'><line x2='20' transform='translate(12 2)' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-width='2'/></svg>");
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

// ////////////////////////////////////////////////////// mobile navigation menu
// ::v-deep .mega-menu {
//
//
// }

</style>
