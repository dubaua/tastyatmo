<template lang="pug">
  .info(v-html="info")
</template>

<script>
export default {
  name: 'Info',
  computed: {
    info() {
      return this.$store.state.info.content;
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.info {
  padding: $base;

  @include from-breakpoint("lg") {
    background: none;
  }

  p {
    text-align: center;
    margin: 0 0 $base;

    a {
      color: inherit;
    }
  }
}
</style>
