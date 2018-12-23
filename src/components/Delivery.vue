<template lang="pug">
  .delivery
    iframe.delivery__map(src="/views/map.html")
</template>

<script>
export default {
  name: 'Delivery',
};
</script>

<style lang="scss">
.delivery {
  &__map {
    width: 100%;
    height: calc(100vh - 66px);
  }
}
</style>
