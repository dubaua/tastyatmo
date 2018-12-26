<template lang="pug">
.cart-status
  base-button(size="wide", @click="toggleCart", v-if="totalAmount")
    | {{cartLabel}}
  template(v-else)
    | Ваша корзина пуста
</template>

<script>
import { declOfNum, numberWithSpaces } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Status',
  computed: {
    ...mapGetters(['totalAmount', 'totalCost']),
    cartLabel() {
      return `${this.totalAmount} ${declOfNum(this.totalAmount, ['товар', 'товара', 'товаров'])} на ${numberWithSpaces(this.totalCost)} ₽`;
    },
  },
  methods: {
    ...mapActions(['toggleCart']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.cart-status {
  margin-top: auto;
  padding: $base;
  text-align: center;
}
</style>
