import React from 'react';
import { Listing } from '../schemas/listing';
import { ListingCoordinates } from '../schemas/listingCoordinates';

interface ListingContextType {
    isImporting: boolean;
    selectedListingId: number | null;
    listings: Listing[] | null;
    coordinates: ListingCoordinates[] | null;
    hiddenListingIds: Set<number> | null;
    viewedListingIds: Set<number>;
}

export const ListingContext = React.createContext<ListingContextType>({
    isImporting: false,
    selectedListingId: null,
    listings: null,
    coordinates: null,
    hiddenListingIds: null,
    viewedListingIds: new Set<number>(),
});
