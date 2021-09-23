import React, { FC, useMemo, useState } from "react"
import { Button, Card, Col, Toast, ToastContainer } from "react-bootstrap"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { State } from "src/store/store"
import { CharacterShortData } from "src/types/CharacterShortData"
import { ADD_CHARACTER } from "../../store/actionTypes"

interface Props {
  character: CharacterShortData
  team: CharacterShortData[]
  addCharacter: any
}

const SearchResultCard: FC<Props> = ({ addCharacter, character, team }) => {
  const { id, name, image, alignment } = character
  const [error, setError] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")
  const history = useHistory()

  const handleAdd = () => {
    const goodCharacters = team.filter(
      (character) => character.alignment === "good"
    )
    const badCharacters = team.filter(
      (character) => character.alignment === "bad"
    )
    if (team.length === 6) {
      setError(true)
      setMsg("Solo puedes agregar 6 personajes")
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    } else if (alignment === "good" && goodCharacters.length === 3) {
      setError(true)
      setMsg("Solo puedes agregar 3 heroes")
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    } else if (alignment === "bad" && badCharacters.length === 3) {
      setError(true)
      setMsg("Solo puedes agregar 3 villanos")
      setTimeout(() => {
        setError(false)
      }, 3000)
      return
    } else {
      addCharacter(character)
    }
  }
  const isInTeam = useMemo(() => {
    return team.find((ch: CharacterShortData) => ch.id === id) !== undefined
  }, [team, id])

  return (
    <>
      <ToastContainer
        className="mt-2"
        style={{ zIndex: 99 }}
        position="top-center"
      >
        <Toast show={error} onClose={() => setError(false)}>
          <Toast.Header className="d-flex justify-content-end mx-2"></Toast.Header>
          <Toast.Body className="opacity-100">{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Col className="mb-4" xs={6} md={4} lg={2}>
        <Card
          className={alignment === "good" ? "border-success" : "border-danger"}
        >
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
    </>
  )
}

const mapStateToProps = (state: State) => {
  const { characters } = state
  return { team: characters }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    addCharacter: (character: CharacterShortData) =>
      dispatch({ type: ADD_CHARACTER, payload: character }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCard)
