import React, { FC } from "react"
import { Button, Card, ListGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useTeamContext } from "src/hooks/useTeamContext"
import { CharacterStats } from "src/types/CharacterStats"

interface Props {
  id: number
  name: string
  image: string
  stats: CharacterStats
  alignment: "good" | "bad"
}

const TeamCard: FC<Props> = ({ id, name, image, stats, alignment }) => {
  const { deleteMember } = useTeamContext()
  const history = useHistory()
  
  return (
    <Card className={alignment === "good" ? "border-success" : "border-danger"}>
      <Card.Img
        role="button"
        onClick={() => history.push(`/character/${id}`)}
        style={{ height: "150px", objectFit: "cover" }}
        variant="top"
        src={image}
        alt="character image"
      />
      <Card.Body>
        <Card.Title className="lh-1">
          <h5>{name}</h5>
          <span className="fs-6 fw-normal bg-info px-2 rounded">
            {alignment === "good" ? "Héroe" : "Villano"}
          </span>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item className="px-0 py-1">
            Inteligencia: {!stats.intelligence ? "?" : stats.intelligence}
          </ListGroup.Item>
          <ListGroup.Item className="px-0 py-1">
            Fuerza: {!stats.strength ? "?" : stats.strength}
          </ListGroup.Item>
          <ListGroup.Item className="px-0 py-1">
            Velocidad: {!stats.speed ? "?" : stats.speed}
          </ListGroup.Item>
          <ListGroup.Item className="px-0 py-1">
            Resistencia: {!stats.durability ? "?" : stats.durability}
          </ListGroup.Item>
          <ListGroup.Item className="px-0 py-1">
            Potencia: {!stats.power ? "?" : stats.power}
          </ListGroup.Item>
          <ListGroup.Item className="px-0 py-1">
            Combate: {!stats.combat ? "?" : stats.combat}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Button
        className="mb-1"
        size="sm"
        variant="primary"
        href={`/character/${id}`}
      >
        Ver detalle
      </Button>
      <Button onClick={() => deleteMember(id)} size="sm" variant="danger">
        Remover
      </Button>
    </Card>
  )
}

export default TeamCard
