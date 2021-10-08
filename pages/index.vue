<template>
  <div class="page page-index">

    <!-- Remove this placeholder -->
    <div class="placeholder-header"></div>

    <!-- Example of how to add layers to element "test-content"-->
    <div class="grid">
      <div class="col-5">
        <div class="layers-content-wrapper">
          <div class="test-content">
            Lorem ipsum dolor sit ametempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <BackgroundLayers :layers-array="[1, 2, 3, 4, 5, 6]" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    BackgroundLayers
  }
}
</script>

<style lang="scss" scoped>

.page-index {
  color: $blackPearl;
}

.placeholder-header {
  height: 16rem;
}

.test-content {
  position: relative;
  left: 10rem;
  padding: 2rem;
  max-width: 16rem;
}

</style>
