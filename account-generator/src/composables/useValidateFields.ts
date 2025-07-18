import type { Account } from "@/types";

export const useValidateFields = () => {
  const validateTags = (value: string, account: Account) => {
    const trimmedValue = value.trim();
    
    if (trimmedValue === '') {
      return delete account.tags;
    }
    
    if (trimmedValue.length > 50) {
      return account.errors.tags = true;
    }
    
    account.tags = trimmedValue
      .split(';')
      .map(tag => tag.trim())
      .filter(Boolean)
      .map(text => ({ text }));
      
    account.errors.tags = false;
  };

  const validateLoginAndPassword = (account: Account, field: 'login' | 'password'): boolean => {
    const value = field === 'login' ? account.login?.trim() : account.password?.trim();
    
    if (field === 'password' && account.password === null) {
      account.errors.password = false;
      return true;
    }
    
    const isValid = Boolean(value && value.length > 0);
    account.errors[field] = !isValid;
    
    return isValid;
  };

  return { validateTags, validateLoginAndPassword };
};