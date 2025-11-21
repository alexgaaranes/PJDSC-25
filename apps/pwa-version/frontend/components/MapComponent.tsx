'use client';

import { MapContainer, TileLayer, Circle, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
const iconPerson = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const iconEvac = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #10B981; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8H7v8"/></svg>
  </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

export default function MapComponent() {
    // Coordinates for Batong Malake, Los Baños
    const center: [number, number] = [14.1650, 121.2420];

    // Mock Risk Zones
    const highRiskZone = [
        [14.1680, 121.2380],
        [14.1690, 121.2450],
        [14.1620, 121.2420],
    ] as [number, number][];

    const mediumRiskZone = [
        [14.1620, 121.2420],
        [14.1580, 121.2480],
        [14.1650, 121.2520],
    ] as [number, number][];

    const lowRiskZone = [
        [14.1550, 121.2350],
        [14.1600, 121.2300],
        [14.1650, 121.2350],
    ] as [number, number][];

    return (
        <MapContainer
            center={center}
            zoom={15}
            style={{ height: '100%', width: '100%', background: '#050B14' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Risk Zones */}
            <Polygon positions={highRiskZone} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.4, weight: 0 }} />
            <Polygon positions={mediumRiskZone} pathOptions={{ color: '#F97316', fillColor: '#F97316', fillOpacity: 0.4, weight: 0 }} />
            <Circle center={[14.1580, 121.2380]} radius={300} pathOptions={{ color: '#EAB308', fillColor: '#EAB308', fillOpacity: 0.3, weight: 0 }} />

            {/* Evacuation Centers */}
            <Marker position={[14.1660, 121.2410]} icon={iconEvac}>
                <Popup className="custom-popup">
                    <div className="text-gray-900 font-bold">Batong Malake Elem. School</div>
                    <div className="text-emerald-600 font-bold text-xs">OPEN - 150/200</div>
                </Popup>
            </Marker>

            <Marker position={[14.1630, 121.2440]} icon={iconEvac}>
                <Popup className="custom-popup">
                    <div className="text-gray-900 font-bold">UP Los Baños Gymnasium</div>
                    <div className="text-emerald-600 font-bold text-xs">OPEN - 45/500</div>
                </Popup>
            </Marker>

            <Marker position={[14.1600, 121.2390]} icon={iconEvac}>
                <Popup className="custom-popup">
                    <div className="text-gray-900 font-bold">City Hall Evac Center</div>
                    <div className="text-gray-500 font-bold text-xs">STANDBY</div>
                </Popup>
            </Marker>

        </MapContainer>
    );
}
