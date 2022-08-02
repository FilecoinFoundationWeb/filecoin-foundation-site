---
tags: []
title: Storing AI Datasets on the Decentralized Web
date: 2022-04-14
author: Filecoin Foundation
description: 'Austin Carson is president of ​​SeedAI, a nonprofit, nonpartisan advocacy
  organization founded to help develop artificial intelligence (AI) resources for
  communities nationwide. He and his team are working to bring public and private
  partners together to develop model AI initiatives, drive policy, and facilitate
  investment, with a special focus on underserved communities. '
featured: false
recommendedPosts: []
image: "/images/0-ykastlsfwq52kr4r.png"

---
Austin Carson is president of ​​[SeedAI](https://www.seedai.org/), a nonprofit, nonpartisan advocacy organization founded to help develop artificial intelligence (AI) resources for communities nationwide. He and his team are working to bring public and private partners together to develop model AI initiatives, drive policy, and facilitate investment, with a special focus on underserved communities.

One of the biggest considerations for building useful and inclusive AI tools is the datasets that they’re built upon. Today, many AI models are built on large machine learning datasets, collected by governments, businesses, and academic institutions. And as these datasets grow and evolve, the AI outputs change.

Austin has been thinking about how to preserve datasets for future generations as the AI industry grows. We talked with him about his work and how he thinks about storing AI datasets on a decentralized network.

**Let’s set the stage regarding scale — how much data do machine learning applications require to be successful?**

Artificial intelligence relies on large datasets to succeed. While there are exceptions and ongoing efforts to decrease data needs of AI, as a general matter — the more reliable data that is fed into these systems, the more reliable and robust the output is.

Datasets used to train machine learning models vary pretty widely, both in terms of the type of data and the training costs, based on the type of system you’re building and how broadly applicable it should be. Two publicly available examples are [ImageNet,](https://www.image-net.org/) which clocks in at 14 million images and 150GB and can be used to create a general image recognition system, and [The Pile](https://arxiv.org/abs/2101.00027), an 825Gb-set of language examples, which can be used to make a general natural language processing system. One of the most sophisticated AI systems today is [OpenAI’s GPT3](https://openai.com/blog/gpt-3-apps/), which was trained on a 45 Tb private dataset — costing $12 million to train.

Beyond that, there’s a wide universe of applications that can be trained on 10s or 100s of Mb of data for more narrow tasks, like detecting a specific type of visual data (an object, an anomaly). And smaller datasets are also used to fine-tune a system like GPT3, taking the general language capabilities of GPT3 and adding specialization for a specific task (e.g. marketing, storytelling, etc).

**Who owns these datasets and how are they typically stored on today’s web?**

Datasets are curated and owned by governments, academic institutions, private organizations, and individuals.

Local, state, and federal governments collect myriads of data, but those datasets are often not in a machine-readable format or may contain the personal data of constituents. So it can be difficult to get this data released to the public or the research community. That said, there has been substantial progress in recent years in the federal government.

Academic institutions will often compile or generate datasets, many of which become public resources, such as the [Berkeley DeepDrive](https://bdd-data.berkeley.edu/) data. And, of course, the private sector collects data from their business operations and compiles other datasets, most of which stays private, though they do often release choice datasets to the public or to researchers that they believe benefit the community.

Kaggle, GitHub, and Google database search are good starting places to search for datasets. The other big cloud storage providers (CSPs), academic institutions, and government agencies, such as NASA, also make datasets available for AI training.

In terms of storage, datasets are often hosted on CSPs like AWS or Azure. But it’s exciting to see more redundancy and distribution of access as some public datasets, like [NYC Open Data](https://statescoop.com/new-york-city-filecoin-cryptocurrency/), are being loaded onto the Filecoin network.

**Dive deeper into this. From your position with SEED AI, where you’re working to expand AI resources across the US, and why is it important to archive these large datasets?**

Datasets directly inform AI systems, so the evolution of datasets will cause AI models to evolve. New methods are being applied to existing datasets as well, but the revolutionary new technologies are built on massive and often proprietary datasets. These big models are tuned on other datasets for more specialized tasks, which very well may become used more widely in the future without a record of the dataset/datasets as the models are further tuned.

As AI becomes easier to use for the average person and open-source tools become more widely available, the number of system dependencies that emerge will increase. I imagine this scenario, but for AI:

![](/images/0-fneh-1x6d2b1adwc.png)

Another reason why it’s important to maintain records of these datasets is to comply with state and local AI audit requirements. These requirements are being debated in many places and have already become law in some places, such as the one New York City [passed in December ](https://www.marketplace.org/2021/12/10/new-nyc-law-restricts-hiring-based-on-artificial-intelligence/)regarding how employers use AI in the recruiting, interview, and hiring process.

These new laws often require that datasets and algorithms be audited for bias and disparate impact. This is largely thought of as a pre-launch activity, but AI experts are [increasingly](https://hbr.org/2018/11/why-we-need-to-audit-algorithms) making the point that auditing must be regular, if not continuous, because the potential for harm or disparate impact will change alongside the data and technology environment. For this reason, there logically would be an increased need by responsible governments and private sector users of AI to retain and preserve these datasets.

**How is the AI community embracing decentralized technologies and decentralized storage networks like Filecoin to preserve these datasets and why?**

The [Filecoin Slingshot](https://slingshot.filecoin.io/) program is a great example of how the Web3 community can rally behind the preservation of and access to large datasets. The more that we can encourage maintaining and (responsibly) making AI datasets public, the better — especially now that the number of models and datasets is growing at an accelerating pace.

Slingshot is set up as a community competition for storage clients and developers to add real, valuable, and usable data to the Filecoin network. And of course, the groups competing in Slingshot are all rallying behind this overarching idea embedded in the Filecoin community to “preserve humanity’s most important datasets on the Filecoin network.”

Projects like these help make important datasets accessible and explorable by anyone in the world — for research, education, discovery. I hope more AI researchers will turn to projects like Slingshot in the future to help inform their machine learning work.

_Hear more from Austin Carson about storing AI datasets on the decentralized web at the_ [_Decentralized Web Gateway_](http://lu.ma/fil-sxsw)_, Tuesday, March 15, in Austin Texas._