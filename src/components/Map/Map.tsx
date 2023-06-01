import { Box } from '@chakra-ui/react';
import { Map as MapType } from 'leaflet';
import { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Coords } from '~/types/Coords';
import { Place } from '~/types/Place';
import { PlaceInfo } from '../PlaceInfo';

interface MapProps {
  places: Place[];
  addedPlace: Coords;
  onEdit: (place: Place) => void;
}

export const Map = ({ places, addedPlace, onEdit }: MapProps) => {
  const mapRef = useRef<MapType>(null);

  useEffect(() => {
    if (mapRef.current && addedPlace) {
      const map = mapRef.current;

      if (map) {
        map.setView([addedPlace.latitude, addedPlace.longitude], 7);
      }
    }
  }, [addedPlace]);

  return (
    <Box flexGrow={1}>
      <MapContainer
        ref={mapRef}
        style={{
          height: '100%',
          borderRadius: '8px',
        }}
        center={
          addedPlace
            ? [addedPlace.latitude, addedPlace.longitude]
            : [50.44, 30.51]
        }
        zoom={10}
        minZoom={3}
        maxZoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(place => (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Popup>
              <PlaceInfo place={place} onEdit={() => onEdit(place)} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};
