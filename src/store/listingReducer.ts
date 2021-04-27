import { ListingAction, ListingActionType } from './listingActions';
import { ListingStore } from './listingStore';

export const listingReducer = (state: ListingStore, action: ListingAction): ListingStore => {
    switch (action.type) {
        case ListingActionType.SetIsImporting:
            return {
                ...state,
                isImporting: action.payload,
            };
        case ListingActionType.AddListings: {
            // Ensure that there are no duplicate listings included
            const ids = new Set<number>(state.listings?.map((l) => l.id));
            const filteredListings = action.payload.filter((l) => {
                if (ids.has(l.id)) {
                    return false;
                } else {
                    ids.add(l.id);
                    return true;
                }
            });

            return {
                ...state,
                listings: [...(state.listings ?? []), ...filteredListings],
            };
        }
        case ListingActionType.DeleteListings:
            if (!action.payload.length) {
                return state;
            }

            return {
                ...state,
                listings: state.listings?.filter((l) => !action.payload.some((id) => id === l.id)) ?? null,
            };
        case ListingActionType.AddCoordinate:
            // Ensure that this coordinate does not already exist
            if (state.coordinates?.some((c) => c.id === action.payload.id)) {
                return state;
            }

            return {
                ...state,
                coordinates: [...(state.coordinates ?? []), action.payload],
            };
        case ListingActionType.DeleteCoordinates:
            if (!action.payload.length) {
                return state;
            }

            return {
                ...state,
                coordinates: state.coordinates?.filter((c) => !action.payload.some((id) => id === c.id)) ?? null,
            };
        case ListingActionType.SetHiddenListings:
            return {
                ...state,
                hiddenListingIds: action.payload?.length ? new Set(action.payload) : null,
            };
        case ListingActionType.SetListingAsViewed:
            return {
                ...state,
                listings:
                    state.listings?.map((listing) => {
                        if (listing.id !== action.payload) {
                            return listing;
                        }

                        return { ...listing, isViewed: true };
                    }) ?? null,
            };

        default:
            return state;
    }
};
