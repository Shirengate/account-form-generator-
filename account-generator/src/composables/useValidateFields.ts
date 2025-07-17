import type { Account, Note } from "@/types";

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
        account.tags = tagsArray;
    }
    return {validateTags}
}