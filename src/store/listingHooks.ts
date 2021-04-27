import React, { useMemo } from 'react';
import { ActionCreator, EmptyActionCreator, getType, PayloadActionCreator } from 'typesafe-actions';
import { ListingActions, ListingActionType } from './listingActions';
import { ListingFullContext } from './listingStore';

type ActionForListingActionType<T extends ListingActionType> = {
    [P in keyof typeof ListingActions]: typeof ListingActions[P] extends PayloadActionCreator<T, infer TPayload>
        ? (payload: TPayload) => void
        : typeof ListingActions[P] extends EmptyActionCreator<T>
        ? () => void
        : never;
}[keyof typeof ListingActions];

//type PickListingAction<K extends ListingActionType> = ReturnType<ListingAction[]>;

export const useListingAction = <T extends ListingActionType>(actionType: T): ActionForListingActionType<T> => {
    const { dispatch } = React.useContext(ListingFullContext);
    const action = useMemo(() => {
        const actionCreatorKey = Object.keys(ListingActions).find(
            (k) => getType(ListingActions[k as keyof typeof ListingActions] as ActionCreator<string>) === actionType
        ) as keyof typeof ListingActions;
        if (!actionCreatorKey) {
            throw new Error(`Could not find action for type ${actionType}`);
        }

        const actionCreator = ListingActions[actionCreatorKey];

        return (...args: unknown[]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(actionCreator(...args));
        };
    }, [dispatch, actionType]);

    return action as ActionForListingActionType<T>;
};
