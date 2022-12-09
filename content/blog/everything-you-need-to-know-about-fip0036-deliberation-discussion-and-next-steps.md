---
tags:
- Governance
- FIP
title: Everything You Need to Know About FIP0036 — Deliberation, Discussion, and Next
  Steps
date: 2022-09-16
author: Filecoin Foundation
description: 'The Filecoin community has spent the past several months debating FIP0036
  — Introducing a Sector Duration Multiple for Longer Term Storage Commitment. Here''s
  everything you need to know. '
featured: false
recommendedPosts: []
image: "/images/1-et2gg4agkn7chfbur-8a6g.webp"

---
The Filecoin community has spent the past several months debating [FIP0036 — Introducing a Sector Duration Multiple for Longer Term Storage Commitment.](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0036.md) The FIP was authored by researchers at the [CryptoEconLab](https://research.protocol.ai/groups/cryptoeconlab/)(CEL), an organization in the Protocol Labs Network that’s responsible for contributing to the design, validation, monitoring, and development of the Filecoin economy. Researchers from CEL often contribute thinking and research to support Core Devs in their analysis of the security and technical feasibility of draft FIPs. They are also frequent FIP authors and collaborators, having contributed to the design of both [Filecoin Plus](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md) and [Hyperdrive](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md), among other projects.

With FIP0036, the CryptoEconLab has proposed economic changes that seek to better align network incentives to support the long-term growth and development of the Filecoin network. Specifically, this FIP proposes to:

* Increase minimum sector duration time from six months to 1 year.
* Increase the maximum sector duration time from 1.5 years to 3.5 years.
* Introduce a Sector Duration Multiplier for all sectors, regardless of deal type.
* The multiplier is linear, and corresponds to sector term length.  
  — Any sectors committed for longer than 1 year will receive a multiplier in accordance to the length of their commitment. So, a sector committed for 2 years would receive a 2x multiplier in the calculation of their Quality Adjusted Power (QAP).  
  —The maximum multiplier would be 3.5x, which corresponds to the proposed 3.5 year sector term maximum.  
  — Storage providers could commit sectors for any period of time between 1 and 3.5 years and their multiplier would be adjusted accordingly.
* The Sector Duration Multiplier would compound with the Filecoin Plus deal multiplier that already exists in the network.   
  — Thus, if a sector were committed for the maximum term period and filled 100% with Filecoin Plus deals, that storage provider would receive the maximum compounded multiplier of 35x (10x Filecoin Plus multiplier, compounded with the 3.5x term length multiplier).
* Increase Sector Initial Consensus Pledge multiplier from 30% to 50%.

  ![](/images/1-ovn71sa_ni4z_pd90f4uwg.webp)The FIP further specifies that any changes to QAP will occur only during 1) new sector pledges, and/or 2) sector extension. Newly proposed sector duration minimums and maximums will be introduced gradually (increasing by six months every week until the specified bounds are met) to minimize network shocks and better support storage providers.

  Read on to understand the background, considerations, and FIL Poll, a unique polling tool built for the Filecoin community that will allow storage providers, token holders, Core Devs, and deal clients to vote to reject or accept the FIP.

  **Long-term goals, short-term challenges** 

  FIP0036 was introduced to the Filecoin community in June 2022, setting off an in-depth debate that led to ‘Ask Me Anything’ (AMA) sessions, conversational panels, debates within network working groups, and more than five different iterations of the FIP draft itself.

  **The Opportunity**

  Proponents of the FIP have long argued that the proposed changes are necessary for ensuring the Filecoin network against a tough macroeconomic climate. According to Vik Kalghatgi, one of the FIP authors, FIP0036 is critical for “…further aligning economic incentives with the long-term growth, development, and mission of the network.”

  FIP0036 specifically seeks to align economic incentives by affecting parameters which significantly influence network circulating supply. [Circulating supply](https://filecoin.io/blog/filecoin-circulating-supply/) is a critical metric for indicating overall Filecoin network health and performance. Because storage providers are required to provide token collateral on par with the amount of storage resources being committed, enabling (and incentivizing) longer term storage commitment means that more tokens will be “locked up” within the network.

  This token “lock up” positively affects circulating supply by ensuring that resources are committed long-term to the network. This long-term commitment will enable the network to scale more efficiently since longer sector terms alleviate the need to find greater sealing throughput as more and more storage providers onboard to the network. The “lock up” also seeks to introduce more stable network conditions for both storage providers and data clients.

  According to FIP authors and proponents, FIP0036 introduces changes to the Filecoin economy that are critical for the next phase of network growth and countering global macroeconomic pressures. However, some community members have raised concerns about the short-term cost pressures that these changes would introduce.

  **The Challenge**

  In community forums, some storage providers have raised concerns that their business models cannot support an increase in upfront collateral costs. Lending programs for Filecoin tokens are still developing, making it difficult to quickly or affordably increase investment capital. And some storage providers have argued that these changes will inspire a rush to accumulate liquidity, which could decrease the number of operational storage providers. Such an impact would affect the storage provider community, and could lead to an uptick in centralization among large storage providers.

  Others have raised questions about the integrity of assumptions around circulating supply, and have expressed uncertainty that affecting circulating supply will, in fact, support the goals of the FIP to better align economic incentives to support long term growth of the Filecoin network.

  **Community Governance of FIP0036 + FIL Poll**

  FIP0036 has presented a complex challenge for community members, who have spent months publicly deliberating the trade-offs introduced by the FIP.

  This level of scrutiny has also challenged Filecoin community governance processes.

  By definition, FIPs are designed to support changes to the underlying Filecoin protocol. As a result, these proposals are often technically complex without significantly changing the social, economic, or operational logic of the broader Filecoin ecosystem. To support these FIPs, a ‘soft consensus’ model is used, allowing community members to opt into governance processes when they choose to, without requiring their participation to pass FIPs necessary for routine protocol maintenance and development.

  Unfortunately, acceptance through ‘soft consensus’ is not possible when community members deeply disagree about whether to accept or reject the FIP draft. As a result, Filecoin Foundation will launch [FIL Poll](https://filpoll.io/about) to help community members advocate for their preference and reach general consensus.

  [FIL Poll](https://filpoll.io/about) is a polling tool that allows storage providers, token holders, Core Devs, and deal clients to vote to reject or accept the FIP. The poll will be open from Weds., Sept.14 through Weds., Sept. 28. This polling period will serve as the ‘Last Call’ period for FIP0036.

  If accepted, Core Devs have already agreed to schedule this FIP for inclusion in the v17 network upgrade. This inclusion was specifically requested by FIP authors, arguing that the specification of the FIP is time sensitive and premised on current network conditions.

  If rejected, the FIP will no longer be considered by the community. FIP authors are of course welcome to author a new FIP, but FIP0036 will be considered final. In its current form, it will not be eligible for reconsideration or inclusion in future network upgrades.

  For more information about this FIP check out this [recent AMA](https://www.youtube.com/watch?v=Z6T4AiOpxJU). And for more details about the FIL Poll process, see [HERE](https://github.com/filecoin-project/FIPs/discussions/464). To cast your vote, or ask for technical support with the voting tool, see [HERE](https://pl-strflt.notion.site/How-to-sign-a-vote-on-FilPoll-using-Lotus-Glif-95d9b0a32f9c48858574f9cb072c054b).