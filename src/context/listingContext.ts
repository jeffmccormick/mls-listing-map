import React from 'react';
import { Listing } from '../schemas/listing';
import { ListingCoordinates } from '../schemas/listingCoordinates';

interface ListingContextType {
    isImporting: boolean;
    selectedListingId: number | null;
    listings: Listing[] | null;
    coordinates: ListingCoordinates[] | null;
}

export const ListingContext = React.createContext<ListingContextType>({
    isImporting: false,
    selectedListingId: null,
    listings: null,
    coordinates: null,
});
