<template lang="pug">
.pies.container
  .row
    .col.col-xs-12.col-sm-6.col-lg-4.col-xxl-3
      .pies__card
        .pies__preview
          img(src="/cockpit/storage/uploads/pirog.jpg" alt="pieTitle")
        .pies__about.typography
          h2 {{ pieTitle }}
          p {{pieWeight}} кг
        .pies__action
          .pies__price {{ piePrice }} ₽
          base-button(@click="addToCart(composedPie)").pies__button.button--wide
            | {{ amount > 0 ? 'В корзине ' + amount : 'Заказать'}}
    .col.col-xs-12.col-sm-6.col-lg-8.col-xxl-9
      .pies__constructor.typography
        h1 Соберите свой пирог
        h2 Какую любите начинку?
        .pies__select
          .pies__option(
            v-for="filling in piesConfig.fillingTypes"
            @click="setOptionByKey('filling', filling.id)"
            :class="{'pies__option--active': filling.id === chosen.filling}"
          ) {{ filling.title }}
        h2 Подходящий размер?
        .pies__select
          .pies__option(
            v-for="weight in piesConfig.weightTypes"
            @click="setOptionByKey('weight', weight.id)"
            :class="{'pies__option--active': weight.id === chosen.weight}"
          ) {{ weight.amount }}кг
        h2 Какое тесто предпочитаете?
        .pies__select
          .pies__option(
            v-for="dough in piesConfig.doughTypes"
            @click="setOptionByKey('dough', dough.id)"
            :class="{'pies__option--active': dough.id === chosen.dough}"
          ) {{ dough.title }}

</template>

<script>
import { mapActions } from 'vuex';
import { numberWithSpaces } from '@/utils';

export default {
  name: 'Pies',
  data() {
    return {
      chosen: {
        filling: '1',
        weight: '1',
        dough: '1',
      },
    };
  },
  computed: {
    pieTitle() {
      if (this.piesConfig.doughTypes
      && this.piesConfig.fillingTypes) {
        const dough = this.piesConfig.doughTypes[this.chosen.dough].title.replace('ое', 'ый');
        const filling = this.piesConfig.fillingTypes[this.chosen.filling].title;
        return ` ${dough} пирог ${filling}`;
      }
      return 'Загрузка';
    },
    pieWeight() {
      return this.piesConfig.weightTypes && this.piesConfig.weightTypes[this.chosen.weight].amount;
    },
    piePrice() {
      if (this.piesConfig.doughTypes
      && this.piesConfig.fillingTypes
      && this.piesConfig.weightTypes) {
        const doughModifier = Number(this.piesConfig.doughTypes[this.chosen.dough].modifier);
        const fillingPrice = Number(this.piesConfig.fillingTypes[this.chosen.filling].price);
        const amount = Number(this.piesConfig.weightTypes[this.chosen.weight].amount);
        return numberWithSpaces(doughModifier * fillingPrice * amount);
      }
      return 0;
    },
    piesConfig() {
      return this.$store.state.piesConfig;
    },
    amount() {
      return this.$store.getters.amountInCart(this.versionId);
    },
    composedPie() {
      return {
        amount: 1,
        cartId: `pie_fill-${this.chosen.filling}_dough-${this.chosen.dough}_amount-${this.chosen.weight}`,
        details: '',
        price: this.piePrice,
        title: this.pieTitle,
      };
    },
  },
  methods: {
    ...mapActions([
      'addToCart',
    ]),
    setOptionByKey(key, value) {
      this.chosen[key] = value;
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.pies {
  padding-bottom: $base * 2;
  padding-top: $base * 2;
  &__card {
    background-color: $color-background;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba($color-shade, 0.08);
    overflow: hidden;
  }

  &__preview {
    border-radius: 2px 2px 0 0;
    overflow: hidden;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  &__about {
    padding: $base $base * 1.5;
  }
  &__constructor {
    background-color: $color-background;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba($color-shade, 0.08);
    overflow: hidden;
    padding: $base $base * 1.5;
  }
  &__select {
    display: flex !important;
    flex-wrap: nowrap;
    margin: $base 0;
    border-radius: $base * 0.25;
    max-width: $base * 32;
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
