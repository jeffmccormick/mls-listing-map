import React, { FC } from 'react';
import { Popup } from './general/popup';
import { scrapeSourceForListings } from '../api/mlspin';
import { ErrorContext } from '../context/errorContext';
import { ListingContext } from '../context/listingContext';
import { Listing } from '../schemas/listing';
import { ListingCoordinates } from '../schemas/listingCoordinates';
import { lookupGeocodeAddress } from '../api/osmNominatim';
import { makeStyles, TextField } from '@material-ui/core';

interface SourceInputPopupProps {
    isOpen: boolean;
    setIsImporting: (isImporting: boolean) => void;
    setListings: (listings: Listing[] | null) => void;
    setCoordinates: (coordinates: ListingCoordinates[] | null) => void;
    close: () => void;
}

export const useStyles = makeStyles(() => ({
    sourceInput: {
        width: '80vw',
    },
}));

export const SourceInputPopup: FC<SourceInputPopupProps> = ({
    isOpen,
    setIsImporting,
    setListings,
    setCoordinates,
    close,
}: SourceInputPopupProps) => {
    const [sourceString, setSourceString] = React.useState<string | undefined>();
    const errorContext = React.useContext(ErrorContext);
    const listingContext = React.useContext(ListingContext);

    const classes = useStyles();

    const parseAndSaveListings = async () => {
        if (!sourceString) {
            errorContext.addError('Please enter source information.');
            return;
        }

        setIsImporting(true);

        const parseResult = await scrapeSourceForListings(sourceString);
        if (!parseResult.success || !parseResult.data?.length) {
            errorContext.addError(`Tell Jeff the parse isn't working: ${parseResult.error?.toString()}`);
            return;
        }

        let newListings = parseResult.data;
        // The listings often have duplicates, so filter out those
        const ids = new Set<number>(listingContext.listings?.map((l) => l.id));
        newListings = newListings.filter((l) => {
            if (ids.has(l.id)) {
                return false;
            } else {
                ids.add(l.id);
                return true;
            }
        });

        close();
        setListings([...(listingContext.listings ?? []), ...newListings]);

        const coordinates = listingContext.coordinates ?? [];
        for (const listing of newListings) {
            const coordinatesResult = await lookupGeocodeAddress(
                listing.id,
                `${listing.address.street}, ${listing.address.city}, ${listing.address.state}`
            );

            if (!coordinatesResult.success || !coordinatesResult.data) {
                console.log(`Failed to get coordinates for ${listing.address.street}: ${coordinatesResult.error}`);
                continue;
            }

            coordinates.push(coordinatesResult.data);
            setCoordinates([...coordinates]);
        }

        setIsImporting(false);
    };

    return (
        <Popup
            title="Input MLS Page"
            isOpen={isOpen}
            onConfirm={parseAndSaveListings}
            confirmButtonLabel="Import"
            onCancel={close}
        >
            <TextField
                className={classes.sourceInput}
                multiline
                fullWidth
                rows={10}
                rowsMax={30}
                placeholder="Paste page source here..."
                variant="outlined"
                onChange={(s) => setSourceString(s.currentTarget.value)}
            />
        </Popup>
    );
};
