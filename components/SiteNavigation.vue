<template>
  <div id="site-navigation">
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
              <nav :class="navItemsClasses">
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
      scroll: false,
      translateY: '0px',
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
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
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
  padding: 1rem 0;
}

::v-deep .nav-link {
  color: $white;
}

::v-deep {
  .nav-dropdown {
    padding: 2rem 3.375rem 2rem 5.375rem;
    background-color: $denim;
    border: 5px solid $azureRadiance;
    border-top: none;
    border-radius: 0 0 5.25rem 5.25rem;
    color: $white;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 5px;
      width: calc(100% - 20px);
      height: calc(100% - 10px);
      background-color: $blackPearl;
      border: 5px solid $kleinBlue;
      border-top: none;
      border-radius: 0 0 4.75rem 4.75rem;
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
      padding: 0;
    }
    .first-level-wrapper {
      padding: 0.25rem 0;
    }
  }
}
</style>
