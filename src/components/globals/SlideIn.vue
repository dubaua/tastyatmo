<template lang="pug">
  transition(:name="transitionName" @after-leave="dispatchNext")
    aside.slide-in(
      v-if="isActive",
      v-touch:swipe.top="direction === 'down' && swipeAction ? onSwipe : null",
      v-touch:swipe.left="direction === 'right' && swipeAction ? onSwipe : null",
      v-touch:swipe.right="direction === 'left' && swipeAction ? onSwipe : null",
      v-touch:swipe.bottom="direction === 'up' && swipeAction ? onSwipe : null",
    )
      h1.slide-in__title(v-if="title") {{ title }}
      div.slide-in__body
        slot
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SlideIn',
  props: {
    direction: {
      requred: true,
      type: String,
      default: 'right',
    },
    isActive: {
      requred: true,
      type: Boolean,
    },
    swipeAction: String,
    title: String,
  },
  computed: {
    isMobile() {
      return this.$mq === 'mobile';
    },
    transitionName() {
      return `slide-${this.direction}`;
    },
  },
  methods: {
    ...mapActions(['dispatchNext']),
    onSwipe() {
      this.$store.dispatch(this.swipeAction);
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.slide-in {
  @include fixed-overlay;

  bottom: 56px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  color: $color-text--contrast;
  background: $color-background--contrast;

  @include from-breakpoint("sm") {
    right: 50%;
  }

  @include from-breakpoint("lg") {
    right: 66.67%;
  }

  &__title {
    margin: 0 $base $base;
    padding: $base 0;
    font-size: $base;
    text-align: center;
  }

  &__body {
    flex-grow: 1;
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: $base;
  }
}
</style>
