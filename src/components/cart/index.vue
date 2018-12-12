<template lang="pug">
  .cart
    .cart__empty(v-if="totalAmount === 0")
      | Корзина, пока что, пуста ;(
    .cart__filled(v-else)
      .cart__contents
        position(
          v-for="position in cart",
          :key="position.id",
          :position="position")
      .cart__total
        .cart__total-label Всего
        .cart__total-sum {{totalCost}} ₽
      order
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

  &__empty {
    margin: auto;
    padding-bottom: 4em;
    text-align: center;
  }

  &__filled {
    padding: 0 $base;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $color-unactive;
    margin: $base 0;
    padding-top: $base;
  }
  &__total-sum {
    padding-right: $base * 2.5;
  }
}
</style>
