import React from "react"
import TeamStats from "src/components/TeamStats/TeamStats"
import Team from "src/components/Team/Team"
import Navbar from "src/components/Navbar/Navbar"

const Home = () => {
  return (
    <>
      <Navbar title="Equipo" />
      <TeamStats />
      <Team />
    </>
  )
}

export default Home
