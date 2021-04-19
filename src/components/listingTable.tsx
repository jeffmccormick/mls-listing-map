import React, { FC } from 'react';
import { ListingContext } from '../context/listingContext';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
// import { ErrorContext } from '../context/errorContext';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const columns: GridColDef[] = [
    { field: 'address', headerName: 'Address', width: 240, valueGetter: (params) => params.row.address.street },
    { field: 'city', headerName: 'City', flex: 1, valueGetter: (params) => params.row.address.city },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        valueFormatter: (params) => currencyFormatter.format((params.value?.valueOf() as number) ?? 0),
    },
    { field: 'bedCount', headerName: 'Beds', flex: 0.5 },
    { field: 'bathCount', headerName: 'Baths', flex: 0.5 },
];

export const ListingTable: FC = () => {
    const listingContext = React.useContext(ListingContext);
    // const errorContext = React.useContext(ErrorContext);

    if (!listingContext.listings?.length) {
        return <></>;
    }

    return <DataGrid rows={listingContext.listings} columns={columns} autoHeight />;
};
