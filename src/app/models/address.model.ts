export class AddressModel implements AddressType{
    street: string;
    suite: string;
    city: string;
    zipcode: string;

    constructor (address) {
        this.street = address.street;
        this.suite = address.suite;
        this.city = address.city;
        this.zipcode = address.zipcode;
    }

    toString () {
        return `${this.suite}, ${this.street}, ${this.city}, ${this.zipcode}`;
    }
}

export interface AddressType {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}
