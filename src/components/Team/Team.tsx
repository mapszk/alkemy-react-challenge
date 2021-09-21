import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { State } from "src/store/store"
import { CharacterShortData } from "src/types/CharacterShortData"
import TeamCard from "./TeamCard"

interface Props {
  team: CharacterShortData[]
}

const Team: FC<Props> = ({ team }) => {
  return (
    <div>
      <h4>Miembros:</h4>
      <Row>
        {team.length ? (
          team.map(({ id, name, stats, image, alignment }) => (
            <Col key={id} className="mb-3" sm={4} md={4} lg={2}>
              <TeamCard
                id={id}
                name={name}
                stats={stats}
                image={image}
                alignment={alignment}
              />
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

const mapStateToProps = (state: State) => {
  const { characters } = state
  return { team: characters }
}

export default connect(mapStateToProps)(Team)
