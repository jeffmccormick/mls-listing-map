import React, { FC } from 'react';
import { ListingContext } from '../context/listingContext';
import { makeStyles } from '@material-ui/core';
// import { ErrorContext } from '../context/errorContext';
import { Map as OpenLayersMap } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import MarkerIcon from '../icons/map-marker.png';

const useStyles = makeStyles({
    map: {
        width: '100%',
        height: '50vh',
        margin: '1rem 0',
    },
});

export const Map: FC = () => {
    const listingContext = React.useContext(ListingContext);
    // const errorContext = React.useContext(ErrorContext);

    const classes = useStyles();

    const mapRef = React.useRef<HTMLDivElement>(null);

    const markerSource = React.useMemo(() => {
        return new VectorSource({
            features: [
                new Feature({
                    geometry: new Point(fromLonLat([-71.06821654341573, 42.468140899999995])),
                }),
                new Feature({
                    geometry: new Point(fromLonLat([-71.06821654341573, 42.478140899999995])),
                }),
            ],
        });
    }, []);

    const map = React.useMemo(() => {
        const innerMap = new OpenLayersMap({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: markerSource,
                    style: new Style({
                        image: new Icon({
                            anchor: [0.5, 1],
                            anchorXUnits: IconAnchorUnits.FRACTION,
                            anchorYUnits: IconAnchorUnits.FRACTION,
                            src: MarkerIcon,
                        }),
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([-71.15, 42.41]),
                zoom: 11.6,
            }),
            controls: [],
        });

        return innerMap;
    }, [markerSource]);

    React.useEffect(() => {
        map.setTarget(mapRef.current!);
    }, []);

    // React.useEffect(() => {
    //     markerSource.clear();

    //     if (!listingContext?.listings?.length) {
    //         return;
    //     }

    //     for (const listing of listingContext.listings) {
    //         markerSource.addFeature(
    //             new Feature({
    //                 geometry: new Point(fromLonLat([listing.coordinates.longitude, listing.coordinates.latitude])),
    //             })
    //         );
    //     }
    // }, [listingContext.listings, markerSource]);

    return <div ref={mapRef} className={classes.map} />;
};
