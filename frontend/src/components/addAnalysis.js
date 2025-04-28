import React, { useState } from 'react';
import HpottersDataService from "../services/HpottersDataService";
import { Link, useParams, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddAnalysis = (props) => {
  let editing = false;
  let initialAnalysisState = "";
  const location = useLocation();
  
  if (location.state && location.state.currentAnalysis) {
    editing = true;
    initialAnalysisState = location.state.currentAnalysis.analysis;
  }

  const [analysis, setAnalysis] = useState(initialAnalysisState);
  const [submitted, setSubmitted] = useState(false);
  let { id } = useParams();

  const onChangeAnalysis = e => {
    const analysis = e.target.value;
    setAnalysis(analysis);
  };

  const saveAnalysis = () => {
    var data = {
      analysis: analysis,
      name: props.user.name,
      user_id: props.user.id,
      Hpotters_id: id
    };

    if (editing) {
      data.analysis_id = location.state.currentAnalysis._id;
      HpottersDataService.updateAnalysis(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        }).catch(e => { console.log(e) });
    } else {
      HpottersDataService.createAnalysis(data)
        .then(response => {
          setSubmitted(true);
        }).catch(e => { console.log(e) });
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h5>Analysis submitted successfully</h5>
          <Link to={"/Hpotters/" + id}>
            Back to Character
          </Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Analysis</Form.Label>
            <Form.Control
              type="text"
              required
              value={analysis}
              onChange={onChangeAnalysis}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveAnalysis}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddAnalysis;


//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5