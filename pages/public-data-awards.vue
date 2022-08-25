<template>
  <div class="page page-public-data-awards">

    <Modal />

    <PageSection
      id="section_0"
      key="section_0"
      :section="headerSection" />

    <div class="main-intro-wrapper-section">

      <PageSection
        id="section_1"
        key="section_1"
        :section="introSection" />

      <BackgroundLayers
        id="page-basic-2-background-layers"
        layers-array="5_6"
        :breakpoints="pageLayersBreakpointData" />

      <div class="main-content-section">
        <PageSection
          id="section_2"
          key="section_2"
          :section="mainSection" />
        <BackgroundLayers
          id="page-basic-2-background-layers"
          layers-array="3_4"
          :breakpoints="pageLayersBreakpointData" />
      </div>

    </div>

    <PageSection
      id="section_3"
      key="section_3"
      :section="ctaSection" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'
import CloneDeep from 'lodash/cloneDeep'

import PublicDataAwardsPageData from '@/content/pages/public-data-awards.json'

import Modal from '@/components/Modal'
import PageSection from '@/components/PageSection'
import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PublicDataAwardsPage',

  components: {
    Modal,
    PageSection,
    BackgroundLayers
  },

  data () {
    return {
      tag: 'public_data_awards',
      pageLayersBreakpointData: {
        default: {
          stroke: 1.375,
          radius: 12.75
        },
        medium: {
          stroke: 1,
          radius: 12.75
        },
        mini: {
          stroke: 0.25,
          radius: 5
        }
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'public_data_awards', data: PublicDataAwardsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageContent () {
      const content = CloneDeep(this.siteContent.public_data_awards.page_content)
      return content
    },
    headerSection () {
      return this.pageContent.section_0
    },
    introSection () {
      return this.pageContent.section_1
    },
    mainSection () {
      return this.pageContent.section_2
    },
    ctaSection () {
      return this.pageContent.section_3
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroundLayers__Offset__Desktop: 1.75rem * 5;
$backgroundLayers__Offset__Medium: 1rem * 5;
$backgroundLayers__Offset__Mini: 0.25rem * 5;

$backgroundLayers__Top: calc(#{$navigationHeight + $backgroundLayers__Offset__Desktop});

$backgroundLayers__Left__Desktop: calc(50% - (#{$containerWidth} / 2) + 1.75rem);
$backgroundLayers__Left__Medium: 1rem * 6;
$backgroundLayers__Left__Mini: 0.25rem * 6;

// ///////////////////////////////////////////////////////////////////// General
.main-intro-wrapper-section {
  position: relative;
  z-index: 2;
}

.main-content-section {
  position: relative;
  z-index: 2;
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
  }
}

#section_2 {
  padding-top: 7rem; // 1.75rem * 4
  @include mini {
    padding-top: 5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: 100%;
    background-color: $hawkesBlue;
    border-radius: 11.375rem 0 0 11.375rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: -1;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 11.75rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 4.75rem;
    }
  }
}

#section_2 {
  padding-top: 1rem;
  @include small {
    padding-bottom: 0;
  }
}

::v-deep .heading {
  @include tiny {
    @include fontSize_ExtraLarge;
  }
}
::v-deep .subheading {
  @include tiny {
    @include fontSize_Medium;
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-basic-2-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 1.75rem * 2);
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
}

// ////////////////////////////////////////////////////// Section Customizations
::v-deep #intro_2,
::v-deep #basic_content_1,
::v-deep #basic_content_2,
::v-deep #basic_content_3 {
  img {
    border-radius: unset;
    box-shadow: unset;
  }
}

::v-deep #intro_2 {
  @include small {
    padding-top: 4rem;
  }
  @include mini {
    padding-top: 2rem;
  }
  .blocks {
    &.right {
      margin-top: 1rem;
    }
  }
  .subheading {
    font-size: $fontSize_Regular;
  }
}

::v-deep #basic_content_1 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_2 {
  padding: 0;
  margin-bottom: 2rem;
}

::v-deep #basic_content_3 {
  padding-top: 0;
  padding-bottom: 4rem;
}

// /////////////////////////////////////////////////////////////////// Section 3
::v-deep #section_3 {
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
    &:before {
      content: '';
      position: absolute;
      width: 262px;
      height: 261px;
      top: -12rem;
      left: -26rem;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='262' height='261' viewBox='0 0 262 261' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M34.5584 169.45C35.1309 169.962 35.7735 170.39 36.4669 170.721C41.8302 173.323 50.811 173.923 76.7974 158.681C91.1767 150.141 104.935 140.596 117.97 130.117C119.804 131.253 121.887 132.623 124.331 134.3C125.889 135.365 127.761 135.869 129.642 135.73C131.524 135.591 133.302 134.818 134.686 133.536L134.69 133.533C136.071 132.251 136.976 130.538 137.256 128.674C137.536 126.81 137.175 124.907 136.231 123.275C134.753 120.708 133.546 118.521 132.552 116.599C143.648 104.772 153.917 92.1943 163.284 78.9556C182.827 51.0925 181.825 41.8833 177.827 36.0857C177.601 35.7557 177.35 35.4435 177.077 35.1518L176.287 34.2996C175.934 33.9146 175.543 33.5655 175.122 33.2573C168.215 28.1617 156.872 30.6705 137.223 41.664C124.544 48.7535 92.0451 72.9098 92.0451 72.9098C90.2078 71.7704 88.117 70.3989 85.6749 68.7381C84.1197 67.6768 82.2501 67.1752 80.3724 67.3153C78.4948 67.4554 76.7204 68.229 75.3399 69.5094L75.333 69.5157C73.9488 70.7978 73.0421 72.5128 72.7622 74.3786C72.4823 76.2445 72.8457 78.15 73.7928 79.7819C75.2004 82.219 76.3657 84.3045 77.332 86.1553C77.1415 86.3224 53.4403 113.636 44.7641 126.308C28.3384 150.302 28.4018 159.065 30.6268 164.483C30.8331 164.97 31.0852 165.437 31.3797 165.876C31.6087 166.251 31.8679 166.607 32.1549 166.94C32.3295 167.176 32.5174 167.401 32.7175 167.616L33.5729 168.539C33.8783 168.866 34.2077 169.171 34.5584 169.45V169.45Z' stroke='%230621A4' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M43.613 179.601C44.1855 180.114 44.8282 180.542 45.5216 180.873C50.8848 183.475 59.8656 184.074 85.852 168.832C100.231 160.291 113.989 150.746 127.023 140.267C128.857 141.403 130.941 142.774 133.386 144.451C134.943 145.516 136.816 146.02 138.697 145.882C140.578 145.743 142.357 144.969 143.741 143.687L143.744 143.684C145.126 142.402 146.031 140.689 146.311 138.825C146.591 136.962 146.229 135.058 145.286 133.427C143.808 130.859 142.6 128.672 141.605 126.749C152.703 114.923 162.972 102.346 172.339 89.1069C191.88 61.242 190.88 52.0346 186.881 46.237C186.656 45.907 186.405 45.5948 186.131 45.3031L185.341 44.4509C184.988 44.0659 184.598 43.7168 184.176 43.4086C177.27 38.313 165.927 40.8218 146.278 51.8152C133.597 58.9031 101.1 83.0612 101.1 83.0612C99.2625 81.9218 97.1716 80.5503 94.7296 78.8895C93.1743 77.8282 91.3048 77.3265 89.4271 77.4667C87.5495 77.6068 85.7751 78.3804 84.3946 79.6608L84.3877 79.6671C83.0032 80.949 82.0963 82.664 81.8163 84.5299C81.5363 86.3958 81.9 88.3015 82.8474 89.9332C84.2534 92.3685 85.4203 94.4558 86.3867 96.3066C86.1961 96.4737 62.4933 123.786 53.8187 136.459C37.3945 160.455 37.4548 169.215 39.6814 174.635C39.8875 175.122 40.1396 175.588 40.4343 176.027C40.6633 176.402 40.9226 176.758 41.2095 177.091C41.3842 177.327 41.572 177.553 41.7722 177.767L42.6275 178.69C42.9329 179.018 43.2623 179.322 43.613 179.601Z' stroke='%231248DD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M52.8668 189.857C53.4393 190.369 54.082 190.798 54.7755 191.129C60.1388 193.73 69.1196 194.33 95.1043 179.086C109.484 170.547 123.243 161.002 136.277 150.523C138.111 151.658 140.195 153.03 142.64 154.707C144.197 155.771 146.07 156.275 147.951 156.137C149.832 155.998 151.61 155.225 152.995 153.943L152.998 153.94C154.38 152.658 155.285 150.945 155.565 149.081C155.845 147.217 155.483 145.314 154.54 143.683C153.062 141.115 151.854 138.928 150.859 137.005C161.956 125.178 172.225 112.601 181.591 99.3611C201.134 71.498 200.134 62.2906 196.135 56.4929C195.909 56.163 195.659 55.8508 195.385 55.559L194.594 54.7052C194.241 54.3207 193.852 53.9721 193.43 53.6645C186.524 48.5689 175.181 51.0778 155.53 62.0694C142.851 69.159 110.354 93.3171 110.354 93.3171C108.515 92.1759 106.426 90.8062 103.984 89.1454C102.428 88.0841 100.559 87.5824 98.6811 87.7225C96.8035 87.8627 95.0291 88.6363 93.6486 89.9167L93.6417 89.9231C92.2571 91.2049 91.3502 92.9199 91.0703 94.7858C90.7903 96.6517 91.1539 98.5573 92.1013 100.189C93.5073 102.624 94.6743 104.712 95.6406 106.562C95.45 106.73 71.7472 134.041 63.071 146.713C46.6485 170.711 46.7087 179.471 48.9337 184.889C49.1406 185.376 49.3932 185.843 49.6882 186.283C49.9172 186.658 50.1765 187.014 50.4634 187.347C50.638 187.583 50.8259 187.809 51.0261 188.023L51.8814 188.946C52.1868 189.274 52.5161 189.578 52.8668 189.857Z' stroke='%230090FF' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M63.6887 201.352C64.2606 201.864 64.9028 202.292 65.5958 202.622C70.9591 205.224 79.9415 205.825 105.926 190.581C120.306 182.042 134.065 172.497 147.099 162.017C148.933 163.153 151.017 164.525 153.462 166.202C155.019 167.266 156.892 167.77 158.772 167.631C160.653 167.492 162.431 166.718 163.815 165.436L163.819 165.433C165.2 164.152 166.105 162.439 166.386 160.575C166.666 158.712 166.305 156.809 165.362 155.177C163.884 152.61 162.676 150.423 161.681 148.5C172.779 136.674 183.047 124.096 192.413 110.856C211.956 82.9929 210.955 73.7855 206.957 67.9878C206.731 67.6579 206.481 67.3458 206.207 67.0539L205.415 66.2C205.063 65.8156 204.673 65.467 204.252 65.1594C197.346 60.0639 186.003 62.5727 166.352 73.5643C153.673 80.6539 121.174 104.81 121.174 104.81C119.337 103.671 117.247 102.301 114.804 100.638C113.248 99.5776 111.379 99.0762 109.501 99.2163C107.624 99.3564 105.849 100.13 104.469 101.41L104.462 101.416C103.078 102.699 102.172 104.414 101.892 106.28C101.612 108.146 101.976 110.052 102.923 111.684C104.329 114.119 105.495 116.205 106.461 118.056C106.272 118.224 82.5692 145.536 73.893 158.208C57.4689 182.204 57.5306 190.966 59.7557 196.384C59.962 196.871 60.2141 197.337 60.5085 197.776C60.738 198.152 60.9978 198.509 61.2854 198.842C61.46 199.078 61.6478 199.304 61.848 199.518L62.7034 200.441C63.0087 200.768 63.3381 201.073 63.6887 201.352V201.352Z' stroke='%236CADE7' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M73.7556 212.684C74.3279 213.197 74.9706 213.625 75.6641 213.956C81.0274 216.558 90.0082 217.157 115.995 201.915C130.374 193.375 144.132 183.83 157.167 173.351C159.001 174.487 161.084 175.857 163.53 177.536C165.088 178.6 166.96 179.104 168.841 178.965C170.722 178.826 172.5 178.052 173.883 176.77L173.887 176.767C175.268 175.485 176.173 173.772 176.453 171.908C176.733 170.045 176.372 168.141 175.428 166.51C173.952 163.944 172.744 161.757 171.749 159.834C182.847 148.008 193.116 135.43 202.481 122.19C222.024 94.3269 221.024 85.1195 217.026 79.3219C216.799 78.9914 216.548 78.6786 216.274 78.3862L215.484 77.534C215.131 77.1491 214.741 76.8 214.319 76.4918C207.414 71.3978 196.069 73.905 176.42 84.8984C163.741 91.988 131.242 116.144 131.242 116.144C129.405 115.005 127.316 113.635 124.872 111.973C123.317 110.911 121.447 110.41 119.57 110.55C117.692 110.69 115.918 111.463 114.537 112.744L114.53 112.75C113.146 114.032 112.24 115.747 111.96 117.613C111.68 119.479 112.043 121.384 112.99 123.016C114.398 125.453 115.563 127.539 116.529 129.389C116.34 129.558 92.6374 156.87 83.9612 169.542C67.537 193.538 67.5989 202.299 69.8239 207.718C70.0305 208.204 70.2826 208.671 70.5767 209.11C70.8062 209.486 71.066 209.842 71.3536 210.176C71.5277 210.411 71.715 210.636 71.9146 210.85L72.7716 211.775C73.0764 212.102 73.4054 212.406 73.7556 212.684V212.684Z' stroke='%23D8ECFD' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M85.7864 226.475C86.3585 226.987 87.0006 227.414 87.6935 227.745C93.0568 230.347 102.038 230.946 128.024 215.704C142.403 207.163 156.161 197.618 169.196 187.141C171.029 188.275 173.113 189.646 175.558 191.323C177.115 192.388 178.988 192.892 180.869 192.754C182.75 192.615 184.529 191.841 185.913 190.559L185.916 190.556C187.298 189.274 188.203 187.561 188.483 185.697C188.763 183.834 188.402 181.93 187.458 180.299C185.981 177.733 184.774 175.546 183.778 173.623C194.876 161.796 205.144 149.219 214.511 135.979C234.053 108.116 233.053 98.9087 229.053 93.1092C228.827 92.7793 228.577 92.4671 228.303 92.1754L227.513 91.3232C227.16 90.9382 226.77 90.589 226.348 90.2809C219.443 85.1869 208.099 87.6941 188.45 98.6875C175.769 105.775 143.272 129.933 143.272 129.933C141.434 128.794 139.343 127.422 136.901 125.762C135.346 124.7 133.477 124.199 131.599 124.339C129.721 124.479 127.947 125.253 126.566 126.533L126.56 126.539C125.175 127.821 124.269 129.536 123.989 131.402C123.709 133.268 124.072 135.173 125.019 136.805C126.425 139.241 127.592 141.328 128.559 143.179C128.368 143.346 104.665 170.658 95.9907 183.331C79.5665 207.327 79.6267 216.087 81.8534 221.507C82.0597 221.994 82.3118 222.46 82.6062 222.899C82.8357 223.275 83.0955 223.632 83.3831 223.965C83.5571 224.2 83.7445 224.425 83.9441 224.639L84.7995 225.562C85.1053 225.89 85.4352 226.196 85.7864 226.475Z' stroke='%23F0F7FD' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
    }
    &:after {
      content: '';
      position: absolute;
      width: 145px;
      height: 164px;
      bottom: -7rem;
      right: -5rem;
      transform: translateX(100%) translateY(100%);
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='145' height='164' viewBox='0 0 145 164' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.8878 46.365C17.8699 43.1784 17.3735 39.4676 15.3897 37.9279C13.4059 36.3881 10.1194 37.1628 8.13738 40.3494C6.15531 43.5359 6.65171 47.2467 8.6355 48.7865C10.6193 50.3262 13.9058 49.5515 15.8878 46.365Z' stroke='%230621A4' stroke-width='2'/%3e%3cpath d='M33.2462 59.843C37.1575 53.5549 36.3568 45.8796 32.0684 42.551C27.7799 39.2225 21.0612 41.0614 17.1499 47.3496C13.2386 53.6377 14.0393 61.313 18.3277 64.6416C22.6162 67.9701 29.3349 66.1312 33.2462 59.843Z' stroke='%231248DD' stroke-width='2'/%3e%3cpath d='M50.8663 73.5203C56.8076 63.9686 55.6867 52.1219 48.9732 46.9111C42.2598 41.7004 31.9296 44.6592 25.9883 54.2109C20.047 63.7626 21.168 75.6093 27.8814 80.8201C34.5949 86.0308 44.925 83.072 50.8663 73.5203Z' stroke='%230090FF' stroke-width='2'/%3e%3cpath d='M68.3762 87.1018C76.2487 74.4452 74.8232 58.6298 65.8026 51.6284C56.7821 44.6269 43.016 48.6511 35.1434 61.3077C27.2709 73.9643 28.6964 89.7797 37.717 96.7812C46.7375 103.783 60.5036 99.7584 68.3762 87.1018Z' stroke='%236CADE7' stroke-width='2'/%3e%3cpath d='M86.0355 100.71C95.9719 84.7357 94.2208 64.6794 82.7348 55.7644C71.2489 46.8495 53.8112 52.0121 43.8749 67.9866C33.9385 83.9612 35.6897 104.017 47.1756 112.932C58.6615 121.847 76.0992 116.685 86.0355 100.71Z' stroke='%23D8ECFD' stroke-width='2'/%3e%3cpath d='M103.507 114.272C115.394 95.1622 113.335 71.0988 99.5197 60.3758C85.7043 49.6528 64.7974 55.8911 52.9111 75.0006C41.0247 94.1102 43.0834 118.174 56.8988 128.897C70.7142 139.62 91.6211 133.381 103.507 114.272Z' stroke='%23F0F7FD' stroke-width='2'/%3e%3c/svg%3e ");
    }
  }
  .echo-layers {
    .echo_1 {
      &:before {
        content: '';
        position: absolute;
        width: 47px;
        height: 40px;
        bottom: 5rem;
        left: -6rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='47' height='40' viewBox='0 0 47 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4.56641 19.8926H46.3808' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M19.7949 38.7835V1' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M1 38.6908L38.5939 1.0957' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3cpath d='M33.1548 33.2516L6.4375 6.53418' stroke='%23154ED9' stroke-width='2' stroke-linejoin='round'/%3e%3c/svg%3e ");
      }
      &:after {
        content: '';
        position: absolute;
        width: 66px;
        height: 60px;
        bottom: 1rem;
        right: -6rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='66' height='60' viewBox='0 0 66 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M65.1738 15.4835C35.1009 29.5355 34.9016 29.9653 55.2361 38.2519C34.2799 30.7385 34.5093 30.0318 33.0383 41.5713C32.3352 31.0209 32.5221 31.539 10.3628 58.6575C31.936 31.3136 31.7601 31.0546 1.71395 44.3425C31.7864 30.2926 31.986 29.8607 11.6517 21.5742C32.6079 29.0875 32.3783 29.7941 33.8493 18.2548C34.5526 28.8051 34.3656 28.2871 56.525 1.16861C34.9517 28.5124 35.1271 28.7735 65.1738 15.4835Z' stroke='%231248DB' stroke-width='1.58364' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
      }
    }
    .echo_3 {
      &:before {
        content: '';
        position: absolute;
        width: 88px;
        height: 56px;
        bottom: 9rem;
        left: -8rem;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='88' height='56' viewBox='0 0 88 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M49.4909 6.69823C44.4895 26.96 45.0708 27.0751 75.203 15.2034C45.9953 27.5784 46.3387 27.969 87.3413 39.4356C46.0054 29.2357 45.5144 29.406 64.8478 54.5545C44.4614 29.3893 43.9 29.2032 38.2787 49.3027C43.2801 29.0397 42.6988 28.9259 12.5667 40.7976C41.7738 28.4216 41.4314 28.0316 0.427781 16.5644C41.7643 26.7653 42.2553 26.595 22.9219 1.44648C43.3077 26.6107 43.8701 26.7974 49.4909 6.69823Z' stroke='%230718A6' stroke-width='1.58364' stroke-miterlimit='10'/%3e%3c/svg%3e ");
      }
    }
  }
  .heading {
    font-size: 2.8125rem;
  }
  .button-row {
    justify-content: flex-end;
    margin-top: 0.625rem;
  }
}

::v-deep #callout-2 {
  padding-top: 11.625rem;
  padding-bottom: 18.75rem;
}

</style>
