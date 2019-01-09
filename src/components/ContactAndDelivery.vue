<template lang="pug">
  .delivery
    .delivery__info.typography
      h1 Контакты
      p
        strong Время работы:
        |&nbsp;ежедневно с 10:00 до 23:00.
      p
        strong Адрес:
        |&nbsp;Молодогвардейцев 76,
      p
        strong Телефон:
        |&nbsp;+7 (351) 225-10-78
      h2 Доставка
      .delivery__zone
        .delivery__legend.delivery__legend--green
        p.delivery__details
          | Доставка от 500&nbsp;₽, стоимость доставки 100&nbsp;₽.
          | Бесплатная доставка от 800&nbsp;₽.
          | Время доставки: 1–1.5 часа.
      .delivery__zone
        .delivery__legend.delivery__legend--yellow
        p.delivery__details
          | Доставка от 500&nbsp;₽, стоимость доставки 150&nbsp;₽.
          | Бесплатная доставка от 1000&nbsp;₽.
          | Время доставки: 1–1.5 часа ± 15 минут.
      .delivery__zone
        .delivery__legend.delivery__legend--red
        p.delivery__details
          | Доставка от 500&nbsp;₽. стоимость доставки 200&nbsp;₽.
          | Бесплатная доставка от 1500&nbsp;₽.
          | Время доставки: 1.5–2 часа.
    iframe.delivery__map(src="https://xn----7sbabjp2blsvjgdxi.xn--p1ai/map/")
</template>

<script>
export default {
  name: 'ContactAndDelivery',
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.delivery {
  position: relative;
  overflow: hidden;
  @media screen and (min-height: 668px) {
    height: calc(100vh - 56px);
  }
  display: flex;
  flex-direction: column;

  &__map {
    flex-grow: 1;
    width: 100%;
    height: 50vh;

    @media screen and (min-height: 668px) {
      height: calc(100vh - 66px);
    }
  }
  &__info {
    padding: $base $base * 2;
    background-color: $color-background;
    @include from-breakpoint("md") {
      width: 320px;
      position: absolute;
      left: 5vw;
      top: 10vh;

      border-radius: 2px;
      box-shadow: 0 1px 3px rgba($color-shade, 0.08);
      overflow: hidden;
    }
  }
  &__zone {
    display: flex !important;
  }
  &__details {
    margin-top: 0;
  }
  &__legend {
    flex-basis: $base;
    min-width: $base;
    height: $base;
    margin-right: $base * 0.5;
    border: 2px solid;
    &--green {
      background-color: rgba(86, 219, 64, 0.6);
      border-color: rgba(27, 173, 3, 0.9);
    }
    &--yellow {
      background-color: rgba(255, 210, 30, 0.6);
      border-color: rgba(255, 147, 30, 0.9);
    }
    &--red {
      background-color: rgba(237, 69, 67, 0.6);
      border-color: rgba(237, 69, 67, 0.9);
    }
  }
}
</style>
