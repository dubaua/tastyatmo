<template lang="pug">
  .cart
    .cart__empty(v-if="totalAmount === 0")
      | Корзина пока что, пуста ;(
    .cart__filled(v-else)
      .cart__contents
        position(
          v-for="position in cart",
          :key="position.id",
          :position="position"
          :isCompact="isCompact")
      .cart__total
        .cart__total-label Всего
        .cart__total-sum {{totalCost}} ₽
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Order from '@/components/Order';
import Position from './Position';

export default {
  name: 'Cart',
  components: {
    Order,
    Position,
  },
  props: {
    isCompact: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    ...mapGetters(['totalCost', 'totalAmount']),
    ...mapState(['cart']),
    isCartOpen() {
      return this.$store.state.page.isCartOpen;
    },
  },
  methods: {
    ...mapActions(['changeAmount', 'closeCart']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.cart {
  display: flex;
  flex-direction: column;
  padding: $base;
  &__empty {
    text-align: center;
  }

  &__filled {
    padding: 0 $base;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba($color-text--contrast, 0.2);
    margin: $base 0;
    padding-top: $base;
  }
  &__total-sum {
    /* padding-right: $base * 2.5; */
  }
}
</style>
