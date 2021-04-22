import React, { FC } from 'react';
import { Popup } from './general/popup';
import { ListingContext } from '../context/listingContext';
import { makeStyles } from '@material-ui/core';

interface ListingPopupProps {
    isOpen: boolean;
    close: () => void;
}

export const useStyles = makeStyles(() => ({
    listingView: {
        width: '80vw',
        height: '80vh',
    },
}));

export const ListingPopup: FC<ListingPopupProps> = ({ isOpen, close }: ListingPopupProps) => {
    const listingContext = React.useContext(ListingContext);

    const classes = useStyles();

    return (
        <Popup
            title={
                listingContext.listings?.find((l) => l.id === listingContext.selectedListingId)?.address.street ??
                'Invalid Listing Selected'
            }
            isOpen={isOpen && !!listingContext.listings?.length}
            hideCancelButton
            onConfirm={close}
            confirmButtonLabel="Close"
        >
            {listingContext.selectedListingId && (
                <iframe
                    className={classes.listingView}
                    title={listingContext.selectedListingId.toString()}
                    src={`https://vow.mlspin.com/VOW/listingviews/GetListing?rm=1&vf=2&summ=false&o=2&od=1&f=0&ps=0&offs=0&sel=${listingContext.selectedListingId}&sp=false&cb=16190256`}
                />
            )}
        </Popup>
    );
};
