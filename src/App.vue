<template lang="pug">
  #app
    section.page(
      v-touch:swipe.right="openMenu",
      v-touch:swipe.left="closeMenu",
    )
      router-view
      overlay
    template(v-if="isMobile")
      slide-in(
        direction="right",
        :isActive="page.isMenuOpen",
        swipeAction="closeMenu",
        title="Меню",
      )
        aside
          navigation
          info
      slide-in(
        direction="up",
        :isActive="page.isCartOpen",
        swipeAction="closeCart",
        title="Корзина",
      )
        cart
        order
      app-footer
    template(v-else)
      header.desktop-header
        navigation(isCompact)
      aside.desktop-panel
        logo.desktop-panel__logo
        info
        .desktop-panel__cart
          cart
          status
      transition(name="fade")
        .cart-popup(v-if="page.isCartOpen")
          .cart-popup__title Корзина
          cart
          order
</template>

<script>
import Product from '@/components/product';
import Navigation from '@/components/Navigation';
import Info from '@/components/Info';
import Cart from '@/components/cart';
import Order from '@/components/Order';
import Status from '@/components/cart/Status';
import AppFooter from '@/components/AppFooter';
import Logo from '@/components/Logo';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Product,
    Cart,
    Order,
    Status,
    AppFooter,
    Logo,
    Info,
    Navigation,
  },
  computed: {
    ...mapState(['page']),
    ...mapGetters(['somePanelsIsOpen']),
    isMobile() {
      return this.$mq === 'mobile';
    },
    getYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    ...mapActions(['scheduleAction', 'closeMenu', 'closeCart']),
    openMenu() {
      this.scheduleAction({ next: 'openMenu', blocking: 'Cart' });
    },
  },
};
</script>

<style lang="scss">
@import "./styles/_globals";

.page {
  box-sizing: border-box;
  padding-bottom: 56px;
  min-height: 100vh;
}

@include from-breakpoint("xl") {
  .page {
    margin-right: 300px;
    padding-bottom: 0;
    padding-top: 66px;
  }
}

.desktop-panel {
  @include fixed-overlay;
  left: auto;
  width: 300px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background: $color-background--contrast;
  color: $color-text--contrast;

  &__cart {
    margin-top: auto;
  }
}

.desktop-header {
  @include fixed-overlay;
  bottom: auto;
  background: $color-background--contrast;
  color: $color-text--contrast;
}

.cart-popup {
  position: fixed;
  top: 50%;
  left: calc(50% - 150px);
  transform: translate(-50%, -50%);
  max-width: 480px;
  width: 100%;
  padding: $base 0;
  background: $color-background;

  &__title {
    text-align: center;
    font-family: "Merriweather", serif;
    font-weight: 700;
    font-size: $base * 1.25;
  }
}
</style>
