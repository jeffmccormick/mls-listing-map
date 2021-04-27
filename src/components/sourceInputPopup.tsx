import React, { FC } from 'react';
import { Popup } from './general/popup';
import { scrapeSourceForListings } from '../api/mlspin';
import { ErrorContext } from '../store/errorContext';
import { lookupGeocodeAddress } from '../api/osmNominatim';
import { makeStyles, TextField } from '@material-ui/core';
import { ListingActionType } from '../store/listingActions';
import { useListingAction } from '../store/listingHooks';

interface SourceInputPopupProps {
    isOpen: boolean;
    close: () => void;
}

export const useStyles = makeStyles(() => ({
    sourceInput: {
        width: '80vw',
    },
}));

export const SourceInputPopup: FC<SourceInputPopupProps> = ({ isOpen, close }: SourceInputPopupProps) => {
    const [sourceString, setSourceString] = React.useState<string | undefined>();
    const errorContext = React.useContext(ErrorContext);
    const setIsImporting = useListingAction(ListingActionType.SetIsImporting);
    const addListings = useListingAction(ListingActionType.AddListings);
    const addCoordinate = useListingAction(ListingActionType.AddCoordinate);

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

        close();
        addListings(parseResult.data);

        for (const listing of parseResult.data) {
            const coordinatesResult = await lookupGeocodeAddress(
                listing.id,
                `${listing.address.street}, ${listing.address.city}, ${listing.address.state}`
            );

            if (!coordinatesResult.success || !coordinatesResult.data) {
                console.log(`Failed to get coordinates for ${listing.address.street}: ${coordinatesResult.error}`);
                continue;
            }

            addCoordinate(coordinatesResult.data);
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
