interface Note{
    text:string
}
interface Account{
    id:string;
    tags?:Array<Note>;
    type: 'Local' | 'LDAP';
    login:string | null;
    password:string | null;
}



export type {Note,Account}