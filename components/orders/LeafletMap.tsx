'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
    onAddressSelect: (address: string) => void;
}

const LocationMarker = ({ setAddress, setPosition, position }: any) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            fetchAddress(e.latlng.lat, e.latlng.lng);
        },
    });

    const fetchAddress = async (lat: number, lng: number) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
                headers: {
                    'Accept-Language': 'en'
                }
            });
            const data = await res.json();
            if (data && data.display_name) {
                setAddress(data.display_name);
            }
        } catch (error) {
            console.error("Geocoding error: ", error);
        }
    };

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

export default function LeafletMap({ onAddressSelect }: LeafletMapProps) {
    const [position, setPosition] = useState<{lat: number, lng: number} | null>(null);
    const [address, setAddress] = useState<string>('');
    const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 25.2048, lng: 55.2708 }); // Default Dubai

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                // Fetch initial address
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=18&addressdetails=1`, {
                    headers: { 'Accept-Language': 'en' }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.display_name) setAddress(data.display_name);
                    });
            }, () => {
                console.log("Geolocation denied or unavailable");
            });
        }
    }, []);

    return (
        <div className="leaflet-map-wrapper">
            <div className="map-container-box">
                <MapContainer center={mapCenter} zoom={13} className="map-instance">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker setAddress={setAddress} setPosition={setPosition} position={position} />
                </MapContainer>
            </div>
            <div className="address-display-box">
                <p><strong>Selected Address:</strong><br/> {address || 'Click anywhere on the map to place a pin.'}</p>
            </div>
            <button 
                type="button"
                className="btn-primary confirm-location-btn" 
                onClick={() => onAddressSelect(address)}
                disabled={!address}
            >
                Confirm Location
            </button>
        </div>
    );
}
