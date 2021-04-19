import { Address } from '../schemas/address';
import { DataResult } from '../schemas/result';
import querystring from 'querystring';
import { NominatimResult } from '../schemas/nominatimResult';

export const lookupGeocodeAddress = async (addressQuery: string): Promise<DataResult<Address>> => {
    try {
        const query = {
            q: sanitizeAddress(addressQuery),
            format: 'jsonv2',
            limit: 1,
            addressdetails: 1,
            countrycodes: 'us',
        };

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${querystring.encode(query)}`);

        if (!response.ok) {
            return { success: false, error: `Nominatim failed with status: ${response.status}` };
        }

        const data = (await response.json()) as NominatimResult[];

        if (!data || !data.length || data.length !== 1) {
            return { success: false, error: `Nominatim returned invalid result: ${data}` };
        }

        const address = {
            street: `${data[0].address.house_number} ${data[0].address.road}`,
            city: data[0].address.town,
            state: data[0].address.state,
        } as Address;

        return {
            success: true,
            data: address,
        };
    } catch (err) {
        return { success: false, error: err.toString() };
    }
};

const sanitizeAddress = (address: string): string => {
    // Addresses come to us in the format of '[number or range] [street] [U: unit#] [city], [state][optional :neighborhood]]'

    // First remove the worthless unit number
    address = address.replace(/(?:U: [\w]+ )/, '');

    // Remove the neighborhood listing that might be on the end
    address = address.replace(/(?:MA:.*)/, 'MA');

    return address;
};
