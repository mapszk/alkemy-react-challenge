import React from "react"
import { Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Navbar from "src/components/Navbar/Navbar"
import SearchResultCard from "src/components/SearchResults/SearchResultCard"
import { CharacterDatabase, useSearchResults } from "src/hooks/useSearchResults"

const SearchResults = () => {
  const { name } = useParams<{ name: string }>()
  const { data, loading, error } = useSearchResults(name)

  if (loading)
    return (
      <>
        <Navbar title={`Resultados`} />
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      </>
    )
  if (error)
    return (
      <>
        <Navbar title={`Resultados`} />
        <div className="w-100 min-vh-100 text-center d-flex justify-content-center align-items-center">
          <h2>Oops!</h2>
          <p>Hubo un error, prueba recargando la página</p>
        </div>
      </>
    )
  return (
    <>
      <Navbar title={`Resultados`} />
      <Row>
        {data ? (
          data.map((character: CharacterDatabase) => (
            <SearchResultCard
              key={Number(character.id)}
              name={character.name}
              id={Number(character.id)}
              image={character.image.url}
              alignment={character.biography.alignment}
              height={character.appearance.height[1]}
              weight={character.appearance.weight[1]}
              stats={{
                intelligence: Number(character.powerstats.intelligence),
                speed: Number(character.powerstats.speed),
                durability: Number(character.powerstats.durability),
                combat: Number(character.powerstats.combat),
                power: Number(character.powerstats.power),
                strength: Number(character.powerstats.strength),
              }}
            />
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center pt-5">
            <h4>No hay resultados para {name}</h4>
          </div>
        )}
      </Row>
    </>
  )
}

export default SearchResults
