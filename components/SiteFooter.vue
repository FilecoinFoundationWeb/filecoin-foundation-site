<template>
  <footer id="site-footer">

    <section class="site-footer-section-top">

      <div class="grid-middle">
        <div class="col-4" data-push-left="off-2">
          <div class="footer-content left">

            <div
              v-for="(item, index) in text"
              :key="index"
              class="text-item"
              v-html="item">
            </div>

          </div>
        </div>
        <div class="col-5" data-push-left="off-1">
          <div class="footer-content right">

            <nav class="navigation">
              <Button
                v-for="(link, index) in links"
                :key="`footer-nav-link-${index}`"
                :button="link"
                class="footer-nav-link">
                {{ link.text }}
              </Button>
            </nav>

            <SocialIcons />

          </div>
        </div>
      </div>

      <BackgroundLayers
        :layers-array="[1, 2, 3, 4, 5, 6]"
        shadow-strength="small"
        :offset="{ mini: 0.25 }" />

    </section>

    <div class="grid">
      <div class="col" data-push-left="off-1">
        <div class="panel-bottom-content">

          <nav class="panel-bottom-navigation">
            <Button
              v-for="(link, index) in panelBottomLinks"
              :key="`panel-bottom-nav-link-${index}`"
              :button="link"
              class="panel-bottom-nav-link">
              {{ link.text }}
            </Button>
          </nav>

          <div class="copyright-text" v-html="panelBottomCopyrightText"></div>

        </div>
      </div>
    </div>

  </footer>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import Button from '@/components/Button'
import SocialIcons from '@/components/SocialIcons'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    Button,
    SocialIcons,
    BackgroundLayers
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    footer () {
      return this.siteContent.general.footer
    },
    text () {
      return this.footer.text
    },
    links () {
      return this.footer.links
    },
    panelBottom () {
      return this.footer.panel_bottom
    },
    panelBottomLinks () {
      return this.panelBottom.links
    },
    panelBottomCopyrightText () {
      return this.panelBottom.copyright_text
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayer__Height: 12.25rem;

// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  padding-bottom: 2rem;
  color: white;
}

.site-footer-section-top {
  position: relative;
}

// /////////////////////////////////////////////////////// [Footer Content] Left
::v-deep .text-item {
  @include fontSize_Large;
  @include leading_Medium;
  &:first-child {
    @include fontWeight_SemiBold;
  }
  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
  a {
    @include fontWeight_SemiBold;
    color: $azureRadiance;
  }
}

// ////////////////////////////////////////////////////// [Footer Content] Right
.footer-nav-link {
  @include leading_Regular;
  color: $azureRadiance;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.social-icons {
  margin-top: 1.5rem
}

// //////////////////////////////////////////////////////////////// Panel Bottom
.panel-bottom-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5.75rem;
}

.panel-bottom-navigation {
  display: flex;
  flex-direction: row;
}

.copyright-text {
  @include fontSize_Small;
  opacity: 0.85;
}

::v-deep .panel-bottom-nav-link {
  &:not(:last-child) {
    margin-right: 2rem;
  }
}

::v-deep .copyright-text {
  padding-left: 3rem;
  a {
    @include fontWeight_SemiBold;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
.background-layers {
  position: absolute;
  top: calc(50% - #{math.div($backgroundLayer__Height, 2)});
  right: calc(100% - (#{$containerWidth} / 2) + 16rem);
  width: 100%;
  height: $backgroundLayer__Height;
}
</style>
