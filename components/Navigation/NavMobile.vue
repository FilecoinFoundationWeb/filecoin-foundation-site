<template>
  <nav class="site-nav" role="navigation">

    <div class="top-panel">
      <slot name="sitelogo"></slot>

      <slot name="action"></slot>
    </div>

    <div :class="[ 'mega-menu', { 'nav-panel-open': mobilePanelOpened } ]">
      <slot name="navitems"></slot>
    </div>

  </nav>
</template>

<script>
// ===================================================================== Exports
export default {
  name: 'NavMobile',

  props: {
    mobilePanelOpened: {
      type: Boolean,
      required: false,
      default: false
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
  min-width: 85%;
  @include tiny {
    width: 100%;
  }
}

.mega-menu {
  display: block;
  position: absolute;
  padding: 3rem 5rem 3rem 5rem;
  width: calc(104.1665vw + 2rem);
  // height: calc(100vh - 9rem);
  left: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 250ms ease-in;
  &.nav-panel-open {
    left: calc(-0.041665 * 100vw - 2rem);
  }
}

.mobile-panel {
  display: none;
  &.open {
    display: block;
  }
}
</style>
