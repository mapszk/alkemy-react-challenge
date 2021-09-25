import React, { FC, useState } from "react"
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"
import { useHistory } from "react-router-dom"

interface Props {
  title: string
}

const Navbar: FC<Props> = ({ title }) => {
  const history = useHistory()
  const [search, setSearch] = useState<string>("")
  const handleSearch = () => history.push(`/search/${search}`)
  const handleLogOut = () => {
    localStorage.removeItem("token")
    history.push("/login")
  }

  return (
    <Row className="p-0 align-items-center justify-content-between my-2">
      <Col className="order-sm-2 d-flex" xs={12} sm={6} lg={4}>
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
            onClick={handleSearch}
            type="submit"
            className="d-flex justify-content-center align-items-center"
          >
            <AiOutlineSearch />
          </Button>
        </InputGroup>
        <Button
          data-testid="test-logoutButton"
          onClick={handleLogOut}
          variant="danger"
          className="mb-2 mb-sm-0 mx-1 d-flex justify-center align-items-center"
        >
          <FiLogOut />
        </Button>
      </Col>
      <Col xs={12} sm={6}>
        <div className="d-flex align-items-center">
          {history.location.pathname !== "/" && (
            <Button size="sm" onClick={() => history.push("/")}>
              Volver
            </Button>
          )}
          <h2 className={history.location.pathname !== "/" ? "mx-2" : ""}>
            {title}
          </h2>
        </div>
      </Col>
    </Row>
  )
}

export default Navbar
