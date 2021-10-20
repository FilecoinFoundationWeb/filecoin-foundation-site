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
    heading () {
      return this.intro.heading
    },
    cta () {
      return this.intro.cta
    },
    cards () {
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
</style>
