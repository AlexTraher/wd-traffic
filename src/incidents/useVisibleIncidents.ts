import { Incident } from "@/types";
import { useState } from "react";

const useVisibleIncidents = (incidents: Incident[] = []) => {
  const [visibleIncidents, setVisibleIncidents]  = useState<Incident[]>(incidents);

  const onMapBoundsChanged = ( map: google.maps.Map | null) => {
    if (!map) {
      return;
    }

    setVisibleIncidents(incidents?.filter((incident) => {
      const point = new google.maps.LatLng(incident.lat, incident.long);

      return map.getBounds()?.contains(point);
    }));
  }


  return { visibleIncidents, onMapBoundsChanged };


}

export default useVisibleIncidents;

