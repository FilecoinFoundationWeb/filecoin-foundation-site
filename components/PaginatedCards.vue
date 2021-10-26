<template>
  <div class="block slider-block">

    <Zero_Pagination__Paginate
      v-slot="{ paginated }"
      :display="display"
      :collection="cards"
      class="card-list">
      <Card
        v-for="(card, index) in paginated"
        :key="index"
        :card="card" />
    </Zero_Pagination__Paginate>

    <div>
      <Zero_Pagination__Controls>
      </Zero_Pagination__Controls>
      <Zero_Pagination__ResultsPerPageSelector>
      </Zero_Pagination__ResultsPerPageSelector>
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import Card from '@/components/Card'

// ====================================================================== Export
export default {
  name: 'PaginatedCards',

  components: {
    Card
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      routeQuery: 'filters/routeQuery'
    }),
    cards () {
      return this.block.cards
    },
    display () {
      return this.routeQuery.results
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////////// Cards
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: calc(50% - 1.5rem);
  margin-bottom: 3rem;
  @include mini {
    width: 100%;
    margin-bottom: 2rem;
  }
  &:nth-child(odd) {
    margin-right: 3rem;
    @include mini {
      margin-right: 0;
    }
  }
}
</style>
