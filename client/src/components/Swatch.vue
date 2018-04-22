<template>
  <div class="swatch" v-bind:style="{'background-color': color}"></div>
</template>
<script>
export default {
  name: 'Swatch',
  props: ['color']
}
</script>

<style lang="scss">
.swatch {
    width: 25px;
    height: 25px;
    display: inline-block;
}
</style>
