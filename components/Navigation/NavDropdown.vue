<template>

  <div
    v-if="link.hasOwnProperty('links')"
    ref="innerPane"
    class="nav-dropdown-inner">

    <div class="nav-dropdown-panel-left">

      <nuxt-link
        v-if="link.description"
        :to="link.url"
        class="extras"
        v-html="link.description">
      </nuxt-link>

      <ul v-if="Array.isArray(link.links)">
        <li v-for="sublink in link.links" :key="`${link.text}-${sublink.text}`">
          <div class="first-level-wrapper">

            <Button
              :button="sublink"
              class="nav-link first-level">
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
        <SocialIcons />
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
    animation-duration: 250ms;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    &.left {
      animation-name: rightin;
    }
    &.right {
      animation-name: leftin;
    }
  }

  &.last {
    animation-duration: 250ms;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    &.left {
      animation-name: rightout;
    }
    &.right {
      animation-name: leftout;
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
@keyframes leftin {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes rightin {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes leftout {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes rightout {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

</style>
