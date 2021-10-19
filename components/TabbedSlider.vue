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
              :class="['tab', { selected: slide.label === content.label }]"
              @click="select(slide.label)">
              <img :src="slide.icon"></img>
              <div class="label">
                {{ slide.label }}
              </div>
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
              <div class="image-wrapper">
                <img :src="content.icon"></img>
              </div>
              <div class="text">
                <div class="label">
                  {{ content.label }}
                </div>
                <div class="description">
                  {{ content.description }}
                </div>
              </div>
            </div>

            <BackgroundLayers
              v-if="backgroundlayers"
              :layers-array="[8, 6]"
              :offset="1.375"
              :border-radius="5" />

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

[class~="grid"], [class*="grid-"], [class*="grid_"] {
  @include small {
    flex-direction: column;
  }
}

.column-content {

  &.tabs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .tab {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 2rem;
      width: 100%;
      height: 2.875rem;
      cursor: pointer;
      &.selected {
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100%;
          background-color: $kleinBlue;
          border-radius: 4rem 0 0 4rem;
          z-index: -1;
        }
      }
      img {
        position: absolute;
        top: 50%;
        left: 2rem;
        width: 2.875rem;
        transform: translateY(-50%);
      }
      .label {
        @include fontSize_ExtraLarge;
        @include fontWeight_Medium;
        padding-left: 4.375rem;
      }
    }
  }

  &.card {
    padding-top: 1rem;
    .card-content {
      display: flex;
      flex-direction: row;
      @include tiny {
        flex-direction: column;
      }
      .text {
        display: block;
        .label {
          margin: 1rem 0;
          @include fontSize_ExtraLarge;
          @include fontWeight_Medium;
          @include leading_Regular;
        }
        .description {
          @include leading_MediumLarge;
          letter-spacing: $letterSpacing_Large;
        }
      }
      .image-wrapper {
        min-width: 29%;
      }
      img {
        position: relative;
        width: 5.3125rem;
        left: 25%;
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
