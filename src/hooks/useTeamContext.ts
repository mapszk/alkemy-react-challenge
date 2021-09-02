import { useContext } from "react"
import { TeamContext, TeamContextType } from "src/contexts/TeamContext"

export const useTeamContext = () => useContext(TeamContext) as TeamContextType
