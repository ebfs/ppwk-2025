import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    }
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ onSelect }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}
