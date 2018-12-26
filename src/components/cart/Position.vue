<template lang="pug">
  .position
    .position__title {{position.title}} {{position.details}}
    .position__status
      button.position__button(
        size="mini",
        @click="changeAmount({ cartId: position.cartId, modifier: -1})") –
      | {{position.amount}}
      button.position__button(
        size="mini",
        @click="changeAmount({ cartId: position.cartId, modifier: 1})") +
      | &times; {{position.price}} ₽
      //- base-button(
      //-   size="mini",
      //-   @click="changeAmount({ cartId: position.cartId, modifier: -position.amount})")
      //-     | &times;
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Position',
  props: {
    position: Object,
  },
  methods: {
    ...mapActions(['changeAmount']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.position {
  margin-bottom: $base;
  &__button {
    display: inline-block;
    background: none;
    margin: 0;
    border: 1px solid $color-background-unactive;
    color: inherit;
    cursor: pointer;
  }
  &__status {
    text-align: right;
    margin-top: $base * 0.25;
    * {
      margin: 0 $base * 0.5;
    }
  }
}
</style>
