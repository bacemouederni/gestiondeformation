import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editParticipant, getParticipantById } from '../store/participantSlice';
import { useParams } from 'react-router-dom';

const EditParticipant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipantById(id));
  }, [dispatch, id]);

  const participant = useSelector((state) => state.participant.participant);

  const [participantData, setParticipantData] = useState({
    cin: '',
    name: '',
    email: '',
    password: '',
    telephone: '',
    profil:'',
  });

  useEffect(() => {
    if (participant) {
      setParticipantData({
        cin: participant.cin,
        name: participant.name,
        email: participant.email,
        password: participant.password,
        telephone: participant.telephone,
        profil:participant.profil
      });
    }
  }, [participant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editParticipant({ participantId: id, participant: participantData }));
    window.location.href = '/participant';
  };

  return (
    <Form className="Container" onSubmit={handleSubmit} method="post">
      <Form.Group controlId="formCin">
        <Form.Label>Cin</Form.Label>
        <Form.Control
          type="text"
          name="cin"
          value={participantData.cin}
          onChange={(e) => setParticipantData({ ...participantData, cin: e.target.value })}
          placeholder="Cin"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={participantData.name}
          onChange={(e) => setParticipantData({ ...participantData, name: e.target.value })}
          placeholder="Name"
        />
      </Form.Group>


      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={participantData.email}
          onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={participantData.password}
          onChange={(e) => setParticipantData({ ...participantData, password: e.target.value })}
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group controlId="formTelephone">
        <Form.Label>Telephone</Form.Label>
        <Form.Control
          type="number"
          name="telephone"
          value={participantData.telephone}
          onChange={(e) => setParticipantData({ ...participantData, telephone: e.target.value })}
          placeholder="Telephone"
        />

      </Form.Group>
      <Form.Select aria-label="Default select example" type="text" name="profil" placeholder="profil">
                <option>profil</option>
                <option value="etudient">etudient</option>
                <option value="ingenier">ingenier</option>
                <option value="gestionaire">gestionaire</option>
              </Form.Select>
                <br />

      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
  );
};

export default EditParticipant;