<template>

  <div
    v-if="link.hasOwnProperty('links')"
    ref="innerPane"
    class="nav-dropdown-inner">

    <div class="nav-dropdown-panel-left">

      <nuxt-link
        v-if="link.description"
        ref="description"
        :to="link.url"
        :tabindex="tabOrder"
        class="extras"
        v-html="link.description">
      </nuxt-link>

      <ul v-if="Array.isArray(link.links)">
        <li v-for="sublink in link.links" :key="`${link.text}-${sublink.text}`">
          <div class="first-level-wrapper" @click="sublinkClicked(sublink)">

            <Button
              :button="sublink"
              :tabindex="tabOrder"
              class="nav-link first-level"
              @keyup.native.enter="sublinkClicked(sublink)">
              {{ sublink.text }}
            </Button>

          </div>
        </li>
      </ul>

    </div>

    <div
      v-if="link.hasOwnProperty('sidebar') && link.sidebar"
      class="nav-dropdown-panel-right">
      <div class="nav-dropdown-panel-right-wrapper">
        <div class="panel-right-title">
          Community Links
        </div>
        <SocialIcons :tabindex="tabOrder" />
      </div>
    </div>

  </div>

</template>

<script>
// ===================================================================== Imports
import SocialIcons from '@/components/SocialIcons'
import Button from '@/components/Button'

// ===================================================================== Exports
export default {
  name: 'NavDropdown',

  components: {
    SocialIcons,
    Button
  },

  props: {
    link: {
      type: Object,
      required: false,
      default: () => {}
    },
    tabOrder: {
      type: Number,
      required: false,
      default: 0
    }
  },

  methods: {
    sublinkClicked (sublink) {
      const currentRoute = this.$route.fullPath
      const hash = this.$route.hash.replace('#', '')
      if (!sublink.hasOwnProperty('links') && sublink.url === currentRoute) {
        this.$nextTick(() => {
          const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
          if (element) {
            this.$scrollToElement(element, 0, -50)
          }
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
// //////////////////////////////////////////////////////////// Dropdown Content
.nav-dropdown-inner {
  position: absolute;
  display: flex;
  flex-direction: row;
  border-radius: 0.875rem 0.875rem 5.25rem 5.25rem;
  color: $white;

  &:not(.center) {
    transform: translateX(2000px);
  }

  &.active {
    &.left {
      animation: 250ms ease-out 0s 1 normal forwards running rightin,
        250ms cubic-bezier(.33,0,.66,.33) 0s 1 normal forwards running fadein;
    }
    &.right {
      animation: 250ms ease-out 0s 1 normal forwards running leftin,
        250ms cubic-bezier(.33,0,.66,.33) 0s 1 normal forwards running fadein;
    }
  }

  &.last {
    &.left {
      animation: 250ms ease-in 0s 1 normal forwards running rightout,
        250ms cubic-bezier(.33,.66,.66,1) 0s 1 normal forwards running fadeout;
    }
    &.right {
      animation: 250ms ease-in 0s 1 normal forwards running leftout,
        250ms cubic-bezier(.33,.66,.66,1) 0s 1 normal forwards running fadeout;
    }
  }

  ul {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
    margin-top: 1rem;
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
  .ul-second {
    padding: 0 1rem;
  }
  li {
    list-style-type: none;
    &:last-child {
      padding-bottom: 0.5rem;
    }
  }
}

::v-deep .extras {
  min-width: 15rem;
  display: block;
  position: relative;
  z-index: 10;
  img {
    position: absolute;
    left: -3rem;
    top: 0;
    width: 2rem;
  }
  .title,
  .text {
    transition: 250ms ease-in-out;
  }
  .title {
    @include fontWeight_Medium;
    display: inline-block;
    margin-bottom: 1rem;
    &:hover {
      transform: scale(1.1);
    }
  }
  .text {
    &:hover {
      transform: scale(1.025);
    }
  }
  .text {
    @include fontSize_Small;
  }
}

.nav-dropdown-panel-left {
  padding: 2rem 3rem 2rem 5rem;
  + .nav-dropdown-panel-right {
    margin-left: -2rem;
  }
}

::v-deep .nav-dropdown-panel-right {
  position: relative;
  padding: 2rem 3rem 2rem 2rem;
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background: $deepCove;
    border-radius: 0 5px 71px 0 !important;
    z-index: 1;
  }
  .nav-dropdown-panel-right-wrapper {
    position: relative;
    z-index: 2;
    .panel-right-title {
      @include fontWeight_Medium;
      margin-bottom: 1rem;
      white-space: nowrap;
    }
    .social-icons {
      flex-direction: column;
      align-items: flex-start;
      .social-icon {
        align-items: center;
        width: auto;
        &:hover {
          transform: scale(1.1);
        }
        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: 1rem;
        }
        svg {
          width: 1.5rem;
          margin-right: 1rem;
        }
      }
      .label {
        @include fontSize_Small;
        @include fontWeight_SemiBold;
        display: block;
      }
    }
  }
}

.first-level-wrapper {
  position: relative;
  padding: 0.5rem 0;
  @include small {
    padding: 0.375rem 0;
  }
}

.nav-link {
  white-space: nowrap;
  cursor: pointer;
}

// ////////////////////////////////////////////////////////////////// Animations
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes leftin {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes rightin {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes leftout {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes rightout {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

</style>
