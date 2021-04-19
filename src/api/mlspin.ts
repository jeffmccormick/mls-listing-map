import { Coordinates } from '../schemas/coordinates';
import { Listing } from '../schemas/listing';
import { DataResult } from '../schemas/result';
import { lookupGeocodeAddress } from './osmNominatim';

export const scrapSourceForListings = async (listingPage: string): Promise<DataResult<Listing[]>> => {
    const parser = new DOMParser();
    try {
        const doc = parser.parseFromString(listingPage, 'text/html');

        console.log(doc);

        const addressResult = await lookupGeocodeAddress('260 Tremont St U: 16 Melrose, MA:Melrose Highlands');

        if (!addressResult.success || !addressResult.data) {
            return { success: false, error: addressResult.error };
        }

        return {
            success: true,
            data: [
                {
                    id: 72815228,
                    address: addressResult.data,
                    bedCount: 2,
                    bathCount: 1,
                    price: 360000,
                    receivedTime: new Date(),
                    coordinates: {
                        latitude: 42.468140899999995,
                        longitude: -71.06821654341573,
                    } as Coordinates,
                } as Listing,
            ],
        };
    } catch (err) {
        return { success: false, error: err.toString() };
    }
};
