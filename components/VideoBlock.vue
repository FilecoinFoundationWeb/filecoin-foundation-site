<template>
  <div class="block video-block">

    <div class="preview-container" @click="openModal">
      <div class="overlay">
        <IconPlay class="play-icon" />
      </div>
      <div v-if="tint" class="tint"></div>
      <img :src="preview_image" class="preview-image" />
    </div>

    <Button
      v-if="subtext"
      :button="subtext"
      class="subtext" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconPlay from '@/components/icons/Play'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'VideoBlock',

  components: {
    IconPlay,
    Button
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
    tint () {
      return this.block.tint
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
$borderWidth: 1rem;

// ///////////////////////////////////////////////////////////////////// General
.preview-container {
  @include borderRadius_Large;
  position: relative;
  padding: $borderWidth;
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
  z-index: 15;
  transition: 250ms ease-out;
}

::v-deep .play-icon {
  width: 3rem;
  transition: 250ms ease-out;
}

// /////////////////////////////////////////////////////////////// Preview Image
.tint {
  position: absolute;
  top: $borderWidth;
  left: $borderWidth;
  width: calc(100% - #{$borderWidth * 2});
  height: calc(100% - #{$borderWidth * 2});
  border-radius: inherit;
  background-color: #00437C;
  opacity: 0.075;
  z-index: 10;
}

.preview-image {
  position: relative;
  display: block;
  width: 100%;
  border-radius: inherit;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
  z-index: 5;
}

// ///////////////////////////////////////////////////////////////////// Subtext
::v-deep .subtext {
  margin-top: 0.75rem;
  margin-left: 1.5rem;
  &:hover {
    .icon {
      svg {
        .icon__play__triangle-inner {
          fill: $azureRadiance;
        }
      }
    }
  }
  .icon {
    svg {
      .icon__play__triangle-outer {
        fill: $azureRadiance;
      }
    }
  }
  .text {
    @include fontSize_Regular;
    color: $azureRadiance;
  }
}
</style>
