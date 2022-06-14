---
tags: []
title: FilSwan Awarded Chainlink-Filecoin Joint Grant to Create Multi-Chain Decentralized
  Data Storage Payment Solution
date: 2022-03-04
author: Filecoin Foundation
description: In 2021, Chainlink and Filecoin launched a joint grant initiative to
  accelerate the development of hybrid smart contracts that combine Chainlink decentralized
  oracles and Filecoin decentralized storage within a single application.
featured: false
recommendedPosts: []
image: "/images/1-pvi22ssfyyn-thpuj3ltgg.png"

---
In 2021, Chainlink and Filecoin launched [a joint grant initiative](https://blog.chain.link/announcing-the-chainlink-and-filecoin-joint-grant-program/) to accelerate the development of hybrid smart contracts that combine Chainlink decentralized oracles and Filecoin decentralized storage within a single application. The joint grant initiative supports teams building hybrid smart contract applications powered by tamper-proof file storage and universal connectivity. In essence, these co-sponsored grants are designed to help extend the [Web3](https://blog.chain.link/web3/) stack beyond on-chain computation to include decentralized off-chain computation, data, and storage.

With this in mind, we’re excited to announce that [FilSwan](https://www.filswan.com/) has been awarded a Chainlink-Filecoin Joint Grant to create a multi-chain decentralized data storage solution that allows smart contracts on Polygon to pool together funds for the storage of data on Filecoin/IPFS.

Using FilSwan’s tool, users can upload files to IPFS by depositing collateral as a pre-paid storage fee to a Polygon smart contract. The system will select a storage provider automatically to back up the piece of data to the Filecoin network and generate a unique [content identifier (CID)](https://spec.filecoin.io/#section-glossary.cid) associated with that piece of data. Once a CID has been generated, multiple smart contracts on Polygon can specify the CID and storage provider and pool funds together to generate a proof that indicates that the storage deal is active. Once the proof has been relayed by Chainlink oracles, indicating the data has been stored on the Filecoin Network, anyone can trigger the payment for the storage provider and return the collateral (if there are any left) to the user.

As hybrid smart contract applications become more advanced and generate more data, the need for tamper-proof storage for large amounts of data in the multi-chain ecosystem increases, leading to greater storage requirements with increased connectivity between blockchains. As widely adopted decentralized storage solutions, IPFS and Filecoin have been used to store a wide variety of data from a multitude of domains, including NFT metadata, scientific data, sports data, market analytics, and more. However, the issue of paying for storage from multiple smart contracts on other blockchains has remained unresolved.

Powered by Chainlink’s seamless connectivity, FilSwan’s multi-chain data storage payment solution will enable users, developers, and DAOs to pool together funds as payment for storing and sharing critical data through the distributed web. The code will be uploaded to [FilSwan’s GitHub](https://github.com/filswan/) and periodically updated with planned feature enhancements such as improved key management and an S3-compatible file importer service.

FilSwan provides multi-chain solutions for Web3 projects by integrating data, computing, and payment into one suite. Since the start of the FilSwan project, the team has received an extensive list of grants and awards, including a high-tech research and development grant from the Canadian government, a Natural Science Foundation of Canada (NSERC) Blockchain to AI Cloud Computing Research Grant, a Canadian Information Technology and Integrated Systems Mathematical Organization (Mitacs) AI medical identification project grant, a HackFS Chainlink prize, and more. The FilSwan team has also formed enterprise and supply partnerships with HP, Dell, ASUS, Amazon, and NVIDIA.

With extensive experience in the decentralized storage and edge computing space, FilSwan is an active community member in the Filecoin/IPFS ecosystem, helping onboard community developers and enterprises to the Filecoin network and the decentralized storage industry. FilSwan’s previous products include artificial intelligence cloud computing platform [NBAI](https://nbai.io/), Filecoin mining node [NBFS POOL](https://nbfspool.com/#/), and a storage marketplace for the Filecoin network.

“We’re excited to be awarded a Chainlink-Filecoin Joint Grant for the creation of a multi-chain payment solution for decentralized storage using Chainlink and Filecoin,” said Charles Cao, Founder of FilSwan. “As a team with extensive experience with decentralized storage technologies and Filecoin infrastructure development, we look forward to creating tools that advance connectivity for decentralized storage in the multi-chain smart contract ecosystem using Chainlink oracles.”

The Filecoin Dev Grants program helps advance projects and aims to award additional grants to boost development in the ecosystem. Check out [other grant recipients](https://filecoinfoundation.medium.com/wave-11-dev-grant-recipients-ddc60c0b426c) and learn how you can apply for [Open Grants](https://github.com/filecoin-project/devgrants/blob/master/open-grants/README.md) and [Microgrants](https://github.com/filecoin-project/devgrants/blob/master/microgrants/microgrants.md).