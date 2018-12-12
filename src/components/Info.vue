<template lang="pug">
  .info
    .info__block Находимся на Пр. Победы 392
    .info__block Звоните 223–64–33
    .info__block Пишите atmosphere@vkusa.ru
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
    margin: $base 0;
  }
}
</style>
