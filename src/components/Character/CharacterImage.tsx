import React, { FC, useMemo, useState } from "react"
import { Col, ToastContainer, Toast, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { ADD_CHARACTER } from "src/store/actionTypes"
import { State } from "src/store/store"
import { CharacterShortData } from "src/types/CharacterShortData"

interface Props {
  info: CharacterShortData
  team: CharacterShortData[]
  addCharacter: any
}

const CharacterImage: FC<Props> = ({ team, info, addCharacter }) => {
  const [errorAdd, setErrorAdd] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")
  const { image, name, id } = info

  const handleAdd = () => {
    if (!info) return
    const goodCharacters = team.filter(
      (character) => character.alignment === "good"
    )
    const badCharacters = team.filter(
      (character) => character.alignment === "bad"
    )
    if (team.length === 6) {
      setErrorAdd(true)
      setMsg("Solo puedes agregar 6 personajes")
      setTimeout(() => {
        setErrorAdd(false)
      }, 3000)
      return
    } else if (info.alignment === "good" && goodCharacters.length === 3) {
      setErrorAdd(true)
      setMsg("Solo puedes agregar 3 heroes")
      setTimeout(() => {
        setErrorAdd(false)
      }, 3000)
      return
    } else if (info.alignment === "bad" && badCharacters.length === 3) {
      setErrorAdd(true)
      setMsg("Solo puedes agregar 3 villanos")
      setTimeout(() => {
        setErrorAdd(false)
      }, 3000)
      return
    } else {
      addCharacter(info)
    }
  }
  const isInTeam = useMemo(() => {
    return (
      team.find((ch: CharacterShortData) => ch.id === Number(id)) !== undefined
    )
  }, [id, team])

  return (
    <>
      <ToastContainer
        className="mt-2"
        style={{ zIndex: 99 }}
        position="top-center"
      >
        <Toast show={errorAdd} onClose={() => setErrorAdd(false)}>
          <Toast.Header className="d-flex justify-content-end mx-2"></Toast.Header>
          <Toast.Body className="opacity-100">{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Col className="mb-2 d-flex flex-column" xs={12} lg={3}>
        <img
          className="rounded w-100 mb-2"
          style={{ objectFit: "cover", maxHeight: "350px" }}
          src={image}
          alt={name}
        />
        <Button
          disabled={isInTeam}
          variant={isInTeam ? "success" : "primary"}
          onClick={handleAdd}
        >
          {isInTeam ? "Agregado" : "Agregar"}
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterImage)
