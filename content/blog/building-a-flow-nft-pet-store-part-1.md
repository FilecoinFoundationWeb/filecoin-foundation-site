---
tags: []
title: 'Building a Flow NFT Pet Store : Part 1'
date: 2022-01-07
author: Filecoin Foundation
description: 'This tutorial from Filecoin Developer Pan Chasinga will teach you how
  to create a simple NFT marketplace app on the Flow blockchain from scratch, using
  the Flow blockchain and IPFS/Filecoin storage via nft.storage. '
featured: false
recommendedPosts: []
image: "/images/0-al1sv2xu4ah_bwdo.png"

---
This tutorial from Filecoin Developer [Pan Chasinga](https://pancy.medium.com/) will teach you how to create a simple NFT marketplace app on the [Flow](https://www.onflow.org/) blockchain from scratch, using the Flow blockchain and IPFS/Filecoin storage via [nft.storage](https://nft.storage/). The finished project is a React app that lets you mint pet NFTs and query on-chain metadata and the photo of the pets:

  
![](/images/0-al1sv2xu4ah_bwdo.png)The tutorial is broken into two parts:

1. NFT and blockchain basic, understanding Flow and Cadence, and interacting with the smart contract using the Flow command line tool.
2. Building a front-end React app and using the FCL library to interact with the smart contract.

**This is the first part of the tutorial.**

# Who this is for

Although this tutorial is built for Flow blockchain, I am focusing on building up a general understanding of smart contracts and Non-fungible tokens (NFTs). If you have a working familiarity in JavaScript and React, but a passing familiarity with blockchains, you will be just fine catching up.

If you are very new to the concept of smart contracts and NFTs, it’s worth checking out this [quick guide on NFT School](https://nftschool.dev/concepts/non-fungible-tokens/).

# Set up

Before we begin, you will need to install a few things:

* [Node.js](https://nodejs.org/) and npm (comes with Node.js)
* [Flow CLI](https://www.onflow.org/cli/)
* [Docker and Docker Compose](https://docker.com/compose/)

You’re free to use any code editor, but [VSCode](https://code.visualstudio.com/) with [Cadence Language support](https://docs.onflow.org/vscode-extension/) is a great option.

# What you will learn

As we build a minimal version of the [Flowwow NFT pet store](https://github.com/jochasinga/flowwow/), you will learn the basic NFT building blocks from the ground up, including:

* Smart contracts with [Cadence Language](https://docs.onflow.org/cadence/language/)
* User wallet authentication
* Minting tokens and storing metadata on Filecoin/IPFS via [NFT.storage](https://nft.storage/)
* Transferring tokens

# Understanding ownership and resource

A blockchain is a digital distributed ledger that tracks an _ownership_ of some _resource_. There is nothing new about the ledger part — Your bank account is a ledger that keeps track of how much money you _own_ and how much is spent (change of ownership) at any time. The key components to a ledger are:

* [Resource](https://dev.toresource/) at play. In this case a currency.
* [Accounts](https://dev.toaccounts/) to own the resource, or the access to it.
* [Contract](https://dev.tocontract/) or a ruleset to govern the economy.

# Resource

A resource can be any _thing_ — from currency, crop, to digital monster — as long as the type of resource is agreed upon commonly by all accounts.

# Accounts

Each account owns a ledger of its own to keep track of the spending (transferring) and imbursing (receiving) of the resource.

# Contract

A contract is a ruleset governing how the “game” is played. Accounts that break the ruleset may be punished in some way. Normally, it is a central authority like a bank who creates this contract for all accounts.

Because the conventional ledgers are owned and managed by a trusted authority like your bank, when you transfer the ownership of a few dollars (`-$4.00`) to buy a cup of coffee from Mr. Peet, the bank needs to be consistent and update the ledgers on both sides to reflect the ownership change (Peet has `+$4.00` and you have `-$4.00`). Because both ledgers are not openly visible to both of Peet and you and the the currency is likely digital, there is no guarantee that the bank won't mistakenly or intentionally update either ledger with the incorrect value.

> **_💡 Your bank probably owes you_**_  
> If you have a saving account with some money in it, you might be loaning your money to your bank. You are trusting it to have your money for you when you want to withdraw. This is why if you had a billion dollars in your account and you want to withdraw today, your teller will freak out. Your money is just part of the stream of digital currency your bank is free to do anything with._

What is interesting about the blockchain is the distributed part. Because there is only a single, open _decentralized_ ledger, there is no central authority (like a bank) for you to trust with bookkeeping. In fact, there is no need for you to trust anyone at all. You only need to trust the copy of the software run by other computers in the network to uphold the legitimacy of the book. Moreover, it is very hard for one (or more) of the computers to run an altered version of that software to bend the rule.

A good analogy is an umpire-less tennis game where any dispute (like determining if the ball lands in the court) is distributed to all the audience to judge. Meanwhile, these audience members are also participating in the game, with the stake that makes them lose if they judge wrongly. This way, any small inconsistencies are likely caught and rejected fair and square. You are no longer trusting your bank. The eternal flow of ownerships hence becomes _trustless_because everyone is doing what’s best for themselves.

“Why such emphasis on ownership?” you may ask. This was leading to the concept of resource ownership baked right into the smart contract in Flow. Learning to visualize everything as resources will help in getting up to speed.

# Quick tour of Cadence

Like Solidity language for Ethereum, Flow uses [Cadence Language](https://docs.onflow.org/cadence/language/) for smart contracts, transactions, and scripts. Inspired by the [Rust](https://rust-lang.org/) and [Move](https://move-book.com/) languages, the interpreter tracks when a resource is being _moved_ from a variable to the next and makes sure it can never be mutually accessible in the program.

The three types of Cadence programs you will be writing are [contracts](https://docs.onflow.org/cadence/language/contracts/#gatsby-focus-wrapper), [transactions](https://docs.onflow.org/cadence/language/transactions/#gatsby-focus-wrapper), and [scripts](https://docs.onflow.org/fcl/reference/scripts/).

# Contract

A contract is an initial program that gets deployed to the blockchain, initiating the logic for your app and allowing access to resources you create and the capabilities that come with them.

Two of the most common constructs in a contract are **resources** and **interfaces**.

## Resources

Resources are items stored in user accounts that are accessible  
through access control measures defined in the contract. They are usually the assets being tracked or some capabilities, such as a capability to withdraw an asset from an account. They are akin to classes or structs in some languages. Resources can only be in one place at a time, and they are said to be _moved_ rather than _assigned_.

## Interfaces

Interfaces define the behaviors or capabilities of resources. They are akin to interfaces in some languages. They are usually implemented by other resources. Interfaces are also defined with the keyword `resource`.

Here is an example of an `NFT` resource and an `Ownable` interface (à la [ERC721](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721)) in a separate `PetShop` contract:

    pub contract PetShop {    // A map recording owners of NFTs    pub var owners: {UInt64 : Address}    // A Transferrable interface declaring some methods or "capabilities"    pub resource interface Transferrable {      pub fun owner(): Address      pub fun transferTo(recipient: Address)    }    // NFT resource implements Transferrable    pub resource NFT: Transferrable {        // Unique id for each NFT.        pub let id: UInt64        // Constructor method        init(initId: UInt64) {            self.id = initId        }        pub fun owner(): Address {          return owners[self.id]!        }        pub fun transferTo(recipient: Address) {          // Code to transfer this NFT resource to the recipient's address.        }    }}

# Script

Scripts are Cadence programs that are run **on the client** to _read_ the state of the chain. Therefore, they do not incur any gas fee and do not need an account to sign them. A common use case is a blockchain explorer that queries the state of the chain.

Here is an example of a script reading an NFT’s current owner’s address by accessing the on-chain `owners` map by the token's ID:

    // Takes a target token ID as a parameter and returns an // address of the current owner.pub fun main(id: UInt64) : Address {    return PetStore.owner[id]!}

Nevermind if you don’t understand the syntax. As long as you understand the overall steps and recognize the similarities to another language, you will be fine. We will talk more about Cadence’s syntax later.

Both transactions and scripts are invoked on the client side, usually with the help of a command line tool or JavaScript library, both of which will be covered in this tutorial series.

# Building pet store

Now that we had a glance at Cadence, the smart contract language, we are ready to start building some of the features for our NFT pet store.

We will create and prepare a project structure for our React app for the second part. Make sure you already have the tools(#set-up) installed.

Now, create a new React app by typing the following commands in your shell:

    npx create-react-app petstore; cd petstore

And then, initialize a Flow project:

    flow init

You should see a new React project created with a `flow.json` configuration file inside. This file is important as it tells the command line tool and the FCL library where to find things in the project. Let's take a closer look at the newly created directory and add some configurations to the project.

# Project structure

First of all, note the `flow.json` file under the root directory. This configuration file was created when we typed the command `flow init` and tells Flow that this is a Flow project. We will leave most of the initial settings as they were, but make sure it contains these fields by adding or changing them accordingly:

    {    // ...    "contracts": {        "PetStore": "./src/flow/contracts/PetStore.cdc"    },    "deployments": {    "emulator": {      "emulator-account": ["PetStore"]    }  },    // ...}

These fields tell Flow where to look for the contract and the accounts related to the project so we will be able to run the command line to deploy it to the blockchain. Note that we are opting for an emulator account, which is a local blockchain emulator.

Now we will need to create some directories for our Cadence code.

Create a directory named `flow` under `src` directory, and create three more subdirectories named `contract`, `transaction`, and `script` under `flow`, respectively. This can be combined into a single command (make sure your current directory is `petstore` before running this):

    mkdir -p src/flow/{contract,transaction,script}

As you might have guessed, each directory will contain the corresponding Cadence code for each type of interaction.

Now, in each of these directories, create a Cadence file with the following names: `contract/PetStore.cdc`, `transaction/MintToken.cdc`, and `script/GetTokenIds.cdc`.

Your `src` directory should now look like this:

    .|— flow|   |— contract|   |   ||   |   `— PetStore.cdc|   |— script|   |   ||   |   `— GetTokenIds.cdc|   `— transaction|       ||       `— MintToken.cdc|...

# `PetStore` contract

it is about time we write our smart contract. It is the most involved code in this project, so it is the ideal place to learn the language.

First, create the contract block that defines an `NFT` resource within:

    pub contract PetStore {    // This dictionary stores token owners' addresses.    pub var owners: {UInt64: Address}    pub resource NFT {        // The Unique ID for each token, starting from 1.        pub let id: UInt64        // String -> String dictionary to hold         // token's metadata.        pub var metadata: {String: String}        // The NFT's constructor. All declared variables are        // required to be initialized here.        init(id: UInt64, metadata: {String: String}) {            self.id = id            self.metadata = metadata        }    }}

Note that we have declared a [Dictionary](https://docs.onflow.org/cadence/language/values-and-types/#dictionaries) and stored it in a variable named `owners`. This dictionary has the type `{UInt64: Address}` which maps [unsigned 64-bit integers](https://docs.onflow.org/cadence/language/values-and-types/#integers) to users' [Addresses](https://docs.onflow.org/cadence/language/values-and-types/#addresses). We will use `owners` to keep track of all the current owners of all tokens globally.

Also note that the `owners` variable is prepended by a `var` keyword, while the `id`variable is prepended by a `let` keyword. In Cadence, a mutable variable is defined using `var` while an immutable one is defined with `let`.

> **_💡 Immutable vs mutable_**_  
> In Cadence, a variable stores a mutable variable that can be changed later in the program while a binding binds an immutable value that cannot be changed._

In the body of `NFT` resource, we declare `id` field and a constructor method to assign the `id` to the `NFT` instance.

Now we are ready to move on to the next step.

# `NFTReceiver`

Now, we will add the `NFTReceiver` interface to define the _capabilities_ of a _receiver of NFTs_. What this means is only the accounts with these capabilities can receive tokens from another addresses.

To reiterate, an interface is _not_ an instance of an object, like a user account. It is a set of behaviors that a resource can implement to become capable of performing certain actions, for example withdrawing and depositing tokens.

Add the following `NFTReceiver` code to the existing `PetStore` contract. I will begin the comment for each method with "can" to make this clear that we are talking about a capability. Moreover, we won't be displaying all the code written previously. Instead, Comments with ellipses `...` will be used to notate these truncated codes.

    pub contract PetStore {    // ...    pub resource interface NFTReceiver {        // Can withdraw a token by its ID and returns         // the token.        pub fun withdraw(id: UInt64): @NFT        // Can deposit an NFT to this NFTReceiver.        pub fun deposit(token: @NFT)        // Can fetch all NFT IDs belonging to this         // NFTReceiver.        pub fun getTokenIds(): [UInt64]        // Can fetch the metadata of an NFT instance         // by its ID.        pub fun getTokenMetadata(id: UInt64) : {String: String}        // Can update the metadata of an NFT.        pub fun updateTokenMetadata(id: UInt64, metadata: {String: String})    }}

Let’s go over each method together.

The `withdraw(id: UInt64): @NFT` method takes an NFT's `id`, withdraws a token of type `@NFT`, which is prepended with a `@` to indicate a reference to a resource.

The `deposit(token: @NFT)` method takes a token reference and deposits to the current `NFTReceiver`.

The `getTokenIds(): [UInt64]` method accesses all token IDs owned by the current `NFTReceiver`.

The `getTokenMetadata(id: UInt64) : {String : String}` method takes a token ID, reads the metadata, and returns it as a dictionary.

The `updateTokenMetadata(id: UInt64, metadata: {String: String})` method takes an ID of an `NFT` and a metadata dictionary to update the target NFT's metadata.

# `NFTCollection`

Now let’s create an `NFTCollection` resource to implement the `NFTReceiver`interface. Think of this as a "vault" where NFTs can be deposited or withdrawn.

    pub contract PetStore {    // ... The @NFT code ...    // ... The @NFTReceiver code ...    pub resource NFTCollection: NFTReceiver {        // Keeps track of NFTs this collection.        access(account) var ownedNFTs: @{UInt64: NFT}        // Constructor        init() {            self.ownedNFTs <- {}        }        // Destructor        destroy() {            destroy self.ownedNFTs        }        // Withdraws and return an NFT token.        pub fun withdraw(id: UInt64): @NFT {            let token <- self.ownedNFTs.remove(key: id)            return <- token!        }        // Deposits a token to this NFTCollection instance.        pub fun deposit(token: @NFT) {            self.ownedNFTs[token.id] <-! token        }        // Returns an array of the IDs that are in this collection.        pub fun getTokenIds(): [UInt64] {            return self.ownedNFTs.keys        }        // Returns the metadata of an NFT based on the ID.        pub fun getTokenMetadata(id: UInt64): {String : String} {            let metadata = self.ownedNFTs[id]?.metadata            return metadata!        }        // Updates the metadata of an NFT based on the ID.        pub fun updateTokenMetadata(id: UInt64, metadata: {String: String}) {            for key in metadata.keys {                self.ownedNFTs[id]?.metadata?.insert(key: key,  metadata[key]!)            }        }    }    // Public factory method to create a collection    // so it is callable from the contract scope.    pub fun createNFTCollection(): @NFTCollection {        return <- create NFTCollection()    }}

That’s a handful of new code. It will soon become natural to you with patience.

First we declare a mutable dictionary and store it in a variable named `ownedNFTs`. Note the new access modifier `pub(set)`, which gives public write access to the users.

This dictionary stores the NFTs for this collection by mapping the ID to NFT resource. Note that because the dictionary stores `@NFT` resources, we prepend the type with `@`, making itself a resource too.

In the contructor method, `init()`, we instantiate the `ownedNFTs` with an empty dictionary. A resource also needs a `destroy()` destructor method to make sure it is being freed.

> **_💡 Nested Resource_**_  
> A_ [_composite structure_](https://docs.onflow.org/cadence/language/composite-types/) _including a dictionary can store resources, but when they do they will be treated as resources. Which means they need to be moved rather than assigned and their type will be annotated with `@`._

The `withdraw(id: UInt64): @NFT` method removes an NFT from the collection's `ownedNFTs` array and return it.

The left-pointing arrow `<-` is known as a _move_ symbol, and we use it to move a resource around. Once a resource has been moved, it can no longer be used from the old variable.

Note the `!` symbol after the `token` variable. It [force-unwraps](https://docs.onflow.org/cadence/language/values-and-types/#force-unwrap-) the `Optional`value. If the value turns out to be `nil`, the program panics and crashes.

Because resources are core to Cadence, their types are annotated with a `@` to make them explicit. For instance, `@NFT` and `@NFTCollection` are two resource types.

The `deposit(token: @NFT)` function takes the `@NFT` resource as a parameter and stores it in the `ownedNFTs` array in this `@NFTCollection` instance.

The `!` symbol reappears here, but now it's after the move arrow `<-!`. This is called a [force-move or force-assign](https://docs.onflow.org/cadence/language/values-and-types/#force-assignment-operator%E2%80%94) operator, which only moves a resource to a variable if the variable is `nil`. Otherwise, the program panics.

The `getTokenIds(): [UInt64]` method simply reads all the `UInt64` keys of the `ownedNFTs` dictionary and returns them as an array.

The `getTokenMetadata(id: UInt64): {String : String}` method reads the `metadata` field of an `@NFT` stored by its ID in the `ownedNFTs` dictionary and returns it.

The `updateTokenMetadata(id: UInt64, metadata: {String: String})` method is a bit more involved.

    for key in metadata.keys {    self.ownedNFTs[id]?.metadata?.insert(key: key,  metadata[key]!)}

In the body of the method, we loop over all the keys of the given metadata, inserting into the current metadata dictionary the new value. Note the `?` in the call chain. It is used with `Optional`s values to keep going down the call chain only if the value is not `nil`.

We have successfully implemented the `@NFTReceiver` interface for the `@NFTCollection` resource.

# `NFTMinter`

The last and very important component for our `PetStore` contract is `@NFTMinter`resource, which will contain an exclusive code for the contract owner to mint all the tokens. Without it, our store will not be able to mint any pet tokens. It is very simplistic though, since we have already blazed through the more complex components. Its only `mint(): @NFT` method creates an `@NFT` resource, gives it an ID, saves the address of the first owner to the contract (which is the address of the contract owner, although you could change it to mint and transfer to the creator's address in one step), increments the universal ID counter, and returns the new token.

    pub contract PetStore {    // ... NFT code ...    // ... NFTReceiver code ...    // ... NFTCollection code ...    pub resource NFTMinter {        // Declare a global variable to count ID.        pub var idCount: UInt64        init() {            // Instantialize the ID counter.            self.idCount = 1        }        pub fun mint(_ metadata: {String: String}): @NFT {            // Create a new @NFT resource with the current ID.            let token <- create NFT(id: self.idCount, metadata: metadata)            // Save the current owner's address to the dictionary.            PetStore.owners[self.idCount] = PetStore.account.address            // Increment the ID            self.idCount = self.idCount + 1 as UInt64            return <-token        }    }}

By now, we have all the nuts and bolts we need for the contract. The only thing that is missing is a way to initialize this contract at deployment time. Let’s create a constructor method to create an empty `@NFTCollection` instance for the deployer of the contract (you) so it is possible for the contract owner to mint and store NFTs from the contract. As we go over this last hurdle, we will also learn about the other important concept in Cadence—[Storage and domains](https://docs.onflow.org/cadence/tutorial/02-hello-world/#account-filesystem-domain-structure-where-can-i-store-my-stuff).

    pub contract PetStore {    // ... @NFT code ...    // ... @NFTReceiver code ...    // ... @NFTCollection code ...    // This contract constructor is called once when the contract is deployed.    // It does the following:    //    // - Creating an empty Collection for the deployer of the collection so    //   the owner of the contract can mint and own NFTs from that contract.    //    // - The `Collection` resource is published in a public location with reference    //   to the `NFTReceiver` interface. This is how we tell the contract that the functions defined    //   on the `NFTReceiver` can be called by anyone.    //    // - The `NFTMinter` resource is saved in the account storage for the creator of    //   the contract. Only the creator can mint tokens.    init() {        // Set `owners` to an empty dictionary.        self.owners = {}        // Create a new `@NFTCollection` instance and save it in `/storage/NFTCollection` domain,        // which is only accessible by the contract owner's account.        self.account.save(<-create NFTCollection(), to: /storage/NFTCollection)        // "Link" only the `@NFTReceiver` interface from the `@NFTCollection` stored at `/storage/NFTCollection` domain to the `/public/NFTReceiver` domain, which is accessible to any user.        self.account.link<&{NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)        // Create a new `@NFTMinter` instance and save it in `/storage/NFTMinter` domain, accesible        // only by the contract owner's account.        self.account.save(<-create NFTMinter(), to: /storage/NFTMinter)    }}

Hopefully, the high-level steps are clear to you after you have followed through the comments. We will talk about domains briefly here. Domains are general-purpose storages accessible to Flow accounts commonly used for storing resources. Intuitively, they are similar to common filesystems. There are three domain namespaces in Cadence:

## /storage

This namespace can only be accessed by the owner of the account.

## /private

This namespace is used to stored private objects and [capabilities](https://docs.onflow.org/cadence/language/capability-based-access-control/) whose access can be granted to selected accounts.

## /public

This namespace is accessible by all accounts that interact with the contract.

In our previous code, we created an `@NFTCollection` instance for our own account and saved it to the `/storage/NFTCollection` namespace. The path following the first namespace is arbitrary, so we could have named it `/storage/my/nft/collection`. Then, something odd happened as we "link" a [reference](https://docs.onflow.org/cadence/language/) to the `@NFTReceiver` capability from the `/storage` domain to `/public`. The caret pair `<` and `>` was used to explicitly annotate the type of the reference being linked, `&{NFTReceiver}`, with the `&` and the wrapping brackets `{` and `}` to define the _unauthorized reference_ type (see [References](https://docs.onflow.org/cadence/language/) to learn more). Last but not least, we created the `@NFTMinter` instance and saved it to our account's `/storage/NFTMinter` domain.

> _For a deep dive into storages, check out_ [_Account Storage_](https://docs.onflow.org/cadence/tutorial/02-hello-world/#account-filesystem-domain-structure-where-can-i-store-my-stuff)_._

As we wrap up our `PetStore` contract, let's try to deploy it to the Flow emulator to verify the contract. Start the emulator by typing `flow emulator` in your shell.

    flow emulator> INFO[0000] ⚙️   Using service account 0xf8d6e0586b0a20c7  serviceAddress=f8d6e0586b0a20c7 serviceHashAlgo=SHA3_256 servicePrivKey=bd7a891abd496c9cf933214d2eab26b2a41d614d81fc62763d2c3f65d33326b0 servicePubKey=5f5f1442afcf0c817a3b4e1ecd10c73d151aae6b6af74c0e03385fb840079c2655f4a9e200894fd40d51a27c2507a8f05695f3fba240319a8a2add1c598b5635 serviceSigAlgo=ECDSA_P256> INFO[0000] 📜  Flow contracts                             FlowFees=0xe5a8b7f23e8b548f FlowServiceAccount=0xf8d6e0586b0a20c7 FlowStorageFees=0xf8d6e0586b0a20c7 FlowToken=0x0ae53cb6e3f42a79 FungibleToken=0xee82856bf20e2aa6> INFO[0000] 🌱  Starting gRPC server on port 3569          port=3569> INFO[0000] 🌱  Starting HTTP server on port 8080          port=8080

Take note of the **FlowServiceAccount** address, which is a hexadecimal number `0xf8d6e0586b0a20c7` (In fact, these numbers are so ubiquitous in Flow that it has its own [`Address`](https://docs.onflow.org/cadence/language/values-and-types/#addresses) type). This is the address of the contract on the emulator.

Open up a new shell, making sure you are inside the project directory, then type `flow project deploy` to deploy our first contract. You should see an output similar to this if it was successful:

    flow project deploy> Deploying 1 contracts for accounts: emulator-account>> PetStore -> 0xf8d6e0586b0a20c7 (11e3afe90dc3a819ec9736a0a36d29d07a2f7bca856ae307dcccf4b455788710)>>> ✨ All contracts deployed successfully

Congratulations! You have learned how to write and deploy your first smart contract.

> **_⚠️ Oops! That didn’t work_**_  
> Check `flow.json` configuration and make sure the_ [_path to the contract_](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9#project-structure) _is correct._

# `MintToken` transaction

The first and most important transaction for _any_ NFT app is perhaps the one that mints tokens into existence! Without it there won’t be any cute tokens to sell and trade. So let’s start coding:

    // MintToken.cdc// Import the `PetStore` contract instance from the master account address.// This is a fixed address for used with the emulator only.import PetStore from 0xf8d6e0586b0a20c7transaction(metadata: {String: String}) {    // Declare an "unauthorized" reference to `NFTReceiver` interface.    let receiverRef: &{PetStore.NFTReceiver}    // Declare an "authorized" reference to the `NFTMinter` interface.    let minterRef: &PetStore.NFTMinter    // `prepare` block always take one or more `AuthAccount` parameter(s) to indicate    // who are signing the transaction.    // It takes the account info of the user trying to execute the transaction and    // validate. In this case, the contract owner's account.    // Here we try to "borrow" the capabilities available on `NFTMinter` and `NFTReceiver`    // resources, and will fail if the user executing this transaction does not have access    // to these resources.    prepare(account: AuthAccount) {        // Note that we have to call `getCapability(_ domain: Domain)` on the account        // object before we can `borrow()`.        self.receiverRef = account.getCapability<&{PetStore.NFTReceiver}>(/public/NFTReceiver)            .borrow()            ?? panic("Could not borrow receiver reference")        // With an authorized reference, we can just `borrow()` it.        // Note that `NFTMinter` is borrowed from `/storage` domain namespace, which        // means it is only accessible to this account.        self.minterRef = account.borrow<&PetStore.NFTMinter>(from: /storage/NFTMinter)            ?? panic("Could not borrow minter reference")    }    // `execute` block executes after the `prepare` block is signed and validated.    execute {        // Mint the token by calling `mint(metadata: {String: String})` on `@NFTMinter` resource, which returns an `@NFT` resource, and move it to a variable `newToken`.        let newToken <- self.minterRef.mint(metadata)        // Call `deposit(token: @NFT)` on the `@NFTReceiver` resource to deposit the token.        // Note that this is where the metadata can be changed before transferring.        self.receiverRef.deposit(token: <-newToken)    }}

> **_⚠️ Ambiguous type warning_**_  
> If you are using VSCode, chances are you might see the editor flagging the  
> lines referring to `PetStore.NFTReceiver` and `PetStore.NFTMinter` types  
> with an "ambiguous type <T> not found". Try to reset the running emulator  
> by pressing `Ctrl+C` in the shell where you ran the emulator to interrupt it  
> and run it again with `flow emulator` and on a different shell, don't forget  
> to redeploy the contract with `flow project deploy`._

The first line of the transaction code imports the `PetStore` contract instance.

The `transaction` block takes an arbitrary number of named parameters, which will be provided by the calling program (In Flow CLI, JavaScript, Go, or other language). These parameters are the only channels for the transaction code to interact with the outside world.

Next, we declare references `&{NFTReceiver}` and `&NFTMinter` (Note the first is an unauthorized reference).

Now we enter the `prepare` block, which is responsible for authorizing the transaction. This block takes an argument of type `AuthAccount`. This account instance is required to sign and validate the transaction with its key. If it takes more than one `AuthAccount` parameters, then the transaction becomes a _multi-signature_ transaction. This is the only place our code can access the account object.

What we did was calling `getCapability(/public/NFTReceiver)` on the account instance, then `borrow()` to borrow the reference to `NFTReceiver` and gain the capability for `receiverRef` to receive tokens. We also called `borrow(from: /storage/NFTMinter)` on the account to enable `minterRef` with the superpower to mint tokens into existence.

The `execute` block runs the code within after the `prepare` block succeeds. Here, we called `mint(metadata: {String: String})` on the `minterRef` reference, then moved the newly created `@NFT` instance into a `newToken` variable. After, we called `deposit(token: @NFT)` on the `receiverRef` reference, passing `<-newToken` (`@NFT`resource) as an argument. The newly minted token is now stored in our account's `receiverRef`.

Let’s try to send this transaction to the running emulator and mint a token! Because this transaction takes a `metadata` of type `{String: String}` (string to string dictionary), we will need to pass that argument when sending the command via Flow CLI.

With a bit of luck, you should get a happy output telling you that the transaction is _sealed_.

    flow transactions send src/flow/transaction/MintToken.cdc '{"name": "Max", "breed": "Bulldog"}'> Transaction ID: b10a6f2a1f1d88f99e562e72b2eb4fa3ae690df591d5a9111318b07b8a72e060>> Status      ✅ SEALED> ID          b10a6f2a1f1d88f99e562e72b2eb4fa3ae690df591d5a9111318b07b8a72e060> Payer       f8d6e0586b0a20c7> Authorizers [f8d6e0586b0a20c7]> ...

Note the **transaction ID** returned from the transaction. Every transaction returns an ID no matter if it succeeds or not.

Congratulations on minting your first NFT pet! It does not have a face yet besides just a name and a breed. But later in this tutorial, we will upload static images for our pets onto the Filecoin/IPFS networks using [nft.storage](https://nft.storage/).

# `TransferToken` transaction

Now that we know how to mint Flow NFTs, the next natural step is to learn how to transfer them to different users. Since this transfer action writes to the blockchain and mutates the state, it is also a transaction.

Before we can transfer a token to another user’s account, we need another receiving account to deposit a token to. (We could transfer a token to _our_address, but that wouldn’t be very interesting, would it?) At the moment, we have been working with only our emulator account so far. So, let’s create an account through the Flow CLI.

First, create a public-private key pair by typing `flow keys generate`. The output should look similar to the following, while **the keys will be different**:

    flow keys generate> 🔴️ Store private key safely and don't share with anyone!> Private Key  f410328ecea1757efd2e30b6bc692277a51537f30d8555106a3186b3686a2de6> Public Key  be393a6e522ae951ed924a88a70ae4cfa4fd59a7411168ebb8330ae47cf02aec489a7e90f6c694c4adf4c95d192fa00143ea8639ea795e306a27e7398cd57bd9

For convenience, let’s create a JSON file named `.keys.json` in the root directory next to `flow.json` so we can read them later on:

    {    "private": "f410328ecea1757efd2e30b6bc692277a51537f30d8555106a3186b3686a2de6",    "public": "be393a6e522ae951ed924a88a70ae4cfa4fd59a7411168ebb8330ae47cf02aec489a7e90f6c694c4adf4c95d192fa00143ea8639ea795e306a27e7398cd57bd9"}

Next, type this command, replacing `<PUBLIC_KEY>` with the public key you generated to create a new account:

    flow accounts create —key <PUBLIC_KEY> —signer emulator-account> Transaction ID: b19f64d3d6e05fdea5dd2ac75832d16dc61008eeacb9d290f153a7a28187d016>> Address 0xf3fcd2c1a78f5eee> Balance 0.00100000> Keys    1>> ...

Take note of the new address, which should be different from the one shown here. Also, you might notice there is a transaction ID returned. Creating an account is also a transaction, and it was signed by the `emulator-account` (hence, `—signer emulator-account` flag).

Before we can use the new address, we need to tell the Flow project about it. Open the `flow.json` configuration file, and at the "accounts" field, add the new account name ("test-account" here, but it could be any name), address, and the private key:

    {    // ...    "accounts": {        "emulator-account": {            "address": "f8d6e0586b0a20c7",            "key": "bd7a891abd496c9cf933214d2eab26b2a41d614d81fc62763d2c3f65d33326b0"        },        "test-account": {            "address": "0xf3fcd2c1a78f5eee",            "key": <PRIVATE_KEY>        }    }    // ...}

With this new account created, we are ready to move on to the next step.

Before we can deposit a token to the new account, we need it to “initialize” its collection. We can do this by creating a transaction for every user to initialize an `NFTCollection` in order to receive NFTs.

Inside `/transactions` directory next to `MintToken.cdc`, create a new Cadence file named `InitCollection.cdc`:

    // InitCollection.cdcimport PetStore from 0xf8d6e0586b0a20c7// This transaction will be signed by any user account who wants to receive tokens.transaction {    prepare(acct: AuthAccount) {        // Create a new empty collection for this account        let collection <- PetStore.NFTCollection.new()        // store the empty collection in this account storage.        acct.save<@PetStore.NFTCollection>(<-collection, to: /storage/NFTCollection)        // Link a public capability for the collection.        // This is so that the sending account can deposit the token to this account's        // collection by calling its `deposit(token: @NFT)` method.        acct.link<&{PetStore.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)    }}

This small code will be signed by a receiving account to create an `NFTCollection`instance and save it to their own private `/storage/NFTCollection` domain (Recall that anything stored in `/storage` domain can only be accessible by the current account). In the last step, we linked the `NFTCollection` we have just stored to the public domain `/public/NFTReceiver` (and in the process, "casting" the collection up to `NFTReceiver`) so whoever is sending the token can access this and call `deposit(token: @NFT)` on it to deposit the token.

Try sending this transaction by typing the command:

    flow transactions send src/flow/transaction/InitCollection.cdc —signer test-account

Note that `test-account` is the name of the new account we created in the `flow.json` file. Hopefully, the new account should now have an `NFTCollection`created and ready to receive tokens!

Now, create a Cadence file named `TransferToken.cdc` in the `/transactions`directory with the following code.

    // TransferToken.cdcimport PetStore from 0xf8d6e0586b0a20c7// This transaction transfers a token from one user's// collection to another user's collection.transaction(tokenId: UInt64, recipientAddr: Address) {    // The field holds the NFT as it is being transferred to the other account.    let token: @PetStore.NFT    prepare(account: AuthAccount) {        // Create a reference to a borrowed `NFTCollection` capability.        // Note that because `NFTCollection` is publicly defined in the contract, any account can access it.        let collectionRef = account.borrow<&PetStore.NFTCollection>(from: /storage/NFTCollection)            ?? panic("Could not borrow a reference to the owner's collection")        // Call the withdraw function on the sender's Collection to move the NFT out of the collection        self.token <- collectionRef.withdraw(id: tokenId)    }    execute {        // Get the recipient's public account object        let recipient = getAccount(recipientAddr)        // This is familiar since we have done this before in the last `MintToken` transaction block.        let receiverRef = recipient.getCapability<&{PetStore.NFTReceiver}>(/public/NFTReceiver)            .borrow()            ?? panic("Could not borrow receiver reference")        // Deposit the NFT in the receivers collection        receiverRef.deposit(token: <-self.token)        // Save the new owner into the `owners` dictionary for look-ups.        PetStore.owners[tokenId] = recipientAddr    }}

Recall that in the last steps of our `MintToken.cdc` code, we were saving the minted token to our account's `NFTCollection` reference stored at `/storage/NFTCollection` domain.

Here in `TransferToken.cdc`, we are basically creating a sequel of the minting process. The overall goal is to move the token stored in the sending source account's `NFTCollection` to the receiving destination account's `NFTCollection` by calling `withdraw(id: UInt64)` and `deposit(token: @NFT)` on the sending and receiving collections, respectively. Hopefully, by now it shouldn't be too difficult for you to follow along with the comments as you type down each line.

Two new things that are worth noting are the first line of the `execute` block where we call a special built-in function `getAccount(_ addr: Address)`, which returns an `AuthAccount` instance from an address passed as an argument to this transaction, and the last line, where we update the `owners` dictionary on the `PetStore` contract with the new address entry to keep track of the current NFT owners.

Now, let’s test out `TransferToken.cdc` by typing the command:

    flow transactions send src/flow/transaction/TransferToken.cdc 1 0xf3fcd2c1a78f5eee> Transaction ID: 4750f983f6b39d87a1e78c84723b312c1010216ba18e233270a5dbf1e0fdd4e6>> Status      ✅ SEALED> ID          4750f983f6b39d87a1e78c84723b312c1010216ba18e233270a5dbf1e0fdd4e6> Payer       f8d6e0586b0a20c7> Authorizers [f8d6e0586b0a20c7]>> ...

Recall that the `transaction` block of `TransferToken.cdc` accepts two arguments — A token ID and the recipient's address — which we passed as a list of arguments to the command. Some of you might wonder why we left out `--signer` flag for this transaction command, but not the other. Without passing the signing account's name to `--signer` flag, the contract owner's account is the signer by default (a.k.a the `AuthAccount` argument in the `prepare` block).

Well done! You have just withdrawn and deposited your NFT to another account!

# `GetTokenOwner` script

We have learned to write and send transactions. Now, we will learn how to create scripts to read state from the blockchain.

There are many things we can query using a script, but since we have just transferred a token to `test-account`, it would be nice to confirm that the token was actually transferred.

Let’s create a script file named `GetTokenOwner.cdc` under the `script` directory:

    // GetTokenOwner.cdcimport PetStore from 0xf8d6e0586b0a20c7// All scripts start with the `main` function,// which can take an arbitrary number of argument and return// any type of data.//// This function accepts a token ID and returns an Address.pub fun main(id: UInt64): Address {    // Access the address that owns the NFT with the provided ID.    let ownerAddress = PetStore.owners[id]!    return ownerAddress}

All scripts have an entry function called `main`, which can take any number of arguments and return any data type.

In this script, the `main` function accesses the `owners` dictionary in the `PetStore`contract using the token ID and returns the address of the token's owner, or fails if the value is `nil`.

As a reminder, scripts do not require any gas fee or authorization because they only read public data on the blockchain rather than writing to it.

Here’s how to execute a script with the Flow CLI:

    flow scripts execute src/flow/script/GetTokenOwner.cdc <TOKEN_ID>

`<TOKEN_ID>` is an unsigned integer token ID starting from 1. If you have [minted an NFT](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9#minttoken-transaction) and [transferred it to the `test-account`](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9#transfertoken-transaction), then replace `<TOKEN_ID>` with the token ID. You should get back the address of the `test-account` you have created.

# `GetTokenMetadata` script

From `GetTokenOwner.cdc` script, it takes only a few more steps to create a script that returns a token's metadata.

We will work on `GetTokenMetadata.cdc` which, as the name suggests, gets the metadata of an NFT based on the given ID.

Recall that there is a `metadata` variable in the `NFT` resource definition in the contract which stores a `{String: String}` dictionary of that `NFT`'s metadata. Our script will have to query the right `NFT` and read the variable.

Because we already know how to get an NFT’s owner address, all we have to do is to access `NFTReceiver` capability of the owner's account and call `getTokenMetadata(id: UInt64) : {String: String}` on it to get back the NFT's metadata.

    // GetTokenMetadata.cdcimport PetStore from 0xf8d6e0586b0a20c7// All scripts start with the `main` function,// which can take an arbitrary number of argument and return// any type of data.//// This function accepts a token ID and returns a metadata dictionary.pub fun main(id: UInt64) : {String: String} {    // Access the address that owns the NFT with the provided ID.    let ownerAddress = PetStore.owners[id]!    // We encounter the `getAccount(_ addr: Address)` function again.    // Get the `AuthAccount` instance of the current owner.    let ownerAcct = getAccount(ownerAddress)    // Borrow the `NFTReceiver` capability of the owner.    let receiverRef = ownerAcct.getCapability<&{PetStore.NFTReceiver}>(/public/NFTReceiver)        .borrow()            ?? panic("Could not borrow receiver reference")    // Happily delegate this query to the owning collection    // to do the grunt work of getting its token's metadata.    return receiverRef.getTokenMetadata(id: id)}

Now, execute the script:

    flow scripts execute src/flow/script/GetTokenMetadata.cdc <TOKEN_ID>

If we have minted an NFT with the metadata `{"name": "Max", "breed": "Bulldog"}` in the [previous minting step](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9#minttoken-transaction), then that is what you will get after running the script.

# `GetAllTokenIds` (Bonus)

This script is very short and straightforward, and it will become handy  
when we build a UI to query tokens based on their IDs.

    // GetAllTokenIds.cdcimport PetStore from 0xPetStorepub fun main() : [UInt64] {    // We basically just return all the UInt64 keys of `owners`    // dictionary as an array to get all IDs of all tokens in existence.    return PetStore.owners.keys}

# Wrapping up

Et voila! You have come very far and dare I say you are ready to start building your own Flow NFT app.

However, user experience is a crucial part in any app. It is more than likely that your users won’t be as proficient at the command line as you are. Moreover, it is a bit boring for an NFT store to have faceless NFTs. In the second part, we will start building the UI on top and using [nft.storage](https://nft.storage/) service to upload and store images of our NFTs instead of the command line using React.

#### Check out Pan’s original tutorial.

#### In a hurry to get to part 2? Find the [original version on NFT School](https://nftschool.dev/tutorial/flow-nft-marketplace/).