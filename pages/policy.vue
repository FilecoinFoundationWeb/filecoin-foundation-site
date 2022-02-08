<template>
  <div class="page page-policy">

    <div class="main-content">

      <div class="grid">
        <div class="col-10_mi-11" data-push-left="off-2_mi-1">
          <div class="content">

            <h1>Privacy policy</h1>

            <h2>Filecoin Foundation respects your privacy. Here’s our privacy policy for your use of the Services (as defined in our Terms of Service) and your use of the fil.org website.</h2>

            <h2>Personally Identifiable Information</h2>

            <p>We will not provide anyone else outside of our company with any information specific to you collected by us unless we have your consent. Our only employees or consultants allowed access to personal information about you are those who need to have access. Any employee or consultant who violates our privacy and security policies is subject to disciplinary action, including possible termination or prosecution.</p>

            <h2>What Information is Collected and Used:</h2>

            <p>We may collect personal information that can identify you, such as your name and email address, and other information that does not identify you. When you provide personal information through our website, the information may be sent to servers located in other countries around the world.</p>

            <p>We may collect and store any personal information you enter on our website or provide to us in some other manner, including personal information that may be contained in any video, comment or other submission you upload or post to the website. This includes identifying information, such as your name, address, e-mail address, and telephone number; your likeness; and, if you transact business with us, financial information such as your payment method (valid credit card number, type, expiration date or other financial information).</p>

            <p>We also may request information about your interests and activities, your gender and age, and other demographic information.</p>

            <p>We may also periodically obtain both personal and non-personal information about you from business partners, contractors and other third parties. Examples of information that we may receive include demographic information.</p>

            <p><strong>We may use this information to:</strong></p>

            <p>Fulfill your requests for products and services; Customize the advertising and content that you see on our website;</p>

            <ul>
              <li>Enforce our Terms of Service</li>
              <li>Identify and protect against fraudulent transactions and other misuses of our website;</li>
              <li>Analyze use of and improve our website, products and services;</li>
              <li>Manage your account and your preferences;</li>
              <li>Facilitate use of our website;</li>
              <li>Offer products and services that may be of interest to you;</li>
            </ul>

            <p>We may share aggregated, non-personal information in any of the above situations and also with advertisers and others.</p>

            <p>If you post information about yourself or others, or communicate with others using our website, please note that we cannot control who reads your postings or what they do with the information you provide. We encourage you to use caution in posting personal information.</p>

            <p>We may disclose your personal information if (i) required to do so by law, court order or subpoena, or as requested by other government, law enforcement, or investigative authority, (ii) we in good faith believe that such disclosure is necessary or advisable, including without limitation to protect our rights or properties, (iii) we have reason to believe that disclosing your personal information is necessary to identify, contact or bring legal action against someone who may be causing interference with our rights or properties, or has breached an agreement, or if anyone else could be harmed by such activities or interference, (iv) if we determine an ad posted violates our terms of use or the rights of a third party, or (v) there is an emergency involving personal danger.</p>

            <p>Please note that if you post any of your personal information via the Services, such information may be collected and used by others over whom we have no control. We are not responsible for the use by third parties of information you post or otherwise make public.</p>

            <h2>Cookies</h2>

            <p>“Cookies” are small text files that allow Websites to store and retrieve information about you from your computer system. We serve cookies to track individual site usage for later aggregation. But we do not use cookies in order to retrieve any information from your computer other than information originally sent in a Website cookie, such as a user code. We have no control over whether and how our advertisers use cookies that originate from their website.</p>

            <p><strong>Communication from Us</strong></p>

            <p>From time to time, we may send you information with announcements and updates about the Website, the Services, and your account. You may elect to opt-out of ongoing e-mail communication from us, such as newsletters, subscriptions, inquiries, etc. by using a simple “opt out” procedure. You need only reply to the communication with the word “unsubscribe” (without the quotation marks) in the body of your e-mail response and your name will be removed from that mailing list. However, if you opt-out of receiving our announcements and updates about your account, you may no longer have access to areas restricted to account members.</p>

            <p><strong>Children</strong></p>

            <p>The Website and Services is not intended for children under the age of 18 nor do we knowingly collect personal information from children under 18. Company does not orient the Website toward children or target them as an audience, nor does it screen them from using Company.</p>

            <p><strong>Links to Other sites</strong></p>

            <p>The Website provides links and pointers to Web sites maintained by other organizations. We provide these links as a convenience to users, but it does not operate, control or endorse such sites. We also disclaim any responsibility for the information on those sites and any products or services offered there, and cannot vouch for the privacy policies of such sites. We do not make any warranties or representations that any linked sites (or even the Website) will function without error or interruption, that defects will be corrected.</p>

            <p><strong>E-Commerce</strong></p>

            <p>All commerce transactions that take place on the Website are processed securely in order to make every reasonable effort to insure that your personal information is protected. Any transactions that take place on other sites that have links from the Website are not necessarily handled in this fashion. We disclaim any responsibility for transactions conducted on those sites and cannot vouch for the security of the information submitted in those transactions.</p>

            <p>We have implemented processes intended to protect user information and maintain security of data. Each account holder is assigned a unique username and password, which is required to access their account. It is your responsibility to protect the security of this login information.</p>

            <p>We have attempted to protect ours servers by locating them in areas with security procedures, use of firewalls and implementing other generally available security technologies. These safeguards help prevent unauthorized access, maintain data accuracy, and ensure the appropriate use of data, but no guarantee can be made that your information and data will be secure from intrusions and unauthorized release to 3rd parties.</p>

            <p><strong>Policy Acceptance</strong></p>

            <p>By using the Website and the Services, you signify your acceptance of this Privacy Policy. If you do not agree or are not comfortable with any policy described in this Privacy Policy, you may discontinue use of the Website or the Services.</p>

            <p><strong>More Questions?</strong></p>

            <p>If you have any questions about this privacy policy, email them to
              <a href="mailto:hello@fil.org">
                hello@fil.org
              </a>
              and be sure to indicate the specific site you’re visiting and the nature of your question or concern.
            </p>

          </div>
        </div>
      </div>

      <BackgroundLayers
        id="page-policy-background-layers"
        layers-array="3_4_5_6"
        :offset="pageBackgroundLayersOffset" />

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import PolicyPageData from '@/content/pages/policy.json'

import BackgroundLayers from '@/components/BackgroundLayers'

// ====================================================================== Export
export default {
  name: 'PagePolicy',

  components: {
    BackgroundLayers
  },

  data () {
    return {
      tag: 'policy',
      pageBackgroundLayersOffset: {
        medium: 1,
        mini: 0.25
      }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'policy', data: PolicyPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
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
.page-policy {
  padding-bottom: calc(#{$backgroundLayers__Top} + 10rem);
  @include medium {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Medium} + 5rem);
  }
  @include mini {
    padding-bottom: calc(#{$navigationHeight + $backgroundLayers__Offset__Mini} + 5rem);
  }
}

[class~="grid"],
[class*="grid-"],
[class*="grid_"] {
  position: relative;
  z-index: 10;
}

h1, p {
  margin-bottom: 2rem;
}

h2 {
  @include fontSize_Large;
  @include fontWeight_SemiBold;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

p {
  a {
    @include fontWeight_Bold;
    &:hover {
      text-decoration: underline;
    }
  }
  strong {
    @include fontWeight_SemiBold;
  }
}

ul {
  margin-left: 1.125rem;
  margin-bottom: 2rem;
}

.main-content {
  position: relative;
  padding-top: 7rem; // 1.75rem * 4
  margin-top: $backgroundLayers__Offset__Desktop;
  @include medium {
    margin-top: $backgroundLayers__Offset__Medium;
  }
  @include mini {
    margin-top: $backgroundLayers__Offset__Mini;
    padding-top: 5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: $backgroundLayers__Left__Desktop;
    width: calc(100% + 3.5rem);
    height: calc(100% + 5.5rem);
    background-color: $hawkesBlue;
    border-radius: 12.75rem 0 0 12.75rem;
    filter: drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.1));
    z-index: 0;
    @include medium {
      left: $backgroundLayers__Left__Medium;
      border-top-left-radius: 12.75rem;
    }
    @include mini {
      left: $backgroundLayers__Left__Mini;
      border-top-left-radius: 10.75rem;
      border-bottom-left-radius: 10.75rem;
    }
    @include tiny {
      border-top-left-radius: 5rem;
      border-bottom-left-radius: 4.75rem;
    }
  }
}

// /////////////////////////////////////////////////////////// Background Layers
::v-deep #page-policy-background-layers {
  position: absolute;
  top: 0;
  left: $backgroundLayers__Left__Desktop;
  width: 100%;
  height: calc(100% + #{$backgroundLayers__Top / 2} - 2rem);
  @include medium {
    left: $backgroundLayers__Left__Medium;
  }
  @include mini {
    left: $backgroundLayers__Left__Mini;
  }
  @include tiny {
    .layer {
      border-top-left-radius: 5rem !important;
      border-bottom-left-radius: 5rem !important;
    }
  }
}
</style>
