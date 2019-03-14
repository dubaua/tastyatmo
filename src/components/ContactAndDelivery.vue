<template lang="pug">
  .delivery
    .delivery__info.typography(v-html="delivery")
    iframe.delivery__map(src="https://xn----7sbabjp2blsvjgdxi.xn--p1ai/map/")
</template>

<script>
export default {
  name: 'ContactAndDelivery',
  computed: {
    delivery() {
      return this.$store.state.delivery.content;
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.delivery {
  position: relative;
  overflow: hidden;
  @media screen and (min-height: 668px) {
    height: calc(100vh - 56px);
  }
  display: flex;
  flex-direction: column;

  &__map {
    flex-grow: 1;
    width: 100%;
    height: 50vh;

    @media screen and (min-height: 668px) {
      height: calc(100vh - 66px);
    }
  }
  &__info {
    padding: $base $base * 2;
    background-color: $color-background;
    @include from-breakpoint("md") {
      width: 320px;
      position: absolute;
      left: 5vw;
      top: 10vh;

      border-radius: 2px;
      box-shadow: 0 1px 3px rgba($color-shade, 0.08);
      overflow: hidden;
    }
  }
}
</style>
