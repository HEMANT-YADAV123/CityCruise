/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 0,
    lng: 0
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Update Position using Geolocation
    useEffect(() => {
        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        };

        // Initial Position
        navigator.geolocation.getCurrentPosition(updatePosition);

        // Watch Position
        const watchId = navigator.geolocation.watchPosition(updatePosition);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // Initialize AdvancedMarkerElement
    useEffect(() => {
        if (mapRef.current && google?.maps?.marker?.AdvancedMarkerElement) {
            if (!markerRef.current) {
                markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                    map: mapRef.current,
                    position: currentPosition,
                    title: 'Current Location'
                });
            } else {
                markerRef.current.position = currentPosition;
            }
        }
    }, [currentPosition]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                onLoad={(map) => (mapRef.current = map)}
            />
        </LoadScript>
    );
};

export default LiveTracking;
