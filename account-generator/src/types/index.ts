interface Note{
    text:string
}
interface Account{
    id:string;
    tags?:Array<Note>;
    type: 'Local' | 'LDAP';
    login:string | null;
    password:string | null;
    errors?:Pick<Record<keyof Account, boolean>, 'login' | 'password' | 'tags'>,
    isValid?:boolean
}



export type {Note,Account}