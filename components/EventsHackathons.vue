<template>
  <div class="events-hackathons">

    <div class="grid">
      <div
        :class="intro.cols.num"
        :data-push-left="intro.cols.push_left"
        :data-push-right="intro.cols.push_right">
        <div class="column-content intro">

          <div class="heading h1">
            {{ heading }}
          </div>

          <div v-if="cta" class="button-row">
            <Button :button="cta" />
          </div>

        </div>
      </div>
    </div>

    <div class="grid">
      <div
        :class="events.cols.num"
        :data-push-left="events.cols.push_left"
        :data-push-right="events.cols.push_right">
        <div class="column-content events">

          <Card
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            :card="card" />

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import Button from '@/components/Button'
import Card from '@/components/Card'

// ====================================================================== Export
export default {
  name: 'EventsHackathons',

  components: {
    Button,
    Card
  },

  props: {
    intro: {
      type: Object,
      required: true
    },
    events: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    eventList () {
      const eventList = CloneDeep(this.siteContent.event_list)
      const sorted = eventList.sort((a, b) => {
        const dateA = Array.isArray(a.date) ? a.date[1] : a.date_end ? a.date_end : a.date
        const dateB = Array.isArray(b.date) ? b.date[1] : b.date_end ? b.date_end : b.date
        if (dateA && dateB) {
          return this.$moment.utc(new Date(dateA)) - this.$moment.utc(new Date(dateB))
        }
        return false
      })
      const upcoming = eventList.filter((evt) => {
        const date = Array.isArray(evt.date) ? evt.date[1] : evt.date_end ? evt.date_end : evt.date
        return this.$moment.utc(new Date(date)).isAfter(new Date())
      })
      if (upcoming.length > 1) {
        return upcoming.reverse()
      }
      return sorted.reverse()
    },
    heading () {
      return this.intro.heading
    },
    cta () {
      return this.intro.cta
    },
    cards () {
      if (Array.isArray(this.eventList) && this.eventList.length > 1) {
        const cards = this.eventList.slice(0, 2)
        cards.forEach((card) => { card.img_type = 'background_image' })
        return cards
      }
      return this.events.cards
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////////// Cards
.events {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @include small {
    flex-direction: column;
  }
}

.card {
  width: calc(50% - 0.5rem);
  @include small {
    width: 75%;
  }
  @include tiny {
    width: 100%;
  }
  &.type__D {
    &:first-child {
      margin-top: 2rem;
      margin-right: 1rem;
      @include small {
        margin-right: 0;
      }
    }
    &:last-child {
      position: relative;
      top: -8rem;
      background-color: $denim;
      @include small {
        top: 0;
        margin-top: 1rem;
      }
    }
  }
}
</style>
