import React, { FC, useMemo } from "react"
import { Button, Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useTeamContext } from "src/hooks/useTeamContext"
import { CharacterShortData } from "src/types/CharacterShortData"
import { CharacterStats } from "src/types/CharacterStats"

interface Props {
  id: number
  name: string
  image: string
  alignment: "good" | "bad"
  stats: CharacterStats
  weight: number
  height: number
}

const SearchResultCard: FC<Props> = ({
  id,
  name,
  image,
  stats,
  alignment,
  weight,
  height,
}) => {
  const history = useHistory()
  const { team, addMember } = useTeamContext()
  const handleAdd = () => {
    addMember({
      id,
      name,
      image,
      stats,
      alignment,
      weight,
      height,
    })
  }
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
