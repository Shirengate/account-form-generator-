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
      class="border rounded px-3 py-2 w-full"
    />

    <select class="border rounded px-3 py-2 w-full">
      <option>Локальная</option>
      <option>LDAP</option>
    </select>

    <input
      type="text"
      placeholder="Значение"
      class="border rounded px-3 py-2 w-full"
      maxlength="100"
      required
    />

    <div v-if="hasPassword" class="relative w-full">
      <input
        :type="visibilityComponent === OpenEye ? 'password' : 'text'"
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
import { shallowRef, VueElement, type ShallowRef } from "vue";
import OpenEye from "../ui/OpenEye.vue";
const props = defineProps<{}>();

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
const hasPassword: boolean = true;
</script>

<style lang="scss" scoped>
</style>