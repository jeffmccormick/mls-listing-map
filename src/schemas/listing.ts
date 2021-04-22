import { Address } from './address';

export interface Listing {
    id: number;
    address: Address;
    type: string;
    bedCount: number;
    bathCount: number;
    price: number;
    receivedTime: Date;
}
