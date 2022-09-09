<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.3 21.1">

    <path
      d="M10.6,18.4a7.9,7.9,0,0,1-8-7.9,8,8,0,0,1,16,0A7.9,7.9,0,0,1,10.6,18.4Z"
      class="icon__info__circle-inner" />

    <path
      d="M10.6,3.5a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-2a9,9,0,0,0-9,9,9,9,0,1,0,9-9Z"
      class="icon__info__circle-outer" />

    <path
      d="M9.9,8.2V6.9h1.5V8.2Zm0,6.6V9h1.5v5.8Z"
      class="icon__info__letter-i" />

  </svg>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'IconInfo'
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.icon__info__circle-outer,
.icon__info__circle-inner,
.icon__info__letter-i {
  transition: 250ms ease-in-out;
}

.icon__info__circle-inner {
  fill: transparent;
}

.icon__info__circle-outer,
.icon__info__letter-i {
  fill: $white;
}
</style>
