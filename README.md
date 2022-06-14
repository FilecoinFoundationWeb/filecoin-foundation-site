# Filecoin Foundation Website

> Note: these docs will be expanded upon in a future iteration of the site

## Overview

- This is the repository for the _Filecoin Foundation_ website ([fil.org](https://fil.org))

- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site is hosted on IPFS and is compatible with relative URLs, for IPFS and IPNS gateway paths
- The site's resources are served statically, but internal navigation is virtualized: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the `target` in settings

## Stack
- Requires nodeJS and has been tested on node 16
- Uses a Vue framework, [nuxtJS](https://nuxtjs.org/), deployed in static mode

## Build
To build this site locally
- Clone this repo
- Make sure NodeJS 16 or newer is installed
- To build a static site
    - Run `npm ci && npm run generate`
    - A directory `dist` is created, which contains the static site output
- To run locally, for features like hot reload
    - Run `npm ci && npm run dev`
    - The site will be available in real time via a localhost URL

## URLs and branches
- Staging - `develop` builds to `a non public url`
- Production - `main` builds to `fil.org`
- Content - `content` is a branch that the CMS writes to
  - When pull requested against `main`, the `content` branch will be auto approved by a Github action
- Each PR will also generate an IPFS build preview link, so it can be validated before being merged

## Managing Content
- Editing content directly
  - Structured content can be found in `json` files
  - Written paragraph-type content can be found in `md` files, in markdown format
  - See the `content/pages/` directory
- Editing content via the CMS
  - Content can be edited via Forestry.io, and requires a login
  - Global site content, like default metadata, is editable in the `general` section
  - Structured content is shown in blocks on a per-page basis (see the pages)
  - Blog content is fully editable in a wysiwyg editor markdown editor
  - Media can be uploaded directly to the repository via the `media`` section, after which point it can be used in any rich media field
  