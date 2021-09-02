import React, { FC, useEffect, useState } from "react"
import { CharacterShortData } from "src/types/CharacterShortData"

export interface TeamContextType {
  team: CharacterShortData[]
  deleteMember: (id: number) => void
  addMember: (character: CharacterShortData) => { status: string; msg: string }
}

export const TeamContext = React.createContext<TeamContextType | null>(null)

const TeamContextProvider: FC = ({ children }) => {
  const [team, setTeam] = useState<CharacterShortData[]>([])
  const deleteMember = (id: number) => {
    setTeam((team) => team.filter((character) => character.id !== id))
  }
  const addMember = (character: CharacterShortData) => {
    const goodMembers = team.filter(
      (character) => character.alignment === "good"
    )
    const badMembers = team.filter((character) => character.alignment === "bad")
    if (character.alignment === "good" && goodMembers.length === 3) {
      return {
        status: "error",
        msg: "No puedes agregar mas de 3 heroes",
      }
    }
    if (character.alignment === "bad" && badMembers.length === 3) {
      return {
        status: "error",
        msg: "No puedes agregar mas de 3 villanos",
      }
    }
    setTeam((team) => [...team, character])
    return {
      status: "success",
      msg: "Agregado!",
    }
  }

  useEffect(() => {
    if (localStorage.getItem("team") !== null) {
      setTeam(JSON.parse(localStorage.getItem("team") as string))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team))
  }, [team])
  return (
    <TeamContext.Provider value={{ team, addMember, deleteMember }}>
      {children}
    </TeamContext.Provider>
  )
}

export default TeamContextProvider
