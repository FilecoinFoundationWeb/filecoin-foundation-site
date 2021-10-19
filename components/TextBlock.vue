<template>
  <div :class="['block text-block', `layout__${layout}`, `theme__${theme}`]">

    <div v-if="label" class="label">
      <span
        v-if="typeof label === 'string'"
        class="label-textual">
        {{ label }}
      </span>
      <Button
        v-if="typeof label === 'object'"
        :button="label"
        class="label-textual" />
    </div>

    <component
      :is="headingLevel"
      v-if="heading"
      :class="['heading', headingLevel]"
      v-html="heading" />

    <div
      v-if="subheading"
      class="subheading"
      v-html="subheading">
    </div>

    <div
      v-if="description"
      class="description"
      v-html="description">
    </div>

    <div
      v-if="ctas && Array.isArray(ctas)"
      class="button-row">

      <Button
        v-for="(cta, index) in ctas"
        :key="index"
        :button="cta" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'TextBlock',

  components: {
    Button
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    layout () {
      return this.block.layout
    },
    theme () {
      return this.block.theme || 'dark'
    },
    buttonTheme () {
      return this.block.button_theme
    },
    label () {
      const label = this.block.label
      if (typeof label === 'object') { label.theme = this.buttonTheme }
      return label
    },
    heading () {
      return this.block.heading
    },
    headingLevel () {
      const layout = this.layout
      let size
      switch (layout) {
        case 'large' : size = 'h1'; break
        case 'medium' : size = 'h2'; break
        case 'compact' : size = 'h2'; break
      }
      return size
    },
    subheading () {
      return this.block.subheading
    },
    description () {
      return this.block.description
    },
    ctas () {
      if (!this.block.ctas) { return undefined }
      return this.block.ctas.map(cta => ({ ...cta, theme: this.buttonTheme || cta.theme }))
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.text-block {
  &.theme__light {
    color: white;
    ::v-deep .subheading {
      a {
        color: white;
      }
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Layouts
.layout__compact {
  .description {
    @include fontSize_Large;
    @include leading_Regular;
    @include mini {
      @include fontSize_Medium;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Content
.label {
  @include label;
  margin-bottom: 0.5rem;
}

.heading {
  &.h1 {
    margin-bottom: 1rem;
  }
  &.h2 {
    margin-bottom: 0.5rem;
  }
}

::v-deep .subheading {
  @include subheading;
  margin-bottom: 1rem;
  a {
    @include fontWeight_SemiBold;
    color: $azureRadiance;
  }
}
</style>
