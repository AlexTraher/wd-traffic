import Spinner from './components/spinner/Spinner';
import IncidentList from './incidents/IncidentList';
import ErrorPage from './components/error/ErrorPage';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { GoogleMap, MarkerClustererF } from '@react-google-maps/api';
import _debounce from 'lodash.debounce';
import IncidentMarker from './map/IncidentMarker';
import useLoadableMap from './map/useLoadableMap';
import useMapFilterableIncidents from './incidents/useMapfilterableIncidents';

function App() {
  const [mobileListVisible, setMobileListVisible] = useState(false);

  const {
    isPending,
    isError,
    data: incidents,
    selectedIncident,
    setSelectedIncident,
    visibleIncidents,
    onMapBoundsChanged,
  } = useMapFilterableIncidents();
  const { isMapApiLoaded, map, onMapLoad } = useLoadableMap(incidents);

  if (isPending || !isMapApiLoaded) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <div className="flex flex-col sm:flex-row-reverse items-stretch h-full">
      <section className="flex-grow-1 shrink-0 sm:shrink basis-full w-full h-full">
        <Button className="sm:hidden absolute top-1 left-1 z-10" onClick={() => setMobileListVisible(!mobileListVisible)}>Incident List ({visibleIncidents.length})</Button>
        <GoogleMap 
          onLoad={onMapLoad}
          onBoundsChanged={_debounce(() => {
            onMapBoundsChanged(map);
          }, 100)}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <MarkerClustererF
            options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}
          >
            {(clusterer) => (
              <>
                {incidents.map((incident) => 
                  <IncidentMarker 
                    key={incident.id}
                    incident={incident}
                    isSelectedIncident={incident.id === selectedIncident?.id}
                    handleMarkerClick={setSelectedIncident}
                    handleInfoCloseClick={() => setSelectedIncident(null)}
                    clusterer={clusterer}
                    />
                  )}
              </>
            )}
          </MarkerClustererF>
        </GoogleMap>
      </section>
      <section className={
        `${mobileListVisible ? 'flex -translate-y-full' : 'translate-y-0'} sm:translate-y-0 z-10 transition-transform ease-in-out duration-200 delay-100 h-[50%] sm:flex sm:h-full flex-col flex-grow-0 flex-shrink-0 basis-1/3 bg-slate-200`
        }
      >
        
        <IncidentList
          onClose={() => setMobileListVisible(false)}
          incidents={visibleIncidents}
          selectedIncident={selectedIncident} 
          onIncidentClicked={(incident) => {
            setSelectedIncident(incident)
            setMobileListVisible(false);
          }}
        />
      </section>
    </div>
  )
}

export default App
