# Filecoin Foundation Website

Website for the Filecoin Foundation

## Components

**Example Data Structure**

```json
{
  "id": "intro_1",
  "grid": ["middle"],

  "left": {
    "type": "video_block",
    "cols": {
      "num": "col-6",
      "push_left": "off-2"
    },
    "preview_image": "/images/placeholder-image.png",
    "url": "https://www.youtube.com/watch?v=s6ScieEs5Ys"
  },
  "right": {
    "type": "text_block",
    "layout": "compact",
    "cols": {
      "num": "col-4",
      "push_left": "off-3"
    },
    "label": {
      "type": "D",
      "theme": "light",
      "action": "video",
      "icon": "play",
      "text": "Watch now",
      "url": "https://www.youtube.com/watch?v=s6ScieEs5Ys"
    },
    "description": "Join us as Thomas Jefferson argues with Alexander Hamilton in Washington D.C.",
    "customizations": [
      {
        "name": "BackgroundLayers",
        "props": {
          "layers-array": [8, 6, 5, 4, 2, 1],
          "offset": 1.375,
          "reverse": true
        }
      }
    ]
  }
}
```

**Common Keys**

`grid` | this is a top-level section key. Any strings in this array will get _attached_ to the `grid` class.

```js
{
  grid: [String]
}
```

`left`, `right` | these keys contain all the content for the left or right columns. Only 1 is required.

```js
{
  left: Object,
  right: Object
}
```

`cols` | this key is nested inside the `left` or `right` keys

```js
{
  cols: {
    num: String,
    push_left: String,
    push_right: String
  }
}
```

**Text Block** | `text_block`

```js
{
  type: 'text_block',
  layout: String, // 'large', 'medium' or 'compact'
  label: String|<Button>, // String → simply outputs string | Object → <Button> component is outputted
  heading: String,
  subheading: String,
  description: String,
  ctas: [<Button>]
}
```

**Video Block** | `video_block`

```js
{
  type: 'video_block',
  preview_image: String,
  url: String,
  subtext: <Button>,
  tint: Boolean
}
```

**Image Block** | `image_block`

```js
{
  type: 'image_block',
  src: String
}
```

**Button**

```js
{
  type: String, // letter of the alphabet like 'A' or 'B'
  theme: String, // 'light' or 'dark'
  action: String, // 'link', 'nuxt-link', 'button' or 'video'
  icon: String,
  text: String,
  url: String // if action === 'video', this is the URL to the video that opens in the modal
}
```

**Icons**

Below is a list of icon values that can be passed into any `icon` property in the component objects:

- `play`
- `info`
