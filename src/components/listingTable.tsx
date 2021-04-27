import React, { FC } from 'react';
import { ListingContext } from '../store/listingStore';
import {
    DataGrid,
    GridColDef,
    GridFilterModelParams,
    GridFilterModelState,
    GridRowSelectedParams,
} from '@material-ui/data-grid';
import { currencyFormatter } from '../utility/currencyFormatter';
import { useListingAction } from '../store/listingHooks';
import { ListingActionType } from '../store/listingActions';
// import { ErrorContext } from '../context/errorContext';

const columns: GridColDef[] = [
    {
        field: 'address',
        headerName: 'Address',
        flex: 1.7,
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
    { field: 'type', headerName: 'Type', type: 'string', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1, valueGetter: (params) => params.row.address.city },
    {
        field: 'price',
        headerName: 'Price',
        flex: 0.8,
        type: 'number',
        valueFormatter: (params) => currencyFormatter.format((params.value?.valueOf() as number) ?? 0),
    },
    { field: 'bedCount', headerName: 'Beds', type: 'number', flex: 0.7 },
    { field: 'bathCount', headerName: 'Baths', type: 'number', flex: 0.7 },
    { field: 'receivedTime', headerName: 'Date', type: 'date', flex: 0.8 },
];

const date = new Date();
date.setDate(date.getDate() - 3);
let initialDateFilter = `${date.getFullYear()}-`;
initialDateFilter += `${(date.getMonth() + 1).toString().padStart(2, '0')}-`;
initialDateFilter += `${date.getDate().toString().padStart(2, '0')}`;

const initialFilterModel = {
    items: [{ columnField: 'receivedTime', operatorValue: 'onOrAfter', value: initialDateFilter }],
} as GridFilterModelState;

export const ListingTable: FC = React.memo(() => {
    const { listings, selectedListingId } = React.useContext(ListingContext);
    const setSelectedListingId = useListingAction(ListingActionType.SelectListing);
    const setHiddenListingIds = useListingAction(ListingActionType.SetHiddenListings);
    // const errorContext = React.useContext(ErrorContext);

    const onFilterModelChanged = React.useCallback(
        (params: GridFilterModelParams) => {
            setHiddenListingIds(listings?.filter((l) => !params.visibleRows.has(l.id)).map((l) => l.id) ?? null);
        },
        [setHiddenListingIds, listings]
    );

    const onRowSelected = React.useCallback((row: GridRowSelectedParams) => setSelectedListingId(row.data.id), [
        setSelectedListingId,
    ]);

    const selectionModel = React.useMemo(() => {
        return selectedListingId ? [selectedListingId] : undefined;
    }, [selectedListingId]);

    return (
        <DataGrid
            rows={listings ?? []}
            columns={columns}
            autoHeight
            disableMultipleSelection
            pagination
            pageSize={10}
            rowsPerPageOptions={[10, 25, 100]}
            onRowSelected={onRowSelected}
            filterModel={initialFilterModel}
            onFilterModelChange={onFilterModelChanged}
            selectionModel={selectionModel}
        />
    );
});
