<template lang="pug">
  .position(:class="{'position--compact': isCompact}")
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
    position: {
      type: Object,
      required: false,
    },
    isCompact: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    ...mapActions(['changeAmount']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.position {
  $block: &;
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
  &--compact {
    @include from-breakpoint('xl') {
      display: flex;
      justify-content: space-between;
      position: relative;
      &:before {
        content: '';
        left: 0;
        right: 0;
        bottom: 7px;
        height: 1px;
        position: absolute;
        background: $color-background-unactive;
      }
      #{$block}__title {
        background: $color-background;
        position: relative;
        padding-right: $base * 0.5;
      }
      #{$block}__status {
        background: $color-background;
        position: relative;
        padding-left: $base * 0.5;
        margin-top: 0;
      }
    }
  }
}
</style>
