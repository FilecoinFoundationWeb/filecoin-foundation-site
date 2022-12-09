<template>
  <div v-if="!hidden" class="breadcrumbs">

    <template v-for="(link, index) in links">

      <Button
        v-if="link.url"
        :key="`link-${index}`"
        :button="link"
        tabindex="0"
        class="breadcrumb link">
        {{ link.text }}
      </Button>

      <div
        v-else
        :key="`text-${index}`"
        class="breadcrumb text">
        <span class="slug">{{ limitChars(50, link.text) }}</span>
        <span class="mobile-slug">{{ limitChars(30, link.text) }}</span>
      </div>

      <div
        :key="`divider-${index}`"
        class="divider">
        /
      </div>

    </template>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'Breadcrumbs',

  components: {
    Button
  },

  data () {
    return {
      hidden: false,
      links: false
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    breadcrumbsMapping () {
      if (this.siteContent.general) {
        return this.siteContent.general.breadcrumbs_mapping
      }
      return false
    }
  },

  watch: {
    '$route' () {
      this.setBreadcrumbLinks()
    }
  },

  mounted () {
    this.setBreadcrumbLinks()
  },

  methods: {
    setBreadcrumbLinks () {
      if (this.breadcrumbsMapping) {
        const labels = this.breadcrumbsMapping
        const path = this.$route.path
        const items = path.split('/').filter(string => string !== '/' && string !== '')
        const links = [{ // contains index route by default
          type: 'X',
          action: 'nuxt-link',
          url: '/',
          text: labels.index
        }]
        items.forEach((item, index) => {
          const url = `/${items.slice(0, index + 1).join('/')}`
          const routeName = items.slice(0, index + 1).join('-')
          let text = labels[routeName]
          if (!text && this.siteContent.hasOwnProperty('blog')) {
            text = this.siteContent.markdown.title
          }
          if (index !== items.length - 1) {
            links.push({
              type: 'X',
              action: 'nuxt-link',
              url,
              text
            })
          } else {
            links.push({ text })
          }
        })
        this.links = links
      }
    },
    limitChars (amt, text) {
      if (text.length > amt) {
        return `${text.substring(0, amt)}...`
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.breadcrumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2.4375rem;
  @include small {
    padding: 0 1rem;
  }
}

.breadcrumb {
  white-space: nowrap;
  &.link {
    @include fontSize_Small;
    @include fontWeight_SemiBold;
    line-height: leading(21, 13);
    &:hover {
      text-decoration: underline;
    }
  }
  &.text {
    @include fontSize_Small;
    @include fontWeight_Regular;
    line-height: leading(21, 13);
    color: #73B4ED;
    + .divider {
      display: none;
    }
  }
}

.divider {
  @include fontSize_Small;
  @include fontWeight_SemiBold;
  line-height: leading(21, 13);
  margin: 0 0.25rem;
  color: $white;
}

::v-deep .button.type__X {
  color: $white;
}

.slug {
  @include mini {
    display: none;
  }
}

.mobile-slug {
  display: none;
  @include mini {
    display: inline;
  }
}

</style>
