---
tags: []
title: 'FIP0056 in Last Call until 03/24: Introducing a Sector Duration Multiplier
  and Increasing Sector Duration Times'
date: 2023-03-22
author: ''
description: FIP0056, a proposal aiming to address some of the broader challenges
  facing the Filecoin network, is in its last call until Friday, March 24.
featured: false
recommendedPosts: []
image: "/images/0621-2022-01.png"

---
FIP0056, a proposal aiming to address some of the broader challenges facing the Filecoin network, is in its last call until Friday, March 24. This proposal would introduce a Sector Duration Multiplier, increase the minimum sector duration from 6 months to 1 year, and increase the maximum sector duration from 1.5 years to 5 years. For more detailed information about FIP0056, read the [full proposal](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0056.md)

Beginning in early 2021, researchers in the Filecoin community began to notice unsustainable cryptoeconomic trends. They authored FIP0036 to counter them, but it was rejected by the community for proposing too many changes at once.

However, the underlying cryptoeconomic pressures that initially inspired FIP0036 remained. Community members continued to seek solutions for the economic headwinds faced by the Filecoin ecosystem. The authors of FIP0036 soon released FIP0056, a revised proposal that sought to reflect more community feedback by limiting the scope and severity of proposed changes. You can read more about these discussions in [this community post](https://github.com/filecoin-project/community/discussions/572).

FIP0056 would change this framework by introducing a 2x independent Sector Duration Multiplier, which is multiplicative of the existing 10x Quality Multiplier incentive introduced by Filecoin Plus. This means the maximum multiplier available to any sector would increase from 10x to 20x. The multiplier increases the amount of FIL a storage provider can potentially earn for each sector over time, depending on the length of their storage commitment. This would also proportionally increase the amount of collateral that SPs would need to pay. The intention is to encourage longer-term storage agreements, leading to better-aligned economic incentives and improved stability within the network.

As FIP0056 enters its last call phase, the Filecoin community is piloting a hybrid soft consensus process that will drive consensus around the proposal. This approach prioritizes gathering community feedback but recognizes that community feedback may not necessarily lead to a clear decision; as a result,Core Devs will be asked to generate soft consensus amongst themselves after publicly reviewing and debating community feedback.. You can [contribute to the official discussion](https://github.com/filecoin-project/FIPs/discussions/554) until the end of Friday, March 24.

Once the last call phase concludes, Core Devs will meet on April 6th and post their decision on April 7. If FIP0056 is accepted, it is expected to be implemented in the v19 network upgrade; if it is rejected, the FIP will not be eligible for inclusion in any future network upgrades.