import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addFormation, getFormation, deletFormation } from '../store/formationSlice';
 
export default function GestionFormation() {
  const [filterText, setFilterText] = useState('');

  const [show, setShow] = useState(false);
  const [formationData, setFormationData] = useState({
    title: '',
    nb_session: '',
    duree: '',
    budget: '',
    domaine: '',
    type_formation: '',
  });
 

  const dispatch = useDispatch();
  const formations = useSelector((state) => state.formation.formations);
 

  useEffect(() => {
    dispatch(getFormation());
  }, [dispatch]);

  const handleDelete = (formationId) => {
    dispatch(deletFormation(formationId));
  };

  const onChange = (e) => {
    setFormationData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addFormation(formationData));
    setShow(false);
    
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredFormations = formations.filter((formation) =>
  formation.title.toLowerCase().includes(filterText.toLowerCase())

);
console.log(filteredFormations);
  return (
    <div className="gestion">
      <h1>GestionFormations</h1>
      <Form onChange={onChange} method="post">
        <Row className="align-items-center">
          <Col xs={9}>
          <Form.Control
          type="text"
          placeholder="Enter input"
          value={filterText} // Utilisation du texte de filtrage
          onChange={(e) => setFilterText(e.target.value)} // Mise à jour du texte de filtrage
        />
          </Col>
          <Col xs={3}>
            <Button variant="primary" onClick={handleShow}>
              ajouter
            </Button>
            <Modal show={show} onHide={handleClose} className="modal">
              <Modal.Header closeButton>
                <Modal.Title>ajouter formation</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  className="form"
                  type="text"
                  name="title"
                  value={formationData.title}
                  onChange={onChange}
                  placeholder="title"
                />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="number" name="nb_session" placeholder="nb_session" />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="text" name="duree" placeholder="duree" />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="number" name="budget" placeholder="budget" />
                <br />
  
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Select name="domaine" aria-label="Floating label select example">
                  <option>domaine</option>
                  <option value="informatique">informatique</option>
                  <option value="gestion">gestion</option>
                </Form.Select>

                type formation :
                <div className="form-check" name="type_formation">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type_formation"
                    id="exampleRadios1"
                    value="interne"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    interne
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="type_formation" id="exampleRadios2" value="externe" />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    externe
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className="annuler">
                  annuler
                </Button>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Form>
      <Table striped>
        <thead>
          <tr>
            <th>title</th>
            <th>nb_session</th>
            <th>duree</th>
            <th>budget</th>
            <th>domaine</th>
            <th>type_formation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFormations.map((formation) => (
            <tr key={formation._id}>
              <td>{formation.title}</td>
              <td>{formation.nb_session}</td>
              <td>{formation.duree}</td>
              <td>{formation.budget}</td>
              <td>{formation.domaine}</td>
              <td>{formation.type_formation}</td>
              <td>
                <a href={`/editFormation/${formation._id}`}  className="btn text-secondary">
                  modifier
                </a>
                <button
                  onClick={() => handleDelete(formation._id)}
                  className="btn text-danger btn-act"
                  style={{ marginLeft: '10px' }}
                >
                  <i className="fa-solid fa-trash"></i> supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}