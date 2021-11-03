<template>
  <div class="block slider-block">

    <Zero_Pagination__Paginate
      v-slot="{ paginated }"
      :display="display"
      :collection="searchResults"
      class="card-list">
      <Card
        v-for="(card, index) in paginated"
        :key="index"
        :card="card" />
    </Zero_Pagination__Paginate>

    <div
      v-if="(searchResults.length === 0)"
      class="no-results">
      <div class="prompt">
        No results found that match the search query.
      </div>
    </div>

    <div
      v-if="controls"
      class="pagination-control-wrapper">
      <Zero_Pagination__Controls
        class="zero-pagination-controls">
        <template #first-page>
          First
        </template>
        <template #prev-page>
          Back
        </template>
        <template #next-page>
          Next
        </template>
        <template #last-page>
          Last
        </template>
      </Zero_Pagination__Controls>
      <!-- <Zero_Pagination__ResultsPerPageSelector
        class="zero-results-per-page">
      </Zero_Pagination__ResultsPerPageSelector> -->
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
      routeQuery: 'filters/routeQuery',
      filterValue: 'core/filterValue'
    }),
    cards () {
      return this.block.cards
    },
    display () {
      return this.routeQuery.results
    },
    controls () {
      return this.block.displayControls
    },
    searchQuery () {
      return this.filterValue
    },
    searchResults () {
      const query = this.searchQuery.toLowerCase()
      return this.cards.filter((post) => {
        const matched = post.title.toLowerCase().includes(query)
        // const matched = post.title.toLowerCase().includes(query) || post.description.join('').toLowerCase().includes(query)
        if (!matched) { return false }
        return post
      })
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

.no-results {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .prompt {
    padding: 1rem 2rem;
    margin: 3rem 0;
    color: $white;
    @include fontWeight_Medium;
    background-color: $denim;
    border-radius: 1rem;
  }
}

.pagination-control-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1.125rem;
}

::v-deep .zero-pagination-controls {
  .page-button {
    opacity: 1.0;
    padding: 0.5rem 1.25rem;
    &.current {
      color: $white;
      background-color: $denim;
      border-radius: 0.5rem;
      box-shadow: 0 0 0 .5rem $azureRadiance;
    }
    &:not(.current) {
      color: $kleinBlue;
    }
  }
  .breaker {
    color: $kleinBlue;
  }
  .control-button {
    color: $kleinBlue;
    opacity: 0.75;
    &:hover {
      opacity: 1.0;
    }
  }
}
</style>
