<template>
  <div :class="['block', 'accordion-block', `theme__${theme}`]">

    <Zero_Core__Accordion
      v-slot="{ active }"
      :multiple="true"
      :toggle-on-load="true">
      <Zero_Core__Accordion_Section
        v-for="(section, index) in sections"
        :key="`accordion-section-${index}`"
        :active="active">

        <Zero_Core__Accordion_Header>
          <div class="header-slot" v-html="section.heading"></div>
        </Zero_Core__Accordion_Header>

        <Zero_Core__Accordion_Content>
          <div class="content-slot" v-html="section.content"></div>
        </Zero_Core__Accordion_Content>

      </Zero_Core__Accordion_Section>
    </Zero_Core__Accordion>

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'AccordionBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    sections () {
      return this.block.sections
    },
    theme () {
      return this.block.theme
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.accordion-block {
  position: relative;
  &.theme__light {
    color: white;
  }
  &.theme__dark {
    color: $blackPearl;
  }
}

::v-deep .accordion-section {
  margin-bottom: 2rem;
  &.open {
    .accordion-header {
      &:before {
        transition: 200ms ease-in;
        transform: rotate(0deg);
      }
    }
  }
}

::v-deep .accordion-header {
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .header-slot {
    @include fontSize_ExtraLarge;
    @include fontWeight_Medium;
    letter-spacing: 0.72px;
    line-height: leading(40, 24);
    margin-left: 3.125rem;
    margin-bottom: 0.3125rem;
  }
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0rem;
    width: 1.125rem;
    height: 100%;
    background: url('~assets/svgs/chevrondown.svg') no-repeat right center;
    transform: rotate(180deg);
    transition: 200ms ease-out;
  }
}

::v-deep .accordion-content {
  .content-slot {
    @include fontSize_Regular;
    @include fontWeight_Regular;
    letter-spacing: 0.48px;
    line-height: leading(28, 16);
    margin-left: 3.125rem;
    a {
      @include fontWeight_Bold;
    }
  }
}
</style>
