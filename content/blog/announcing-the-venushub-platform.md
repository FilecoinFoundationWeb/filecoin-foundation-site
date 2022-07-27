---
tags: []
title: Announcing the VenusHub Platform
date: 2022-04-05
author: Filecoin Foundation
description: One of the main goals in building out the Filecoin network is to ensure
  the Mainnet is secure and resilient.
featured: false
recommendedPosts: []
image: "/images/1-_gcjaae5jjlt5kkzewfd6g.png"

---
One of the main goals in building out the Filecoin network is to ensure the Mainnet is secure and resilient. Teams at Filecoin Foundation and Protocol Labs run protocol security. We also conduct external security audits and have other systems in place to establish resilience. Still, there is always a chance that an implementation bug might result in adverse consequences for the network.

Having multiple software implementations that interoperate on the same network reduces this risk significantly; It is unlikely that all implementations will have the exact same set of security issues — especially if these implementations do not share security-critical software components. Multiple implementation options also offer the ability to increase engagement with different developer communities, as well as the opportunity to explore different implementation architectures.

Today, Filecoin storage providers can launch one of four types of implementations, each dedicated to serving different needs across the network: Lotus, Venus, Forest, and Fuhon. Although the Filecoin network currently has over 16EiB of storage power from roughly 4,000 storage providers, most of these providers run the Lotus implementation. To encourage the use of multiple implementations, Filecoin Foundation and Venus team (IPFS Force) are very excited to announce the VenusHub Platform–a program to help storage providers deploy the Venus implementation.

**What is Venus?**

Venus is a Go implementation of the Filecoin distributed storage network and was designed based on the principles of distributed systems. The main goal of Venus is to make the transition to the Filecoin network as seamless and efficient as possible for storage providers. Venus optimizes the production process of clusters in any size, which proves particularly beneficial for small to medium-sized storage providers, as it requires a lower barrier to entry.

In the past 14 months, Venus has proven to be a secure and efficient solution for sealing and cluster management, along with many other features. However, storage providers are often not aware that Venus is a possible implementation option. The mission of the VenusHub platform is to not only share more information while onboarding storage providers to the Venus implementation, but also to make the Filecoin community more diverse, safe, and resilient.

**Elements of VenusHub.io?**

VenusHub.io will contain five programs, coordinated by the Venus community, to encourage more storage providers to adopt the Venus implementation:

1\. **Venus Meetups:** monthly online meetups for discussion of new Venus features, AMAs, and technical interviews with experts.

2\. **Venus Master Program:** an initiative that rewards technical ‘experts’ in FIL for providing support to nascent storage providers utilizing the Venus implementation.

3\. **Venus Supported Hackathons:** sponsorship and collaboration on hackathons to spread awareness of the Venus implementation.

4\. **Venus SP Incubator:** a 12-month program to drive awareness and help storage providers adopt the Venus implementation.

5\. **Venus Deal Accelerator:** an initiative to encourage storage providers to take real storage deals using the Venus implementation.

To learn more about these programs, please visit [venushub.io](http://venushub.io/) or get in touch with Venus team on Filecoin Slack:[ fil-venus](https://filecoinproject.slack.com/archives/CEHHJNJS3), [fil-venus-cn](https://filecoinproject.slack.com/archives/C028PCH8L31).