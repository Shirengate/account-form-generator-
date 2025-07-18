import type { Account } from "@/types";
import { defineStore } from "pinia";
import { computed, type Ref, ref, watch } from "vue";
type ParsedAccount = Omit<Account, 'password' | 'login' | 'type'>
export const useAccountStore = defineStore('account-store', () => {
    const accounts: Ref<Array<Account>> = ref([]);

    const saved = localStorage.getItem('items');
    if (saved) {
      try {
         let parsedArray = JSON.parse(saved);
        
         accounts.value = parsedArray.map((item:ParsedAccount) => {
            return {
                ...item,
                errors:{
                    type: false,
                    login:false,
                    password:false,
                },
                isValid:true
            }
         })
      } catch (e) {
        accounts.value = [];
      }
    }

    const validatedAccounts = computed(() => {
        return accounts.value?.filter(item => item.isValid).map(item => {
            return {
                password:item.password,
                login:item.login,
                type:item.type,
                tags:item.tags,
                id:item.id
            }
        })
    })
    watch(
      () => validatedAccounts.value,
      (newVal) => {
        
        if (newVal.length > 0) {
          localStorage.setItem('items', JSON.stringify(newVal));
        }else{
          localStorage.removeItem('items')
        }
      },
      { deep: true }
    )
    return {accounts, validatedAccounts}
})