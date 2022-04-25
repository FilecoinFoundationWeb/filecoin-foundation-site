<template>
  <footer id="site-footer">

    <section class="site-footer-section-top">

      <div class="grid-middle">
        <div class="col-4_mi-8_ti-10" data-push-left="off-2_sm-3_mi-2">
          <div class="footer-content left">

            <div
              v-for="(item, key) in text"
              :key="key"
              class="text-item"
              v-html="item">
            </div>

          </div>
        </div>
        <div class="col-5_mi-8_ti-10" data-push-left="off-1_sm-3_mi-2">
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
        layers-array="1_2_3_4_5_6"
        :offset="{ mini: 0.25 }"
        shadow-strength="small"
        border-radius-direction="reverse"
        :breakpoints="footerLayersBreakpointData" />

    </section>

    <div class="grid">
      <div class="col-12_sm-4_mi-8_ti-10" data-push-left="off-1_sm-3_mi-2">
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

  data () {
    return {
      footerLayersBreakpointData: {
        default: {
          stroke: 1.5,
          radius: 21
        },
        mini: {
          stroke: 0.25,
          radius: 8
        }
      }
    }
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
  &:not(:first-child) {
    @include small {
      @include fontSize_Medium;
    }
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

::v-deep .social-icons {
  margin-top: 1.5rem;
  @include small {
    .social-icon {
      flex: 1;
      width: auto;
    }
  }
}

// //////////////////////////////////////////////////////////////// Panel Bottom
.panel-bottom-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5.75rem;
  @include small {
    flex-direction: column;
    margin-top: 3rem;
  }
}

.panel-bottom-navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  @include small {
    flex-wrap: wrap;
  }
}

::v-deep .panel-bottom-nav-link {
  opacity: 0.75;
  &:not(:last-child) {
    margin-right: 2rem;
    @include small {
      margin-bottom: 1rem;
    }
  }
}

::v-deep .copyright-text {
  @include fontSize_Small;
  @include leading_Regular;
  opacity: 0.5;
  padding-left: 3rem;
  @include small {
    padding-left: 0;
    margin-top: 2rem;
  }
  a {
    @include fontWeight_SemiBold;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
.background-layers {
  position: absolute;
  top: calc(50% - #{math.div($backgroundLayer__Height, 2)});
  right: calc(50% + 30rem);
  width: 100%;
  height: $backgroundLayer__Height;
  @include containerMaxMQ {
    right: 0;
    left: -100%;
  }
  @include mini {
    left: calc(-100% + 2rem);
    top: 0;
    height: 100%;
  }
}
</style>
