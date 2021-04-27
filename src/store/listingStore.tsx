import React, { Dispatch, FC } from 'react';
import { Listing } from '../schemas/listing';
import { ListingCoordinates } from '../schemas/listingCoordinates';
import { ListingAction } from './listingActions';
import { listingReducer } from './listingReducer';

export const initialListingStore = {
    isImporting: false,
    selectedListingId: null as number | null,
    listings: null as Listing[] | null,
    coordinates: null as ListingCoordinates[] | null,
    hiddenListingIds: null as Set<number> | null,
};

export type ListingStore = Readonly<typeof initialListingStore>;

type ListingStoreAndDispatcher = {
    store: ListingStore;
    dispatch: Dispatch<ListingAction>;
};

export const ListingContext = React.createContext<ListingStore>({ ...initialListingStore });

export const ListingFullContext = React.createContext<ListingStoreAndDispatcher>({
    store: { ...initialListingStore },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {},
});

let cachedStore: ListingStore | null = null;
try {
    const cacheEntry = localStorage.getItem('listingStore');
    if (cacheEntry?.length) {
        const serializedStore = JSON.parse(cacheEntry);
        if (serializedStore) {
            cachedStore = {
                ...serializedStore,
                listings: serializedStore.listings?.map((l: Listing) => {
                    return {
                        ...l,
                        receivedTime: new Date(l.receivedTime),
                    } as Listing;
                }),
                isImporting: false,
                selectedListingId: null,
                hiddenListingIds: null,
            } as ListingStore;
        }
    }
} catch (err) {
    console.log(`Error serializing store cache: ${err}`);
}

type ListingProviderProps = {
    children: JSX.Element;
};

export const ListingProvider: FC<ListingProviderProps> = ({ children }: ListingProviderProps) => {
    const [store, dispatch] = React.useReducer(listingReducer, cachedStore ?? (initialListingStore as ListingStore));
    React.useEffect(() => {
        // Every time the store changes, cache it to local storage
        localStorage.setItem(
            'listingStore',
            JSON.stringify({
                ...store,
                hiddenListingIds: [],
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.listings, store.coordinates]);

    return (
        <ListingContext.Provider value={store}>
            <ListingFullContext.Provider value={{ store, dispatch }}>{children}</ListingFullContext.Provider>
        </ListingContext.Provider>
    );
};
