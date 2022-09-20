<template>
  <div class="site-nav">

    <nuxt-link to="/" class="site-logo">
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
          <nuxt-link
            :to="link.url"
            class="text"
            :tabindex="(index + 1)"
            @focus.native="setActiveItem(index)">
            {{ link.text }}
          </nuxt-link>
        </div>
      </div>

      <NavMegaMenu
        :panel="true"
        :active="activeItem >= 0"
        :active-index="activeItem"
        :nested-display="true">
        <NavDropdown
          v-for="(link, index) in links"
          :key="`$dropdown-${index}-${componentKey}`"
          ref="dropdowns"
          :link="link"
          :tab-order="index === activeItem ? (index + 1) : -1"
          :class="[{ active: index === activeItem }, { last: index === lastItem && activeItem >= 0 }, index === lastItem || index === activeItem ? direction : '']">
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
.site-logo {
  transform: scale(1);
  transition: 250ms ease;
  &:hover {
    transform: scale(1.05);
  }
}

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

.nav-item-wrapper {
  position: relative;
  padding: 0.5rem 0;
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
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='84' height='10' viewBox='0 0 84 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.92564e-06 4L84 4V6L1.92564e-06 6V4Z' fill='%231890FD'/%3e%3cpath d='M1.92564e-06 2L84 2V4L1.92564e-06 4V2Z' fill='%23154ED9'/%3e%3cpath d='M1.92564e-06 5.87242e-08L84 5.87243e-08V2L1.92564e-06 2V5.87242e-08Z' fill='%230520A2'/%3e%3cpath d='M1.92564e-06 6L84 6V8L1.92564e-06 8V6Z' fill='%2373B4ED'/%3e%3cpath d='M1.92564e-06 8L84 8V10L1.92564e-06 10V8Z' fill='%23EFF6FC'/%3e%3c/svg%3e ");
      background-size: cover;
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
    .text {
      display: block;
      padding: 0.5rem 0.75rem;
    }
  }
}

</style>
