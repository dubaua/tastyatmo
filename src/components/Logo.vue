<template lang="pug">
  router-link(to="/").logo
    icon(glyph="logo--parts", :width="240", :height="240")
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss">
.logo {
  display: inline-block;
  line-height: 0;
  text-align: center;
  .icon {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
