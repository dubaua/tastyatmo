<template lang="pug">
  .shop-section
    .container
      //- .row
      //-   .col.col-xs-12.col-xs-order-1.col-lg-4.col-xxl-6
      //-     .shop-section__about
      //-       .typography
      //-         h1 {{description.title}}
      //-         div(v-html="description.content")
      //-   .col.col-xs-12.col-lg-8.col-lg-order-1.col-xxl-6
      //-     .shop-section__preview(v-if="description.image")
      //-       img(:src="description.image.path", :alt="description.title").shop-section__image
      .row
        template(v-if="products")
          .col.col-xs-12.col-sm-6.col-lg-4.col-xxl-3(
            v-for="(card, id, index) in products",
            :style="'order: '+index")
            card(:product="card")
          .col.col-xs-12.col-sm-6.col-lg-4.col-xxl-3.col-xs-order-2.col-sm-order-2.col-lg-order-1.col-xxl-order-2
            banner(src="/static/banner-5-1.png", background="blank")
          .col.col-xs-12.col-sm-6.col-lg-4.col-xxl-3.col-xs-order-5.col-sm-order-4.col-xxl-order-6
            banner(src="/static/banner-6-1.png", background="background")
        .col.col-xs-12(v-else)
          | Нет товаров
</template>

<script>
import Card from './Card';

export default {
  name: 'Product',
  components: {
    Card,
  },
  computed: {
    currentProduct() {
      return this.$route.params.productId || 'wok';
    },
    products() {
      return this.$store.state.products[this.currentProduct];
    },
    description() {
      return this.$store.state.productDescription[this.currentProduct];
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.shop-section {
  padding-top: $base * 2;
  &__about {
    padding: $base * 2;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__description {
    p {
      margin: 0;
      line-height: 1.35;
    }
    * + p {
      margin-top: 1em;
    }
  }
  &__preview {
    line-height: 0;
  }
  &__image {
    max-width: 100%;
    height: auto;
  }
}
</style>
