import type { Account } from "@/types";
import { defineStore } from "pinia";
import { type Ref, ref, watch } from "vue";

export const useAccountStore = defineStore('account-store', () => {
    const accounts:Ref<Array<Account>> = ref([])


    

    return {accounts}
})