<template lang="pug">
.footer
  button.footer__button(@click="scheduleAction({next:'toggleMenu',blocking:'Cart'})")
    .hamburger.hamburger--squeeze(:class="{'is-active':page.isMenuOpen}")
      .hamburger-box
        .hamburger-inner
  router-link(to="/", @click.native="closeAll").footer__logo
    icon(glyph="logo-compact", :width="91", :height="48")
  button.footer__button.cart-button(@click="scheduleAction({next:'toggleCart',blocking:'Menu'})")
    .cart-button__label(v-if="totalAmount") {{cartLabel}}
    icon(glyph="shopping-bag", :width="48", :height="48")
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppFooter',
  computed: {
    ...mapState(['page']),
    ...mapGetters(['totalAmount']),
    cartLabel() {
      return this.totalAmount > 9 ? '9+' : this.totalAmount;
    },
  },
  methods: {
    ...mapActions(['scheduleAction', 'closeAll']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
@import "../styles/hamburger";

.footer {
  position: fixed;
  bottom: 0;
  height: 48px;
  left: 0;
  padding: 4px 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  background: $color-background;

  &__button {
    max-width: $base * 4;
    flex-basis: $base * 4;
    text-align: center;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;

    & .icon {
      fill: $color-text;
    }
  }
  &__logo {
    flex-grow: 1;
    text-align: center;
    color: $color-text;
  }
}

.cart-button {
  position: relative;

  &__label {
    position: absolute;
    top: 9px;
    right: 12px;
    width: 13px;
    height: 13px;
    padding: 1px;
    border-radius: 50%;
    color: $color-text--contrast;
    background: $color-primary;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
  }
}
</style>
