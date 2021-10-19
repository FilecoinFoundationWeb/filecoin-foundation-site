<template>
  <div
    id="modal"
    :class="{ active: modal }"
    @click="closeModal"
    @keyup.esc="closeModal">

    <section id="modal-video">

      <div class="toolbar">
        <button class="close-button" @click="closeModal">
          Close
        </button>
      </div>

      <div
        v-if="action === 'video' && url && getEmbedUrl()"
        class="video-wrapper">
        <iframe
          :src="getEmbedUrl()"
          class="video"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

// ====================================================================== Export
export default {
  name: 'Modal',

  data () {
    return {
      initialized: false
    }
  },

  computed: {
    ...mapGetters({
      modal: 'global/modal'
    }),
    action () {
      return this.modal.action
    },
    url () {
      return this.modal.url
    }
  },

  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.key || e.keyCode
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeModal()
      }
    })
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    closeModal () {
      if (this.modal) {
        this.setModal(false)
      }
    },
    getEmbedUrl () {
      return `${this.$BuildVideoEmbedUrl(this.$ParseVideoUrl(this.url))}?autoplay=1`
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#modal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
  &:before {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    z-index: 5;
    transition: 250ms ease-out;
  }
  &.active {
    visibility: visible;
    pointer-events: all;
    z-index: 10000;
    &:before {
      transition: 250ms ease-in;
      opacity: 1;
    }
    #modal-video {
      transition: 250ms 100ms ease-in;
      transform: translateY(0);
      opacity: 1;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Toolbar
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.close-button {
  @include fontWeight_SemiBold;
  color: white;
  padding: 0.5rem 1rem;
}

// /////////////////////////////////////////////////////////////// [Modal] Video
#modal-video {
  position: relative;
  width: 50rem;
  opacity: 0;
  transform: translateY(2rem);
  z-index: 10;
  transition: 250ms ease-out;
}
</style>
