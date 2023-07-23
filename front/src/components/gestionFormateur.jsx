import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addFormateur, getFormateur, deletFormateur } from '../store/formateurSlice';
 
export default function GestionFormateur() {
  const [show, setShow] = useState(false);
  const [formateurData, setFormateurData] = useState({
    cin:'',
    name:'',
    email:'',
    
    telephone:'', 
  });

  const dispatch = useDispatch();
  
  const formateurs = useSelector((state) => state.formateur.formateurs);
  

  useEffect(() => {
    console.log(formateurs);
    dispatch(getFormateur());
  }, [dispatch]);

  const handleDelete = (formateurId) => {
    dispatch(deletFormateur(formateurId));
  };

  const onChange = (e) => {
    setFormateurData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addFormateur(formateurData));
    setShow(false);
    
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="gestion">
      <h1>GestionFormateurs</h1>
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
                <Modal.Title>ajouter formateur</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Control
                  className="form"
                  type="number"
                  name="cin"
                  value={formateurData.cin}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formateurs.map((formateur) => (
            <tr key={formateur._id}>
              <td>{formateur.cin}</td>
              <td>{formateur.name}</td>
              
              <td>{formateur.email}</td>
              
              <td>{formateur.telephone}</td>
             
              <td>
                 <a href={`/editFormateur/${formateur._id}`} className="btn text-secondary">
                  modifier
                </a>
                <button
                  onClick={() => handleDelete(formateur._id)}
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