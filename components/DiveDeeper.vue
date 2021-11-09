<template>
  <div class="dive-deeper">

    <div class="grid">
      <div
        :class="intro.cols.num"
        :data-push-left="intro.cols.push_left"
        :data-push-right="intro.cols.push_right">
        <div class="column-content intro">

          <div class="heading h1">
            {{ heading }}
          </div>

          <div
            v-if="subheading"
            class="subheading"
            v-html="subheading">
          </div>

        </div>
      </div>
    </div>

    <div
      v-for="video in videos"
      class="video-container">
      <div class="grid-middle">
        <div
          :class="video.left.cols.num"
          :data-push-left="video.left.cols.push_left"
          :data-push-right="video.left.cols.push_right">
          <div class="column-content left">
            <div class="blocks left">
              <VideoBlock v-bind="{ block: video.left.props }"/>
            </div>
          </div>
        </div>

        <div
          :class="video.right.cols.num"
          :data-push-left="video.right.cols.push_left"
          :data-push-right="video.right.cols.push_right">
          <div class="column-content right">
            <div class="blocks right">
              <TextBlock v-bind="{ block: video.right.props }"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'
import Card from '@/components/Card'

import TextBlock from '@/components/TextBlock'
import ImageBlock from '@/components/ImageBlock'
import VideoBlock from '@/components/VideoBlock'

// ====================================================================== Export
export default {
  name: 'DiveDeeper',

  components: {
    Button,
    Card,
    TextBlock,
    ImageBlock,
    VideoBlock
  },

  props: {
    intro: {
      type: Object,
      required: true
    },
    videos: {
      type: Array,
      required: true
    }
  },

  computed: {
    heading () {
      return this.intro.heading
    },
    subheading () {
      return this.intro.subheading
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////////
.video-container {
  padding-top: 5rem;
}

.heading {
  margin-bottom: 1rem;
}

.subheading {
  @include fontSize_Large;
}

::v-deep a {
  @include fontWeight_Medium;
  @include leading_Regular;
  color: $azureRadiance;
}

</style>
