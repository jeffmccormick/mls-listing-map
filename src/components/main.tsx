import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorContext } from '../context/errorContext';
import { ListingContext } from '../context/listingContext';
import { Listing } from '../schemas/listing';
import { ListingTable } from './listingTable';
import { SourceInputPopup } from './sourceInputPopup';
import { ListingPopup } from './listingPopup';
import { Map } from './map';
import { ListingCoordinates } from '../schemas/listingCoordinates';

const useStyles = makeStyles({
    mainContainer: {
        margin: '0 5rem',
        width: 'auto',
    },
    buttonContainer: {
        margin: '1rem 0',
    },
});

export const Main: FC = () => {
    const [isImporting, setIsImporting] = React.useState<boolean>(false);
    const [isListingVisible, setIsListingVisible] = React.useState<boolean>(false);
    const [selectedListingId, setSelectedListingId] = React.useState<number | null>(null);
    const [listings, setListings] = React.useState<Listing[] | null>(null);
    const [coordinates, setCoordinates] = React.useState<ListingCoordinates[] | null>(null);
    const [errors, setErrors] = React.useState<string[] | null>(null);
    const [isSourceInputOpen, setIsSourceInputOpen] = React.useState<boolean>(true);

    const addError = (error: string) => {
        setErrors([...(errors ?? []), error]);
    };

    const clearErrors = () => setErrors(null);

    const classes = useStyles();

    return (
        <ListingContext.Provider value={{ isImporting, selectedListingId, listings, coordinates }}>
            <ErrorContext.Provider value={{ errors, addError, clearAll: clearErrors }}>
                <Grid container direction="column" className={classes.mainContainer}>
                    <Grid
                        container
                        item
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                        className={classes.buttonContainer}
                    >
                        <Button variant="contained" onClick={() => setIsSourceInputOpen(true)}>
                            Import
                        </Button>
                    </Grid>
                    <SourceInputPopup
                        isOpen={isSourceInputOpen}
                        setIsImporting={setIsImporting}
                        setListings={setListings}
                        setCoordinates={setCoordinates}
                        close={() => setIsSourceInputOpen(false)}
                    />
                    <Map setSelectedListingId={setSelectedListingId} showListing={() => setIsListingVisible(true)} />
                    <ListingTable setSelectedListingId={setSelectedListingId} />
                    <ListingPopup isOpen={isListingVisible} close={() => setIsListingVisible(false)} />
                </Grid>
            </ErrorContext.Provider>
        </ListingContext.Provider>
    );
};
