<template>
      <div v-if="hasPassword" class="relative w-full">
        <input
          v-model="model"
          :type="visibilityComponent === OpenEye ? 'password' : 'text'"
          placeholder="Пароль"
          maxlength="100"
          required
          class="border rounded px-3 py-2 w-full"
          :class="{ 'border-red-500': error }"
          @blur="emit('validateFields')"
        />
        <button
          type="button"
          @click="changeVisibility"
          class="absolute right-2 top-2 text-gray-500 cursor-pointer"
        >
          <component :is="visibilityComponent" />
        </button>
      </div>
</template>

<script  lang='ts' setup>
import { shallowRef , type ShallowRef, type VueElement } from 'vue';
import OpenEye from '../ui/OpenEye.vue';

const emit = defineEmits<{
    (e: 'validateFields'): void
}>()

const props = defineProps<{
    hasPassword:boolean,
    error:boolean
}>()
const model = defineModel()
const visibilityComponent: ShallowRef<VueElement> = shallowRef(OpenEye);

async function changeVisibility(): Promise<void> {
if (visibilityComponent.value === OpenEye) {
    const CloseEye = (await import('@/components/ui/CloseEye.vue')).default;
    visibilityComponent.value = CloseEye;
} else {
    visibilityComponent.value = OpenEye;
    }
}
</script>