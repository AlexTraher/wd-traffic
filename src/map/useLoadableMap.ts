import { Incident } from "@/types";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";


const useLoadableMap = (incidents?: Incident[]) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isLoaded: isMapApiLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDJeIW9O8zX3j7EPoIVfBepti8SjtP5TZM" // TODO - hide this??
  })

  const onMapLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();

    // this should be unreachable - but it's probably worth having error management here
    if (!incidents) {
      return;
    }

    for (const incident of incidents) {
      bounds.extend({ lat: incident.lat, lng: incident.long });
    }
    map.fitBounds(bounds);

    setMap(map)
  }

  return {
    isMapApiLoaded,
    onMapLoad,
    map
  }
}

export default useLoadableMap;

