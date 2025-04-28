import React, { useState, useEffect } from 'react';
import HpottersDataService from "../services/HpottersDataService";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const HpottersList = () => {
  const [Hpotters, setHpotters] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("");
  const [species, setSpecies] = useState(["All Species"]);

  useEffect(() => {
    retrieveHpotters();
    retrieveSpecies();

  }, []);

  const retrieveHpotters = () => {
    HpottersDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setHpotters(response.data.Hpotters);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveSpecies = () => {
    HpottersDataService.getSpecies()
      .then((response) => {
        console.log(response.data);
        setSpecies(["All Species"].concat(response.data))
      })
      .catch((e) => {
        console.log(e); 
      });
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchSpecies = (e) => {
    const searchSpecies = e.target.value;
    setSearchSpecies(searchSpecies);
  };

  const find = (query, by) => {
    HpottersDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setHpotters(response.data.Hpotters);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    setSearchSpecies("")
    find(searchName, "name");
  };

  const findBySpecies = () => {
    setSearchName("")
    if (searchSpecies === "All Species") {
      retrieveHpotters()
    } else {
    find(searchSpecies, "species");
    }
  }




  return (
    <div className="App">
      <Container>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by Name"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByName}
                style={{ marginTop: '10px' }}
              >
                Search by Name
                </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select" onChange={onChangeSearchSpecies} >
                  {species.map(species => {
                    return (
                      <option value={species} selected={species === searchSpecies} >{species}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findBySpecies}
              >
                Search by Species
              </Button>


            </Col>
          </Row>
        </Form>
        <Row>
          {Hpotters.map((Hpotter) => {
            return (
            <Col key={Hpotter._id}>
              <Card style={{ width: '18rem' }}>

                <Card.Body>

                  <Card.Img src={Hpotter.image} />
                  <Card.Title>{Hpotter.name}</Card.Title>
                  <Card.Text>House: {Hpotter.house}</Card.Text>
                  <Card.Text>Actor: {Hpotter.actor}</Card.Text>
                  <Card.Text>Species: {Hpotter.species}</Card.Text>
                  <Link to={"/Hpotters/" + Hpotter._id}>View Analysis</Link>
                </Card.Body>
              </Card>
            </Col>
            );
          }
          )}
        </Row>
      </Container>
    </div>
  );
}

export default HpottersList;
//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5