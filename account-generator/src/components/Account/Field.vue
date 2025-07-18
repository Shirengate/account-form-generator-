<template>
  <div
    :class="[
      'grid gap-2 items-start mt-2 fields',
      hasPassword
        ? 'grid-cols-[8rem_9rem_1fr_12rem_2rem]'
        : 'grid-cols-[8rem_9rem_1fr_2rem]',
    ]"
  >
    <input
      type="text"
      placeholder="Метки"
      maxlength="50"
      class="border rounded px-3 py-2 w-full"
      :class="targetAccount.errors.tags ? 'border border-red-500' : ''"
      v-model="tags"
      @blur="validateFields"
    />

    <select
      @change="validateFields"
      class="border rounded px-3 py-2 w-full"
      v-model="targetAccount.type"
    >
      <option value="Local">Локальная</option>
      <option value="LDAP">LDAP</option>
    </select>

    <input
      v-model="targetAccount.login"
      @blur="validateFields"
      type="text"
      placeholder="Логин"
      :class="targetAccount.errors.login ? 'border border-red-500' : ''"
      class="border rounded px-3 py-2 w-full"
      maxlength="100"
      required
    />

    <div v-if="hasPassword" class="relative w-full">
      <input
        :type="visibilityComponent === OpenEye ? 'password' : 'text'"
        v-model="targetAccount.password"
        @blur="validateFields"
        :class="targetAccount.errors.password ? 'border border-red-500' : ''"
        placeholder="Пароль"
        class="border rounded px-3 py-2 w-full"
        maxlength="100"
        required
      />
      <button
        class="absolute cursor-pointer right-2 top-2 text-gray-500"
        @click="changeVisibility"
      >
        <component :is="visibilityComponent"></component>
      </button>
    </div>

    <button
    @click="deleteAccount"
      class="text-red-500 self-center justify-self-center cursor-pointer hover:text-red-700"
      title="Удалить запись"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script lang='ts' setup>
import { useAccountStore } from "@/stores/account";
import OpenEye from "../ui/OpenEye.vue";
import { Account } from "@/types";
import {
  watch,
  ref,
  computed,
  shallowRef,
  VueElement,
  type ShallowRef,
} from "vue";
import { useValidateFields  } from "@/composables/useValidateFields";
import {debounce, collectTags} from '@/utils/index.ts'
const { validateTags:debouncer, validateLoginAndPassword } = useValidateFields();
const accountStore = useAccountStore();

const props = defineProps<{
  id: string;
  index:number
}>();

const targetAccount = accountStore.accounts.find(
  (acc: Account) => acc.id === props.id
);

async function changeVisibility(): Promise<void> {
  if (visibilityComponent.value === OpenEye) {
    visibilityComponent.value = (
      await import("@/components/ui/CloseEye.vue")
    ).default;
  } else {
    visibilityComponent.value = OpenEye as VueElement;
  }
}
const visibilityComponent: ShallowRef<VueElement> = shallowRef(OpenEye);

const hasPassword = computed(() => targetAccount.type === "Local");

const tags = ref(collectTags(targetAccount?.tags));
watch(hasPassword, (newValue: Boolean) => {
  if (!newValue) {
    targetAccount.password = '';
  }
});

function deleteAccount(){
  accountStore.accounts = accountStore.accounts.filter((item:Account, index:number) => index !== props.index)
}


const validateTags = debounce(debouncer, 1000);

function validateFields(){
  validateLoginAndPassword(targetAccount, 'login');
  validateLoginAndPassword(targetAccount, 'password');
  if(Object.values(targetAccount.errors).every(tr => !tr)){
    targetAccount.isValid = true
  }else{
    targetAccount.isValid = false
  }
}

watch(tags, (newValue: String) => {
  validateTags(newValue, targetAccount);
});
</script>
