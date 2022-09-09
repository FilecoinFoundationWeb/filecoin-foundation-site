
line-height: leading(65, 45);<template>
  <div class="page page-public-data-commons">

    <Modal />

    <div class="main-content">

      <PageSection
        id="section_0"
        key="section_0"
        :section="header" />

      <!-- ======================================================= SECTION A -->
      <section class="main-content-section-A">

        <PageSection
          v-for="(section, key) in introSections"
          :id="key"
          :key="key"
          :section="section" />

        <BackgroundLayers
          id="main-section-a-background-layers"
          layers-array="5_6"
          :breakpoints="pageLayersBreakpointData"
          shadow-strength="small" />

      </section>

      <!-- ======================================================= SECTION B -->
      <section class="main-content-section-B">

        <PageSection
          id="section_3"
          key="section_3"
          :section="callout" />

        <PageSection
          id="section_4"
          key="section_4"
          :section="caseStudies" />

        <PageSection
          v-for="(section, key) in finalSections"
          :id="key"
          :key="key"
          :section="section" />

      </section>

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import PublicDataCommonsPageData from '@/content/pages/public-data-commons.json'
import CaseStudyData from '@/content/data/case-studies.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// =================================================================== Functions
const positionFeaturedFirst = (events) => {
  const index = events.findIndex(item => item.featured)
  if (index === 0 || index > 0) {
    const featured = events[index]
    events.splice(index, 1)
    events.unshift(featured)
  }
  return events
}

const updateTickerInnerHtml = (ticker) => {
  if (ticker) {
    const values = ticker.dataset.values.split(',')
    const currentVal = ticker.innerHTML.replace(',', '')
    if (currentVal) {
      const lastIndex = values.indexOf(currentVal)
      const index = (lastIndex + 1) % values.length
      ticker.innerHTML = `${values[index]},`
    } else {
      ticker.innerHTML = `${values[0]},`
    }
  }
}

// ====================================================================== Export
export default {
  name: 'PublicDataCommonsPage',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'public_data_commons',
      interval: false,
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
          radius: 22.875
        },
        medium: {
          stroke: 0.75,
          radius: 14.5
        },
        mini: {
          stroke: 0.25,
          radius: 5.75
        }
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'public_data_commons', data: PublicDataCommonsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageContent () {
      const content = CloneDeep(this.siteContent.public_data_commons.page_content)
      return content
    },
    header () {
      return this.pageContent.section_0
    },
    introSections () {
      return {
        section_1: this.pageContent.section_1,
        section_2: this.pageContent.section_2
      }
    },
    callout () {
      return this.pageContent.section_3
    },
    cards () {
      const cards = CloneDeep(CaseStudyData)
      return positionFeaturedFirst(cards)
    },
    events () {
      const events = CloneDeep(this.pageContent.section_6.events_hackathons.right.cards)
      const upcoming = events.filter((card) => {
        const date = this.$moment.utc(new Date(card.date_start))
        return this.$moment.utc(new Date()).isBefore(date, 'day')
      }).sort((a, b) => a.date_start.localeCompare(b.date_start))
      const past = events.filter((card) => {
        const date = this.$moment.utc(new Date(card.date_start))
        return this.$moment.utc(new Date()).isAfter(date, 'day')
      }).sort((a, b) => a.date_start.localeCompare(b.date_start))
      const stayTuned = {
        type: 'F',
        event_type: 'event',
        title: 'Stay Tuned',
        description: 'More information to come soon on future events, such as the World Economic Forum and SXSW in 2023.'
      }
      return upcoming.concat(stayTuned, past)
    },
    caseStudies () {
      const section = CloneDeep(this.pageContent.section_4)
      section.case_studies.left.cards = this.cards
      return section
    },
    finalSections () {
      const section = CloneDeep(this.pageContent.section_6)
      section.events_hackathons.right.cards = this.events
      return {
        section_5: this.pageContent.section_5,
        section_6: section,
        section_7: this.pageContent.section_7
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      const ticker = document.getElementById('hero-subheading-ticker')
      updateTickerInnerHtml(ticker)
      this.interval = setInterval(() => {
        updateTickerInnerHtml(ticker)
      }, 1000)
    })
  },

  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.main-content-section-A,
.main-content-section-B {
  position: relative;
  z-index: 2;
}

.main-content-section-A {
  margin-bottom: 12rem;
  @include mini {
    margin-bottom: 6rem;
  }
}

::v-deep .heading {
  @include mini {
    @include fontSize_ExtraLarge;
  }
}
::v-deep .subheading {
  @include mini {
    @include fontSize_Medium;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
$backgroundLayers__Left__Desktop: calc(50vw - (#{$containerWidth} / 2) - 9rem);
$backgroundLayers__Left__Medium: 2.25rem;
$backgroundLayers__Left__Mini: 0.75rem;

::v-deep #main-section-a-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: calc(100% + 50rem);
  height: 100%;
  &:before {
    content: '';
    position: absolute;
    z-index: -3;
    bottom: 13rem;
    left: -9999px;
    right: -9999px;
    margin: 0 auto;
    width: 2105px;
    height: 2480px;
    transform: translateX(-14rem) translateY(100%);
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='2105' height='2480' viewBox='0 0 2105 2480' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1858.19 268.429C1824.61 246.004 1801.2 215.308 1790.47 183.846C1779.73 152.384 1781.68 120.213 1798.72 94.7074C1815.75 69.2019 1844.72 55.0756 1877.9 52.9397C1911.07 50.8036 1948.39 60.6705 1981.97 83.0954C2015.54 105.52 2038.96 136.216 2049.69 167.679C2060.42 199.141 2058.47 231.311 2041.44 256.817C2024.4 282.323 1995.43 296.449 1962.26 298.585C1929.08 300.721 1891.76 290.854 1858.19 268.429Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1625.82 616.408C1562.06 573.825 1517.58 515.519 1497.18 455.711C1476.77 395.905 1480.45 334.655 1512.91 286.054C1545.37 237.454 1600.54 210.59 1663.6 206.53C1726.67 202.47 1797.56 221.225 1861.32 263.809C1925.08 306.392 1969.56 364.698 1989.96 424.506C2010.37 484.312 2006.69 545.562 1974.23 594.163C1941.77 642.763 1886.6 669.627 1823.54 673.687C1760.48 677.747 1689.58 658.992 1625.82 616.408Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1389.96 969.552C1294.45 905.759 1227.8 818.4 1197.22 728.767C1166.64 639.136 1172.14 547.289 1220.83 474.388C1269.52 401.487 1352.25 361.221 1446.76 355.136C1541.27 349.051 1647.5 377.159 1743.01 440.953C1838.53 504.747 1905.18 592.106 1935.76 681.738C1966.34 771.37 1960.84 863.217 1912.15 936.117C1863.46 1009.02 1780.73 1049.28 1686.22 1055.37C1591.71 1061.45 1485.48 1033.35 1389.96 969.552Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1155.55 1320.35C1029.83 1236.38 942.078 1121.38 901.817 1003.37C861.556 885.366 868.793 764.409 932.925 668.39C997.056 572.37 1106.02 519.353 1230.44 511.341C1354.87 503.329 1494.71 540.336 1620.44 624.31C1746.17 708.283 1833.92 823.282 1874.18 941.289C1914.44 1059.3 1907.2 1180.25 1843.07 1276.27C1778.94 1372.29 1669.98 1425.31 1545.55 1433.32C1421.12 1441.33 1281.28 1404.33 1155.55 1320.35Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M918.437 1672.57C760.423 1567.03 650.132 1422.49 599.526 1274.17C548.92 1125.84 558.009 973.774 638.641 853.049C719.273 732.324 856.257 665.681 1012.66 655.61C1169.06 645.54 1344.81 692.056 1502.83 797.593C1660.84 903.13 1771.13 1047.67 1821.74 1195.99C1872.35 1344.32 1863.26 1496.39 1782.62 1617.11C1701.99 1737.84 1565.01 1804.48 1408.61 1814.55C1252.21 1824.62 1076.45 1778.1 918.437 1672.57Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M684.544 2022.75C496.024 1896.84 364.434 1724.4 304.053 1547.42C243.673 1370.44 254.512 1188.99 350.734 1044.92C446.957 900.851 610.421 821.333 797.029 809.318C983.638 797.302 1193.33 852.803 1381.85 978.715C1570.38 1104.63 1701.97 1277.07 1762.35 1454.05C1822.73 1631.03 1811.89 1812.48 1715.66 1956.55C1619.44 2100.62 1455.98 2180.14 1269.37 2192.15C1082.76 2204.17 873.065 2148.67 684.544 2022.75Z' stroke='%230621A4' stroke-width='2'/%3e%3c/svg%3e ");
  }
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}

::v-deep #section-1-background-layers {
  position: absolute;
  top: 4.125rem;
  left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
  width: calc(100% + 50rem);
  height: calc(100% - 4.125rem);
  @include medium {
    top: 2.25rem;
    left: calc(#{$backgroundLayers__Left__Medium} + 2.25rem);
  }
  @include mini {
    top: 0.75rem;
    left: calc(#{$backgroundLayers__Left__Mini} + 0.75rem);
  }
}

// /////////////////////////////////////////////////////////////////// Section 0
#section_0 {
  position: relative;
  z-index: 1;
  &:before { // hero header far left star
    content: '';
    position: absolute;
    width: 68px;
    height: 69px;
    left: calc(50vw - #{math.div($containerWidth, 2)} - 8rem);
    top: 5rem;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='68' height='69' viewBox='0 0 68 69' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.5059 18.9727C33.4875 33.5023 33.8798 33.0582 38.8082 1.04883C34.7803 32.5131 35.2907 32.4134 65.8556 2.77415C36.2169 33.3395 36.1166 33.8495 67.5809 29.8216C35.5716 34.7506 35.128 35.1417 49.657 50.125C34.6744 35.5948 34.2832 36.0395 29.3548 68.0488C33.3815 36.5845 32.8722 36.6837 2.30622 66.3235C31.946 35.7581 32.0464 35.2482 0.582031 39.2761C32.5902 34.3471 33.0349 33.9553 18.5059 18.9727Z' stroke='%230718A6' stroke-width='1.58364' stroke-miterlimit='10'/%3e%3c/svg%3e ");
  }
}

::v-deep #hero-header-image {
  padding-bottom: 0;
  @include mini {
    padding-bottom: 4rem;
  }
  .column-content {
    &:before {
      content: '';
      position: absolute;
      top: -25rem;
      left: -50rem;
      width: calc(100% + 100rem);
      height: calc(100% + 70rem);
      background: radial-gradient(circle, rgba(6,33,164,0.7) 0%, rgba(0,212,255,0) 90%);
      @include mini {
        width: 820px;
        height: 820px;
        top: 5rem;
        left: 8rem;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(6,33,164,1) 0%, rgba(0,212,255,0) 60%);
      }
    }
    @include mini {
      margin-left: -1rem;
      margin-right: -9rem;
      .image-block {
        max-height: 212px;
      }
      .image {
        transform: translateX(-2.5rem);
      }
    }
  }
  .blocks {
    &:before {
      content: '';
      position: absolute;
      left: -0.625rem;
      top: -0.625rem;
      width: calc(100% + 1.25rem);
      height: calc(100% + 1.25rem);
      border: 0.25rem solid #6CADE7;
      border-radius: 13.375rem;
    }
    .image-block {
      position: relative;
      border: 0.375rem solid $white;
      border-radius: 12rem;
      overflow: hidden;
    }
    &:after { // hero header top right echo cone
      content: '';
      position: absolute;
      top: 3.5rem;
      right: -0.5rem;
      width: 268px;
      height: 294px;
      transform: translate(100%, -100%);
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='268' height='294' viewBox='0 0 268 294' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M30.0518 219.551C32.5693 222.453 33.9233 225.834 34.1134 228.925C34.3034 232.015 33.3348 234.756 31.2832 236.536C29.2315 238.316 26.3806 238.888 23.3485 238.264C20.3152 237.639 17.1594 235.821 14.6419 232.919C12.1244 230.017 10.7704 226.636 10.5803 223.545C10.3903 220.456 11.3589 217.714 13.4105 215.934C15.4622 214.154 18.3131 213.582 21.3452 214.207C24.3785 214.831 27.5343 216.649 30.0518 219.551Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M61.5323 192.234C66.4189 197.867 69.0708 204.455 69.444 210.524C69.8171 216.591 67.917 222.081 63.7756 225.674C59.6341 229.267 53.931 230.373 47.9768 229.147C42.0215 227.92 35.8737 224.365 30.9871 218.732C26.1004 213.099 23.4486 206.511 23.0754 200.442C22.7022 194.374 24.6024 188.885 28.7438 185.292C32.8852 181.699 38.5884 180.593 44.5425 181.819C50.4979 183.045 56.6456 186.601 61.5323 192.234Z' stroke='%231248DD' stroke-width='2'/%3e%3cpath d='M93.4853 164.513C100.865 173.019 104.882 182.982 105.448 192.184C106.014 201.385 103.134 209.766 96.7933 215.267C90.453 220.767 81.7488 222.435 72.72 220.576C63.69 218.717 54.3941 213.333 47.0146 204.826C39.6351 196.32 35.6176 186.357 35.0517 177.155C34.4859 167.954 37.3663 159.572 43.7066 154.072C50.0468 148.572 58.7511 146.904 67.7799 148.763C76.8099 150.622 86.1058 156.006 93.4853 164.513Z' stroke='%230090FF' stroke-width='2'/%3e%3cpath d='M125.241 136.979C134.992 148.22 140.309 161.393 141.058 173.576C141.807 185.758 137.994 196.89 129.562 204.205C121.13 211.521 109.57 213.724 97.6162 211.262C85.6611 208.8 73.3701 201.677 63.6189 190.437C53.8676 179.196 48.5509 166.023 47.8017 153.84C47.0526 141.658 50.8656 130.525 59.2978 123.21C67.7301 115.895 79.2896 113.692 91.2435 116.154C103.199 118.615 115.49 125.739 125.241 136.979Z' stroke='%236CADE7' stroke-width='2'/%3e%3cpath d='M157.293 109.381C169.579 123.543 176.284 140.147 177.229 155.516C178.174 170.883 173.364 184.955 162.697 194.21C152.029 203.464 137.418 206.238 122.338 203.133C107.258 200.028 91.7659 191.046 79.4803 176.884C67.1947 162.722 60.4896 146.117 59.5445 130.749C58.5995 115.382 63.4091 101.309 74.0768 92.055C84.7445 82.8007 99.3551 80.0261 114.435 83.1312C129.516 86.2366 145.008 95.2187 157.293 109.381Z' stroke='%23D8ECFD' stroke-width='2'/%3e%3cpath d='M188.978 81.8914C203.658 98.8138 211.675 118.66 212.805 137.038C213.936 155.415 208.184 172.266 195.404 183.352C182.624 194.439 165.131 197.754 147.098 194.04C129.063 190.327 110.547 179.588 95.8671 162.666C81.1868 145.743 73.1699 125.897 72.0397 107.519C70.9096 89.1421 76.6608 72.2917 89.4408 61.205C102.221 50.1183 119.714 46.8037 137.748 50.5169C155.782 54.2305 174.298 64.969 188.978 81.8914Z' stroke='%23F0F7FD' stroke-width='2'/%3e%3c/svg%3e ");
    }
  }
  .echo-layers {
    &:before { // hero header left helix floater
      content: '';
      position: absolute;
      top: -6rem;
      left: -28rem;
      width: 402px;
      height: 405px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='402' height='405' viewBox='0 0 402 405' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M215.121 204.508L204.437 213.668L199.59 198.839' stroke='%23F0F7FD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M241.117 210.165L230.433 219.324L225.589 204.493' stroke='%23D8ECFD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M267.135 215.822L256.45 224.981L251.604 210.152' stroke='%236CADE7' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M293.137 221.476L282.452 230.635L277.609 215.804' stroke='%230090FF' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M319.144 227.132L308.46 236.291L303.614 221.462' stroke='%231248DD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M348.693 233.145L338.009 242.304L333.162 227.476' stroke='%230621A4' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M337.995 242.314C352.577 182.408 332.961 122.365 294.181 108.203C255.401 94.0417 212.142 131.125 197.56 191.031C182.978 250.937 202.594 310.98 241.374 325.142C278.42 338.67 319.554 305.433 335.87 250.208' stroke='%230621A4' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M308.457 236.296C323.04 176.39 303.424 116.347 264.644 102.185C225.864 88.0236 182.605 125.107 168.023 185.013C153.441 244.919 173.057 304.962 211.837 319.124C248.883 332.652 290.017 299.415 306.333 244.19' stroke='%231248DD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M282.452 230.64C297.034 170.734 277.418 110.69 238.638 96.5285C199.858 82.367 156.599 119.45 142.017 179.356C127.435 239.262 147.051 299.306 185.831 313.467C222.877 326.996 264.011 293.758 280.327 238.534' stroke='%230090FF' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M256.438 224.985C271.02 165.079 251.404 105.036 212.624 90.8741C173.844 76.7126 130.586 113.796 116.004 173.702C101.421 233.608 121.037 293.651 159.817 307.813C196.864 321.341 237.997 288.104 254.313 232.879' stroke='%236CADE7' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M204.44 213.662C219.022 153.756 199.406 93.7128 160.626 79.5512C121.846 65.3897 78.5878 102.473 64.0054 162.379C49.4231 222.285 69.0392 282.328 107.819 296.49C144.865 310.018 185.999 276.781 202.315 221.556' stroke='%23F0F7FD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M230.454 219.315C245.036 159.409 225.42 99.3653 186.64 85.2038C147.86 71.0423 104.601 108.125 90.0191 168.031C75.4368 227.937 95.0528 287.981 133.833 302.142C170.879 315.671 212.013 282.434 228.329 227.209' stroke='%23D8ECFD' stroke-width='2' stroke-miterlimit='10'/%3e%3c/svg%3e ");
      @include mini {
        transform: scale(0.35) translate(400px, -240px) rotate(7deg);
      }
    }
    &:after { // hero header bottom right orbits with bumps
      content: '';
      position: absolute;
      bottom: -26rem;
      right: -10rem;
      width: 388px;
      height: 454px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='388' height='453' viewBox='0 0 388 453' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M74.724 245.347C75.3416 246.3 76.0921 247.161 76.9527 247.903C83.5935 253.699 96.1738 258.045 139.173 246.398C163.007 239.802 186.346 231.531 209.016 221.647C211.191 223.98 213.63 226.744 216.467 230.087C218.274 232.211 220.75 233.658 223.488 234.191C226.226 234.724 229.064 234.312 231.537 233.021L231.543 233.018C234.012 231.726 235.969 229.633 237.093 227.083C238.217 224.533 238.441 221.676 237.729 218.982C236.618 214.745 235.745 211.155 235.074 208.028C255.502 195.466 275.041 181.511 293.551 166.264C332.261 134.106 334.411 120.577 330.96 110.752C330.766 110.193 330.529 109.65 330.253 109.128L329.457 107.605C329.103 106.919 328.682 106.269 328.2 105.665C320.326 95.711 303.168 94.8822 270.862 102.93C250.016 108.118 194.261 129.952 194.261 129.952C192.083 127.612 189.633 124.843 186.794 121.524C184.988 119.406 182.515 117.963 179.782 117.433C177.049 116.904 174.216 117.318 171.749 118.608L171.737 118.614C169.264 119.906 167.304 122 166.179 124.553C165.055 127.107 164.832 129.966 165.549 132.663C166.611 136.687 167.463 140.115 168.122 143.131C167.785 143.296 123.355 173.054 106.052 187.761C73.2915 215.61 69.976 228.138 71.0448 236.733C71.1499 237.508 71.3284 238.271 71.5778 239.012C71.7587 239.636 71.9903 240.245 72.2702 240.832C72.4278 241.236 72.6081 241.631 72.8103 242.015L73.6721 243.664C73.9804 244.25 74.332 244.812 74.724 245.347V245.347Z' stroke='%230621A4' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M83.6966 263.347C84.3143 264.301 85.0647 265.162 85.9254 265.904C92.5661 271.7 105.146 276.045 148.146 264.399C171.98 257.802 195.318 249.53 217.987 239.644C220.162 241.978 222.603 244.745 225.439 248.088C227.247 250.212 229.723 251.659 232.461 252.192C235.199 252.725 238.037 252.313 240.509 251.022L240.516 251.019C242.985 249.727 244.942 247.634 246.066 245.084C247.19 242.534 247.414 239.677 246.701 236.983C245.591 232.746 244.718 229.156 244.045 226.025C264.475 213.466 284.014 199.513 302.523 184.265C341.232 152.103 343.384 138.578 339.933 128.753C339.739 128.194 339.502 127.651 339.225 127.129L338.429 125.606C338.075 124.919 337.654 124.27 337.172 123.666C329.299 113.712 312.141 112.883 279.834 120.931C258.987 126.115 203.234 147.953 203.234 147.953C201.055 145.613 198.605 142.844 195.767 139.525C193.96 137.407 191.488 135.964 188.755 135.434C186.021 134.905 183.189 135.319 180.722 136.609L180.709 136.615C178.236 137.906 176.275 140 175.151 142.554C174.026 145.107 173.805 147.967 174.522 150.664C175.582 154.685 176.435 158.116 177.095 161.132C176.758 161.297 132.326 191.051 115.024 205.762C82.2656 233.614 78.947 246.136 80.0174 254.734C80.1222 255.509 80.3006 256.272 80.5504 257.013C80.7313 257.637 80.9629 258.246 81.2428 258.833C81.4004 259.237 81.5808 259.632 81.783 260.015L82.6447 261.664C82.9529 262.251 83.3045 262.813 83.6966 263.347Z' stroke='%231248DD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M92.9152 281.577C93.5329 282.53 94.2834 283.391 95.1441 284.133C101.785 289.929 114.365 294.275 157.363 282.625C181.198 276.031 204.537 267.76 227.206 257.874C229.381 260.207 231.822 262.974 234.658 266.317C236.466 268.441 238.942 269.888 241.68 270.421C244.418 270.954 247.255 270.542 249.728 269.251L249.734 269.248C252.204 267.956 254.161 265.863 255.284 263.313C256.408 260.763 256.632 257.907 255.92 255.213C254.81 250.975 253.936 247.386 253.264 244.255C273.693 231.694 293.231 217.74 311.74 202.491C350.451 170.333 352.602 156.808 349.152 146.982C348.957 146.424 348.721 145.881 348.444 145.358L347.647 143.833C347.293 143.147 346.873 142.498 346.391 141.896C338.518 131.941 321.36 131.113 289.051 139.158C268.206 144.345 212.453 166.182 212.453 166.182C210.273 163.84 207.824 161.073 204.986 157.755C203.179 155.636 200.707 154.194 197.973 153.664C195.24 153.134 192.408 153.548 189.941 154.839L189.928 154.845C187.455 156.136 185.494 158.23 184.37 160.783C183.245 163.337 183.023 166.197 183.741 168.893C184.8 172.914 185.654 176.346 186.313 179.362C185.977 179.526 141.545 209.281 124.241 223.988C91.4843 251.844 88.1658 264.365 89.2345 272.96C89.3403 273.736 89.5193 274.5 89.7692 275.242C89.9501 275.867 90.1817 276.475 90.4616 277.062C90.6191 277.466 90.7994 277.861 91.0017 278.245L91.8635 279.894C92.1717 280.48 92.5233 281.043 92.9152 281.577Z' stroke='%230090FF' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M103.886 302.182C104.502 303.135 105.252 303.995 106.113 304.736C112.754 310.532 125.336 314.881 168.333 303.231C192.168 296.636 215.507 288.365 238.176 278.479C240.351 280.813 242.792 283.58 245.628 286.923C247.437 289.046 249.912 290.492 252.65 291.025C255.387 291.557 258.225 291.145 260.697 289.854L260.703 289.851C263.172 288.559 265.13 286.467 266.254 283.918C267.378 281.368 267.602 278.512 266.89 275.818C265.78 271.581 264.907 267.991 264.234 264.861C284.664 252.302 304.203 238.347 322.711 223.097C361.421 190.939 363.573 177.414 360.122 167.588C359.928 167.03 359.691 166.487 359.414 165.964L358.617 164.438C358.263 163.753 357.843 163.104 357.362 162.501C349.488 152.547 332.33 151.718 300.022 159.763C279.177 164.951 223.421 186.785 223.421 186.785C221.243 184.445 218.794 181.679 215.954 178.357C214.147 176.239 211.675 174.797 208.942 174.267C206.209 173.738 203.377 174.151 200.909 175.441L200.897 175.447C198.424 176.739 196.464 178.834 195.34 181.388C194.216 183.942 193.994 186.802 194.711 189.499C195.771 193.52 196.623 196.948 197.282 199.964C196.947 200.132 152.515 229.887 135.212 244.594C102.453 272.446 99.1362 284.971 100.205 293.566C100.31 294.341 100.489 295.104 100.738 295.845C100.919 296.47 101.151 297.08 101.432 297.668C101.589 298.072 101.77 298.467 101.972 298.851L102.834 300.5C103.142 301.086 103.494 301.648 103.886 302.182V302.182Z' stroke='%236CADE7' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M113.845 322.262C114.462 323.216 115.213 324.077 116.074 324.819C122.715 330.615 135.295 334.96 178.294 323.314C202.128 316.718 225.467 308.446 248.137 298.562C250.312 300.896 252.751 303.66 255.589 307.006C257.397 309.129 259.873 310.575 262.611 311.108C265.348 311.64 268.185 311.228 270.658 309.937L270.664 309.934C273.133 308.642 275.09 306.549 276.214 303.999C277.338 301.449 277.562 298.592 276.85 295.898C275.741 291.664 274.868 288.074 274.195 284.944C294.625 272.385 314.164 258.43 332.671 243.18C371.382 211.022 373.534 197.497 370.083 187.671C369.888 187.112 369.651 186.568 369.373 186.044L368.577 184.521C368.223 183.835 367.802 183.185 367.321 182.581C359.449 172.63 342.289 171.798 309.982 179.846C289.137 185.034 233.382 206.868 233.382 206.868C231.204 204.528 228.755 201.762 225.915 198.44C224.109 196.322 221.636 194.879 218.903 194.35C216.169 193.82 213.337 194.234 210.87 195.524L210.858 195.53C208.385 196.822 206.426 198.917 205.301 201.47C204.177 204.023 203.954 206.882 204.67 209.578C205.732 213.603 206.584 217.031 207.243 220.047C206.908 220.214 162.476 249.969 145.173 264.676C112.414 292.529 109.097 305.054 110.166 313.649C110.271 314.423 110.45 315.187 110.699 315.928C110.88 316.553 111.112 317.163 111.393 317.751C111.55 318.154 111.73 318.548 111.931 318.93L112.795 320.582C113.102 321.168 113.453 321.729 113.845 322.262V322.262Z' stroke='%23D8ECFD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M125.651 346.615C126.268 347.567 127.018 348.427 127.879 349.168C134.519 354.964 147.1 359.31 190.099 347.663C213.933 341.065 237.272 332.794 259.942 322.912C262.115 325.242 264.556 328.009 267.392 331.352C269.2 333.476 271.676 334.923 274.414 335.456C277.152 335.99 279.99 335.577 282.463 334.286L282.469 334.283C284.938 332.991 286.896 330.899 288.02 328.348C289.144 325.798 289.367 322.942 288.654 320.247C287.545 316.013 286.672 312.424 286 309.293C306.429 296.732 325.967 282.778 344.476 267.529C383.187 235.371 385.338 221.846 381.886 212.017C381.692 211.459 381.455 210.916 381.178 210.393L380.382 208.87C380.028 208.184 379.607 207.534 379.125 206.931C371.253 196.979 354.094 196.148 321.787 204.196C300.94 209.38 245.187 231.217 245.187 231.217C243.008 228.877 240.558 226.108 237.72 222.789C235.913 220.671 233.441 219.229 230.708 218.699C227.974 218.169 225.142 218.583 222.675 219.873L222.662 219.88C220.189 221.171 218.229 223.265 217.105 225.819C215.98 228.372 215.758 231.232 216.475 233.928C217.535 237.949 218.388 241.38 219.048 244.396C218.711 244.561 174.279 274.316 156.977 289.026C124.219 316.878 120.9 329.4 121.971 337.998C122.076 338.773 122.254 339.536 122.504 340.277C122.685 340.903 122.917 341.512 123.198 342.1C123.355 342.503 123.534 342.897 123.736 343.28L124.598 344.929C124.907 345.516 125.259 346.08 125.651 346.615Z' stroke='%23F0F7FD' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
      @include mini {
        transform: translate(-140px, 70px) scale(0.4);
      }
    }
    .echo_1 {
      &:before { // middle left star
        content: '';
        position: absolute;
        left: -6.5rem;
        top: 19rem;
        width: 47px;
        height: 40px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='47' height='40' viewBox='0 0 47 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.56641 19.8928H46.3808' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M19.7949 38.7835V1' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M1 38.6903L38.5939 1.09521' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M33.1548 33.2516L6.4375 6.53418' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
        @include mini {
          left: -6rem;
          top: 12rem;
          transform: scale(0.7);
        }
      }
      &:after { // bottom right star
        content: '';
        position: absolute;
        right: -6rem;
        bottom: 1rem;
        width: 69px;
        height: 57px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='69' height='57' viewBox='0 0 69 57' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M56.2692 55.7928C35.3166 30.0474 34.8512 29.9588 31.7662 51.6991C33.9499 29.5441 34.6912 29.5945 23.1408 30.978C33.2024 27.7267 32.7454 28.0342 1.04688 13.1462C32.8213 27.4108 33.0297 27.1772 12.8246 1.27161C33.7751 27.0171 34.2426 27.1055 37.3276 5.3653C35.144 27.5204 34.4027 27.4698 45.9529 26.0863C35.8915 29.3377 36.3484 29.0302 68.0469 43.9182C36.2726 29.6535 36.062 29.8873 56.2692 55.7928Z' stroke='%231248DB' stroke-width='1.58364' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
        @include mini {
          bottom: unset;
          right: 9rem;
          top: -6rem;
          transform: scale(0.75);
        }
      }
    }
  }
}

::v-deep #hero-header-text {
  padding-top: 0;
  padding-bottom: 7.5rem;
  .text-block {
    .heading {
      font-size: 4.375rem;
      line-height: leading(75, 70);
      margin-bottom: 1.5rem;
    }
    @include mini {
      .heading {
        @include fontSize_Huge;
      }
    }
  }
  .ticker {
    @include mini {
      padding-right: 6rem;
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 1
#section_1 {
  padding-top: 4.125rem; // 1.375rem * 3
  @include medium {
    padding-top: 2.25rem;
  }
  @include mini {
    padding-top: 0.75rem;
  }
}

::v-deep #logo-gallery {
  position: relative;
  padding-top: 6rem;
  padding-bottom: 0;
  height: 17.375rem;
  &:before {
    border-top-left-radius: 17.375rem;
    @include medium {
      border-top-left-radius: 12rem;
    }
    @include mini {
      border-top-left-radius: 4.75rem;
    }
  }
  @include small {
    padding-top: 2rem;
    height: auto;
  }
  .slider-block {
    margin: 0 -2rem;
    transform: translateX(2rem);
    @include medium {
      margin: 0;
      transform: translateX(3rem);
    }
    @include small {
      transform: none;
    }
    @include mini {
      margin-right: 2rem;
    }
    @include tiny {
      margin-right: 1rem;
    }
  }
  .card-list {
    flex-wrap: nowrap;
    .card {
      margin: 0;
      display: flex;
      .image {
        margin-bottom: 0;
      }
    }
    @include small {
      flex-wrap: wrap;
      .card {
        margin-bottom: 1.5rem;
        flex-grow: 1;
        &:first-child {
          margin: 0 5rem;
        }
        &:last-child {
          margin: 0 5rem;
        }
      }
    }
    @include mini {
      .card {
        width: 50%;
        &:first-child {
          margin: 0 2.5rem;
        }
        &:last-child {
          margin: 0 2.5rem;
        }
      }
    }
  }
}

::v-deep #intro_1 {
  position: relative;
  padding-top: 0;
  &:before {
    border-bottom-left-radius: 5rem;
    @include mini {
      border-bottom-left-radius: 4.75rem;
    }
  }
  img {
    box-shadow: none;
  }
  @include small {
    .image-block {
      margin-bottom: 3rem;
    }
  }
  @include mini {
    padding-bottom: 3rem;
  }
  .text-block {
    .heading {
      line-height: leading(32, 24);
      margin-bottom: 1.5rem;
      @include mini {
        margin-bottom: 0.75rem;
      }
    }
  }
}

::v-deep #logo-gallery,
::v-deep #intro_1 {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: calc(100% + 50rem);
    height: 100%;
    background-color: $polar;
  }
  @include medium {
    &:before {
      left: calc(#{$backgroundLayers__Left__Medium} + 2.25rem);
    }
  }
  @include mini {
    &:before {
      left: calc(#{$backgroundLayers__Left__Mini} + 0.75rem);
    }
  }
}

::v-deep #intro_2 {
  padding-top: 9rem;
  .text-block {
    .heading {
      margin-bottom: 1.75rem;
      @include fontSize_ExtraLarge;
      line-height: leading(40, 24);
      a {
        color: #2E38E6;
        @include fontSize_ExtraLarge;
        @include fontWeight_SemiBold;
        line-height: leading(40, 24);
      }
    }
  }
  .image-block {
    margin-right: calc(-1.5 * #{math.div($containerWidth, 12)});
  }
  @include medium {
    .image-block {
      margin-right: 0;
      margin-left: -1rem;
    }
  }
  @include mini {
    padding-top: 5rem;
  }
}

::v-deep #banner_1 {
  position: relative;
  padding-top: 14rem;
  margin-top: 3rem;
  @include small {
    margin-top: 0;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: calc(100% + 50rem);
    height: 100%;
    background-color: $polar;
    border-top-left-radius: 5rem;
  }
  @include medium {
    &:before {
      left: calc(#{$backgroundLayers__Left__Medium} + 2.25rem);
    }
  }
  @include mini {
    padding-top: 10rem;
    margin-bottom: 0;
    &:before {
      left: calc(#{$backgroundLayers__Left__Mini} + 0.75rem);
    }
  }
  .blocks {
    @include small {
      .text-block {
        padding-top: 3rem;
        padding-bottom: calc(2rem + 294px);
        .button-row {
          margin-left: -1rem;
        }
      }
    }
    &.left {
      position: relative;
      padding-top: 2rem;
      padding-bottom: 1rem;
      .heading {
        font-size: 2.8125rem;
        @include fontWeight_Medium;
        line-height: leading(65, 45);
        letter-spacing: 0.4px;
        padding-right: 1rem;
        @include medium {
          padding-right: 3rem;
        }
        @include small {
          padding-right: 0;
        }
      }
      &:after { // echo cone with stars
        content: '';
        position: absolute;
        right: 0;
        top: -1.5rem;
        width: 268px;
        height: 294px;
        transform: translateX(100%);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='268' height='294' viewBox='0 0 268 294' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M30.0518 219.551C32.5693 222.453 33.9233 225.834 34.1134 228.925C34.3034 232.015 33.3348 234.756 31.2832 236.536C29.2315 238.316 26.3806 238.888 23.3485 238.264C20.3152 237.639 17.1594 235.821 14.6419 232.919C12.1244 230.017 10.7704 226.636 10.5803 223.545C10.3903 220.456 11.3589 217.714 13.4105 215.934C15.4622 214.154 18.3131 213.582 21.3452 214.207C24.3785 214.831 27.5343 216.649 30.0518 219.551Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M61.5323 192.234C66.4189 197.867 69.0708 204.455 69.444 210.524C69.8171 216.591 67.917 222.081 63.7756 225.674C59.6341 229.267 53.931 230.373 47.9768 229.147C42.0215 227.92 35.8737 224.365 30.9871 218.732C26.1004 213.099 23.4486 206.511 23.0754 200.442C22.7022 194.374 24.6024 188.885 28.7438 185.292C32.8852 181.699 38.5884 180.593 44.5425 181.819C50.4979 183.045 56.6456 186.601 61.5323 192.234Z' stroke='%231248DD' stroke-width='2'/%3e%3cpath d='M93.4853 164.513C100.865 173.019 104.882 182.982 105.448 192.184C106.014 201.385 103.134 209.766 96.7933 215.267C90.453 220.767 81.7488 222.435 72.72 220.576C63.69 218.717 54.3941 213.333 47.0146 204.826C39.6351 196.32 35.6176 186.357 35.0517 177.155C34.4859 167.954 37.3663 159.572 43.7066 154.072C50.0468 148.572 58.7511 146.904 67.7799 148.763C76.8099 150.622 86.1058 156.006 93.4853 164.513Z' stroke='%230090FF' stroke-width='2'/%3e%3cpath d='M125.241 136.979C134.992 148.22 140.309 161.393 141.058 173.576C141.807 185.758 137.994 196.89 129.562 204.205C121.13 211.521 109.57 213.724 97.6162 211.262C85.6611 208.8 73.3701 201.677 63.6189 190.437C53.8676 179.196 48.5509 166.023 47.8017 153.84C47.0526 141.658 50.8656 130.525 59.2978 123.21C67.7301 115.895 79.2896 113.692 91.2435 116.154C103.199 118.615 115.49 125.739 125.241 136.979Z' stroke='%236CADE7' stroke-width='2'/%3e%3cpath d='M157.293 109.381C169.579 123.543 176.284 140.147 177.229 155.516C178.174 170.883 173.364 184.955 162.697 194.21C152.029 203.464 137.418 206.238 122.338 203.133C107.258 200.028 91.7659 191.046 79.4803 176.884C67.1947 162.722 60.4896 146.117 59.5445 130.749C58.5995 115.382 63.4091 101.309 74.0768 92.055C84.7445 82.8007 99.3551 80.0261 114.435 83.1312C129.516 86.2366 145.008 95.2187 157.293 109.381Z' stroke='%23D8ECFD' stroke-width='2'/%3e%3cpath d='M188.978 81.8914C203.658 98.8138 211.675 118.66 212.805 137.038C213.936 155.415 208.184 172.266 195.404 183.352C182.624 194.439 165.131 197.754 147.098 194.04C129.063 190.327 110.547 179.588 95.8671 162.666C81.1868 145.743 73.1699 125.897 72.0397 107.519C70.9096 89.1421 76.6608 72.2917 89.4408 61.205C102.221 50.1183 119.714 46.8037 137.748 50.5169C155.782 54.2305 174.298 64.969 188.978 81.8914Z' stroke='%23F0F7FD' stroke-width='2'/%3e%3cpath d='M22.3379 50.1289L32.1596 86.784' stroke='%230090FF' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M9.3531 67.9159L42.4746 59.041' stroke='%230090FF' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M5.02025 51.4178L46.8069 75.5425' stroke='%230090FF' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M17.3411 78.3272L34.4863 48.6309' stroke='%230090FF' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M174.322 254.631C187.19 238.82 187.476 238.765 189.37 252.117C188.029 238.511 187.574 238.542 194.668 239.391C188.488 237.395 188.769 237.583 208.236 228.44C188.722 237.201 188.594 237.057 201.003 221.147C188.137 236.959 187.85 237.013 185.955 223.662C187.296 237.268 187.751 237.237 180.658 236.387C186.837 238.384 186.556 238.195 167.089 247.338C186.603 238.578 186.732 238.721 174.322 254.631Z' stroke='%230621A4' stroke-width='1.58364' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
        @include medium {
          right: 3rem;
        }
        @include small {
          top: unset;
          right: unset;
          left: 0;
          bottom: 2.5rem;
          transform: none;
        }
      }
    }
  }
  .background-layers {
    position: absolute;
    top: 0;
    left: -5.5rem;
    width: calc(100vw + 50rem);
    height: 100%;
    z-index: 5;
    @include small {
      left: -4rem;
    }
    @include mini {
      left: -3rem;
    }
  }
}

::v-deep #intro_3, {
  position: relative;
  padding-top: 8.75rem;
  padding-bottom: 7rem;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(#{$backgroundLayers__Left__Desktop} + 4.125rem);
    width: calc(100% + 50rem);
    height: 100%;
    background-color: $polar;
    border-bottom-left-radius: 17.375rem;
  }
  @include medium {
    &:before {
      height: calc(100% - 1.875rem);
      border-bottom-left-radius: 12rem;
      left: calc(#{$backgroundLayers__Left__Medium} + 2.25rem);
    }
  }
  @include small {
    padding-top: 1rem;
    [class~="grid"],
    [class*="grid-"],
    [class*="grid_"] {
      flex-direction: column-reverse;
    }
  }
  @include mini {
    &:before {
      left: calc(#{$backgroundLayers__Left__Mini} + 0.75rem);
      border-bottom-left-radius: 4.75rem;
      height: calc(100% - 3.375rem);
    }
  }
  .image-block {
    position: relative;
    padding-top: 6.25rem;
    padding-left: 2rem;
    margin-right: -2rem;
    &:before { // orbits with bumps
      content: '';
      position: absolute;
      top: -3rem;
      left: -4rem;
      width: 200px;
      height: 200px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='216' height='213' viewBox='0 0 216 213' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M185.372 68.1012C184.884 67.6709 184.338 67.3124 183.75 67.0364C179.198 64.8663 171.597 64.411 149.701 77.455C137.586 84.7633 126.002 92.9179 115.036 101.858C113.478 100.908 111.707 99.7595 109.629 98.3548C108.305 97.463 106.718 97.0472 105.128 97.1755C103.537 97.3037 102.037 97.9685 100.874 99.0607L100.871 99.0635C99.7093 100.156 98.9536 101.611 98.7274 103.189C98.5013 104.767 98.818 106.375 99.6258 107.75C100.891 109.913 101.925 111.757 102.778 113.378C93.4579 123.446 84.8432 134.145 76.9953 145.399C60.6249 169.085 61.5242 176.868 64.9398 181.75C65.1329 182.028 65.3469 182.29 65.58 182.536L66.2532 183.252C66.554 183.576 66.8861 183.869 67.2446 184.127C73.1169 188.398 82.698 186.21 99.2574 176.797C109.944 170.727 137.296 150.103 137.296 150.103C138.857 151.056 140.634 152.204 142.709 153.595C144.031 154.484 145.616 154.898 147.203 154.768C148.791 154.639 150.288 153.974 151.448 152.883L151.454 152.878C152.618 151.785 153.375 150.329 153.601 148.749C153.827 147.169 153.509 145.559 152.698 144.184C151.494 142.132 150.495 140.373 149.667 138.813C149.827 138.67 169.721 115.428 176.987 104.657C190.743 84.2625 190.641 76.8522 188.726 72.2799C188.549 71.869 188.333 71.4761 188.081 71.1063C187.886 70.7902 187.664 70.4906 187.419 70.2105C187.27 70.0121 187.11 69.8223 186.94 69.642L186.211 68.8663C185.95 68.5907 185.67 68.3349 185.372 68.1012Z' stroke='%230621A4' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M177.483 59.4778C176.996 59.0475 176.45 58.6889 175.861 58.4128C171.309 56.2427 163.708 55.7874 141.813 68.833C129.698 76.1399 118.113 84.2941 107.147 93.2346C105.589 92.2843 103.818 91.136 101.74 89.7312C100.417 88.8398 98.8296 88.4243 97.239 88.5525C95.6484 88.6808 94.1485 89.3453 92.9849 90.4372L92.9819 90.44C91.8206 91.5325 91.0649 92.987 90.8387 94.5653C90.6126 96.1435 90.9294 97.7518 91.7371 99.1264C93.0019 101.29 94.0363 103.133 94.8894 104.754C85.5697 114.823 76.9554 125.523 69.1079 136.777C52.7362 160.461 53.6354 168.245 57.0511 173.126C57.2442 173.404 57.4582 173.667 57.6912 173.912L58.3657 174.63C58.6661 174.953 58.9978 175.246 59.3559 175.503C65.2282 179.774 74.8093 177.587 91.37 168.175C102.055 162.104 129.408 141.479 129.408 141.479C130.97 142.434 132.745 143.581 134.821 144.972C136.142 145.861 137.727 146.274 139.315 146.145C140.902 146.015 142.399 145.351 143.559 144.26L143.565 144.254C144.729 143.162 145.486 141.706 145.712 140.126C145.939 138.545 145.62 136.935 144.809 135.561C143.606 133.508 142.606 131.749 141.778 130.189C141.938 130.047 161.833 106.805 169.1 96.0351C182.854 75.639 182.753 68.2286 180.839 63.6578C180.661 63.2466 180.445 62.8532 180.193 62.4828C179.997 62.1666 179.775 61.867 179.531 61.5869C179.382 61.3885 179.221 61.1987 179.051 61.0185L178.322 60.2428C178.062 59.9673 177.781 59.7116 177.483 59.4778Z' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M168.263 49.8161C167.776 49.3861 167.231 49.028 166.642 48.7527C162.09 46.5826 154.488 46.1258 132.593 59.1713C120.478 66.4783 108.893 74.6325 97.9274 83.573C96.3692 82.6226 94.598 81.4744 92.5201 80.0696C91.1966 79.1784 89.6097 78.7631 88.0193 78.8916C86.4289 79.0202 84.9293 79.6849 83.7661 80.7771L83.7631 80.7799C82.6017 81.8719 81.8458 83.3261 81.6194 84.9041C81.3929 86.4821 81.7094 88.0903 82.517 89.4648C83.7818 91.6282 84.8162 93.4714 85.6692 95.0927C76.3488 105.161 67.7345 115.861 59.8878 127.116C43.5161 150.8 44.4153 158.583 47.831 163.465C48.0241 163.742 48.2381 164.005 48.4711 164.25L49.1457 164.968C49.4461 165.291 49.7777 165.584 50.1358 165.842C56.008 170.113 65.5892 167.925 82.1499 158.513C92.8352 152.442 120.189 131.819 120.189 131.819C121.75 132.773 123.525 133.919 125.602 135.312C126.924 136.2 128.508 136.613 130.096 136.484C131.683 136.355 133.18 135.69 134.341 134.599L134.346 134.594C135.51 133.501 136.267 132.045 136.493 130.464C136.718 128.884 136.4 127.274 135.589 125.899C134.385 123.847 133.388 122.089 132.559 120.529C132.718 120.385 152.613 97.1433 159.879 86.3734C173.635 65.9787 173.532 58.567 171.619 53.9962C171.442 53.5855 171.226 53.1925 170.974 52.8226C170.778 52.5059 170.556 52.2058 170.311 51.9253C170.162 51.7269 170.001 51.5371 169.831 51.3568L169.102 50.5812C168.842 50.3056 168.561 50.0499 168.263 49.8161V49.8161Z' stroke='%230090FF' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M159.68 40.2877C159.193 39.8573 158.647 39.4987 158.058 39.2229C153.506 37.0528 145.905 36.5975 124.009 49.6416C111.894 56.9494 100.31 65.1036 89.3434 74.0432C87.7853 73.0929 86.0154 71.9461 83.9361 70.5398C82.6126 69.6487 81.0257 69.2333 79.4354 69.3618C77.845 69.4904 76.3454 70.1551 75.1822 71.2472L75.1792 71.25C74.0179 72.3424 73.2623 73.797 73.0361 75.3753C72.8099 76.9535 73.1267 78.5618 73.9345 79.9364C75.1978 82.0983 76.2323 83.9415 77.0853 85.5628C67.7649 95.6311 59.1506 106.331 51.3039 117.586C34.9322 141.27 35.8314 149.053 39.2471 153.935C39.4406 154.213 39.6551 154.476 39.8886 154.722L40.5618 155.438C40.8627 155.762 41.1948 156.055 41.5532 156.313C47.4243 160.583 57.0067 158.397 73.566 148.983C84.2513 142.912 111.605 122.289 111.605 122.289C113.166 123.243 114.941 124.389 117.018 125.782C118.34 126.671 119.924 127.084 121.512 126.955C123.1 126.825 124.596 126.161 125.757 125.07L125.763 125.064C126.926 123.971 127.683 122.515 127.909 120.936C128.135 119.356 127.817 117.746 127.006 116.371C125.802 114.317 124.804 112.559 123.976 110.999C124.134 110.856 144.029 87.6136 151.295 76.8438C165.051 56.4492 164.949 49.0373 163.035 44.4665C162.857 44.0559 162.642 43.663 162.39 43.2929C162.194 42.9762 161.972 42.6761 161.727 42.3956C161.578 42.1977 161.418 42.0084 161.248 41.8286L160.518 41.0515C160.258 40.7763 159.978 40.521 159.68 40.2877V40.2877Z' stroke='%2373B4ED' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M149.423 28.6901C148.936 28.2603 148.391 27.9022 147.802 27.6266C143.25 25.4566 135.649 25.0012 113.753 38.0453C101.639 45.3539 90.0546 53.508 79.0875 62.4469C77.5306 61.498 75.7595 60.3498 73.6816 58.9451C72.3581 58.0533 70.7711 57.6375 69.1804 57.7658C67.5897 57.8941 66.0897 58.5588 64.9263 59.6511L64.9233 59.6539C63.7617 60.7461 63.0058 62.2007 62.7796 63.779C62.5535 65.3574 62.8705 66.9657 63.6786 68.3402C64.9421 70.5022 65.9764 72.3453 66.8294 73.9666C57.5097 84.0355 48.8955 94.7352 41.048 105.989C24.6763 129.674 25.5755 137.457 28.9925 142.34C29.1856 142.618 29.3996 142.881 29.6327 143.126L30.3059 143.842C30.6067 144.166 30.9388 144.459 31.2973 144.717C37.1684 148.987 46.7508 146.8 63.3101 137.387C73.9968 131.318 101.349 110.693 101.349 110.693C102.91 111.646 104.687 112.795 106.762 114.185C108.084 115.074 109.669 115.488 111.256 115.359C112.844 115.229 114.34 114.564 115.501 113.473L115.507 113.468C116.67 112.375 117.427 110.919 117.653 109.339C117.879 107.759 117.561 106.149 116.75 104.774C115.547 102.722 114.548 100.963 113.719 99.4031C113.88 99.2605 133.774 76.0187 141.039 65.2474C154.795 44.8528 154.694 37.4424 152.779 32.8702C152.602 32.4594 152.386 32.0665 152.134 31.6966C151.938 31.3799 151.716 31.0798 151.471 30.7993C151.322 30.6014 151.162 30.412 150.992 30.2323L150.263 29.4566C150.003 29.1806 149.722 28.9243 149.423 28.6901Z' stroke='%23D8EBFB' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
    }
    img {
      border-radius: unset;
      box-shadow: unset;
    }
    &:after { // star
      content: '';
      position: absolute;
      top: 9rem;
      right: -2rem;
      width: 67px;
      height: 55px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='68' height='58' viewBox='0 0 68 58' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.1543 28.8071H67.8904' stroke='%23154ED9' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M28.6406 56.6979V0.913086' stroke='%23154ED9' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M0.890625 56.5603L56.3955 1.05371' stroke='%23154ED9' stroke-width='1.58364' stroke-linejoin='round'/%3e%3cpath d='M48.3643 48.5305L8.91797 9.08398' stroke='%23154ED9' stroke-width='1.58364' stroke-linejoin='round'/%3e%3c/svg%3e ");
    }
    @include medium {
      &:after {
        top: 4rem;
      }
    }
    @include small {
      margin-left: -2rem;
      margin-right: 0;
      margin-top: 2rem;
      &:before {
        transform: scale(0.8);
      }
    }
    @include mini {
      margin-left: 0;
      margin-top: 0;
      &:before {
        transform: scale(0.6);
      }
      &:after {
        top: 3.5rem;
        transform: scale(0.5);
      }
    }
  }
  .text-block {
    .heading {
      @include fontWeight_SemiBold;
      margin-bottom: 1.25rem;
      @include mini {
        @include fontWeight_Medium;
        margin-bottom: 0.625rem;
      }
    }
    .description {
      a {
        color: #2E38E6;
        @include fontSize_Regular;
        @include fontWeight_SemiBold;
      }
    }
    @include mini {
      margin-bottom: 3rem;
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 2
#section_2 {
}

::v-deep #intro_4 {
  padding-top: 7rem;
  padding-bottom: 3rem;
  .text-block {
    padding-top: 5rem;
    .heading {
      margin-bottom: 3.25rem;
      line-height: leading(60, 55);
      @include mini {
        @include fontWeight_Medium;
        line-height: leading(65, 45);
        letter-spacing: 0.4px;
        margin-bottom: 1.5rem;
      }
    }
    .description {
      margin-bottom: 1.5rem;
    }
  }
  .image-block {
    margin-right: calc(-3 * #{math.div($containerWidth, 12)});
  }
  @include medium {
    .text-block {
      padding-top: 0;
      padding-bottom: 3rem;
    }
    .image-block {
      margin: 0;
      margin-left: -2rem;
    }
  }
  @include mini {
    padding-top: 6rem;
    .text-block {
      padding-top: 0;
      margin-bottom: 1rem;
      .heading {
        font-size: 2.8125rem;
      }
    }
    .image-block {
      margin-left: -1rem;
      margin-right: -7rem;
      padding: 3rem 0;
    }
  }
}
// /////////////////////////////////////////////////////////////////// Section 3
#section_3 {

}

::v-deep #callout-1 {
  .column-content.left {
    margin-left: -2rem;
  }
  .text-block {
    padding: 1rem 0;
    padding-left: 5.25rem;
    .heading {
      font-size: 2.8125rem;
      @include fontWeight_SemiBold;
      line-height: leading(60, 45);
      letter-spacing: 0.72px;
      margin-bottom: 0.75rem;
    }
  }
  .background-layers {
    position: absolute;
    width: calc(100% + 100rem);
    height: 100%;
    top: 0;
    left: 0;
  }
  @include mini {
    .text-block {
      padding: 4rem 0;
      padding-left: 0;
      .heading {
        font-size: 2.8125rem;
      }
    }
    .background-layers {
      left: -3rem;
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 4
#section_4 {
  position: relative;
  z-index: 2;
}

::v-deep #case_studies {
  padding-top: 8rem;
  .card-list-block {
    .heading {
      .case-study-label {
        @include fontWeight_Regular;
      }
    }
    .button-row {
      justify-content: center;
    }
    .button.type__E {
      color: $white;
      box-shadow: 0px 0 10px rgba(0, 0, 0, 0.15);
      transition: 200ms ease;
      &:hover {
        box-shadow: 0 0 37px 0 rgba(#70B4F0, 0.9);
      }
    }
  }
  @include mini {
    padding-top: 5rem;
    .card-list-block {
      .heading {
        font-size: 2.1875rem;
        margin-bottom: 2rem;
      }
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 5
::v-deep #section_5 {
  position: relative;
  z-index: 2;
  .block {
    position: relative;
    z-index: 10;
  }
  .text-block {
    margin-left: 3.125rem;
    .heading {
      @include fontSize_Huge;
      @include fontWeight_SemiBold;
      letter-spacing: 1.1px;
      line-height: leading(65, 55);
      margin-bottom: 2.25rem;
    }
  }
  .background-layers {
    position: absolute;
    width: 200vw;
    height: calc(100% + 8.25rem);
    top: -4.125rem;
    left: calc(-1 * (#{math.div($containerWidth, 6)}) );
  }
  @include mini {
    .text-block {
      margin-left: 0;
      .description {
        margin-left: 3.125rem;
      }
    }
    .background-layers {
      left: -2rem;
      top: -11.5rem;
      height: calc(100% + 15.5rem);
    }
  }
  &:before {
    content: '';
    position: absolute;
    z-index: -3;
    bottom: 13rem;
    left: -9999px;
    right: -9999px;
    margin: 0 auto;
    width: 2105px;
    height: 2480px;
    transform: translateX(-30rem) translateY(82%) scale(0.65);
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='2105' height='2480' viewBox='0 0 2105 2480' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1858.19 268.429C1824.61 246.004 1801.2 215.308 1790.47 183.846C1779.73 152.384 1781.68 120.213 1798.72 94.7074C1815.75 69.2019 1844.72 55.0756 1877.9 52.9397C1911.07 50.8036 1948.39 60.6705 1981.97 83.0954C2015.54 105.52 2038.96 136.216 2049.69 167.679C2060.42 199.141 2058.47 231.311 2041.44 256.817C2024.4 282.323 1995.43 296.449 1962.26 298.585C1929.08 300.721 1891.76 290.854 1858.19 268.429Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1625.82 616.408C1562.06 573.825 1517.58 515.519 1497.18 455.711C1476.77 395.905 1480.45 334.655 1512.91 286.054C1545.37 237.454 1600.54 210.59 1663.6 206.53C1726.67 202.47 1797.56 221.225 1861.32 263.809C1925.08 306.392 1969.56 364.698 1989.96 424.506C2010.37 484.312 2006.69 545.562 1974.23 594.163C1941.77 642.763 1886.6 669.627 1823.54 673.687C1760.48 677.747 1689.58 658.992 1625.82 616.408Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1389.96 969.552C1294.45 905.759 1227.8 818.4 1197.22 728.767C1166.64 639.136 1172.14 547.289 1220.83 474.388C1269.52 401.487 1352.25 361.221 1446.76 355.136C1541.27 349.051 1647.5 377.159 1743.01 440.953C1838.53 504.747 1905.18 592.106 1935.76 681.738C1966.34 771.37 1960.84 863.217 1912.15 936.117C1863.46 1009.02 1780.73 1049.28 1686.22 1055.37C1591.71 1061.45 1485.48 1033.35 1389.96 969.552Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M1155.55 1320.35C1029.83 1236.38 942.078 1121.38 901.817 1003.37C861.556 885.366 868.793 764.409 932.925 668.39C997.056 572.37 1106.02 519.353 1230.44 511.341C1354.87 503.329 1494.71 540.336 1620.44 624.31C1746.17 708.283 1833.92 823.282 1874.18 941.289C1914.44 1059.3 1907.2 1180.25 1843.07 1276.27C1778.94 1372.29 1669.98 1425.31 1545.55 1433.32C1421.12 1441.33 1281.28 1404.33 1155.55 1320.35Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M918.437 1672.57C760.423 1567.03 650.132 1422.49 599.526 1274.17C548.92 1125.84 558.009 973.774 638.641 853.049C719.273 732.324 856.257 665.681 1012.66 655.61C1169.06 645.54 1344.81 692.056 1502.83 797.593C1660.84 903.13 1771.13 1047.67 1821.74 1195.99C1872.35 1344.32 1863.26 1496.39 1782.62 1617.11C1701.99 1737.84 1565.01 1804.48 1408.61 1814.55C1252.21 1824.62 1076.45 1778.1 918.437 1672.57Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M684.544 2022.75C496.024 1896.84 364.434 1724.4 304.053 1547.42C243.673 1370.44 254.512 1188.99 350.734 1044.92C446.957 900.851 610.421 821.333 797.029 809.318C983.638 797.302 1193.33 852.803 1381.85 978.715C1570.38 1104.63 1701.97 1277.07 1762.35 1454.05C1822.73 1631.03 1811.89 1812.48 1715.66 1956.55C1619.44 2100.62 1455.98 2180.14 1269.37 2192.15C1082.76 2204.17 873.065 2148.67 684.544 2022.75Z' stroke='%230621A4' stroke-width='2'/%3e%3c/svg%3e ");
  }
}

::v-deep #faq_accordion {
  .image-block {
    img {
      width: 4.6875rem;
      margin-left: auto;
      transform: translate(1rem, 1rem);
    }
    @include mini {
      margin-bottom: 1.5rem;
      transform: translateX(2rem);
    }
  }
  .text-block {
    .description {
      a {
        @include fontWeight_SemiBold;
      }
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 6
::v-deep #section_6 {
  padding-bottom: 6.25rem;
  @include mini {
    padding-bottom: 0;
  }
}

::v-deep #events_hackathons {
  padding-top: 6rem;
  padding-top: 8rem;
  .text-block {
    transform: translateX(2rem);
    @include medium {
      transform: none;
    }
    .heading {
      @include fontSize_Huge;
      @include fontWeight_SemiBold;
      line-height: leading(65, 55);
      margin-right: -10rem;
      @include medium {
        margin-right: 0;
      }
      @include small {
        margin-right: -3rem;
      }
      @include mini {
        margin-right: 0;
      }
    }
    .button-row {
      margin-top: 2.5rem;
    }
  }
  .card-list-block {
    margin-top: 12.5rem;
    position: relative;
    @include medium {
      margin-top: 2.875rem;
    }
    &:before {
      content: '';
      position: absolute;
      top: -0.5rem;
      right: -1rem;
      width: 224px;
      height: 230px;
      transform: translateY(-100%);
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='224' height='230' viewBox='0 0 224 230' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M119.282 110.741L111.23 107.67L111.501 117.219' stroke='%23F0F7FD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M133.096 102.107L125.044 99.0355L125.317 108.585' stroke='%23D8EBFB' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M146.923 93.4718L138.872 90.4007L139.143 99.9496' stroke='%2373B4ED' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M160.742 84.837L152.691 81.7659L152.964 91.3157' stroke='%230090FF' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M174.563 76.2022L166.512 73.1312L166.783 82.68' stroke='%231248DD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M190.353 66.6261L182.301 63.555L182.573 73.1039' stroke='%230621A4' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M182.292 63.5556C203.079 95.0716 204.182 133.735 184.756 149.913C165.33 166.091 132.731 153.657 111.945 122.14C91.1579 90.6244 90.0549 51.9609 109.481 35.7832C128.038 20.3285 158.617 30.9851 179.436 59.4444' stroke='%230621A4' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M166.509 73.1288C187.296 104.645 188.399 143.308 168.973 159.486C149.547 175.664 116.949 163.23 96.1619 131.714C75.3752 100.198 74.2721 61.5342 93.698 45.3564C112.256 29.9018 142.835 40.5583 163.653 69.0177' stroke='%231248DD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M152.688 81.7636C173.475 113.28 174.578 151.943 155.152 168.121C135.726 184.299 103.127 171.865 82.3408 140.348C61.5542 108.832 60.4511 70.169 79.877 53.9911C98.4346 38.5365 129.014 49.193 149.832 77.6524' stroke='%230090FF' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M138.865 90.3983C159.652 121.914 160.755 160.578 141.329 176.756C121.903 192.933 89.3042 180.499 68.5176 148.983C47.731 117.467 46.6279 78.8037 66.0538 62.6259C84.6113 47.1713 115.19 57.8278 136.009 86.2872' stroke='%2373B4ED' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M111.232 107.673C132.019 139.189 133.122 177.852 113.696 194.03C94.2701 210.208 61.6714 197.774 40.8848 166.258C20.0981 134.742 18.995 96.0781 38.4209 79.9004C56.9785 64.4458 87.5575 75.1023 108.376 103.562' stroke='%23F0F7FD' stroke-width='2' stroke-miterlimit='10'/%3e%3cpath d='M125.058 99.038C145.845 130.554 146.948 169.218 127.522 185.395C108.096 201.573 75.4971 189.139 54.7105 157.623C33.9238 126.107 32.8207 87.4434 52.2466 71.2656C70.8042 55.811 101.383 66.4675 122.202 94.9269' stroke='%23D8EBFB' stroke-width='2' stroke-miterlimit='10'/%3e%3c/svg%3e ");
      @include medium {
        top: 0;
        right: -3rem;
        transform: translateY(-100%) scale(0.75);
      }
      @include mini {
        top: -13rem;
      }
    }
    .card-column {
      &:last-child {
        .card.type__F {
          border-bottom: 2px solid #73B4ED;
        }
      }
    }
    .button-row {
      margin-top: 2.875rem;
      @include medium {
        justify-content: center;
      }
    }
    .button.type__E {
      color: $white;
      box-shadow: 0px 0 10px rgba(0, 0, 0, 0.15);
      transition: 200ms ease;
      &:hover {
        box-shadow: 0 0 37px 0 rgba(#70B4F0, 0.9);
      }
    }
  }
}

// /////////////////////////////////////////////////////////////////// Section 7
::v-deep #section_7 {
  position: relative;
  z-index: 1;
  .column-content.left {
    padding: 4rem 6.25rem;
    padding-bottom: 3rem;
    background-color: $kleinBlue;
    border-radius: 12rem;
    border: 4px solid $jordyBlue;
    &:before {
      content: '';
      position: absolute;
      top: -25rem;
      left: -50rem;
      width: calc(100% + 100rem);
      height: calc(100% + 50rem);
      background: radial-gradient(circle, rgba(6,33,164,0.9) 0%, rgba(0,212,255,0) 40%);
      transform: rotate(30deg) scale(1.25, 0.6);
    }
  }
  .blocks.left {
    position: relative;
    &:before { // orbits with bumps
      content: '';
      position: absolute;
      width: 262px;
      height: 261px;
      top: -30rem;
      left: -27rem;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='262' height='261' viewBox='0 0 262 261' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M34.5584 169.45C35.1309 169.962 35.7735 170.39 36.4669 170.721C41.8302 173.323 50.811 173.923 76.7974 158.681C91.1767 150.141 104.935 140.596 117.97 130.117C119.804 131.253 121.887 132.623 124.331 134.3C125.889 135.365 127.761 135.869 129.642 135.73C131.524 135.591 133.302 134.818 134.686 133.536L134.69 133.533C136.071 132.251 136.976 130.538 137.256 128.674C137.536 126.81 137.175 124.907 136.231 123.275C134.753 120.708 133.546 118.521 132.552 116.599C143.648 104.772 153.917 92.1943 163.284 78.9556C182.827 51.0925 181.825 41.8833 177.827 36.0857C177.601 35.7557 177.35 35.4435 177.077 35.1518L176.287 34.2996C175.934 33.9146 175.543 33.5655 175.122 33.2573C168.215 28.1617 156.872 30.6705 137.223 41.664C124.544 48.7535 92.0451 72.9098 92.0451 72.9098C90.2078 71.7704 88.117 70.3989 85.6749 68.7381C84.1197 67.6768 82.2501 67.1752 80.3724 67.3153C78.4948 67.4554 76.7204 68.229 75.3399 69.5094L75.333 69.5157C73.9488 70.7978 73.0421 72.5128 72.7622 74.3786C72.4823 76.2445 72.8457 78.15 73.7928 79.7819C75.2004 82.219 76.3657 84.3045 77.332 86.1553C77.1415 86.3224 53.4403 113.636 44.7641 126.308C28.3384 150.302 28.4018 159.065 30.6268 164.483C30.8331 164.97 31.0852 165.437 31.3797 165.876C31.6087 166.251 31.8679 166.607 32.1549 166.94C32.3295 167.176 32.5174 167.401 32.7175 167.616L33.5729 168.539C33.8783 168.866 34.2077 169.171 34.5584 169.45V169.45Z' stroke='%230621A4' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M43.613 179.601C44.1855 180.114 44.8282 180.542 45.5216 180.873C50.8848 183.475 59.8656 184.074 85.852 168.832C100.231 160.291 113.989 150.746 127.023 140.267C128.857 141.403 130.941 142.774 133.386 144.451C134.943 145.516 136.816 146.02 138.697 145.882C140.578 145.743 142.357 144.969 143.741 143.687L143.744 143.684C145.126 142.402 146.031 140.689 146.311 138.825C146.591 136.962 146.229 135.058 145.286 133.427C143.808 130.859 142.6 128.672 141.605 126.749C152.703 114.923 162.972 102.346 172.339 89.1069C191.88 61.242 190.88 52.0346 186.881 46.237C186.656 45.907 186.405 45.5948 186.131 45.3031L185.341 44.4509C184.988 44.0659 184.598 43.7168 184.176 43.4086C177.27 38.313 165.927 40.8218 146.278 51.8152C133.597 58.9031 101.1 83.0612 101.1 83.0612C99.2625 81.9218 97.1716 80.5503 94.7296 78.8895C93.1743 77.8282 91.3048 77.3265 89.4271 77.4667C87.5495 77.6068 85.7751 78.3804 84.3946 79.6608L84.3877 79.6671C83.0032 80.949 82.0963 82.664 81.8163 84.5299C81.5363 86.3958 81.9 88.3015 82.8474 89.9332C84.2534 92.3685 85.4203 94.4558 86.3867 96.3066C86.1961 96.4737 62.4933 123.786 53.8187 136.459C37.3945 160.455 37.4548 169.215 39.6814 174.635C39.8875 175.122 40.1396 175.588 40.4343 176.027C40.6633 176.402 40.9226 176.758 41.2095 177.091C41.3842 177.327 41.572 177.553 41.7722 177.767L42.6275 178.69C42.9329 179.018 43.2623 179.322 43.613 179.601Z' stroke='%231248DD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M52.8668 189.857C53.4393 190.369 54.082 190.798 54.7755 191.129C60.1388 193.73 69.1196 194.33 95.1043 179.086C109.484 170.547 123.243 161.002 136.277 150.523C138.111 151.658 140.195 153.03 142.64 154.707C144.197 155.771 146.07 156.275 147.951 156.137C149.832 155.998 151.61 155.225 152.995 153.943L152.998 153.94C154.38 152.658 155.285 150.945 155.565 149.081C155.845 147.217 155.483 145.314 154.54 143.683C153.062 141.115 151.854 138.928 150.859 137.005C161.956 125.178 172.225 112.601 181.591 99.3611C201.134 71.498 200.134 62.2906 196.135 56.4929C195.909 56.163 195.659 55.8508 195.385 55.559L194.594 54.7052C194.241 54.3207 193.852 53.9721 193.43 53.6645C186.524 48.5689 175.181 51.0778 155.53 62.0694C142.851 69.159 110.354 93.3171 110.354 93.3171C108.515 92.1759 106.426 90.8062 103.984 89.1454C102.428 88.0841 100.559 87.5824 98.6811 87.7225C96.8035 87.8627 95.0291 88.6363 93.6486 89.9167L93.6417 89.9231C92.2571 91.2049 91.3502 92.9199 91.0703 94.7858C90.7903 96.6517 91.1539 98.5573 92.1013 100.189C93.5073 102.624 94.6743 104.712 95.6406 106.562C95.45 106.73 71.7472 134.041 63.071 146.713C46.6485 170.711 46.7087 179.471 48.9337 184.889C49.1406 185.376 49.3932 185.843 49.6882 186.283C49.9172 186.658 50.1765 187.014 50.4634 187.347C50.638 187.583 50.8259 187.809 51.0261 188.023L51.8814 188.946C52.1868 189.274 52.5161 189.578 52.8668 189.857Z' stroke='%230090FF' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M63.6887 201.352C64.2606 201.864 64.9028 202.292 65.5958 202.622C70.9591 205.224 79.9415 205.825 105.926 190.581C120.306 182.042 134.065 172.497 147.099 162.017C148.933 163.153 151.017 164.525 153.462 166.202C155.019 167.266 156.892 167.77 158.772 167.631C160.653 167.492 162.431 166.718 163.815 165.436L163.819 165.433C165.2 164.152 166.105 162.439 166.386 160.575C166.666 158.712 166.305 156.809 165.362 155.177C163.884 152.61 162.676 150.423 161.681 148.5C172.779 136.674 183.047 124.096 192.413 110.856C211.956 82.9929 210.955 73.7855 206.957 67.9878C206.731 67.6579 206.481 67.3458 206.207 67.0539L205.415 66.2C205.063 65.8156 204.673 65.467 204.252 65.1594C197.346 60.0639 186.003 62.5727 166.352 73.5643C153.673 80.6539 121.174 104.81 121.174 104.81C119.337 103.671 117.247 102.301 114.804 100.638C113.248 99.5776 111.379 99.0762 109.501 99.2163C107.624 99.3564 105.849 100.13 104.469 101.41L104.462 101.416C103.078 102.699 102.172 104.414 101.892 106.28C101.612 108.146 101.976 110.052 102.923 111.684C104.329 114.119 105.495 116.205 106.461 118.056C106.272 118.224 82.5692 145.536 73.893 158.208C57.4689 182.204 57.5306 190.966 59.7557 196.384C59.962 196.871 60.2141 197.337 60.5085 197.776C60.738 198.152 60.9978 198.509 61.2854 198.842C61.46 199.078 61.6478 199.304 61.848 199.518L62.7034 200.441C63.0087 200.768 63.3381 201.073 63.6887 201.352V201.352Z' stroke='%236CADE7' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M73.7556 212.684C74.3279 213.197 74.9706 213.625 75.6641 213.956C81.0274 216.558 90.0082 217.157 115.995 201.915C130.374 193.375 144.132 183.83 157.167 173.351C159.001 174.487 161.084 175.857 163.53 177.536C165.088 178.6 166.96 179.104 168.841 178.965C170.722 178.826 172.5 178.052 173.883 176.77L173.887 176.767C175.268 175.485 176.173 173.772 176.453 171.908C176.733 170.045 176.372 168.141 175.428 166.51C173.952 163.944 172.744 161.757 171.749 159.834C182.847 148.008 193.116 135.43 202.481 122.19C222.024 94.3269 221.024 85.1195 217.026 79.3219C216.799 78.9914 216.548 78.6786 216.274 78.3862L215.484 77.534C215.131 77.1491 214.741 76.8 214.319 76.4918C207.414 71.3978 196.069 73.905 176.42 84.8984C163.741 91.988 131.242 116.144 131.242 116.144C129.405 115.005 127.316 113.635 124.872 111.973C123.317 110.911 121.447 110.41 119.57 110.55C117.692 110.69 115.918 111.463 114.537 112.744L114.53 112.75C113.146 114.032 112.24 115.747 111.96 117.613C111.68 119.479 112.043 121.384 112.99 123.016C114.398 125.453 115.563 127.539 116.529 129.389C116.34 129.558 92.6374 156.87 83.9612 169.542C67.537 193.538 67.5989 202.299 69.8239 207.718C70.0305 208.204 70.2826 208.671 70.5767 209.11C70.8062 209.486 71.066 209.842 71.3536 210.176C71.5277 210.411 71.715 210.636 71.9146 210.85L72.7716 211.775C73.0764 212.102 73.4054 212.406 73.7556 212.684V212.684Z' stroke='%23D8ECFD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M85.7864 226.475C86.3585 226.987 87.0006 227.414 87.6935 227.745C93.0568 230.347 102.038 230.946 128.024 215.704C142.403 207.163 156.161 197.618 169.196 187.141C171.029 188.275 173.113 189.646 175.558 191.323C177.115 192.388 178.988 192.892 180.869 192.754C182.75 192.615 184.529 191.841 185.913 190.559L185.916 190.556C187.298 189.274 188.203 187.561 188.483 185.697C188.763 183.834 188.402 181.93 187.458 180.299C185.981 177.733 184.774 175.546 183.778 173.623C194.876 161.796 205.144 149.219 214.511 135.979C234.053 108.116 233.053 98.9087 229.053 93.1092C228.827 92.7793 228.577 92.4671 228.303 92.1754L227.513 91.3232C227.16 90.9382 226.77 90.589 226.348 90.2809C219.443 85.1869 208.099 87.6941 188.45 98.6875C175.769 105.775 143.272 129.933 143.272 129.933C141.434 128.794 139.343 127.422 136.901 125.762C135.346 124.7 133.477 124.199 131.599 124.339C129.721 124.479 127.947 125.253 126.566 126.533L126.56 126.539C125.175 127.821 124.269 129.536 123.989 131.402C123.709 133.268 124.072 135.173 125.019 136.805C126.425 139.241 127.592 141.328 128.559 143.179C128.368 143.346 104.665 170.658 95.9907 183.331C79.5665 207.327 79.6267 216.087 81.8534 221.507C82.0597 221.994 82.3118 222.46 82.6062 222.899C82.8357 223.275 83.0955 223.632 83.3831 223.965C83.5571 224.2 83.7445 224.425 83.9441 224.639L84.7995 225.562C85.1053 225.89 85.4352 226.196 85.7864 226.475Z' stroke='%23F0F7FD' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
      @include mini {
        transform: scale(0.7);
        left: -12.5rem;
        top: -18rem;
      }
    }
    &:after { // echo cone
      content: '';
      position: absolute;
      width: 145px;
      height: 164px;
      bottom: -7rem;
      right: -5rem;
      transform: translateX(100%) translateY(100%);
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='145' height='164' viewBox='0 0 145 164' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.8878 46.365C17.8699 43.1784 17.3735 39.4676 15.3897 37.9279C13.4059 36.3881 10.1194 37.1628 8.13738 40.3494C6.15531 43.5359 6.65171 47.2467 8.6355 48.7865C10.6193 50.3262 13.9058 49.5515 15.8878 46.365Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M33.2462 59.843C37.1575 53.5549 36.3568 45.8796 32.0684 42.551C27.7799 39.2225 21.0612 41.0614 17.1499 47.3496C13.2386 53.6377 14.0393 61.313 18.3277 64.6416C22.6162 67.9701 29.3349 66.1312 33.2462 59.843Z' stroke='%231248DD' stroke-width='2'/%3e%3cpath d='M50.8663 73.5203C56.8076 63.9686 55.6867 52.1219 48.9732 46.9111C42.2598 41.7004 31.9296 44.6592 25.9883 54.2109C20.047 63.7626 21.168 75.6093 27.8814 80.8201C34.5949 86.0308 44.925 83.072 50.8663 73.5203Z' stroke='%230090FF' stroke-width='2'/%3e%3cpath d='M68.3762 87.1018C76.2487 74.4452 74.8232 58.6298 65.8026 51.6284C56.7821 44.6269 43.016 48.6511 35.1434 61.3077C27.2709 73.9643 28.6964 89.7797 37.717 96.7812C46.7375 103.783 60.5036 99.7584 68.3762 87.1018Z' stroke='%236CADE7' stroke-width='2'/%3e%3cpath d='M86.0355 100.71C95.9719 84.7357 94.2208 64.6794 82.7348 55.7644C71.2489 46.8495 53.8112 52.0121 43.8749 67.9866C33.9385 83.9612 35.6897 104.017 47.1756 112.932C58.6615 121.847 76.0992 116.685 86.0355 100.71Z' stroke='%23D8ECFD' stroke-width='2'/%3e%3cpath d='M103.507 114.272C115.394 95.1622 113.335 71.0988 99.5197 60.3758C85.7043 49.6528 64.7974 55.8911 52.9111 75.0006C41.0247 94.1102 43.0834 118.174 56.8988 128.897C70.7142 139.62 91.6211 133.381 103.507 114.272Z' stroke='%23F0F7FD' stroke-width='2'/%3e%3c/svg%3e ");
      @include small {
        right: 3rem;
      }
      @include mini {
        transform: scale(0.7);
        right: -3rem;
        bottom: -16rem;
      }
    }
  }
  .echo-layers {
    .echo_1 {
      &:before { // middle star
        content: '';
        position: absolute;
        width: 47px;
        height: 40px;
        top: -4rem;
        left: -7rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='47' height='40' viewBox='0 0 47 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.56641 19.8926H46.3808' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M19.7949 38.7835V1' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M1 38.6908L38.5939 1.0957' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M33.1548 33.2516L6.4375 6.53418' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
        @include mini {
          left: unset;
          top: -10rem;
          right: 6rem;
        }
      }
      &:after { // bottom right star
        content: '';
        position: absolute;
        width: 66px;
        height: 60px;
        bottom: 1rem;
        right: -6rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='66' height='60' viewBox='0 0 66 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M65.1738 15.4835C35.1009 29.5355 34.9016 29.9653 55.2361 38.2519C34.2799 30.7385 34.5093 30.0318 33.0383 41.5713C32.3352 31.0209 32.5221 31.539 10.3628 58.6575C31.936 31.3136 31.7601 31.0546 1.71395 44.3425C31.7864 30.2926 31.986 29.8607 11.6517 21.5742C32.6079 29.0875 32.3783 29.7941 33.8493 18.2548C34.5526 28.8051 34.3656 28.2871 56.525 1.16861C34.9517 28.5124 35.1271 28.7735 65.1738 15.4835Z' stroke='%231248DB' stroke-width='1.58364' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
        @include mini {
          right: unset;
          left: -3rem;
          bottom: -5rem;
        }
      }
    }
    .echo_3 {
      &:before { // far left star
        content: '';
        position: absolute;
        width: 88px;
        height: 56px;
        bottom: 9rem;
        left: -8rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='88' height='56' viewBox='0 0 88 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M49.4909 6.69823C44.4895 26.96 45.0708 27.0751 75.203 15.2034C45.9953 27.5784 46.3387 27.969 87.3413 39.4356C46.0054 29.2357 45.5144 29.406 64.8478 54.5545C44.4614 29.3893 43.9 29.2032 38.2787 49.3027C43.2801 29.0397 42.6988 28.9259 12.5667 40.7976C41.7738 28.4216 41.4314 28.0316 0.427781 16.5644C41.7643 26.7653 42.2553 26.595 22.9219 1.44648C43.3077 26.6107 43.8701 26.7974 49.4909 6.69823Z' stroke='%230718A6' stroke-width='1.58364' stroke-miterlimit='10'/%3e%3c/svg%3e ");
        @include medium {
          display: none;
        }
      }
    }
  }
  .heading {
    font-size: 2.8125rem;
    line-height: leading(65, 45);
  }
  .button-row {
    margin-top: 1rem;
  }
}

::v-deep #section_7 {
  @include small {
    .column-content.left {
      padding-left: 3.5rem;
      padding-right: 9rem;
      margin-right: -9rem;
      &:before {
        top: -30rem;
      }
    }
  }
  @include mini {
    .column-content.left {
      padding-left: 3.5rem;
      padding-right: 6rem;
      margin-right: -6rem;
      border-radius: 7rem;
      &:before {
        top: -30rem;
      }
    }
  }
}

::v-deep #callout-2 {
  padding-top: 11.625rem;
  padding-bottom: 18.75rem;
  @include mini {
    padding-bottom: 10rem;
  }
}

</style>
