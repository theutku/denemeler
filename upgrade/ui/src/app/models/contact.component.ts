export interface Contact {
    name: string;
    email: string;
    phone: string;
}

export class NewContact implements Contact {
    name = "";
    email = "";
    phone = "";   
}