<template>
  <div class="page page-events">

    <section id="events-navigation">
      <div class="grid">
        <div class="col">
          <nav class="navigation">
            <Button
              v-for="(link, index) in navigation"
              :key="index"
              :button="link"
              :selected="isNavLinkSelected(link)"
              class="nav-link"
              @buttonClicked="selected = link.slug" />
          </nav>
        </div>
      </div>
    </section>

    <section id="events-list">
      <div class="grid-noGutter">
        <div class="col">
          <div class="card-list">

            <CardListBlock
              :block="block"
              force-image-type="background_image"
              first-column-num="col-8_sm-12" />

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import EventsPageData from '@/content/pages/events.json'
import EventListData from '@/content/data/event-list.json'

import Button from '@/components/Button'
import CardListBlock from '@/components/CardListBlock'

// =================================================================== Functions
const sortEventsByDate = (events) => {
  return events.sort((current, next) => {
    let currentDate = current.date
    let nextDate = next.date
    currentDate = new Date(typeof currentDate === 'string' ? currentDate : currentDate[0])
    nextDate = new Date(typeof nextDate === 'string' ? nextDate : nextDate[0])
    return nextDate - currentDate
  })
}

// ====================================================================== Export
export default {
  name: 'PageEvents',

  components: {
    Button,
    CardListBlock
  },

  data () {
    return {
      selected: 'event'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'events', data: EventsPageData })
    await store.dispatch('global/getBaseData', { key: 'event_list', data: EventListData })
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    seo () {
      return this.$GetSeo(this.tag)
    },
    pageContent () {
      return this.siteContent.events.page_content
    },
    navigation () {
      const navigation = CloneDeep(this.pageContent.navigation)
      navigation[0].selected = true
      return navigation
    },
    events () {
      const events = CloneDeep(this.siteContent.event_list)
      const selected = this.selected
      if (selected === 'all') { return sortEventsByDate(events) }
      return sortEventsByDate(events.filter(obj => obj.event_type === selected))
    },
    block () {
      return {
        cols: {
          num: 'col'
        },
        load_more_button: {
          type: 'E',
          action: 'load',
          theme: 'dark',
          text: 'See more'
        },
        display: {
          initial: 8,
          next: 8
        },
        cards: this.events
      }
    }
  },

  methods: {
    isNavLinkSelected (link) {
      return link.slug === this.selected
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page-events {
  color: white;
  margin-bottom: 10rem;
  @include mini {
    margin-bottom: 5rem;
  }
}

// ////////////////////////////////////////////////////////////////// Navigation
#events-navigation {
  margin-top: 7rem;
  margin-bottom: 5rem;
  @include mini {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
}

.navigation {
  display: flex;
  flex-direction: row;
}

.nav-link {
  &:not(:last-child) {
    margin-right: 4rem;
    @include small {
      margin-right: 3rem;
    }
    @include mini {
      margin-right: 2rem;
    }
    @include tiny {
      margin-right: 1rem;
    }
  }
}

// ///////////////////////////////////////////////////////////////// Events List
::v-deep .card-list-block {
  .card-column {
    &:first-child {
      .card {
        background-color: $denim;
        .image {
          height: 20rem;
          margin-bottom: 4rem;
          @include mini {
            height: 16.25rem;
            margin-bottom: 2rem;
          }
        }
        .content {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: calc(100% - 20rem - 4rem);
          @include mini {
            flex-direction: column;
            height: calc(100% - 16.25rem - 2rem);
          }
        }
        .panel-left,
        .panel-right {
          width: 50%;
          @include mini {
            width: 100%;
          }
        }
        .panel-left {
          padding-right: 2rem;
          .description {
            display: none;
          }
        }
        .panel-right {
          display: block;
          @include mini {
            margin-top: 1rem;
          }
        }
        .title {
          -webkit-line-clamp: 2;
        }
      }
    }
    &:nth-child(2),
    &:nth-child(n + 3):nth-child(3n + 2) {
      .card {
        position: relative;
        transform: translateY(3rem);
        @include containerMaxMQ {
          transform: translateY(0rem);
        }
      }
    }
    &:nth-child(n + 3):nth-child(2n + 2) {
      .card {
        background-color: $kleinBlue;
      }
    }
    &:nth-child(2),
    &:nth-child(n + 3):nth-child(6n) {
      .card {
        background-color: $jordyBlue;
      }
    }
  }
  .button-row {
    justify-content: center;
    margin-top: 5rem;
    @include mini {
      margin-top: 3rem;
    }
  }
}
</style>
