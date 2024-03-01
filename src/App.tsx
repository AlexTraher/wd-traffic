import useIncidents, { fetchIncidents } from './incidents/useIncidents';
import Spinner from './components/spinner/Spinner';
import IncidentList from './incidents/IncidentList';
import ErrorPage from './components/error/ErrorPage';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { data: incidents, isPending, isError } = useQuery({
    queryKey: ['incidents'],
    queryFn: () => fetchIncidents(),
  })


  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorPage />
  }


  return (
    <div className="flex h-full items-stretch">
      <section className="hidden sm:flex flex-col flex-grow-0 flex-shrink-0 basis-1/3 bg-green-400">
        <IncidentList incidents={incidents}/>
      </section>
      <section className="flex-grow-1 basis-full bg-red-500"></section>
    </div>
  )
}

export default App
