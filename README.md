# Filecoin Foundation Website

Primary website for the Filecoin Foundation

## Components

**Common**

```js
{
  cols: {
    num: Number,
    push_left: Number,
    push_right: Number
  }
}
```

**Text Block** | `text_block`

```js
{
  type: 'text-block',
  layout: String, // "large", "medium" or "compact"
  label: String|<Button>, // String → simply outputs string | Object → <Button> component is outputted
  heading: String,
  subheading: String,
  description: String,
  ctas: [<Button>]
}
```

**Video** | `video`

```js
{
  type: 'video',
  preview_image: String,
  url: String,
  icon: String,
  subtext: String
}
```

**Image** | `image`

```js
{
  type: 'image',
  src: String
}
```

**Button**

```js
{
  type: String, // letter of the alphabet like "A" or "B"
  action: String, // "link", "nuxt-link", "button" or "video"
  icon: String,
  text: String,
  url: String // if action === "video", this is the URL to the video
}
```

**Icons**

Below is a list of icon values that can be passed into any `icon` property in the component objects:

- play
- info
