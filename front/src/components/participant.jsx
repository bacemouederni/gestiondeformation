import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addParticipant, getParticipant, deletParticipant } from '../store/participantSlice';
 
export default function Participant() {
  const [show, setShow] = useState(false);
  const [participantData, setParticipantData] = useState({
    cin:'',
    name:'',
    email:'',
    password:'',
    telephone:'', 
    profil:'', 
  });

  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participant.participants);
  

  useEffect(() => {
    dispatch(getParticipant());
  }, [dispatch]);

  const handleDelete = (participantId) => {
    dispatch(deletParticipant(participantId));
  };

  const onChange = (e) => {
    setParticipantData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addParticipant(participantData));
    setShow(false);
    
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="gestion">
      <h1>GestionParticipant</h1>
      <Form onChange={onChange} method="post">
        <Row className="align-items-center">
          <Col xs={9}>
            <Form.Control type="text" placeholder="Enter input" />
          </Col>
          <Col xs={3}>
            <Button variant="primary" onClick={handleShow}>
              ajouter
            </Button>
            <Modal show={show} onHide={handleClose} className="modal">
              <Modal.Header closeButton>
                <Modal.Title>ajouter participant</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  className="form"
                  type="number"
                  name="cin"
                  value={participantData.cin}
                  onChange={onChange}
                  placeholder="cin"
                />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="text" name="name" placeholder="name" />
                <br />
                
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="email" name="email" placeholder="email" />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="password" name="password" placeholder="password" />
                <br />
                <FloatingLabel controlId="floatingInputGrid "></FloatingLabel>
                <Form.Control className="form" type="number" name="telephone" placeholder="telephone" />
                <br />
                <Form.Select aria-label="Default select example" type="text" name="profil" placeholder="profil">
                <option>profil</option>
                <option value="etudient">etudient</option>
                <option value="ingenier">ingenier</option>
                <option value="gestionaire">gestionaire</option>
              </Form.Select>
                <br />
               

               
               
               
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
            <th>cin</th>
            <th>name</th>
            <th>email</th>
            
            <th>telephone</th>
            <th>profil</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
          <tr key={participant._id}>
              <td>{participant.cin}</td>
              <td>{participant.name}</td>
             
              <td>{participant.email}</td>
              
              <td>{participant.telephone}</td>
              <td>{participant.profil}</td>
             
              <td>
                 <a href={`/editParticipant/${participant._id}`}  className="btn text-secondary">
                  modifier
                </a>
                <button
                  onClick={() => handleDelete(participant._id)}
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