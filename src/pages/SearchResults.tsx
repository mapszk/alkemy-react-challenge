import React from "react"
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import Navbar from "src/components/Navbar/Navbar"
import { useSearchResults } from "src/hooks/useSearchResults"

const SearchResults = () => {
  const history = useHistory()
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
          data.map((character) => (
            <Col key={character.id} className="mb-4" xs={6} md={4} lg={2}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  role="button"
                  onClick={() => history.push(`/character/${character.id}`)}
                  style={{ height: "150px", objectFit: "cover" }}
                  src={character.image.url}
                  alt={character.name}
                />
                <Card.Body className="d-flex justify-content-between flex-column p-2">
                  <Card.Title>{character.name}</Card.Title>
                  <Button>Agregar</Button>
                </Card.Body>
              </Card>
            </Col>
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
