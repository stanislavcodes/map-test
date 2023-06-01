import { useMapEvents } from "react-leaflet";

interface MapMarkersProps {
  saveMarkers: (lat: number, lang: number) => void;
}

export const MapMarkers = ({ saveMarkers }: MapMarkersProps) => {
  useMapEvents({
    click: event => {
      const { lat, lng } = event.latlng;

      saveMarkers(lat, lng);
    },
  });

  return null;
};
