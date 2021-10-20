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

::v-deep .mega-menu {
  display: block;
  position: fixed;
  padding: 3rem 5rem 3rem 5rem;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  // left: 100vw;
  transform: translateY(-100vh);
  // background-color: rgba(0, 0, 0, 0.9);
  transition: 250ms ease-in;
  z-index: 100;

  // --------
  padding: $navigationHeight 3rem 3rem 3rem;
  padding-top: $navigationHeight !important;
  top: -1rem;
  height: calc(100% + 1rem);
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
      padding-left: 3.5rem;
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
      padding-left: 3.5rem;
      margin-bottom: 1rem;
      letter-spacing: $letterSpacing_Large;
    }
    ul {
      padding-left: 3.5rem;
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

.mobile-panel {
  display: none;
  &.open {
    display: block;
  }
}
</style>
