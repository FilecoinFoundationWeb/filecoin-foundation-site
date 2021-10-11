<template>
  <footer id="site-footer">

    <div class="grid-equalHeight">
      <div class="col" data-push-left="off-2">
        <div class="footer-content">

          → Footer ←

        </div>
      </div>
    </div>

    <BackgroundLayers
      :layers-array="[1, 2, 3, 4, 5, 6]"
      :offset="1.25" />

  </footer>
</template>

<script>
// ====================================================================== Import
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    BackgroundLayers
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayer__Height: 12.25rem;

// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  position: relative;
  height: 30rem;
  padding-bottom: 2rem;
  color: white;
}

[class~="grid"], [class*="grid-"], [class*="grid_"],
[class~=col], [class*=col-], [class*=col_],
.footer-content {
  height: 100%;
}

.footer-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

// /////////////////////////////////////////////////////////// Background Layers
.background-layers {
  position: absolute;
  top: calc(50% - #{math.div($backgroundLayer__Height, 2)});
  right: calc(100% - (#{$containerWidth} / 2) + 16rem);
  width: 100%;
  height: $backgroundLayer__Height;
}
</style>
