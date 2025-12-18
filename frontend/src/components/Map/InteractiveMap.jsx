import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Map container style
const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '16px'
};

// Default center
const defaultCenter = {
    lat: 30,
    lng: 10
};

// Custom Map Styles
const mapStyles = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f3ff" }] // Very light purple bg
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#c4b5fd" }, { "lightness": 30 }] // Light purple water
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#4c1d95" }] // Dark purple text
    },
    {
        "featureType": "poi",
        "stylers": [{ "visibility": "off" }]
    }
];

// Destinations
const destinations = [
    { id: 1, name: 'Paris', country: 'France', avgPrice: 128, hotels: 1240, lat: 48.8566, lng: 2.3522 },
    { id: 2, name: 'Tokyo', country: 'Japan', avgPrice: 165, hotels: 980, lat: 35.6762, lng: 139.6503 },
    { id: 3, name: 'New York', country: 'USA', avgPrice: 240, hotels: 1560, lat: 40.7128, lng: -74.0060 },
    { id: 4, name: 'Amsterdam', country: 'Netherlands', avgPrice: 185, hotels: 720, lat: 52.3676, lng: 4.9041 },
    { id: 5, name: 'Dubai', country: 'UAE', avgPrice: 210, hotels: 890, lat: 25.2048, lng: 55.2708 },
    { id: 6, name: 'London', country: 'UK', avgPrice: 195, hotels: 1340, lat: 51.5074, lng: -0.1278 },
    { id: 7, name: 'Barcelona', country: 'Spain', avgPrice: 145, hotels: 860, lat: 41.3851, lng: 2.1734 },
    { id: 8, name: 'Singapore', country: 'Singapore', avgPrice: 175, hotels: 650, lat: 1.3521, lng: 103.8198 }
];

const InteractiveMap = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);

    // useJsApiLoader removed - handled in App.jsx

    const onLoad = useCallback(function callback(map) {
        // map.setZoom(2);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        // Cleanup
    }, []);

    return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={2}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true, // Clean look
                    zoomControl: true,
                    minZoom: 2,
                    maxZoom: 10
                }}
            >
                {/* Destination Markers */}
                {destinations.map((destination) => (
                    <Marker
                        key={destination.id}
                        position={{ lat: destination.lat, lng: destination.lng }}
                        onClick={() => setSelectedDestination(destination)}
                        // Safe access to window.google
                        animation={window.google?.maps?.Animation?.DROP}
                    />
                ))}

                {/* Info Window */}
                {selectedDestination && (
                    <InfoWindow
                        position={{ lat: selectedDestination.lat, lng: selectedDestination.lng }}
                        onCloseClick={() => setSelectedDestination(null)}
                        options={{ pixelOffset: window.google?.maps ? new window.google.maps.Size(0, -30) : undefined }}
                    >
                        <div className="p-2 min-w-[200px]">
                            <h3 className="text-lg font-bold text-gray-900">{selectedDestination.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{selectedDestination.country}</p>

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">Avg. Price:</span>
                                <span className="font-bold text-purple-600">${selectedDestination.avgPrice}</span>
                            </div>

                            <button className="w-full bg-purple-600 text-white text-xs py-2 rounded-md hover:bg-purple-700 transition-colors">
                                View Hotels
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default InteractiveMap;
