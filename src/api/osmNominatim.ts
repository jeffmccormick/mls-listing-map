import { DataResult } from '../schemas/result';
import querystring from 'querystring';
import { NominatimResult } from '../schemas/nominatimResult';
import { ListingCoordinates } from '../schemas/listingCoordinates';
import { DelayQueue } from '../utility/delayQueue';

const geocodeQueue = new DelayQueue(1500);

export const lookupGeocodeAddress = async (
    listingId: number,
    addressQuery: string
): Promise<DataResult<ListingCoordinates>> => {
    try {
        let cacheEntry = localStorage.getItem(listingId.toString());
        if (!cacheEntry) {
            cacheEntry = localStorage.getItem(addressQuery.toLocaleUpperCase());
        }
        if (cacheEntry) {
            const coordinates = JSON.parse(cacheEntry);
            if (coordinates.id !== listingId) {
                coordinates.id = listingId;
                const randomOffset = Math.random() * 2 * Math.PI;
                coordinates.latitude = coordinates.latitude + Math.sin(randomOffset) * 0.00005;
                coordinates.longitude = coordinates.longitude + Math.cos(randomOffset) * 0.00005;
            }
            return { success: true, data: coordinates };
        }

        await geocodeQueue.waitNext();

        const query = {
            q: addressQuery,
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

        const coordinate = {
            id: listingId,
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
        } as ListingCoordinates;
        const coordinateJson = JSON.stringify(coordinate);

        localStorage.setItem(listingId.toString(), coordinateJson);
        localStorage.setItem(addressQuery.toLocaleUpperCase(), coordinateJson);

        return { success: true, data: coordinate };
    } catch (err) {
        return { success: false, error: err.toString() };
    }
};
