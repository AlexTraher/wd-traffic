import { Incident } from "@/types";
import { useState } from "react";

const useVisibleIncidents = (incidents: Incident[] = [], map: google.maps.Map | null) => {
  const [visibleIncidents, setVisibleIncidents]  = useState<Incident[]>(incidents);

  const onMapUpdate = () => {
    if (!map) {
      return;
    }

    setVisibleIncidents(incidents?.filter((incident) => {
      const point = new google.maps.LatLng(incident.lat, incident.long);

      return map.getBounds()?.contains(point);
    }));
  }


  return { visibleIncidents, onMapUpdate };


}

export default useVisibleIncidents;