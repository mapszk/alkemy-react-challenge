import React, { FC, useMemo } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useTeamContext } from "src/hooks/useTeamContext"
import { CharacterShortData } from "src/types/CharacterShortData"

interface Props {
  character: CharacterShortData
}

const SearchResultCard: FC<Props> = ({ character }) => {
  const { id, name, image } = character
  const history = useHistory()
  const { team, addMember } = useTeamContext()
  const handleAdd = () => addMember(character)
  const isInTeam = useMemo(() => {
    return team.find((ch: CharacterShortData) => ch.id === id) !== undefined
  }, [team, id])

  return (
    <Col className="mb-4" xs={6} md={4} lg={2}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          role="button"
          onClick={() => history.push(`/character/${id}`)}
          style={{ height: "150px", objectFit: "cover" }}
          src={image}
          alt={name}
        />
        <Card.Body className="d-flex justify-content-between flex-column p-2">
          <Card.Title>{name}</Card.Title>
          <Button
            disabled={isInTeam}
            variant={isInTeam ? "success" : "primary"}
            onClick={handleAdd}
          >
            {isInTeam ? "Agregado" : "Agregar"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SearchResultCard
