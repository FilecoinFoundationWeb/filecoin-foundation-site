<template>
  <div :class="['block', 'accordion-block', `theme__${theme}`]">

    <Accordion
      v-slot="{ active }"
      :multiple="true"
      :toggle-on-load="false">
      <AccordionSection
        v-for="(section, index) in sections"
        :key="`accordion-section-${index}`"
        :active="active">

        <AccordionHeader>
          <div
            class="header-slot"
            tabindex="0"
            v-html="section.heading">
          </div>
        </AccordionHeader>

        <AccordionContent>
          <div
            class="content-slot"
            v-html="section.content">
          </div>
        </AccordionContent>

      </AccordionSection>
    </Accordion>

  </div>
</template>

<script>
// ====================================================================== Import
import Accordion from '@/components/Accordion/accordion'
import AccordionSection from '@/components/Accordion/accordion-section'
import AccordionHeader from '@/components/Accordion/accordion-header'
import AccordionContent from '@/components/Accordion/accordion-content'
// ====================================================================== Export
export default {
  name: 'AccordionBlock',

  components: {
    Accordion,
    AccordionSection,
    AccordionHeader,
    AccordionContent
  },

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
    color: $white;
    ::-moz-selection { background: $white; color: $blackPearl; }
    ::selection { background: $white; color: $blackPearl; }
  }
  &.theme__dark {
    color: $blackPearl;
    ::-moz-selection { background: $deepCove; color: $white; }
    ::selection { background: $deepCove; color: $white; }
    ::v-deep .accordion-header {
      &:before {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='17.404' height='10.822' viewBox='0 0 17.404 10.822'%3e%3cg id='Group_3249' data-name='Group 3249' transform='translate(-21238.697 16442.6)'%3e%3cpath id='Path_6243' data-name='Path 6243' d='M4501.422-2575.9l6.581-6.581,6.581,6.581' transform='translate(16739.396 -13858)' fill='none' stroke='%2308072E' stroke-linecap='round' stroke-width='3'/%3e%3c/g%3e%3c/svg%3e");
      }
    }
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
    padding-left: 0.5rem;
    margin: 0.3125rem 0.3125rem 0.3125rem 2.625rem;
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
    letter-spacing: 0.3px;
    line-height: leading(28, 16);
    margin-left: 3.125rem;
    a {
      @include fontWeight_Bold;
      &:hover {
        border-bottom: 1px solid;
      }
    }
  }
}

</style>
