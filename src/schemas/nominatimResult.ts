export interface NominatimResult {
    place_id: number;
    lat: string;
    lon: string;
    address: NominatimAddress;
}

interface NominatimAddress {
    house_number: string;
    road: string;
    town: string;
    state: string;
    postcode: string;
}
