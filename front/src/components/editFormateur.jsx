import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editFormateur, getFormateurById } from '../store/formateurSlice';
import { useParams } from 'react-router-dom';

const EditFormateur = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormateurById(id));
  }, [dispatch, id]);

  const formateur = useSelector((state) => state.formateur.formateur);

  const [formateurData, setFormateurData] = useState({
    cin: '',
    name: '',
   
    email: '',
    password: '',
    telephone: '',
  });

  useEffect(() => {
    if (formateur) {
      setFormateurData({
        cin: formateur.cin,
        name: formateur.name,
        
        email: formateur.email,
        password: formateur.password,
        telephone: formateur.telephone,
      });
    }
  }, [formateur]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editFormateur({ formateurId: id, formateur: formateurData }));
    window.location.href = '/gestionFormateur';
  };

  return (
    <Form className="Container" onSubmit={handleSubmit} method="post">
      <Form.Group controlId="formCin">
        <Form.Label>Cin</Form.Label>
        <Form.Control
          type="text"
          name="cin"
          value={formateurData.cin}
          onChange={(e) => setFormateurData({ ...formateurData, cin: e.target.value })}
          placeholder="Cin"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formateurData.name}
          onChange={(e) => setFormateurData({ ...formateurData, name: e.target.value })}
          placeholder="Name"
        />
      </Form.Group>

      

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formateurData.email}
          onChange={(e) => setFormateurData({ ...formateurData, email: e.target.value })}
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formateurData.password}
          onChange={(e) => setFormateurData({ ...formateurData, password: e.target.value })}
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group controlId="formTelephone">
        <Form.Label>Telephone</Form.Label>
        <Form.Control
          type="number"
          name="telephone"
          value={formateurData.telephone}
          onChange={(e) => setFormateurData({ ...formateurData, telephone: e.target.value })}
          placeholder="Telephone"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
  );
};

export default EditFormateur;