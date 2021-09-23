import React, { FC } from "react"
import { Col } from "react-bootstrap"

interface Props {
  info: {
    name: string
    fullName: string
    alignment: "good" | "bad"
    aliases: string[]
    weight: number
    height: number
    work: string
    hairColor: string
    eyeColor: string
  }
}

const CharacterInfo: FC<Props> = ({ info }) => {
  const {
    name,
    fullName,
    alignment,
    aliases,
    weight,
    height,
    work,
    hairColor,
    eyeColor,
  } = info
  return (
    <Col xs={12} lg={9} className="lh-1">
      <h1 className="fw-bold">{name}</h1>
      <p
        className={
          alignment === "good"
            ? "bg-success p-2 rounded text-white d-inline-block"
            : "bg-danger p-2 rounded text-white d-inline-block"
        }
      >
        {alignment === "good" ? "Héroe" : "Villano"}
      </p>
      <p className="fs-5">
        Nombre completo: <span className="fw-bold">{fullName}</span>
      </p>
      <p className="fs-5">
        Alias: <span className="fw-bold">{aliases.join(", ")}</span>
      </p>
      <p className="fs-5">
        Peso: <span className="fw-bold">{weight}kg</span>
      </p>
      <p className="fs-5">
        Altura: <span className="fw-bold">{height}cm</span>
      </p>
      <p className="fs-5">
        Trabajo: <span className="fw-bold">{work}</span>
      </p>
      <p className="fs-5">
        Color de pelo: <span className="fw-bold">{hairColor}</span>
      </p>
      <p className="fs-5">
        Color de ojos: <span className="fw-bold">{eyeColor}</span>
      </p>
    </Col>
  )
}

export default CharacterInfo
