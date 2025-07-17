<template>
  <div
    class="grid gap-2 items-start fields grid-cols-[8rem_9rem_1fr_12rem_2rem]"
  >
    <span>Метки</span>
    <span>Тип записи</span>
    <span>Логин</span>
    <span>Пароль</span>
  </div>
</template>
<style scoped>
@import "@/assets/css/index.css";

.fields > span {
  @apply text-sm text-gray-700;
}
</style>