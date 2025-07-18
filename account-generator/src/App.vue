<template>
  <div class="p-4 max-w-3xl mx-auto bg-white rounded shadow">
    <div class="flex items-center justify-start gap-2 mb-4">
      <h2 class="text-xl font-bold">Учетные записи</h2>
      <CreateBtn />
    </div>
    <layout-clue />
    <fields-title />

    <div v-auto-animate>
      <template v-for="(item,index) in accountStore.accounts" :key="item.id"  >
      <Account :id="item.id"  :index="index"/>
    </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutClue from "@/components/Layout/Clue.vue";
import CreateBtn from "./components/Layout/CreateBtn.vue";
import FieldsTitle from "@/components/Layout/FieldsTitle.vue";
import Account from "./components/Account/index.vue";
import { useAccountStore } from "./stores/account";
const accountStore = useAccountStore();

</script>


