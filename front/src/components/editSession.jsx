import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditSession = () => {
  const token = localStorage.getItem('token');
  const headers= {
   headers:{
   Authorization: `Bearer ${token}`,
     Accept: 'application/json',
   },
 }
  const [userAll, setUserAll] = useState([]);
  const [formationAll, setFormationAll] = useState([]);
  const [sessions, setSessions] = useState([]);
  const { id } = useParams();
  const [sessionData, setSessionData] = useState({
    _id: "",
    formateur: "",
    formation: "",
    organisme: "",
    lieu: "",
    date_debut: "",
    date_fin: "",
    
  });
  
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

  useEffect(() => {
    getSession();
  }, []);
  console.log(sessionData);

  useEffect(() => {
    const getSessionById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/session/${id}`,headers);
        const session  = response.data;
        console.log(session.formation);
        setSessionData(session || {});
        console.log('test',sessionData.formation);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    getSessionById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res=  await axios.put(`http://localhost:3001/api/v1/session/${id}`, sessionData,headers);
    console.log("test",sessionData);
      
  
      window.location.href = '/session'; 
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log(sessionData.formateur._id);
  return (
    <Form className="Container" onSubmit={handleSubmit}>
      
    <Form.Group controlId="formformation">
    <Form.Label>Formateur</Form.Label>
                  <Form.Select name="formateur" onChange={handleChange} value={sessionData.formateur._id} >
                  
                  
                    {userAll.map((user) => (
                      <option key={user._id} value={user._id} >
                        {user.name}
                      </option>
                    ))}
                  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3">
  <Form.Label>Formation</Form.Label>
  <Form.Select name="formation" onChange={handleChange} value={sessionData.formation._id} >

    {formationAll.map((formation) => (
      <option key={formation._id} value={formation._id}>
        {formation.title}
      </option>
    ))}
  </Form.Select>
</Form.Group>
      <Form.Group controlId="formOrganisle">
        <Form.Label>Organisme</Form.Label>
        <Form.Control
          type="text"
          name="organisme"
          value={sessionData.organisme}
          onChange={handleChange}
          placeholder="Organisme"
        />
      </Form.Group>
      <Form.Group controlId="formlieu">
        <Form.Label>Lieu</Form.Label>
        <Form.Control
          type="text"
          name="lieu"
          value={sessionData.lieu}
          onChange={handleChange}
          placeholder="Lieu"
        />
      </Form.Group>
      <Form.Group controlId="formDate_debut">
        <Form.Label>Date de début</Form.Label>
        <Form.Control
          type="date"
          name="date_debut"
          value={sessionData.date_debut}
          onChange={handleChange}
          placeholder="Date de début"
        />
      </Form.Group>
      <Form.Group controlId="formDate_fin">
        <Form.Label>Date de fin</Form.Label>
        <Form.Control
          type="date"
          name="date_fin"
          value={sessionData.date_fin}
          onChange={handleChange}
          placeholder="Date de fin"
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
      Modifier
    </Button>
    </Form>
  );
};

export default EditSession;