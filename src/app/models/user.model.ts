import { AddressType, AddressModel } from './address.model';

export class UserModel implements UserType{
    id: number;
    name: string;
    userName: string;
    email: string;
    address: AddressType;
    phone: string;
    website: string;

    constructor (user) {
        this.id = user.id;
        this.name = user.name;
        this.userName = user.username;
        this.email = user.email;
        this.address = new AddressModel(user.address);
        this.phone = user.phone;
        this.website = user.website;
    }
}

export interface UserType {
    id: number;
    name: string;
    userName: string;
    email: string;
    address: AddressType;
    phone: string;
    website: string;
}
