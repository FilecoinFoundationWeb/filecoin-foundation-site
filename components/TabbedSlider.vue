<template>
  <div class="slider-wrapper">

    <Slider
      v-slot="{ content }"
      :options="slides"
      :selected="selected">

      <div class="grid">
        <div
          :class="tabs.cols.num"
          :data-push-left="tabs.cols.push_left"
          :data-push-right="tabs.cols.push_right">
          <div class="column-content tabs">
            <div
              v-for="slide in slides"
              :key="slide.label"
              class="tab"
              @click="select(slide.label)">
              <img :src="slide.icon"></img>
              <div class="label">{{ slide.label }}</div>
            </div>
          </div>
        </div>

        <div
          :class="card.cols.num"
          :data-push-left="card.cols.push_left"
          :data-push-right="card.cols.push_right">
          <div class="column-content card">
            <div
              v-if="content.description"
              class="card-content">
              <img :src="content.icon"></img>
              <div class="text">
                <div class="label">{{ content.label }}</div>
                <div class="description">{{ content.description }}</div>
              </div>
            </div>

            <BackgroundLayers
              v-if="backgroundlayers"
              :layers-array="[8, 6]"
              :offset="1.375" />

          </div>
        </div>
      </div>

    </Slider>

  </div>
</template>

<script>
// ====================================================================== Import
import Slider from '@/components/Slider'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'TabbedSlider',

  components: {
    Slider,
    BackgroundLayers
  },

  props: {
    tabs: {
      type: Object,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    slides: {
      type: Array,
      required: true
    },
    backgroundlayers: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      selected: ''
    }
  },

  mounted () {
    this.selected = this.slides[0].label
  },

  methods: {
    select (value) {
      this.selected = value
    }
  }
}
</script>

<style lang="scss" scoped>
.column-content {

  &.tabs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .tab {
      display: flex;
      flex-direction: row;
      padding: 2rem;
      cursor: pointer;
      background-color: $kleinBlue;
      border-radius: 4rem 0 0 4rem;
      img {
        height: 2rem;
      }
      .label {
      }
    }
  }

  &.card {
    .card-content {
      display: flex;
      flex-direction: row;
      .text {
        display: block;
      }
      img {
        width: 4rem;
        height: 4rem;
      }
    }
    .background-layers {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
    }
  }
}

</style>
