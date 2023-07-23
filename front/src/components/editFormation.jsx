import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editFormation, getFormationById } from '../store/formationSlice';
import { useParams } from 'react-router-dom';

const domaines = [
  { value: 'Informatique', label: 'Informatique' },
  { value: 'Gestion', label: 'Gestion' },
  { value: 'Marketing', label: 'Marketing' },
  // Add more domains if needed
];

const EditFormation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormationById(id));
  }, [dispatch, id]);

  const formation = useSelector((state) => state.formation.formation)

  const [formationData, setFormationData] = useState({
    title: '',
    nb_session: '',
    duree: '',
    budget: '',
    domaine: '',
    type_formation: '',
  });

  useEffect(() => {
    if (formation) {
      setFormationData({
        title: formation.title,
        nb_session: formation.nb_session,
        duree: formation.duree,
        budget: formation.budget,
        domaine: formation.domaine,
        type_formation: formation.type_formation,
      });
    }
  }, [formation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editFormation({ formationId: id, formation: formationData }));
    window.location.href='/gestionFormation'
  };

  return (
    <Form className="Container" onSubmit={handleSubmit} method="post">
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formationData.title}
          onChange={(e) => setFormationData({ ...formationData, title: e.target.value })}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group controlId="formSessions">
        <Form.Label>number de sessions</Form.Label>
        <Form.Control
          type="number"
          name="nb_session"
          value={formationData.nb_session}
          onChange={(e) => setFormationData({ ...formationData, nb_session: e.target.value })}
          placeholder="Enter number of sessions"
        />
      </Form.Group>

      <Form.Group controlId="formDuration">
        <Form.Label>Duree</Form.Label>
        <Form.Control
          type="number"
          name="duree"
          value={formationData.duree}
          onChange={(e) => setFormationData({ ...formationData, duree: e.target.value })}
          placeholder="Enter duration"
        />
      </Form.Group>

      <Form.Group controlId="formBudget">
        <Form.Label>Budget</Form.Label>
        <Form.Control
          type="number"
          name="budget"
          value={formationData.budget}
          onChange={(e) => setFormationData({ ...formationData, budget: e.target.value })}
          placeholder="Enter budget"
        />
      </Form.Group>

      

      <Form.Group controlId="formDomaine">
        <Form.Label>Domaine</Form.Label>
        <Form.Select
          name="domaine"
          value={formationData.domaine}
          onChange={(e) => setFormationData({ ...formationData, domaine: e.target.value })}
          aria-label="Select domain"
        >
          <option value="">Select a domain</option>
          {domaines.map((domaine) => (
            <option key={domaine.value} value={domaine.value}>
              {domaine.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Type of Formation</Form.Label>
        <div>
          <Form.Check
            type="radio"
            name="type_formation"
            id="internalRadio"
            label="Internal"
            checked={formationData.type_formation === 'interne'}
            value="interne"
            onChange={(e) => setFormationData({ ...formationData, type_formation: e.target.value })}
          />
          <Form.Check
            type="radio"
            name="type_formation"
            id="externalRadio"
            label="External"
            checked={formationData.type_formation === 'externe'}
            value="externe"
            onChange={(e) => setFormationData({ ...formationData, type_formation: e.target.value })}
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
  );
};

export default EditFormation;