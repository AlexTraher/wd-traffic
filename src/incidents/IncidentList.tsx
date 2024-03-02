import { Separator } from "@/components/ui/separator"
import { Incident } from "@/types"
import { FC } from "react"

type IncidentListProps = {
  incidents: Incident[]
  selectedIncident: Incident | null
  onIncidentClicked: (incident: Incident) => void
  onClose: () => void 
}

const IncidentList: FC<IncidentListProps> = ({ incidents, selectedIncident, onIncidentClicked, onClose }) => {
  return (
    <>
      <div className="flex align-middle" data-testid="incident-list">
        <h2 className="text-lg font-semibold text-center self-center flex-1 basis-full my-2">Incidents</h2>
        <button className="p-4 sm:hidden" onClick={onClose}>X</button>
      </div>
      <div className="overflow-y-auto pb-32 px-2 sm:pb-2">
        {incidents.map((incident) => <IncidentListItem 
          incident={incident}
          isSelectedIncident={incident.id === selectedIncident?.id}
          key={incident.id}
          onIncidentClicked={() => onIncidentClicked(incident)}
        />)}
      </div>
    </>
  )
}

export default IncidentList;

type IncidentListItemProps = { 
  incident: Incident,
  isSelectedIncident: boolean,
  onIncidentClicked: () => void }

const IncidentListItem: FC<IncidentListItemProps> = ({ incident, isSelectedIncident, onIncidentClicked }) => {
  return (
    <>
      <button 
        className={`${isSelectedIncident ? 'bg-slate-400' : 'hover:bg-slate-300'} flex flex-col p-2 text-left  w-full`}
        onClick={onIncidentClicked}
        data-testid={`incident-list-item-button-${incident.id}`}
      >
        <h2 className="font-semibold">{incident.title}</h2>
        <h3>{incident.alert_type}</h3>
        <p className="italic">{incident.description}</p>
      </button>
      <Separator />
    </>
  )
}