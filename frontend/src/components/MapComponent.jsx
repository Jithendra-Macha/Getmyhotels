import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 25.2048, // Dubai
    lng: 55.2708
};

const MapComponent = ({ hotels = [], center = defaultCenter }) => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {hotels.map((hotel) => (
                <Marker
                    key={hotel.id}
                    position={{
                        lat: parseFloat(hotel.latitude || center.lat),
                        lng: parseFloat(hotel.longitude || center.lng)
                    }}
                    onClick={() => setSelectedHotel(hotel)}
                />
            ))}

            {selectedHotel && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedHotel.latitude),
                        lng: parseFloat(selectedHotel.longitude)
                    }}
                    onCloseClick={() => setSelectedHotel(null)}
                >
                    <div className="p-2 min-w-[150px]">
                        <h3 className="font-bold text-sm">{selectedHotel.name}</h3>
                        <p className="text-xs text-gray-600">{selectedHotel.address}</p>
                        <p className="text-sm font-semibold text-primary mt-1">
                            ${selectedHotel.price}
                        </p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default React.memo(MapComponent);
