import React, { useState, useEffect } from 'react'
import HpottersDataService from '../services/HpottersDataService'
import { Link, useParams } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const Hpotter = (props) => {

  const [Hpotter, setHpotter] = useState({
    id: null,
    name: "",
    house: "",
    wand: "",
    species: "",
    image: "",
    analysis: []
  })
  let { id } = useParams();
  const getHpotter = id => {
    HpottersDataService.get(id)
      .then(response => {
        setHpotter(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      })
  }
  useEffect(() => {
    getHpotter(id)
  }, [id])
  const deleteAnalysis = (analysisId, index) => {
    HpottersDataService.deleteAnalysis(analysisId, props.user.id)
      .then(response => {
        setHpotter((prevState) => {
          prevState.analysis.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
 
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={Hpotter.image} fluid/>
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{Hpotter.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  House: {Hpotter.house}
                </Card.Text>
                <Card.Text>
                 Species: {Hpotter.species}
                </Card.Text>
                
                 {props.user && <Link to={"/Hpotters/" + id + "/analysis"}>
                    Add Analysis
                  </Link>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
  <Col>
    <br />
    <h2>Analysis</h2><br />
    {Hpotter.analysis && Hpotter.analysis.map((analysis, index) => {
      return (
        <Card key={index} className="mb-3">
          <Card.Body>
            <h5>
              {analysis.name + " analyzed on " + new Date(Date.parse(analysis.lastModified)).toDateString()}
            </h5>
            <p>{analysis.analysis}</p>

            {props.user && props.user.id === analysis.user_id && (
              <Row>
                <Col>
                  <Link
                    to={"/Hpotters/" + id + "/analysis"}
                    state={{ currentAnalysis: analysis }}
                  >
                    Edit
                  </Link>
                </Col>
                <Col>
                  <Button
                    variant="link" onClick={() => deleteAnalysis(analysis._id, index)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      );
    })}
  </Col>
</Row>

      </Container>


    </div>
  );
}

export default Hpotter;
//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5