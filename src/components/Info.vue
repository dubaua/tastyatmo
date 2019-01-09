<template lang="pug">
  .info
    .info__block Ежедневно с 10:00 до 23:00.
    .info__block Молодогвардейцев 76,
    .info__block +7 (351) 225-10-78
    .info__block
      a(href="https://vk.com/atmospherevkusa") Группа VK
</template>

<script>
export default {
  name: 'Info',
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.info {
  padding: $base;

  @include from-breakpoint("lg") {
    background: none;
  }

  &__block {
    text-align: center;
    margin-bottom: $base;

    a {
      color: inherit;
    }
  }
}
</style>
