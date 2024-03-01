import useIncidents, { fetchIncidents } from './incidents/useIncidents';
import Spinner from './components/spinner/Spinner';
import IncidentList from './incidents/IncidentList';
import ErrorPage from './components/error/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { Incident } from './types';
import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const { data: incidents, isPending, isError } = useQuery({
    queryKey: ['incidents'],
    queryFn: () => fetchIncidents(),
  })

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [mobileListVisible, setMobileListVisible] = useState(false);

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorPage />
  }


  return (
    <div className="flex flex-col sm:flex-row-reverse items-stretch h-full">
      <section className="flex-grow-1 shrink-0 sm:shrink basis-full bg-red-500 w-full h-full">
        <Button className="sm:hidden relative top-1 left-1" onClick={() => setMobileListVisible(!mobileListVisible)}>List (10)</Button>
      </section>
      <section className={
        `${mobileListVisible ? 'flex mt-[-100%]' : 'mt-0'} transition-all ease-in-out duration-200 sm:mt-0 sm:flex h-full flex-col flex-grow-0 flex-shrink-0 basis-1/3 bg-slate-200`
        }
      >
        <IncidentList 
          incidents={incidents}
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
