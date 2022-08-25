<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    :class="['case-study-card', { 'with-image': img, 'is-link': tag !== 'div' }]"
    :style="{ backgroundColor: borderColor }"
    :data-id="dataIdAttribute"
    v-click-outside="closePanel">

    <div :class="['content', { open: panelOpen }]">

      <div class="image-wrapper">
        <div
          v-if="img"
          :style="{ backgroundImage: `url('${img}')`, backgroundPosition: imgBackgroundPosition }"
          :class="['image', `size-${imgSize}`, 'background_image']">
        </div>
      </div>

      <div
        :class="['panel', { expanded: panelOpen } ]"
        :style="{ backgroundColor }">

        <div class="label">

          <span class="label-text">{{ label }}</span>

          <Button
            :button="closeToggle"
            :class="['toggle', { visible: panelOpen }]"
            @buttonClicked="closePanel" />

        </div>

        <div v-if="title" class="title">
          {{ title }}
        </div>

        <Button
          :button="openToggle"
          :class="['toggle', { visible: !panelOpen }]"
          @buttonClicked="openPanel" />

        <div
          v-if="description"
          class="description"
          v-html="description">
        </div>

      </div>

    </div>

  </component>
</template>

<script>
// ====================================================================== Import
import CloneDeep from 'lodash/cloneDeep'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button
  },

  props: {
    card: {
      type: Object,
      required: true
    },
    forceImageType: {
      type: String,
      required: false,
      default: 'img'
    }
  },

  data () {
    return {
      panelOpen: false
    }
  },

  computed: {
    action () {
      return this.card.action || 'div'
    },
    tag () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'div'; break
      }
      return tag
    },
    target () {
      return this.card.target
    },
    url () {
      return this.card.url
    },
    img () {
      return this.card.img
    },
    imgSize () {
      return this.card.img_size || 'full'
    },
    imgType () {
      const force = this.forceImageType
      if (force !== 'img') { return force }
      return this.card.img_type
    },
    imgBackgroundPosition () {
      return this.card.img_background_position || 'center center'
    },
    title () {
      return this.card.title
    },
    description () {
      return this.card.description
    },
    label () {
      return this.card.label
    },
    dataIdAttribute () {
      return this.card.data_id
    },
    openToggle () {
      const button = CloneDeep(this.card.toggle)
      button.text = '+ More'
      return button
    },
    closeToggle () {
      const button = CloneDeep(this.card.toggle)
      button.text = '+ Less'
      return button
    },
    backgroundColor () {
      const colors = ['#0090FF', '#1147DA', '#0718A7', '#08072E']
      return colors[Math.max(Math.min(this.card.color - 1, colors.length), 0)]
    },
    borderColor () {
      const map = new Map()
      map.set('#0090FF', '#1147DA').set('#1147DA', '#1147DA').set('#0718A7', '#0718A7').set('#08072E', '#0090FF')
      return map.get(this.backgroundColor)
    }
  },

  methods: {
    shortenString (string, n) {
      const chars = string.split('')
      if (chars.length > n) {
        const shortened = chars.slice(0, n)
        return `${shortened.join('')}...`
      }
      return chars.join('')
    },
    openPanel () {
      if (!this.panelOpen) {
        this.panelOpen = true
      }
    },
    closePanel () {
      if (this.panelOpen) {
        this.panelOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// Content
$caseStudyCardBorderWidth: 0.125rem;

.image {
  &.size-full {
    width: 100%;
  }
  &.size-regular {
    width: 2.5rem;
  }
  &.size-mini {
    width: 1.375rem;
  }
  &.background-image {
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.case-study-card {
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 36rem;
  padding: $caseStudyCardBorderWidth;
  color: white;
  background-color: $azureRadiance;
  transform: scale(1);
  transition: 300ms ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.0);
  overflow: hidden;
  &:hover {
    transform: scale(1.03125);
    box-shadow: 3px 7px 10px rgba(10, 30, 82, 0.25);
  }
  &:not(.with-image) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .panel {
      height: auto;
    }
  }
}

.content {
  overflow: hidden;
  border-radius: 0.5rem;
  .image-wrapper {
    height: 16.25rem;
    transition: 250ms ease;
    overflow: hidden;
  }
  &.open {
    overflow: scroll;
    .image-wrapper {
      height: 0;
    }
  }
}

.image {
  @include borderRadius_Large;
  display: block;
  height: 16.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  @include mini {
    margin-bottom: 2rem;
  }
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2.5rem;
  padding-top: 9.25rem;
  min-height: calc(36rem - #{2 * $caseStudyCardBorderWidth});
  transition: 250ms ease;
  &.expanded {
    padding-top: 2rem;
    .description {
      margin-top: 0rem;
    }
  }
}

.label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  .label-text {
    display: block;
    font-size: 0.875rem;
    @include fontWeight_Bold;
    letter-spacing: 0.04rem;
    line-height: leading(40, 14);
  }
}

.title {
  @include fontSize_Large;
  @include fontWeight_Medium;
  line-height: leading(32, 20);
  letter-spacing: 0.04rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4rem;
  margin-bottom: 0.25rem;
}

.description {
  margin-top: 1.5rem;
  @include mini {
    @include fontSize_Small;
  }
}

::v-deep .toggle {
  cursor: default;
  opacity: 0;
  transition: 250ms ease;
  &.visible {
    cursor: pointer;
    opacity: 1;
  }
  .text {
    font-size: 0.875rem;
    @include fontWeight_Bold;
    letter-spacing: 0.04rem;
    line-height: leading(24, 14);
  }
}

</style>