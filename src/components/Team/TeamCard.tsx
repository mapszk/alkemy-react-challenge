import React, { FC } from "react"
import { Button, Card, ListGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { DELETE_CHARACTER } from "src/store/actionTypes"
import { CharacterStats } from "src/types/CharacterStats"
import { translateStat } from "src/util/translateStat"

interface Props {
  id: number
  name: string
  image: string
  stats: CharacterStats
  alignment: "good" | "bad"
  deleteCharacter: any
}

const TeamCard: FC<Props> = ({
  id,
  name,
  image,
  stats,
  alignment,
  deleteCharacter,
}) => {
  const history = useHistory()
  return (
    <Card className={alignment === "good" ? "border-success" : "border-danger"}>
      <Card.Img
        role="button"
        onClick={() => history.push(`/character/${id}`)}
        style={{ height: "150px", objectFit: "cover" }}
        variant="top"
        src={image}
        alt={name}
      />
      <Card.Body>
        <Card.Title className="lh-1">
          <h5>{name}</h5>
          <span className="fs-6 fw-normal bg-info px-2 rounded">
            {alignment === "good" ? "Héroe" : "Villano"}
          </span>
        </Card.Title>
        <ListGroup variant="flush">
          {Object.keys(stats).map((stat, index) => (
            <ListGroup.Item
              data-testid="stat-card-test"
              key={index}
              className="px-0 py-1"
            >
              {translateStat(stat)}: {isNaN(stats[stat]) ? "?" : stats[stat]}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Button
        className="mb-1"
        size="sm"
        variant="primary"
        onClick={() => history.push(`/character/${id}`)}
      >
        Ver detalle
      </Button>
      <Button onClick={() => deleteCharacter(id)} size="sm" variant="danger">
        Remover
      </Button>
    </Card>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteCharacter: (id: number) =>
      dispatch({ type: DELETE_CHARACTER, payload: id }),
  }
}

export default connect(null, mapDispatchToProps)(TeamCard)
