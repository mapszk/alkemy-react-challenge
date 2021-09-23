import React, { FC } from "react"
import { Row, Spinner } from "react-bootstrap"
import { Redirect, useParams } from "react-router-dom"
import CharacterImage from "src/components/Character/CharacterImage"
import CharacterInfo from "src/components/Character/CharacterInfo"
import Navbar from "src/components/Navbar/Navbar"
import { useCharacterDetails } from "src/hooks/useCharacterDetails"
import { CharacterLongData } from "src/types/CharacterLongData"

const Character: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useCharacterDetails(id)

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
      <Navbar title="Detalles" />
      <Row>
        <CharacterImage info={data as CharacterLongData} />
        <CharacterInfo info={data as CharacterLongData} />
      </Row>
    </>
  )
}

export default Character
