import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function Session() {
  const token = localStorage.getItem('token');
 const headers= {
  headers:{
  Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
}

  const [show, setShow] = useState(false);
  const [userAll, setUserAll] = useState([]);
  const [formationAll, setFormationAll] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedFormateur, setSelectedFormateur] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [sessionData, setSessionData] = useState()

  useEffect(() => {
    getSession();
  }, []);

  async function getSession() {
    try {

      const response = await axios.get('http://localhost:3001/api/v1/session',headers);
      const { sessions, users, formations } = response.data;
      setSessions(sessions||[]);
      setUserAll(users || []);
      setFormationAll(formations || []);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function ajoutSession(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/v1/session', sessionData,headers);
      console.log(res.data);
      handleClose();
      getSession(); // Mettre à jour la liste des sessions
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function deletSession(id) {
    try {
      const res = await axios.delete(`http://localhost:3001/api/v1/session/${id}`,headers);
      console.log('Deleted:', res);
      getSession(); // Mettre à jour la liste des sessions
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(sessionData);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevData) => ({ ...prevData, [name]: value }))
  };

  return (
    <div className="gestion">
      <h1>Gestion de Sessions</h1>
      <Form onChange={ handelChange}>
        <Row className="align-items-center">
          <Col xs={9}>
            <Form.Control type="text" placeholder="Enter input" name="input" />
          </Col>
          <Col xs={3}>
            <Button variant="primary" type="button" onClick={handleShow}>
              Ajouter
            </Button>
            <Modal show={show} onHide={handleClose} className="modal">
              <Modal.Header closeButton>
                <Modal.Title>Ajouter une session</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Formateur</Form.Label>
                  <Form.Select name="formateur" >
                  <option >Choisir un formateur</option>
                    {userAll.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Formation</Form.Label>
                  <Form.Select name="formation" >
                  <option>Choisir une formation</option>
                    {formationAll.map((formation) => (
                      <option key={formation._id} value={formation._id}>
                        {formation.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organisme</Form.Label>
                  <Form.Control type="text" placeholder="Organisme" name="organisme" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date de début</Form.Label>
                  <FormControl type="date" name="date_debut" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date de fin</Form.Label>
                  <FormControl type="date" name="date_fin" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control type="text" placeholder="Lieu" name="lieu" />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
                <Button variant="primary" onClick={ajoutSession}>
                  Enregistrer
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Formateur</th>
            <th>Formation</th>
            <th>Organisme</th>
            <th>Lieu</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.formateur}</td>
              <td>{session.formation}</td>
              <td>{session.organisme}</td>
              <td>{session.lieu}</td>
              <td>{session.date_debut}</td>
              <td>{session.date_fin}</td>
              <td>
                <a href={`/editSession/${session._id}`} className="btn text-secondary">
                  modifier
                </a>
                <Button variant="danger" onClick={() => deletSession(session._id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}