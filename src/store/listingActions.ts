import { ActionType, createAction } from 'typesafe-actions';
import { Listing } from '../schemas/listing';
import { ListingCoordinates } from '../schemas/listingCoordinates';

export enum ListingActionType {
    SetIsImporting = 'SET_IS_IMPORTING',
    AddListings = 'ADD_LISTINGS',
    DeleteListings = 'DELETE_LISTINGS',
    SelectListing = 'SELECT_LISTING',
    AddCoordinate = 'ADD_COORDINATE',
    DeleteCoordinates = 'DELETE_COORDINATES',
    SetHiddenListings = 'SET_HIDDEN_LISTINGS',
    SetListingAsViewed = 'SET_LISTING_AS_VIEWED',
}

export const ListingActions = {
    setIsImporting: createAction(ListingActionType.SetIsImporting)<boolean>(),
    addListings: createAction(ListingActionType.AddListings)<Listing[]>(),
    deleteListings: createAction(ListingActionType.DeleteListings)<number[]>(),
    selectListing: createAction(ListingActionType.SelectListing)<number | null>(),
    addCoordinate: createAction(ListingActionType.AddCoordinate)<ListingCoordinates>(),
    deleteCoordinates: createAction(ListingActionType.DeleteCoordinates)<number[]>(),
    setHiddenListings: createAction(ListingActionType.SetHiddenListings)<number[] | null>(),
    setListingAsViewed: createAction(ListingActionType.SetListingAsViewed)<number>(),
};

export type ListingAction = ActionType<typeof ListingActions>;
