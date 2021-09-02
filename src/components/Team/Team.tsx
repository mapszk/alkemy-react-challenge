import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import { useTeamContext } from "src/hooks/useTeamContext"
import TeamCard from "./TeamCard"

const Team: FC = () => {
  const { team } = useTeamContext()
  return (
    <div>
      <h4>Miembros:</h4>
      <Row>
        {team.length ? (
          team.map(({ id, name, stats, image }) => (
            <Col key={id} className="mb-3" sm={4} md={4} lg={2}>
              <TeamCard id={id} name={name} stats={stats} image={image} />
            </Col>
          ))
        ) : (
          <div className="text-center text-secondary py-5">
            <h3>No tienes ningún personaje en tu equipo</h3>
          </div>
        )}
      </Row>
    </div>
  )
}

export default Team
