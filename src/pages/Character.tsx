import React, { FC, useMemo, useState } from "react"
import {
  Row,
  Col,
  Spinner,
  Button,
  ToastContainer,
  Toast,
} from "react-bootstrap"
import { connect } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import Navbar from "src/components/Navbar/Navbar"
import { useCharacterDetails } from "src/hooks/useCharacterDetails"
import { ADD_CHARACTER } from "src/store/actionTypes"
import { State } from "src/store/store"
import { CharacterShortData } from "src/types/CharacterShortData"

interface Props {
  team: CharacterShortData[]
  addCharacter: any
}

const Character: FC<Props> = ({ team, addCharacter }) => {
  const { id } = useParams<{ id: string }>()
  const [errorAdd, setErrorAdd] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")
  const { data, loading, error } = useCharacterDetails(id)

  const handleAdd = () => {
    if (!data) return
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
    } else if (data.alignment === "good" && goodCharacters.length === 3) {
      setErrorAdd(true)
      setMsg("Solo puedes agregar 3 heroes")
      setTimeout(() => {
        setErrorAdd(false)
      }, 3000)
      return
    } else if (data.alignment === "bad" && badCharacters.length === 3) {
      setErrorAdd(true)
      setMsg("Solo puedes agregar 3 villanos")
      setTimeout(() => {
        setErrorAdd(false)
      }, 3000)
      return
    } else {
      addCharacter(data)
    }
  }
  const isInTeam = useMemo(() => {
    return (
      team.find((ch: CharacterShortData) => ch.id === Number(id)) !== undefined
    )
  }, [id, team])

  if (error) return <Redirect to="/404" />
  if (loading)
    return (
      <>
        <Navbar title={`Resultados`} />
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      </>
    )
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
      <Navbar title="Detalles" />
      <Row>
        <Col className="mb-2 d-flex flex-column" xs={12} lg={3}>
          <img
            className="rounded w-100 mb-2"
            style={{ objectFit: "cover", maxHeight: "350px" }}
            src={data?.image}
            alt={data?.name}
          />
          <Button
            disabled={isInTeam}
            variant={isInTeam ? "success" : "primary"}
            onClick={handleAdd}
          >
            {isInTeam ? "Agregado" : "Agregar"}
          </Button>
        </Col>
        <Col xs={12} lg={9} className="lh-1">
          <h1 className="fw-bold">{data?.name}</h1>
          <p
            className={
              data?.alignment === "good"
                ? "bg-success p-2 rounded text-white d-inline-block"
                : "bg-danger p-2 rounded text-white d-inline-block"
            }
          >
            {data?.alignment === "good" ? "Héroe" : "Villano"}
          </p>
          <p className="fs-5">
            Nombre completo: <span className="fw-bold">{data?.fullName}</span>
          </p>
          <p className="fs-5">
            Alias: <span className="fw-bold">{data?.aliases.join(", ")}</span>
          </p>
          <p className="fs-5">
            Peso: <span className="fw-bold">{data?.weight}kg</span>
          </p>
          <p className="fs-5">
            Altura: <span className="fw-bold">{data?.height}cm</span>
          </p>
          <p className="fs-5">
            Trabajo: <span className="fw-bold">{data?.work}</span>
          </p>
          <p className="fs-5">
            Color de pelo: <span className="fw-bold">{data?.hairColor}</span>
          </p>
          <p className="fs-5">
            Color de ojos: <span className="fw-bold">{data?.eyeColor}</span>
          </p>
        </Col>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Character)
