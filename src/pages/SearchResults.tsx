import React from "react"
import { Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Navbar from "src/components/Navbar/Navbar"
import SearchResultCard from "src/components/SearchResults/SearchResultCard"
import { useSearchResults } from "src/hooks/useSearchResults"
import { CharacterShortData } from "src/types/CharacterShortData"

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
          data.map((character: CharacterShortData) => (
            <SearchResultCard key={character.id} character={character} />
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
