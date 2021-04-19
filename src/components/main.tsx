import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorContext } from '../context/errorContext';
import { ListingContext } from '../context/listingContext';
import { Listing } from '../schemas/listing';
import { ListingTable } from './listingTable';
import { SourceInputPopup } from './sourceInput';
import { Map } from './map';

const useStyles = makeStyles({
    mainContainer: {
        margin: '5rem',
        width: 'auto',
    },
    buttonContainer: {
        margin: '1rem 0',
    },
});

export const Main: FC = () => {
    const [listings, setListings] = React.useState<Listing[] | null>(null);
    const [errors, setErrors] = React.useState<string[] | null>(null);
    const [isSourceInputOpen, setIsSourceInputOpen] = React.useState<boolean>(true);

    const addError = (error: string) => {
        setErrors([...(errors ?? []), error]);
    };

    const clearErrors = () => setErrors(null);

    const classes = useStyles();

    return (
        <ListingContext.Provider value={{ listings, setListings }}>
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
                    <SourceInputPopup isOpen={isSourceInputOpen} close={() => setIsSourceInputOpen(false)} />
                    <Map />
                    <ListingTable />
                </Grid>
            </ErrorContext.Provider>
        </ListingContext.Provider>
    );
};
