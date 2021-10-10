<template>
  <div id="site-navigation">
    <div class="grid-noGutter">
      <div class="col">
        <div class="content">

          <nuxt-link to="/">
            <LogoHorizontal id="logo-horizontal" />
          </nuxt-link>

          <nav class="navigation">
            <Button
              v-for="(link, index) in links"
              :key="index"
              :button="link"
              class="nav-link">
              {{ link.text }}
            </Button>
          </nav>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import Button from '@/components/Button'

import LogoHorizontal from '@/components/LogoHorizontal'

// ====================================================================== Export
export default {
  name: 'SiteNavigation',

  components: {
    LogoHorizontal,
    Button
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    links () {
      return this.siteContent.general.navigation.header
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-navigation {
  color: white;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: $navigationHeight;
}

// //////////////////////////////////////////////////////////////////////// Logo
#logo-horizontal {
  height: 2.5rem;
}

// ////////////////////////////////////////////////////////////////// Navigation
.nav-link {
  &:not(:last-child) {
    margin-right: 3.125rem;
  }
}
</style>
