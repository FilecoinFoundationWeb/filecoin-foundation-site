<template>
  <div :class="rootLinkClassList">

    <component
      :is="toggleFirstOnHover ? 'nuxt-link' : 'div'"
      :to="link.disabled ? '' : link.url"
      :disabled="link.disabled"
      :class="['nav-link', (toggleFirstOnHover ? 'top-level' : 'click-toggle')]"
      @click="toggleDropDown(!toggleFirstOnHover)">
      <div class="arrow">
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
      </div>
      <span class="text">{{ link.text }}</span>
      <div
        v-if="!toggleFirstOnHover"
        :class="['chevron', dropdownOpen ? 'up' : 'down']"></div>
    </component>

    <div
      v-if="link.hasOwnProperty('links')"
      ref="firstPane"
      :class="firstLevelClassList"
      :style="`left: ${panelLeft};`">

      <div class="nav-dropdown-panel-left">

        <div
          v-if="link.description"
          class="extras"
          v-html="link.description">
        </div>

        <ul v-if="Array.isArray(link.links)">
          <li v-for="sublink in link.links" :key="`${link.text}-${sublink.text}`">
            <div class="first-level-wrapper">

              <Button
                :button="sublink"
                :class="['nav-link', 'first-level', { 'has-second-level': sublink.hasOwnProperty('links') }]">
                {{ sublink.text }}
              </Button>

              <div
                v-if="sublink.hasOwnProperty('links') && nestedDisplay"
                ref="secondPane"
                :class="[listDisplayType, { 'scroll': scroll }]"
                :style="`max-height: ${maxHeight}; left: ${popoutLeft};`">
                <ul v-if="Array.isArray(sublink.links)" :style="`min-width: ${minWidth};`">
                  <li v-for="poplink in sublink.links" :key="`${sublink.label}-${poplink.label}`" ref="popouts">

                    <component
                      :is="poplink.hasOwnProperty('url') ? 'nuxt-link' : 'div'"
                      :disabled="poplink.disabled"
                      class="nav-link second-level">
                      {{ poplink.label }}
                    </component>

                  </li>
                </ul>
              </div>

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

  </div>
</template>

<script>
// ===================================================================== Imports
import SocialIcons from '@/components/SocialIcons'
import Button from '@/components/Button'

// =================================================================== Functions
const detectPanelOutsideViewport = (instance) => {
  const rect = instance.$refs.firstPane.getBoundingClientRect()
  if (rect.left + rect.width > window.innerWidth) {
    instance.panelLeft = -1 * ((rect.left + rect.width) - window.innerWidth) + 'px'
  }
}

const detectPopoutOutsideViewport = (instance) => {
  if (instance.$refs.secondPane.length) {
    const rect = instance.$refs.secondPane[0].getBoundingClientRect()
    if (rect.left + rect.width > window.innerWidth) {
      const x = instance.scroll ? '-1rem' : '0rem' // this will account for the width of the scroll bar
      instance.popoutLeft = 'calc(' + x + ' - 100%)'
    } else if (instance.popoutLeft !== '100%') {
      instance.popoutLeft = '100%'
    }
  }
}

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
    scroll: {
      type: Boolean,
      required: false,
      default: true
    },
    panel: {
      type: Boolean,
      required: false,
      default: false
    },
    behavior: {
      type: String,
      required: false,
      default: 'hover'
    },
    nestedDisplay: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      maxHeight: 'unset',
      minWidth: 'unset',
      panelLeft: '50%',
      popoutLeft: '100%',
      dropdownOpen: false,
      resize: false
    }
  },

  computed: {
    listDisplayType () {
      return this.panel ? 'nav-panel' : 'nav-popout'
    },
    rootLinkClassList () {
      const mouseBehavior = this.toggleFirstOnHover ? 'hover' : 'active'
      const hasSubLinks = this.link.hasOwnProperty('links') ? 'has-nested-links' : ''
      const dropdownState = this.dropdownOpen ? 'open' : ''
      return `nav-${mouseBehavior}-wrapper dropdown-background ${hasSubLinks + ' ' + dropdownState}`
    },
    firstLevelClassList () {
      return this.nestedDisplay ? 'nav-dropdown dropdown-background' : 'nav-panel'
    },
    toggleFirstOnHover () {
      if (this.link.hasOwnProperty('links')) {
        return this.behavior !== 'active'
      }
      return true
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$refs.popouts) {
        if (this.panel) {
          const widths = []
          this.$refs.popouts.forEach((item) => {
            widths.push(item.firstChild.getBoundingClientRect().width)
          })
          this.minWidth = 3 * Math.max(...widths) + 'px'
        } else if (this.scroll) {
          this.maxHeight = 5.5 * this.$refs.popouts[0].clientHeight + 'px'
        }
      }
      if (this.panel) {
        if (this.$refs.firstPane) {
          detectPanelOutsideViewport(this)
          this.resize = () => { detectPanelOutsideViewport(this) }
          window.addEventListener('resize', this.resize)
        }
      } else {
        if (this.$refs.secondPane) {
          detectPopoutOutsideViewport(this)
          this.resize = () => { detectPopoutOutsideViewport(this) }
          window.addEventListener('resize', this.resize)
        }
      }
    })
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    toggleDropDown (val) {
      if (val) { this.dropdownOpen = !this.dropdownOpen }
    }
  }
}

</script>

<style lang="scss" scoped>
.nav-hover-wrapper,
.nav-active-wrapper {
  position: relative;
  padding: 1rem 0;
  @include small {
    padding: 0.375rem 0;
  }
}

.nav-hover-wrapper {
  &:hover {
    .nav-dropdown,
    .nav-link.top-level .arrow {
      visibility: visible;
      opacity: 1;
      transition: transform 250ms ease-in, opacity 250ms ease-out;
    }
    .nav-dropdown {
      transform: translate(-50%, 0rem);
      z-index: 5;
    }
    .nav-link.top-level .arrow {
      transform: translate(-50%, 0rem) rotate(45deg);
      z-index: 10;
    }
  }
}

.nav-active-wrapper {
  &.open .nav-dropdown {
    visibility: visible;
    opacity: 1;
    transform: translateY(0rem);
    z-index: 0;
    transition: transform 250ms ease-in, opacity 250ms ease-out;
  }
  .click-toggle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .chevron {
    margin-left: 0.75rem;
    border-color: white;
    opacity: 0.8;
  }
}

.first-level-wrapper {
  position: relative;
  padding: 0.5rem 0;
  @include small {
    padding: 0.375rem 0;
  }
  &:hover .nav-popout {
    visibility: visible;
    opacity: 1;
    transform: translateY(0rem);
    z-index: 0;
    transition: transform 350ms ease-in-out, opacity 250ms ease-out;
  }
}

ul {
  padding: 1rem;
  margin-top: 1rem;
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

.nav-dropdown,
.nav-popout {
  position: absolute;
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translate(-50%, 1rem);
  z-index: -1;
  transition: transform 250ms ease-out, opacity 250ms ease-out;
}

::v-deep .nav-dropdown {
  display: flex;
  flex-direction: row;
  top: 3.5rem;
  .extras {
    position: relative;
    z-index: 10;
  }
  .title {
    @include fontWeight_Medium;
    display: inline-block;
    margin-bottom: 1rem;
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

.nav-dropdown-panel-left {
  padding: 2rem 3rem 2rem 5rem;
  + .nav-dropdown-panel-right {
    margin-left: -2rem;
  }
}

.nav-dropdown-panel-right {
  position: relative;
  padding: 2rem 3rem 2rem 2rem;
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
    background: $deepCove;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 71px;
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
  }
}

.nav-popout {
  top: -1rem;
  & li {
    padding: 0.5rem 0;
    &:last-child {
      padding-bottom: 1rem;
    }
  }
  &.scroll {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .inner-wrap {
    margin: 1.0rem 1.0rem 1.0rem 0;
  }
}

.scroll {
  overflow-x: hidden;
  overflow-y: scroll;
}

.nav-item-wrapper {
  @include small {
    display: block;
    &.has-nested-links {
      display: flex;
      flex-direction: column;
      padding-top: 0.75rem;
      .top-level {
        width: fit-content;
      }
    }
  }
  .nav-link.top-level {
    position: relative;
    .arrow {
      position: absolute;
      top: 29px;
      left: 50%;
      visibility: hidden;
      pointer-events: none;
      opacity: 0;
      z-index: 2;
      transform: translate(-50%, 1rem) rotate(45deg);
      transition: 250ms ease-out;
      @include small {
        display: none;
      }
      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 21px;
        padding-bottom: 21px;
        overflow: hidden;
        transform-origin: 100% 0;
        border-top-left-radius: 1px;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 8px;
          width: 100%;
          height: 141%;
          transform-origin: inherit;
          transform: rotate(45deg);
        }
        &:first-child {
          transform: translate(-2px, -2px);
          z-index: 0;
          &:after {
            background-color: $azureRadiance;
          }
        }
        &:nth-child(2) {
          transform: translate(2px, 2px);
          z-index: 1;
          &:after {
            background-color: $denim;
          }
        }
        &:nth-child(3) {
          transform: translate(6px, 6px);
          z-index: 2;
          &:after {
            background-color: $kleinBlue;
          }
        }
        &:last-child {
          transform: translate(9px, 9px);
          z-index: 3;
          &:after {
            background-color: $blackPearl;
          }
        }
      }
    }
  }
  .nav-panel {
    display: inline-block;
    ul {
      display: flex;
      margin-top: 1.5rem;
      margin-left: 1rem;
      flex-direction: row;
      flex-wrap: wrap;
      @include mini {
        margin: 0;
      }
    }
    li {
      display: inline-block;
      margin: 0.25rem 0;
      width: 50%;
      @include small {
        margin: 0;
        width: 33%;
      }
      @include mini {
        margin: 0;
        width: 50%;
      }
    }
  }
}

.nav-link {
  white-space: nowrap;
  cursor: pointer;
}

$scrollbarBG: transparent;
$thumbBG: rgba(255, 255, 255, 0.4);
div::-webkit-scrollbar {
  width: 8px;
}
div {
  scrollbar-width: thin;
  scrollbar-color: $thumbBG $scrollbarBG;
}
div::-webkit-scrollbar-track {
  background: $scrollbarBG;
}
div::-webkit-scrollbar-thumb {
  background-color: $thumbBG;
  border-radius: 6px;
  border: 3px solid $scrollbarBG;
}

</style>
