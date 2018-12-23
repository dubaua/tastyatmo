<template lang="pug">
  .card
    .card__preview
      img(:src="product.photo.path", :alt="product.title")
    .card__details
      .card__about.typography
          h2 {{product.title}}
          div(v-html="product.description")
      .card__measure(v-if="isSimpleProduct") {{product.measure}}
      .card__switch(v-else)
        .card__option(
          v-for="version in product.versions",
          @click="setVersion(version.id)",
          :class="{'card__option--active': version.id === product.chosenVersion}")
            | {{version.measure}}
      .card__action
        .card__price {{ price }} ₽
        base-button(@click="addToCart(product)").card__button.button--wide
          | {{ amount > 0 ? 'В корзине ' + amount : 'Заказать'}}
</template>

<script>
import { mapActions } from 'vuex';
import { numberWithSpaces } from '@/utils';

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Card',
  props: {
    product: Object,
  },
  computed: {
    isSimpleProduct() {
      return typeof this.product.versions !== 'object';
    },
    price() {
      return this.isSimpleProduct
        ? numberWithSpaces(this.product.price)
        : numberWithSpaces(this.product.versions[this.product.chosenVersion].price);
    },
    currentProduct() {
      return this.$route.params.productId || 'pizza';
    },
    versionId() {
      return this.product._id + (this.isSimpleProduct ? '' : `_ver${this.product.chosenVersion}`);
    },
    amount() {
      return this.$store.getters.amountInCart(this.versionId);
    },
  },
  methods: {
    ...mapActions([
      'addToCart',
    ]),
    // actually this is action creator
    setVersion(versionId) {
      if (this.product.chosenVersion !== versionId) {
        this.$store.commit('setVersion', {
          product: this.currentProduct,
          productId: this.product._id,
          versionId,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.card {
  $block: "card";

  display: flex;
  flex-direction: column;
  height: calc(100% - #{$base * 2});
  margin-bottom: $base * 2;
  box-sizing: border-box;
  background-color: $color-background;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba($color-shade, 0.08);
  overflow: hidden;

  &__preview {
    border-radius: 2px 2px 0 0;
    overflow: hidden;
    & img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  &__details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__about {
    padding: $base $base * 1.5;
  }

  &__measure {
    padding: 0 $base * 1.5 $base;
    color: $color-text--body;
    font-size: 14px;
    line-height: 1.35;
  }

  &__switch {
    display: flex;
    flex-wrap: nowrap;
    margin: $base $base * 1.5;
    border-radius: $base * 0.25;
    background: $color-background-unactive;
    color: $color-unactive;
  }

  &__option {
    flex-grow: 1;
    margin: 0 $base * -0.5;
    padding: $base * 0.33 $base * 0.5;
    border: 1px solid transparent;
    border-radius: $base * 0.25;
    cursor: pointer;
    font-size: $base * 0.8;
    text-align: center;
    transition: margin $timing ease, padding $timing ease;
    &:first-child {
      margin-left: 0;
      padding-left: 0;
    }
    &:last-child {
      margin-right: 0;
      padding-right: 0;
    }
    &--active {
      margin: 0;
      padding-left: 0;
      padding-right: 0;
      color: $color-primary;
      background: $color-background;
      border-color: $color-primary;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding: $base $base * 1.5;
    background-color: $color-tint--muted;
  }

  &__price {
    font-family: $font--body;
    font-size: $base * 1.25;
  }

  &__button {
    max-width: 50%;
  }
}
</style>
