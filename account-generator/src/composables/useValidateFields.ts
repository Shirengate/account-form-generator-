import type { Account } from "@/types";

export const useValidateFields = () => {
    const validateTags = (value:string, account:Account) => {
        value = value.trim();
        if(value === ''){
           return  delete account['tags'];
        }else if(value.length > 50){
           return account.errors.tags = true
        }
        let tagsArray = value.split(';').map(value => value.trim()).filter(value => value).map(value => {
            return {
                text:value
            }
        })
        account.errors.tags = false;
        account.tags = tagsArray;
    }
    const validateLoginAndPassword = (account: Account, field: 'login' | 'password'): boolean => {
        const value = field === 'login' 
            ? account.login?.trim() 
            : account.password?.trim();
        if (field === 'password' && account.password === null) {
            account.errors.password = false;
            return true;
        }
        if (!value || value.length === 0) {
            account.errors[field] = true;
            return false;
        }
        account.errors[field] = false;
        return true;
    };
    return {validateTags , validateLoginAndPassword}
}