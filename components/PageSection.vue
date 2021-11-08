<template>
  <section class="page-section">

    <section
      v-for="(block, key) in section"
      :id="key"
      :key="key"
      class="content-section">

      <div v-if="block.type !== 'custom'" :class="[getGridClasses(block.grid), block.classNames]">
        <template
          v-for="(column, columnIndex) in columns">
          <div
            v-if="columnExists(block, column)"
            :key="columnIndex"
            :class="getColumnCount(block[column])"
            :data-push-left="getColumnPushCount(block[column], 'left')"
            :data-push-right="getColumnPushCount(block[column], 'right')">
            <div :class="['column-content', column]">

              <!-- ================================================== Blocks -->
              <div :class="['blocks', column]">
                <component
                  :is="getComponentName(block[column])"
                  v-bind="{ block: block[column] }" />
              </div>

              <!-- ========================================== Customizations -->
              <template v-if="block[column].customizations">
                <component
                  :is="component.name"
                  v-for="(component, componentIndex) in block[column].customizations"
                  :key="componentIndex"
                  v-bind="component.props" />
              </template>

            </div>
          </div>
        </template>
      </div>

      <component
        :is="block.component"
        v-else
        v-bind="block.props" />

    </section>

  </section>
</template>

<script>
// ====================================================================== Import
import TextBlock from '@/components/TextBlock'
import ImageBlock from '@/components/ImageBlock'
import VideoBlock from '@/components/VideoBlock'
import SliderBlock from '@/components/SliderBlock'
import PaginatedCards from '@/components/PaginatedCards'
import CardListBlock from '@/components/CardListBlock'
import FloatingMenu from '@/components/FloatingMenu'
import SocialIcons from '@/components/SocialIcons'
import EventsHackathons from '@/components/EventsHackathons'
import TabbedSlider from '@/components/TabbedSlider'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PageSection',

  components: {
    TextBlock,
    ImageBlock,
    VideoBlock,
    SliderBlock,
    PaginatedCards,
    CardListBlock,
    FloatingMenu,
    SocialIcons,
    EventsHackathons,
    TabbedSlider,
    BackgroundLayers
  },

  props: {
    section: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      columns: ['left', 'right']
    }
  },

  mounted () {
    console.log(this.section)
  },

  methods: {
    getGridClasses (blockGrid) {
      const classList = ['grid']
      if (typeof blockGrid === 'object' && Array.isArray(blockGrid) && blockGrid.length > 0) {
        blockGrid.forEach(className => classList.push(`-${className}`))
      }
      return classList.join('')
    },
    columnExists (block, column) {
      return block.hasOwnProperty(column)
    },
    getColumnCount (blockColumn) {
      return blockColumn.cols.num
    },
    getColumnPushCount (blockColumn, direction) {
      return blockColumn.cols.hasOwnProperty(`push_${direction}`) ? blockColumn.cols[`push_${direction}`] : undefined
    },
    getComponentName (block) {
      const type = block.type
      let name = ''
      switch (type) {
        case 'text_block' : name = 'TextBlock'; break
        case 'image_block' : name = 'ImageBlock'; break
        case 'video_block' : name = 'VideoBlock'; break
        case 'slider_block' : name = 'SliderBlock'; break
        case 'paginated_cards' : name = 'PaginatedCards'; break
        case 'card_list_block' : name = 'CardListBlock'; break
        case 'custom' : name = block.component; break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page-section {
  position: relative;
  z-index: 5;
}

.content-section {
  padding: 5rem 0;
}

.column-content {
  position: relative;
}

.blocks {
  position: relative;
  z-index: 10;
}
</style>
