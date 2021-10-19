<template>
  <div class="site-nav">

    <template v-for="slotName in listOfSlots">

      <slot :name="slotName"></slot>

    </template>

  </div>
</template>

<script>
// ===================================================================== Exports
export default {
  name: 'NavDesktop',

  computed: {
    listOfSlots () {
      return ['sitelogo', 'navitems']
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
  @include medium {
    justify-content: space-between;
  }
}

.panel-left {
  left: 0;
  @include medium {
    left: unset;
  }
}

</style>
