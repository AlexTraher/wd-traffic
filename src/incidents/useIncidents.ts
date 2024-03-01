import { Incident, RawIncident } from "@/types";
import { useQuery } from "@tanstack/react-query";



// const useIncidents = () => {
  

//   // TODO - filter out incidents here by those that are visible


//   return { isError, isLoading, incidents: data };
// }

// export default useIncidents;



export const fetchIncidents =  (): Promise<Incident[]> => {
  return  fetch("./incidents.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      return res;
    })
    .then((res) => res.json())
    .then(({ incidents: rawIncidents }) => {
      return rawIncidents.map(processIncident);
    });
}

const processIncident = (rawIncident: RawIncident): Incident => {
  return {
    ...rawIncident,
    lat: +rawIncident.lat,
    long: +rawIncident.long,
    created_at: new Date(rawIncident.created_at),
    updated_at: new Date(rawIncident.updated_at),
  }
}