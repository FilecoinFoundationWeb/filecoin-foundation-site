---
tags: []
title: Participate in the Filecoin Network’s Poll on Extending the Maximum Lifetime
  of v1 Sectors
date: 2021-03-23
author: Filecoin Foundation
description: Filecoin Improvement Proposals (FIPs) are the primary way that Filecoin
  community members can submit, discuss, and approve changes to the Filecoin protocol.
featured: false
recommendedPosts: []
image: "/images/1-xicc70v_m64rcu1wlbq6qq.png"

---
[Filecoin Improvement Proposals (FIPs)](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0001.md) are the primary way that Filecoin community members can submit, discuss, and approve changes to the Filecoin protocol.

**About FIP-0014**

The community is currently considering [FIP-0014](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0014.md), which would allow miners to extend any V1 proof sector’s lifetime to a maximum of 540 days. Extending such sectors was previously disabled in the network version 7 upgrade (November 2020) due to a security concern with these proofs; v1.1 proofs were introduced to fix this security concern. This causes problems for miners who sealed v1 proof sectors in the early days of the network with a 180-day lifetime and must now reseal those sectors if they want to keep their power. To reseal, they would have to incur the computation cost of sealing again, spend more in collateral for the same amount of raw-byte power, and pay more in gas costs.

There are security concerns, however, if the lifetime of v1 sectors are allowed to be extended further than 540 days. There is also a cryptoeconomic aspect to the decision; a report on the impact of accepting versus rejecting this FIP from [BlockScience](https://github.com/BlockScience) can be found [here](https://github.com/filecoin-project/FIPs/issues/56#issuecomment-804841505). The report includes a summary of the background context, when these sectors will be expiring, and what the projected impact of their expiration would be on the storage power and sector collateral.

**Sourcing Community Sentiment: FILPoll**

There are many stakeholders in the Filecoin Project with opinions on new Filecoin Improvement Proposals (FIPs). To ensure the community is in favor of newly-proposed FIPs, we’d like to empower every FIP creator to run a community poll to help synthesize and quantify the community’s sentiment for or against a proposed FIP. We’ll be prototyping that process on FIP-0014, with the Filecoin Project’s first storage miner [community poll](https://filpoll.io/poll/7).

For this poll, we will be using [FILPoll](https://filpoll.io/), a tool for surveying the various stakeholders in the Filecoin community. Users participating in a FILPoll vote using their Filecoin identities by signing their ballots with their on-chain keys. An hour prior to opening up a survey, FILPoll takes a snapshot of the state of the Filecoin network. Using this state, FILPoll tallies poll results, which might factor in a user’s FIL token holdings, a miner’s raw-byte storage power, the amount of data stored by storage clients, or the addresses of verified core developers, app developers, and ecosystem collaborator organizations. Some polls will apply to only a subset of these constituent groups, while other polls may apply to the entire community at large. This instance will be specifically focused on storage miner sentiment, but future polls can more broadly synthesize feedback from clients, token holders, and other community members as that functionality is tested and enabled in FILPoll.

FILPoll results can be publicly audited, and are saved to Textile Buckets on IPFS. FILPoll is still in the alpha phase, and feedback is welcome. Please leave a comment [here](https://github.com/filecoin-project/community/discussions/113) if you have changes to suggest or questions about how to use FILPoll.

**Participating in the FIP-0014 Poll**

Based on [the discussion around FIP-0014](https://github.com/filecoin-project/FIPs/issues/56), storage miners are divided about whether the FIP should be adopted. Using FILPoll, we hope the community can surface data about what percentage of the network’s storage favors adopting the FIP. Storage miners can sign their votes using either the owner or worker key of their miner. If you have multiple miners controlled by the same owner/worker key, they will all be covered by a single vote. Network stakeholders that aren’t storage miners are encouraged to leave comments on [the discussion issue](https://github.com/filecoin-project/FIPs/issues/56); core implementers will be reviewing all comments along with the results of the survey.

The poll opens at 16:00 UTC on Tuesday, March 23rd, 2021, and will remain open until 16:00 UTC on Saturday, March 27th, 2021. You will be able to see the output of the polling tool [here](https://filpoll.io/poll/7) when complete, and we will also recap the output of the survey on this blog once it is complete.

Thank you in advance for your participation and contributions. Community members like you are key to the growth and success of the Filecoin ecosystem.