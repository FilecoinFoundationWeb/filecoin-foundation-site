---
tags: []
title: 'Building an NFT Store on Flow: Part 2'
date: 2022-02-03
author: Filecoin Foundation
description: This is part two in Filecoin Developer Pan Chasinga’s tutorial on how
  to create a simple NFT marketplace app on the Flow blockchain from scratch, using
  the Flow blockchain and IPFS/Filecoin storage via nft.storage.
featured: false
recommendedPosts: []
image: "/images/0-4zwhgcutykrxqrsw.gif"

---
This is part two in Filecoin Developer [Pan Chasinga](https://pancy.medium.com/)’s tutorial on how to create a simple NFT marketplace app on the [Flow](https://www.onflow.org/) blockchain from scratch, using the Flow blockchain and IPFS/Filecoin storage via [nft.storage](https://nft.storage/). Catch up on Part One [HERE](https://filecoinfoundation.medium.com/building-a-flow-nft-pet-store-part-1-e69077d885da).

In this second part of the tutorial, we will work on building the UI with React.js and Flow’s [fcl.js](https://docs.onflow.org/fcl/) library to interact with the on-chain smart contract we deployed in the [first part](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9).

Because learning React is unfortunately out of the scope, if you need a quick introduction or brush-up on React, head over to [Intro to React](https://reactjs.org/tutorial/tutorial.html).

Very often, especially for [decentralized applications](https://ethereum.org/en/dapps/) whose back-ends rely heavily on blockchains and other decentralized technology, the user experience is what makes or breaks them. Quite often, the user-facing part _is_ the only crucial part in a dapp.

In this section, we will be working on the UI for the pet store app in React.js. While you’re expected to have some familiarity with the library, I will do my best to use common features instead of advanced ones.

After we are done, we will have built a simple marketplace app on the local blockchain that users can mint and query their NFTs, which looks like this:![](/images/0-evpt4pxvtxouqgwz.png)Setting up

Make sure you are in the project directory (next to `package.json`). Install the following packages:

    npm install —save @onflow/fcl @onflow/types nft.storage

The Flow packages will help in connecting our React app to the Cadence code. The `nft.storage` package will help in uploading the image during minting and retrieving data from Filecoin/IPFS network. In order to do so, you will need to [sign up](https://nft.storage/) and generate an API key. After you have signed up, navigate to the "API Keys" tab, and click to create a new key, as shown here:

![](/images/0-o1_kfjr70xca1hs3.png)  
Copy and save the key as we will need it later on when we work on the [minting logic](https://dev.to/pancy/building-an-nft-store-on-flow-part-2-2i0o#minting-logic).

To get styling out of the way, let’s download [Skeleton CSS](https://github.com/dhg/Skeleton/releases/download/2.0.4/Skeleton-2.0.4.zip), unzip all the CSS files into the `src` directory, and import all the `.css` files in the `App.css` main stylesheet in the project:

    /* App.css */@import "./skeleton.css";@import "./normalize.css";/* import all other CSS files if there are any */

Now, run the app with `npm run start`, the React app should open in the browser on `http://localhost:3000`. Keep the browser open to see the updates as you save your code progress.

Let’s make the app our own by removing the template from React. In your editor, open `App.js` and remove all the current HTML, leaving only the `<div className="App">` DOM tags.

    function App() {  return (    <div className="App">        {/* DOM code removed */}    </div>  );}

After you saved the file, the app in the browser should reload and appear empty.

Now, create a new directory named `components` inside `src` to keep our reusable components with `mkdir -p src/components`.

Inside the newly created `components` directory, create a new file named `Form.js`and add the following code below. This component will be with which users can submit and mint new NFTs.

    // components/Form.js// Import the `FileSelector` module, which does not exist yet. import FileSelector from './FileSelector';// Collect the information of a pet and manage as a state// and mint the NFT based on the information.const Form = () => {  const [pet, setPet] = useState({});  // Helper callback functions to be passed to input elements' onChange.  // Update the state of the pet's name.  const setName = (event) => {    const name = event.target.value;    setPet({...pet, name});  }  // Update the state of the pet's breed.  const setBreed = (event) => {    const breed = event.target.value;    setPet({...pet, breed});  }  // Update the state of the pet's age.  const setAge = (event) => {    const age = event.target.value;    setPet({...pet, age});  }  return (    <div style={style}>      <form>        <div className="row">            <FileSelector pet={pet} setPet={setPet} />            <div>            <label for="nameInput">Pet's name</label>            <input              className="u-full-width"              type="text"              placeholder="Max"              id="nameInput"              onChange={setName}            />            </div>            <div>            <label for="breedInput">Breed</label>            <select className="u-full-width" id="breedInput" onChange={setBreed}>              <option value="Labrador">Labrador</option>              <option value="Bulldog">Bulldog</option>              <option value="Poodle">Poodle</option>            </select>            </div>            <div>            <label for="ageInput">Age</label>              <select                className="u-full-width"                id="ageInput"                onChange={setAge}              >                {                  [...Array(10).keys()].map(i => <option value={i}>{i}</option>)                }              </select>            </div>          </div>        <input className="button-primary" type="submit" value="Mint" />      </form>    </div>  );};const style = {  padding: '5rem',  background: 'white',  maxWidth: 350,};export default Form;

We will get an error since the `FileSelector.js` component we imported in the code does not yet exist. So, create the `FileSelector.js` file next to `Form.js` to handle the image uploading.

    // components/FileSelector.jsimport { useState } from 'react';// We are passing `pet` and `setPet` as props to `FileSelector` so we can// set the file we selected to the pet state on the `Form` outer scope// and keep this component stateless.const FileSelector = ({pet, setPet}) => {  // Read the FileList from the file input component, then  // set the first File object to the pet state.  const readFiles = (event) => {    const files = event.target.files;    if (files.length > 0) {      setPet({...pet, file: files[0]});    }  };  return (    <div className="">      <label for="fileInput">Image</label>      {/* Add readFiles as the onChange handler. */}      <input type="file" onChange={readFiles} />    </div>  );};export default FileSelector;

If you import `Form.js` component into `App.js` and insert it anywhere inside the main `App` container, you should see your form that looks similar what you see here:

![](/images/0-hwo-7fcrcrxifxej-2.png)Minting

Here comes the most crucial step of all NFTs — Minting. Minting an NFT is officially creating it and establishing its existence and initial ownership on-chain, making the token “authentic”. For this step, we will hook up the `Mint` button to actually mint a token based on user's input.

First, let’s head over to `/src/flow/transaction` and create a new JavaScript file named `MintToken.tx.js`. This module acts as an interface between the Cadence code in `MintToken.cdc` instead of the Flow CLI we used previously in [part 1](https://dev.to/pancy/building-a-flow-nft-pet-store-part-1-4bn9).

Here I create a JavaScript module that interacts with each Cadence transaction or script and name it to reflect the Cadence code, appended by `.tx.js` or a transaction or `.sc.js` for a script. This is not a requirement and you're free to name them however you want.

Since there are quite a few things involved in the minting process, we are going to go through a bit slowly on this one. We will create a `mintToken` function that takes a `pet` object and does the following:

1. **Upload to NFT.storage.** This uploads the metadata and image asset to NFT.storage, and retrieves the returned metadata that includes the [CID](https://proto.school/anatomy-of-a-cid/01) of the data.
2. **Send a minting transaction** with the metadata to Flow (in this case, the name, age, breed, and the CID of the data stored on IPFS).
3. **Return the Flow transaction ID** if successful.

First, let’s sketch up some placeholder functions to outline the steps:

    // MintToken.tx.jsasync function mintToken(pet) {  let metadata = await uploadToStorage(pet);  let txId = await mintPet(metadata);  return txId;}// We will fill in these functions nextasync function uploadToStorage(pet) {    return {};}async function mintPet(metadata) {    return '';}

# 1. Upload to NFT.Storage

Next, fill in the body of `uploadToStorage` function. You will need to replace the placeholder string with your API key from [NFT.Storage](https://nft.storage/). Note that in production, you will be reading this key as an environment variable for better security.

`NFTStorage.store(...)` takes an object with arbitrary attributes and two required attributes, `image` and `description`. (Contrary to its name, the `image` attribute does not require an image file. It takes a `File` object which can contain any type of asset.)

The `description` attribute can be any arbitrary text up to $MAXLENGTH.

Then, we return the metadata returned from the call to the caller.

    // Import required modules from nft.storageimport { NFTStorage, File } from 'nft.storage';const API_KEY = "DROP_YOUR_API_KEY_HERE";// Initialize the NFTStorage clientconst storage = new NFTStorage({ token: API_KEY });async function uploadToStorage(pet) {  // Call `store(...)` on the NFTStorage client with an object  // containing all of pet's attributes, and required image and  // description attributes.  let metadata = await storage.store({    ...pet,    image: pet.image && new File([pet.image], `${pet.name}.jpg`, { type: 'image/jpg' }),    description: `${pet.name}'s metadata`,  });  // If all goes well, return the metadata.  return metadata;}

# 2. Send a minting transaction

Once we have the metadata uploaded to NFT.storage, we will have to send a transaction to mint the token with the metadata. Let’s fill in the `mintPet`function.

    import * as fcl from '@onflow/fcl';import * as t from '@onflow/types';import cdc from './MintToken.cdc';async function mintPet(metadata) {  // Convert the metadata into a {String: String} type. See below.  const dict = toCadenceDict(metadata);  // Build a list of arguments  const payload = fcl.args([    fcl.arg(      dict,      t.Dictionary({ key: t.String, value: t.String }),    )  ]);  // Fetch the Cadence raw code.  const code = await (await fetch(cdc)).text();  // Send the transaction!  // Note the `userAuthz` function we have not implemented.  const encoded = await fcl.send([    fcl.transaction(code),    fcl.payer(fcl.authz),    fcl.proposer(fcl.authz),    fcl.authorizations([fcl.authz]),    fcl.limit(999),    payload,  ]);  // Call `fcl.decode` to get the transaction ID.  let txId = await fcl.decode(encoded);  // This waits for the transaction to be sealed, which is a recommended way.  await fcl.tx(txId).onceSealed();  // Return the transaction ID  return txId;}// Helper function to convert `pet` object to a {String: String} type.function toCadenceDict(pet) {  // Copy the pet object so we don't mutate the original.  let newPet = {...pet};  // Delete the `image` attribute that contains a `File` object.  delete newPet.image;  // Return an array of [{key: string, value: string}].  return Object.keys(newPet).map((k) => ({key: k, value: pet[k]}));}

As you can see, our `mintPet` function is a little involved.

The first step we took was to convert the `pet` data to a type our Cadence contract understands, which a dictionary of type `{String: String}`. Basically, if the object looks like this:

    {    name: "Max",    age: 3,    breed: "Bulldog",    // ...}

We then have to convert it to an array of `{key: string, value: string}` in JavaScript:

    [    {key: "name", value: "Max"},    {key: "age", value: "3"},    {key: "breed", value: "Bulldog"},]

This was what `toCadenceDict` function did, plus deleting the `image` attribute from the pet object because we didn't need it for minting on Flow.

After properly converting the object, we had to build a payload by calling `fcl.args` and pass an array of arguments. In this case, the metadata of type `[{key: string, value: string}]`. To facilitate this, we used types from `fcl.types`library.

Next, we fetch the corresponding `MintToken.cdc` code as a raw string. This is a standard way of fetching raw text from another module.

Now comes the meaty part of this function: Sending a transaction.

    const encoded = await fcl.send([  fcl.transaction(code),  fcl.payer(fcl.authz),  fcl.proposer(fcl.authz),  fcl.authorizations([fcl.authz]),  fcl.limit(999),  payload,]);

There are a few FCL functions to send a transaction, but `fcl.send([...])` is the most straightforward one.

We pass the Cadence `code` to `fcl.transaction`, and any integer from 0 - 999 to `fcl.limit` for the gas fee limit we are happy with. The `payload` is the metadata we converted previously.

The `payer`, `proposer`, and `authorizations` accept a function known as _authorization function_, which decides the account (and effectively the keys) used to authorize the transaction. (If you're interested in deep-diving into this, check out [Authorization Function](https://docs.onflow.org/fcl/reference/api/#authorization-function)). Here, `fcl` provided an `authz` default authorization function to makes signing with the emulator account easier.

# 3. Return the transaction ID

Now all that is left to do is to return to the main `mintToken` function with a transaction ID:

    // This is a fallible function.async function mintToken(pet) {  // The metadata contains the attribute `url` which is an IFPS URL  // pointing to the data.json.  const { url } = await uploadToStorage(pet);  // We want to include the IPFS URL to the blockchain, so we can  // "unpack" the token data when we query it later. So we create  // a new object with all of the pet's attributes plus `url`.  const txId = await mintPet({ ...pet, url });  return txId;}// Don't forget to export the function.export default mintToken;

Our `mintToken` function is now ready. Let's return to `Form.js`, add a `handleSubmit` handler (right after `setAge` function), and pass to the `onSubmit`prop on the `<form>` element.

    // Form.js// On the top most of the moduleimport mintToken from '../flow/transaction/MintToken.tx';const Form = () => {  // ... setAge function ...  const handleSubmit = async (event) => {    event.preventDefault();    try {      await mintToken(pet);    } catch (err) {      console.error(err);    }  }  return (    <div style={style}>      <form onSubmit={handleSubmit}>        {/* ... other elements ... */}      </form>    </div>  );

This wraps up token minting. Now you can test the UI, select an image file, fill up the metadata on the form, and click the mint button to mint NFTs on the local net.

Now is the time to fill up your coffee and take a well-deserved break before we move on to the last bit of the tutorial — Querying tokens’ data.

# Querying the token

Now that we can mint our pet tokens, let’s build another form UI to query them for metadata and image.

We are going to reuse the minting form. Once we’re done, it will look similar to this:

I know Mary is obviously _not_ a Bulldog, but you will get a chance to add your breed options later.

Let’s start by creating `QueryToken.jsx` file inside the `/components` directory.

    import { useState, useEffect } from 'react';// QueryForm.jsxconst style = {  padding: '1rem',  paddingTop: '5rem',  background: 'white',  maxWidth: 350,  margin: 'auto',};const QueryForm = () => {  const [selectedId, setSelectedId] = useState(null);  const [metadata, setMetadata] = useState(null);  const [allTokenIds, setAllTokenIds]  = useState([]);  useEffect(() => {    let getTokens = async () => {      // Set mock IDs for now      setTokenIds([1, 2, 3]);    };    getTokens();  }, []);  // Empty handler for now...  const handleSubmit = async (event) => {    event.preventDefault();  }  return (    <div style={style}>      <form onSubmit={handleSubmit}>        <div className="row">          <div className="">            <label htmlFor="idInput">Pet's ID</label>            <select              className="u-full-width"              type="number"              id="idInput"              onChange={(event) => setId(parseInt(event.target.value))}            >              {                // We want to display token IDs that are available.                allTokenIds.map(i => <option value={i}>{i}</option>)              }            </select>          </div>        </div>        <input className="button-primary" type="submit" value="Query" />      </form>      {        // We only display the table if there's metadata.        metadata ? <MetadataTable metadata={metadata} /> : null      }    </div>  );};const MetadataTable = ({ metadata }) => (  <table className="u-full-width">    <thead>      <tr>        {          Object.keys(metadata).map((field,i) => (            // Skip the `url` attribute in metadata for the table headings.            field === 'url' ? null : <th key={i}>{field}</th>          ))        }      </tr>    </thead>    <tbody>      <tr>        {          Object.keys(metadata).map((field, i) => {            switch (field) {              // Skip displaying the url.              case 'url':                return null;              // Display the image as <img> tag.              case 'image':                return (                  <td key={i}>                    <img src={metadata[field]} width="60px" />                  </td>                );              // Default is to display data as text.              default:                return <td key={i}>{metadata[field]}</td>;            }          })        }      </tr>    </tbody>  </table>);export default QueryForm;

As usual, we need to create JavaScript “bindings” to two Cadence scripts `GetTokenMetadata.cdc` and `GetAllTokenIds.cdc`. We will start with `GetAllTokenIds.sc.js`.

    // GetAllTokenIds.sc.jsimport * as fcl from '@onflow/fcl';import raw from './GetAllTokenIds.cdc';async function getAllTokenIds() {  // Fetch the `GetAllTokenIds.cdc` script as text.  let cdc = await(await fetch(raw)).text();  // Read the script, send it, and wait for the response.  const encoded = await fcl.send([fcl.script(cdc)]);  // Decode the response into a JavaScript array of IDs.  const tokenIds = await fcl.decode(encoded);  // Sort the IDs in ascending order and return the array.  return tokenIds.sort((a, b) => a - b);}export default getAllTokenIds;

Hopefully, by now you are already an expert. It’s worth switching back and taking a look at `GetAllTokenIds.cdc` to see how the Javascript bindings and Cadence scripts interact.

Next up, we create `GetTokenMetadata.sc.js` to execute the `GetTokenMetadata.cdc`script.

    // GetTokenMetadata.sc.jsimport * as fcl from '@onflow/fcl';import * as t from '@onflow/types';import raw from './GetTokenMetadata.cdc';async function getTokenMetadata(id) {    let script = await(await fetch(raw)).text();    const encoded = await fcl.send([        fcl.script(script),        fcl.args([fcl.arg(id, t.UInt64)]),    ]);    const data = await fcl.decode(encoded);    return data;}export default getTokenMetadata;

Again, you can review `GetTokenMetadata.cdc` to see the relationships between the interfaces offered and how we used them in this function.

Now we are ready to return to `QueryForm.jsx`. Import the functions we worked on:

    // QueryForm.jsimport { useState, useEffect } from 'react';// Import these functionsimport getAllTokenIds from '../flow/script/GetAllTokenIds.sc';import getTokenMetadata from '../flow/script/GetTokenMetadata.sc';import { toGatewayURL } from 'nft.storage';const QueryForm = () => {  const [allTokenIds, setAllTokenIds] = useState([]);  const [selectedId, setSelectedId] = useState(null);  const [metadata, setMetadata] = useState(null);  useEffect(() => {    let getTokens = async () => {      // Instead of dummy token IDs, we call `getAllTokenIds`      // to get real IDs of all existing tokens.      const ids = await getAllTokenIds();      setTokenIds(ids);    };    getTokens();  }, []);  const handleSubmit = async (event) => {    event.preventDefault();    // Add this block to the submit handler.    try {      // Call the `getTokenMetadata` function and extract the      // IPFS URL from the data returned.      let metadata = await getTokenMetadata(selectedId);      let dataURL = toGatewayURL(metadata.url);      // Fetch the URL to get a JSON response, which contains      // an `image` attribute.      // create a new metadata object and set the metadata to the value.      let { image } = await (await fetch(dataURL)).json();      let newdata = { ...metadata, image: toGatewayURL(image) };      setMetadata(newdata);    } catch(err) {      window.alert('Token ID does not exist!');    }  }  // ...The component code unchanged...}

In the `useEffect` callback, we replaced the stubbed ID array with the call to  
`getAllTokenIds` function, which executed `GetAllTokenIds.cdc` and returned an  
array of existing token IDs. We then call `setTokenIds` to set `allTokenIds` to  
the array. This is used to fill up the `<option>` element with the IDs and act as  
the UI guard to make sure users can only choose the available tokens to query.

In the “empty” `handleSubmit` handler function, which is called each time the query button  
is clicked, we added a `try-catch` block which called `getTokenMetadata` with the ID user  
selected in `selectedId`, and return the metadata of the selected NFT.

Remember that as part of metadata in minting, we included the `url` attribute from the  
NFT.storage upload. This `url` is an IPFS URL in the form of `ipfs://<CID>/data.json`.  
We are interested in this URL because it points to the JSON data containing the URL to  
the pet image we uploaded to IPFS. To fetch it using JavaScript, we had to convert the IPFS  
URL to the HTTP gateway URL with [`toGatewayURL`](https://nftstorage.github.io/nft.storage/client/modules.html#toGatewayURL). Once we fetched the JSON and convert to an object, we access the  
`image` attribute, convert it to HTTP URL, and include it along with other data in the new metadata  
object we set the state with `setMetadata`. It is then ready for the `MetadataTable`component  
to display.

Note that in the case of error, `handleSubmit` would call `window.alert` and display a simple popup  
window to notify the user.

There was no change needed for the component code.

Now, try to mint an NFT with the mint form, and query it with the query form! Hopefully, it should all work as intended.

Congratulations! You have single-handedly built a NFT minting and querying marketplace on Flow. This has been a great achievement!

# Next steps

Flow’s focus on developer’s experience and the accessibility of its smart contract language Cadence, plus its low gas fee and high throughput, make it an extremely promising blockchain to build NFT-related apps on.

Because NFTs have assets that need to be stored off-chain permanently, using NFT.Storage to store them on the Filecoin network is a natural way to go as the first step to launch your NFT app on Flow quickly.

If you are still hungry to learn more about Flow and NFT.Storage, here is a non-exhaustive list of the resources to tackle next:

* Dive into the [Cadence Language Reference](https://docs.onflow.org/cadence/language/).
* Explore [Flow Client Library](https://docs.onflow.org/fcl/), especially the authorization.
* Familiarize with [NFT.storage documentation](https://nftstorage.github.io/nft.storage/client/).

Last but not least, if you would like to contribute to make this tutorial better, start by creating an issue on the [repo](https://github.com/protocol/nft-website/blob/main/docs/tutorial/flow-nft-marketplace.md) or just leave your comment. No contribution is too small.