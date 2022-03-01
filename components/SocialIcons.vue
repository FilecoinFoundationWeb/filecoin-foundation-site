<template>
  <div class="social-icons">

    <Button
      v-for="(icon, index) in icons"
      :key="index"
      :button="icon"
      class="social-icon">

      <component :is="icon.component" />

      <div class="label">
        {{ icon.label }}
      </div>

    </Button>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import Button from '@/components/Button'

import GithubIcon from '@/components/icons/Github'
import RedditIcon from '@/components/icons/Reddit'
import TwitterIcon from '@/components/icons/Twitter'
import LinkedInIcon from '@/components/icons/LinkedIn'
import YoutubeIcon from '@/components/icons/Youtube'
import SlackIcon from '@/components/icons/Slack'

// ====================================================================== Export
export default {
  name: 'SocialIcons',

  components: {
    GithubIcon,
    RedditIcon,
    TwitterIcon,
    LinkedInIcon,
    YoutubeIcon,
    SlackIcon,
    Button
  },

  props: {
    forceList: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    icons () {
      return this.forceList.length ? this.forceList : this.siteContent.general.social
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.social-icons {
  display: flex;
  flex-direction: row;
}

.social-icon {
  width: 2rem;
  &:not(:last-child) {
    margin-right: 1rem;
  }
}

.label {
  display: none;
}
</style>
