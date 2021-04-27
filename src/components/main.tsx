import { Fab, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { FC } from 'react';
import { ErrorContext } from '../store/errorContext';
import { ListingContext } from '../store/listingStore';
import { ListingTable } from './listingTable';
import { SourceInputPopup } from './sourceInputPopup';
import { ListingMap } from './listingMap';
import { useListingAction } from '../store/listingHooks';
import { ListingActionType } from '../store/listingActions';

const useStyles = makeStyles({
    mainContainer: {
        margin: '0 5rem',
        width: 'auto',
    },
    addButton: {
        position: 'fixed',
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
    },
});

export const Main: FC = () => {
    const listingContext = React.useContext(ListingContext);
    const [errors, setErrors] = React.useState<string[] | null>(null);
    const [isSourceInputOpen, setIsSourceInputOpen] = React.useState<boolean>(!listingContext.listings?.length);
    const deleteListings = useListingAction(ListingActionType.DeleteListings);
    const deleteCoordinates = useListingAction(ListingActionType.DeleteCoordinates);

    const addError = (error: string) => {
        setErrors([...(errors ?? []), error]);
    };

    const clearErrors = () => setErrors(null);

    const classes = useStyles();

    React.useEffect(() => {
        if (!listingContext.listings?.length) {
            return;
        }

        // Do not load any listings that are older than 2 weeks old
        const listingDateExpiration = new Date();
        listingDateExpiration.setDate(listingDateExpiration.getDate() - 14);

        const activeListingIds = new Set<number>();
        const listingsToDelete = listingContext.listings
            .filter((l) => {
                if (l.receivedTime < listingDateExpiration) {
                    return true;
                } else {
                    activeListingIds.add(l.id);
                    return false;
                }
            })
            .map((l) => l.id);

        const coordinatesToDelete = listingContext.coordinates
            ?.filter((c) => !activeListingIds.has(c.id))
            .map((c) => c.id);

        // Perform the deletions
        if (listingsToDelete.length) {
            deleteListings(listingsToDelete);
        }
        if (coordinatesToDelete?.length) {
            deleteCoordinates(coordinatesToDelete);
        }
    }, [listingContext.listings, listingContext.coordinates, deleteListings, deleteCoordinates]);

    return (
        <ErrorContext.Provider value={{ errors, addError, clearAll: clearErrors }}>
            <Grid container direction="column" className={classes.mainContainer}>
                <SourceInputPopup isOpen={isSourceInputOpen} close={() => setIsSourceInputOpen(false)} />
                <ListingMap />
                <ListingTable />
            </Grid>
            <Fab
                color="primary"
                size="medium"
                className={classes.addButton}
                aria-label="add"
                onClick={() => setIsSourceInputOpen(true)}
                disabled={isSourceInputOpen}
            >
                <AddIcon />
            </Fab>
        </ErrorContext.Provider>
    );
};
