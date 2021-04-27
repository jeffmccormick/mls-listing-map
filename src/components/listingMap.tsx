import React, { FC } from 'react';
import { ListingContext } from '../store/listingStore';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Map as LeafletMap, Icon } from 'leaflet';
import { openListing } from '../api/mlspin';
import { currencyFormatter } from '../utility/currencyFormatter';
import BlueIcon from '../styles/images/marker-icon-blue.png';
import PurpleIcon from '../styles/images/marker-icon-violet.png';
import MarkerShadow from '../styles/images/marker-shadow.png';
import { useListingAction } from '../store/listingHooks';
import { ListingActionType } from '../store/listingActions';
// import { ErrorContext } from '../context/errorContext';

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

const blueMarkerIcon = new Icon({
    iconUrl: BlueIcon,
    shadowUrl: MarkerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const purpleMarkerIcon = new Icon({
    iconUrl: PurpleIcon,
    shadowUrl: MarkerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export const ListingMap: FC = () => {
    const listingContext = React.useContext(ListingContext);
    // const errorContext = React.useContext(ErrorContext);
    const setSelectedListingId = useListingAction(ListingActionType.SelectListing);
    const markListingAsViewed = useListingAction(ListingActionType.SetListingAsViewed);

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
                    if (!listing || listingContext.hiddenListingIds?.has(listing.id)) {
                        return markers;
                    }

                    markers.push(
                        <Marker
                            key={coordinates.id}
                            position={[coordinates.latitude, coordinates.longitude]}
                            eventHandlers={{
                                click: (_) => setSelectedListingId(coordinates.id),
                            }}
                            icon={listing.isViewed ? purpleMarkerIcon : blueMarkerIcon}
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
                                    <Grid item>
                                        <Typography component="b">{currencyFormatter.format(listing.price)}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography component="b">
                                            Listed on&nbsp;
                                            {listing.receivedTime.toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            openListing(listing.id);
                                            markListingAsViewed(listing.id);
                                        }}
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
