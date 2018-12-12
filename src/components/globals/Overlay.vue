<template lang="pug">
  transition(
    name="fade",
    @after-leave="unfreeze",
    @before-enter="freeze",
    )
    .overlay(
      v-if="isOverlayed",
      @click.self="closeAll"
    )
</template>

<script>
import disableScroll from 'disable-scroll';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Overlay',
  computed: {
    ...mapGetters(['isOverlayed']),
  },
  methods: {
    ...mapActions(['closeAll']),
    freeze() {
      disableScroll.on();
    },
    unfreeze() {
      disableScroll.off();
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.overlay {
  @include fixed-overlay;

  background: rgba($color-primary, 0.85);
  backdrop-filter: blur(5px);
}
</style>
