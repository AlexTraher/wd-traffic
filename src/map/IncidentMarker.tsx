import { Incident } from "@/types";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { FC, useState } from "react";


type IncidentMarkerProps = {
  incident: Incident,
  isSelectedIncident: boolean,
  handleMarkerClick: (incident: Incident) => void
  handleInfoCloseClick: () => void;
}

const IncidentMarker: FC<IncidentMarkerProps> = ({ 
  incident,
  isSelectedIncident,
  handleMarkerClick,
  handleInfoCloseClick
}) => {

  const [marker, setMarker] = useState<google.maps.Marker>();

  return (
    <>
      <MarkerF 
        position={{ lat: incident.lat, lng: incident.long }}
        key={incident.id}
        title={incident.title}
        onClick={() => handleMarkerClick(incident)}
        onLoad={setMarker}
      />

      {isSelectedIncident ?
       (<InfoWindowF
          anchor={marker}
          position={{ lat: incident.lat, lng: incident.long }}
          onCloseClick={handleInfoCloseClick}>
            <>
              <h1 className="text-lg">{incident.title}</h1>
              <h2>{incident.alert_type}</h2>
              <p className="italic">{incident.description}</p>
            </>
        </InfoWindowF>
        ) : null}
    </>
  )

}

export default IncidentMarker;