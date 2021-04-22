import React, { FC } from 'react';
import { ListingContext } from '../context/listingContext';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { openListing } from '../api/mlspin';
// import { ErrorContext } from '../context/errorContext';

interface MapProps {
    setSelectedListingId: (listingId: number | null) => void;
    showListing: () => void;
}

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '50vh',
        margin: '1rem 0',
    },
    listingType: {
        textTransform: 'capitalize',
    },
});

export const Map: FC<MapProps> = ({ setSelectedListingId, showListing }: MapProps) => {
    const listingContext = React.useContext(ListingContext);
    // const errorContext = React.useContext(ErrorContext);

    const classes = useStyles();

    return (
        <Grid item>
            <MapContainer center={[42.41, -71.15]} zoom={11.6} scrollWheelZoom className={classes.map}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {listingContext.coordinates?.reduce((markers, coordinates) => {
                    const listing = listingContext.listings?.find((l) => l.id === coordinates.id);
                    if (!listing) {
                        return markers;
                    }

                    markers.push(
                        <Marker
                            key={coordinates.id}
                            position={[coordinates.latitude, coordinates.longitude]}
                            eventHandlers={{
                                click: (_) => setSelectedListingId(coordinates.id),
                            }}
                        >
                            <Popup>
                                <Grid container direction="column" alignItems="center">
                                    <Grid item>
                                        <Typography component="b">{listing.address.street}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="b">
                                            {listing.address.unit ? `Unit: ${listing.address.unit}` : ''}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="b" className={classes.listingType}>
                                            {listing.type}
                                        </Typography>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => openListing(coordinates.id)}
                                    >
                                        Open Listing
                                    </Button>
                                </Grid>
                            </Popup>
                        </Marker>
                    );
                    return markers;
                }, [] as React.ReactNode[])}
            </MapContainer>
        </Grid>
    );
};
