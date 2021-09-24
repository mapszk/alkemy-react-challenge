import React, { FC, useMemo } from "react"
import { ListGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { State } from "src/store/store"
import { CharacterShortData } from "src/types/CharacterShortData"
import { translateStat } from "src/util/translateStat"

interface Props {
  team: CharacterShortData[]
}

const TeamStats: FC<Props> = ({ team }) => {
  const stats = useMemo(() => {
    const totalIntelligence = team.map((character: CharacterShortData) =>
      !character.stats.intelligence ? 0 : character.stats.intelligence
    )
    const totalSpeed = team.map((character: CharacterShortData) =>
      !character.stats.speed ? 0 : character.stats.speed
    )
    const totalPower = team.map((character: CharacterShortData) =>
      !character.stats.power ? 0 : character.stats.power
    )
    const totalDurability = team.map((character: CharacterShortData) =>
      !character.stats.durability ? 0 : character.stats.durability
    )
    const totalCombat = team.map((character: CharacterShortData) =>
      !character.stats.combat ? 0 : character.stats.combat
    )
    const totalStrenght = team.map((character: CharacterShortData) =>
      !character.stats.strength ? 0 : character.stats.strength
    )
    return [
      {
        name: "intelligence",
        value: totalIntelligence.reduce((a: number, b: number) => a + b, 0),
      },
      {
        name: "speed",
        value: totalSpeed.reduce((a: number, b: number) => a + b, 0),
      },
      {
        name: "power",
        value: totalPower.reduce((a: number, b: number) => a + b, 0),
      },
      {
        name: "durability",
        value: totalDurability.reduce((a: number, b: number) => a + b, 0),
      },
      {
        name: "combat",
        value: totalCombat.reduce((a: number, b: number) => a + b, 0),
      },
      {
        name: "strenght",
        value: totalStrenght.reduce((a: number, b: number) => a + b, 0),
      },
    ]
  }, [team])
  const averageWeightHeight = useMemo(() => {
    const allWeights = team.map((character: CharacterShortData) =>
      character.weight ? character.weight : 0
    )
    const allHeights = team.map((character: CharacterShortData) =>
      character.height ? character.height : 0
    )
    return {
      weight:
        allWeights.reduce((a: number, b: number) => a + b, 0) /
        allWeights.length,
      height:
        allHeights.reduce((a: number, b: number) => a + b, 0) /
        allHeights.length,
    }
  }, [team])

  return (
    <div>
      <h4>Estadísticas:</h4>
      <ListGroup horizontal="md">
        {stats
          .sort((a, b) => b.value - a.value)
          .map((stat, index) => (
            <ListGroup.Item
              data-testid="stat-test"
              className={index === 0 ? "active" : ""}
              key={index}
            >
              {translateStat(stat.name)}: {stat.value}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <div className="d-flex lh-1 mt-3">
        <p className="fw-bold">
          Altura promedio:{" "}
          <span className="fw-normal">
            {averageWeightHeight.height
              ? `${averageWeightHeight.height.toFixed(2)}cm`
              : "?"}
          </span>
        </p>
        <p className="fw-bold mx-4">
          Peso promedio:{" "}
          <span className="fw-normal">
            {averageWeightHeight.weight
              ? `${averageWeightHeight.weight.toFixed(2)}kg`
              : "?"}
          </span>
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state: State) => {
  const { characters } = state
  return { team: characters }
}

export default connect(mapStateToProps)(TeamStats)
