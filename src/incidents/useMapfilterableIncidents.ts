import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from "./fetchIncidents";
import { useState } from "react";
import { Incident } from "@/types";
import useVisibleIncidents from "./useVisibleIncidents";

const useMapFilterableIncidents = () => {
  const queryResult = useQuery({
    queryKey: ['incidents'],
    queryFn: () => fetchIncidents(),
  })

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const { visibleIncidents, onMapBoundsChanged } = useVisibleIncidents(queryResult.data);

  return {
    ...queryResult,
    selectedIncident,
    setSelectedIncident,
    visibleIncidents,
    onMapBoundsChanged
  }
}

export default useMapFilterableIncidents;