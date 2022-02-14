<template>
  <div class="site-nav">

    <nuxt-link to="/">
      <LogoHorizontal id="logo-horizontal" />
    </nuxt-link>

    <nav
      ref="navigation"
      class="navigation"
      @mouseleave="setActiveItem(-1)">

      <div
        v-for="(link, index) in links"
        :key="index"
        ref="navItems"
        class="nav-item-wrapper"
        @mouseover="setActiveItem(index)">
        <div
          class="nav-link top-level">
          <div class="text">
            {{ link.text }}
          </div>
        </div>
      </div>

      <NavMegaMenu
        :panel="true"
        :active-index="activeItem"
        :nested-display="true">
        <NavDropdown
          v-for="(link, index) in links"
          :key="`$dropdown-${index}-${componentKey}`"
          :link="link"
          :scroll="false"
          :nested-display="true"
          :class="[{ active: index === activeItem }, { last: index === lastItem && activeItem >= 0 }, index === lastItem || index === activeItem ? direction : '']"
          behavior="hover">
        </NavDropdown>
      </NavMegaMenu>

    </nav>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import NavDropdown from '@/components/Navigation/NavDropdown'
import NavMegaMenu from '@/components/Navigation/NavMegaMenu'
import LogoHorizontal from '@/components/LogoHorizontal'

// ===================================================================== Exports
export default {
  name: 'NavDesktop',

  components: {
    LogoHorizontal,
    NavDropdown,
    NavMegaMenu
  },

  data () {
    return {
      activeItem: -1,
      lastItem: -1,
      componentKey: 0,
      entryAnimation: true
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation
    },
    direction () {
      if (this.activeItem === this.lastItem || this.entryAnimation) {
        return 'center'
      }
      return this.activeItem < this.lastItem ? 'left' : 'right'
    }
  },

  methods: {
    setActiveItem (newIndex) {
      if (newIndex >= 0) {
        if (this.activeItem !== newIndex) {
          this.entryAnimation = this.activeItem < 0
          this.lastItem = this.activeItem
          this.activeItem = newIndex
          this.componentKey++
        }
      } else {
        this.activeItem = -1
      }
    }
  }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
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

.nav-item-wrapper {
  position: relative;
  padding: 1rem 0;
  flex-grow: 1;
  // height: calc(100% + 2rem);
  @include small {
    padding: 0.375rem 0;
  }

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
    &:after {
      content: '';
      position: absolute;
      top: calc(-14px - 1.375rem);
      left: 0;
      width: 100%;
      height: 38px;
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

.nav-link {
  color: $white;
  text-align: center;

  &.top-level {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
}

</style>
