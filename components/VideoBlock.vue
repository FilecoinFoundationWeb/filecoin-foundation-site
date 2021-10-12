<template>
  <div
    class="block video-block"
    @click="openModal">

    <div class="overlay">
      <IconPlay class="play-icon" />
    </div>

    <img :src="preview_image" class="preview-image" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconPlay from '@/components/icons/Play'

// ====================================================================== Export
export default {
  name: 'VideoBlock',

  components: {
    IconPlay
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    preview_image () {
      return this.block.preview_image
    },
    url () {
      return this.block.url
    },
    icon () {
      return this.block.icon
    },
    subtext () {
      return this.block.subtext
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      this.setModal({
        action: 'video',
        url: this.url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.video-block {
  @include borderRadius_Large;
  position: relative;
  padding: 1rem;
  background-color: $hawkesBlue;
  box-shadow: 3px 3px 6px rgb(0 0 0 / 10%) inset;
  cursor: pointer;
  &:hover {
    .overlay {
      transition: 250ms ease-in;
      background-color: rgba(0, 0, 0, 0.3);
    }
    ::v-deep .play-icon {
      transition: 250ms ease-in;
      transform: scale(1.1);
      .icon__play__triangle-inner {
        fill: white;
      }
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Overlay
.overlay {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
  transition: 250ms ease-out;
}

::v-deep .play-icon {
  width: 3rem;
  transition: 250ms ease-out;
}

// /////////////////////////////////////////////////////////////// Preview Image
.preview-image {
  @include borderRadius_Large;
  position: relative;
  display: block;
  width: 100%;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
  z-index: 5;
}
</style>
