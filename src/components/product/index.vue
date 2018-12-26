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
          .col.col-xs-12.col-sm-6.col-lg-4.col-xxl-3(
            v-for="banner in banners"
            :class="getBannerClasses(banner.ordering)")
            banner(:src="banner.image.path", :background="banner.background")
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
    banners() {
      return this.$store.state.banners.items;
    },
    description() {
      return this.$store.state.productDescription[this.currentProduct];
    },
  },
  methods: {
    getBannerClasses(ordering) {
      if (ordering) {
        return ordering.map(config => `col-${config.breakpoint}-order-${config.order}`).join(' ');
      }
      return '';
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
