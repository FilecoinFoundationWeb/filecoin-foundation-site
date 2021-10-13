<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 14.9">

    <path
      d="M2.3,13.5H1.8a1.1,1.1,0,0,1-.5-.9V2.4a1.1,1.1,0,0,1,.5-.9h1l8.9,5.1a.7.7,0,0,1,.5.8.9.9,0,0,1-.5.9L2.8,13.4Z"
      class="icon__play__triangle-inner" />

    <path
      d="M2.3,2.4l8.9,5L2.3,12.5V2.4m0-2L1.3.6a2.2,2.2,0,0,0-1,1.8V12.5a1.9,1.9,0,0,0,1,1.7,1.9,1.9,0,0,0,1,.3,1.9,1.9,0,0,0,1-.3l8.9-5a1.9,1.9,0,0,0,1-1.8,1.9,1.9,0,0,0-1-1.7L3.3.6,2.3.4Z"
      class="icon__play__triangle-outer" />

  </svg>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'IconPlay'
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.icon__play__triangle-inner,
.icon__play__triangle-outer {
  transition: 250ms ease-in-out;
}

.icon__play__triangle-inner {
  fill: transparent;
}

.icon__play__triangle-outer {
  fill: white;
}
</style>
