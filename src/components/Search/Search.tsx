import React, { useState } from "react"
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"
import { useHistory } from "react-router-dom"

const Search = () => {
  const history = useHistory()
  const [search, setSearch] = useState<string>("")
  const handleSearch = () => history.push(`/search/${search}`)

  return (
    <Row className="align-items-center justify-content-between mt-2">
      <Col className="order-sm-2" xs={12} sm={6} lg={4}>
        <InputGroup className="mb-2 mb-sm-0 w-100 mw-50">
          <FormControl
            value={search}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") handleSearch()
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar personaje..."
          />
          <Button
            type="submit"
            className="d-flex justify-content-center align-items-center"
          >
            <AiOutlineSearch />
          </Button>
        </InputGroup>
      </Col>
      <Col xs={12} sm={6}>
        <h1>Equipo</h1>
      </Col>
    </Row>
  )
}

export default Search
