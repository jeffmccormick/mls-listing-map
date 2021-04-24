import React, { FC } from 'react';
import { ListingContext } from '../context/listingContext';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { currencyFormatter } from '../utility/currencyFormatter';
// import { ErrorContext } from '../context/errorContext';

interface ListingTableProps {
    setSelectedListingId: (listingId: number | null) => void;
    setHiddenListingIds: (listingIds: Set<number> | null) => void;
}

const columns: GridColDef[] = [
    {
        field: 'address',
        headerName: 'Address',
        flex: 2,
        valueGetter: (params) => params.row.address.street,
        disableColumnMenu: true,
    },
    {
        field: 'unit',
        headerName: 'Unit',
        flex: 0.5,
        valueGetter: (params) => params.row.address.unit,
        disableColumnMenu: true,
    },
    { field: 'type', headerName: 'Type', type: 'string', flex: 0.5 },
    { field: 'city', headerName: 'City', flex: 1, valueGetter: (params) => params.row.address.city },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        type: 'number',
        valueFormatter: (params) => currencyFormatter.format((params.value?.valueOf() as number) ?? 0),
    },
    { field: 'bedCount', headerName: 'Beds', type: 'number', flex: 0.5 },
    { field: 'bathCount', headerName: 'Baths', type: 'number', flex: 0.5 },
];

export const ListingTable: FC<ListingTableProps> = ({
    setSelectedListingId,
    setHiddenListingIds,
}: ListingTableProps) => {
    const listingContext = React.useContext(ListingContext);
    // const errorContext = React.useContext(ErrorContext);

    if (!listingContext.listings?.length) {
        return <></>;
    }

    return (
        <DataGrid
            rows={listingContext.listings}
            columns={columns}
            autoHeight
            disableMultipleSelection
            pagination
            pageSize={10}
            rowsPerPageOptions={[10, 25, 100]}
            onRowSelected={(row) => setSelectedListingId(row.data.id)}
            onFilterModelChange={(model) => {
                const hiddenListingIds = new Set<number>();
                listingContext.listings?.forEach((l) => {
                    if (!model.visibleRows.has(l.id)) {
                        hiddenListingIds.add(l.id);
                    }
                });

                setHiddenListingIds(hiddenListingIds);
            }}
            selectionModel={[listingContext.selectedListingId ?? NaN]}
        />
    );
};
