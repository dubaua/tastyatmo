<template lang="pug">
  .menu(:class="{'menu--compact':isCompact}")
    template(v-for="link in menu")
      router-link(:to="link.to", @click.native="closeMenu").menu__link {{link.label}}
    router-link(to="/delivery", @click.native="closeMenu").menu__link Доставка
    router-link(to="/contact", @click.native="closeMenu").menu__link Контакты
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navigation',
  props: {
    isCompact: Boolean,
  },
  data() {
    return {
      menu: [
        {
          to: '/',
          label: 'Wok',
          glyph: 'wok',
        },
        {
          to: '/pizza',
          label: 'Пицца',
          glyph: 'pizza',
        },
        {
          to: '/pies',
          label: 'Пироги',
          glyph: 'pies',
        },
        {
          to: '/sushi',
          label: 'Суши',
          glyph: 'sushi',
        },
        {
          to: '/drinks',
          label: 'Напитки',
          glyph: 'drinks',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['closeMenu']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.menu {
  &--compact {
    display: flex;
  }
  &__link {
    display: flex;
    align-items: center;
    padding: $base $base * 2;
    font-family: $font--title;
    text-decoration: none;
    letter-spacing: 0.05em;
    color: $color-text--contrast;
    cursor: pointer;
    &.router-link-exact-active {
      color: $color-primary;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        display: block;
        left: 50%;
        transform: translate(-50%, 0);
        top: 100%;
        border-width: 8px 12px 0 12px;
        border-style: solid;
        border-color: $color-background--contrast transparent transparent transparent;
      }
    }

    @include from-breakpoint('xl') {
      padding-bottom: $base * 1.5;
      padding-top: $base * 1.5;
    }
  }
}
</style>
