<template lang="pug">
.pies.container
  .row
    .col.col-xs-12.col-sm-6.col-lg-6.col-xxl-6
      .pies__constructor
        .row
          .col-xs-12.typography
            h1 Соберите свой пирог
        .row
          .col-xs-12.col-xxl-6
            .pies__parameter
              .typography
                h2 Какую любите начинку?
              .pies__option(
                v-for="filling in piesConfig.fillingTypes"
                @click="setOptionByKey('filling', filling.id)"
                :class="{'pies__option--active': filling.id === chosen.filling}") {{ filling.title }}
          .col-xs-12.col-xxl-6
            .pies__parameter
              .typography
                h2 Подходящий размер?
              .pies__option(
                v-for="weight in piesConfig.weightTypes"
                @click="setOptionByKey('weight', weight.id)"
                :class="{'pies__option--active': weight.id === chosen.weight}") {{ weight.amount }}кг
            .pies__parameter
              .typography
                h2 Какое тесто предпочитаете?
              .pies__option(
                v-for="dough in piesConfig.doughTypes"
                @click="setOptionByKey('dough', dough.id)"
                :class="{'pies__option--active': dough.id === chosen.dough}") {{ dough.title }}
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
        return `${dough} пирог ${filling}`;
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
        _id: `pie_fill-${this.chosen.filling}_dough-${this.chosen.dough}_amount-${this.chosen.weight}`,
        details: `${this.pieWeight} кг`,
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
    padding: $base * 2 $base * 3;
    height: 100%;
    box-sizing: border-box;
  }
  &__parameter {
    margin-bottom: $base * 2;
  }
  &__option {
    margin-bottom: $base;
    cursor: pointer;
    transition: margin $timing ease, padding $timing ease;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: bottom;
      width: $base;
      height: $base;
      border-radius: 50%;
      margin-right: $base * 0.5;
      border: 1px solid $color-text;
    }
    &--active {
      color: $color-primary;
      &::before {
        background: $color-primary;
        box-shadow: inset 0 0 0 $base * 0.25 $color-text--contrast;
      }
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
