import React from 'react';
import { Listing } from '../schemas/listing';

interface ListingContextType {
    listings: Listing[] | null;
    setListings: (listings: Listing[] | null) => void;
}

export const ListingContext = React.createContext<ListingContextType>({
    listings: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setListings: (listings: Listing[] | null) => {},
});
