<template>
    <div
      :class="[
        'grid gap-2 items-start mt-2 fields',
        hasPassword
          ? 'grid-cols-[8rem_9rem_1fr_12rem_2rem]'
          : 'grid-cols-[8rem_9rem_1fr_2rem]'
      ]"
    >
      <input
        v-model="tags"
        type="text"
        placeholder="Метки"
        maxlength="50"
        class="border rounded px-3 py-2 w-full"
        :class="{ 'border-red-500': targetAccount.errors.tags }"
        @blur="validateFields"
      />
  
      <select
        v-model="targetAccount.type"
        class="border rounded px-3 py-2 w-full"
        @change="validateFields"
      >
        <option value="Local">Локальная</option>
        <option value="LDAP">LDAP</option>
      </select>
  
      <input
        v-model="targetAccount.login"
        type="text"
        placeholder="Логин"
        maxlength="100"
        required
        class="border rounded px-3 py-2 w-full"
        :class="{ 'border-red-500': targetAccount.errors.login }"
        @blur="validateFields"
      />

      <PasswordField   
       v-model="targetAccount.password"
       @validate-fields="validateFields"  
       :has-password="hasPassword" 
       :error="targetAccount.errors.password"/>
  
      <button
        type="button"
        @click="deleteAccount"
        class="text-red-500 self-center justify-self-center hover:text-red-700 cursor-pointer"
        title="Удалить запись"
      >
      <delete-cross />
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, watch, onUpdated, onUnmounted } from 'vue';
  import { useAccountStore } from '@/stores/account';
  import { useValidateFields } from '@/composables/useValidateFields';
  import { debounce, collectTags } from '@/utils/index.ts';
  import type { Account } from '@/types';
  import PasswordField from './Password.vue'
  import DeleteCross from '../ui/DeleteCross.vue'
  
  const props = defineProps<{
    id: string;
    index: number;
  }>();
  
  const accountStore = useAccountStore();
  const { validateTags: debouncer, validateLoginAndPassword } = useValidateFields();
  
  const targetAccount = accountStore.accounts.find(
    (acc: Account) => acc.id === props.id
  )!;
  
  const tags = ref(collectTags(targetAccount.tags));
  
  const hasPassword = computed(() => targetAccount.type === 'Local');
  
  watch(tags, (newValue: string) => {
    validateTags(newValue, targetAccount);
  });
  

  function validateFields(): void {
    validateLoginAndPassword(targetAccount, 'login');
    validateLoginAndPassword(targetAccount, 'password');
    targetAccount.isValid = Object.values(targetAccount.errors).every((v) => !v);
  }
  
  const validateTags = debounce(debouncer, 200);
  watch(hasPassword, (newValue: boolean) => {
    if (!newValue) {
      targetAccount.password = null;
    }
  });
  function deleteAccount(): void {
    accountStore.accounts = accountStore.accounts.filter(
      (_: Account, i: number) => i !== props.index
    );
  }
  onUpdated(() => {
    if(targetAccount.type === 'Local' && targetAccount.password === null){
      targetAccount.password = ''
    }
  })
  </script>
  