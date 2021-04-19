import { Address } from './address';
import { Coordinates } from './coordinates';

export interface Listing {
    id: number;
    address: Address;
    bedCount: number;
    bathCount: number;
    price: number;
    receivedTime: Date;
    coordinates: Coordinates;
}
