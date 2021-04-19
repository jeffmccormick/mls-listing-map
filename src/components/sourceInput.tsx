import React, { FC } from 'react';
import { Popup } from './general/popup';
import { ListingContext } from '../context/listingContext';
import { scrapSourceForListings } from '../api/mlspin';
import { ErrorContext } from '../context/errorContext';

interface SourceInputPopupProps {
    isOpen: boolean;
    close: () => void;
}

export const SourceInputPopup: FC<SourceInputPopupProps> = ({ isOpen, close }: SourceInputPopupProps) => {
    const [sourceString, setSourceString] = React.useState<string | undefined>();
    const listingContext = React.useContext(ListingContext);
    const errorContext = React.useContext(ErrorContext);

    const parseAndSaveListings = async () => {
        if (!sourceString) {
            errorContext.addError('Please enter source information.');
            return;
        }

        const parseResult = await scrapSourceForListings(sourceString);
        if (!parseResult.success || !parseResult.data?.length) {
            errorContext.addError(`Tell Jeff the parse isn't working: ${parseResult.error?.toString()}`);
            return;
        }

        listingContext.setListings(parseResult.data);
        close();
    };

    return (
        <Popup
            title="Input MLS Page"
            isOpen={isOpen}
            onConfirm={parseAndSaveListings}
            confirmButtonLabel="Import"
            onCancel={close}
        >
            <textarea onChange={(s) => setSourceString(s.currentTarget.value)} />
        </Popup>
    );
};
