<template>
  <button
    @click="createAccount"
    title="Добавить запись"
    class="text-blue-500 cursor-pointer text-2xl font-bold"
  >
    +
  </button>
</template>



<script lang="ts" setup>
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();
function createAccount() {
  accountStore.accounts.push({
    id: crypto.randomUUID(),
    type: "Local",
    login: '',
    password: '',
    errors: {
      tags: false,
      login: false,
      password: false,
    },
    isValid:false
  });
}
</script>
