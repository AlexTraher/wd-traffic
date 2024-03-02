import { Incident } from "@/types";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { FC, useState } from "react";


type IncidentMarkerProps = {
  incident: Incident,
  isSelectedIncident: boolean,
  handleMarkerClick: (incident: Incident) => void
  handleInfoCloseClick: () => void;
  // Missing Type declaration from @react-google-maps/api library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clusterer: any,
}

const IncidentMarker: FC<IncidentMarkerProps> = ({ 
  incident,
  isSelectedIncident,
  handleMarkerClick,
  handleInfoCloseClick,
  clusterer,
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
        data-testid={`incident-marker-${incident.id}`}
        options={{
          optimized: false,
        }}
        clusterer={clusterer}
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