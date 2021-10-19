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
    @include small {
      flex-direction: row;
    }
    .tab {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 2rem;
      width: 100%;
      cursor: pointer;
      @include small {
        padding: 0;
        margin-bottom: 4rem;
      }
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
          @include small {
            width: 0;
            height: 0;
          }
        }
        @include small {
          img {
            display: none;
          }
          .label {
            visibility: visible;
          }
        }
      }
      img {
        position: absolute;
        top: 50%;
        left: 2rem;
        height: 2.875rem;
        transform: translateX(0) translateY(-50%);
        @include small {
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .label {
        @include fontSize_ExtraLarge;
        @include fontWeight_Medium;
        padding-left: 4.375rem;
        @include small {
          visibility: hidden;
          padding-left: 0;
          margin: auto;
        }
        @include mini {
          @include fontSize_Large;
        }
      }
    }
  }

  &.card {
    padding: 4rem 0 3rem 0rem;
    position: relative;
    .card-content {
      display: flex;
      flex-direction: row;
      transition: 300ms ease;
      @include mini {
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
      img {
        width: 5.3125rem;
        margin: 0 2rem;
        @include mini {
          margin: 0;
        }
      }
    }
    .background-layers {
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 0;
      @include mini {
        left: -3rem;
      }
      @include tiny {
        left: -1rem;
      }
    }
  }
}

</style>
