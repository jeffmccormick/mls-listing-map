export interface NominatimResult {
    place_id: number;
    lat: number;
    lon: number;
    address: NominatimAddress;
}

interface NominatimAddress {
    house_number: string;
    road: string;
    town: string;
    state: string;
    postcode: string;
}
