import { Separator } from "@/components/ui/separator"
import { Incident } from "@/types"
import { FC } from "react"


type IncidentListProps = {
  incidents: Incident[]
  // onIncidentClick: () => TODO
}

const IncidentList: FC<IncidentListProps> = ({ incidents }) => {
  return (
    <div className="h-full overflow-y-auto">
      {incidents.map((incident) => <IncidentListItem incident={incident} key={incident.id} />)}
    </div>
  )
}

export default IncidentList;

const IncidentListItem: FC<{ incident: Incident }> = ({ incident }) => {
  return (
    <>
      <div className="p-2">
      <h3>{incident.title}</h3>
      </div>
      <Separator />
    </>
  )
}