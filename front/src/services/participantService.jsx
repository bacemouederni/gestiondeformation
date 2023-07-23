import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

const token = localStorage.getItem('token');
 const headers= {
  headers:{
  Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
}
// Get participants
const getParticipant = async () => {
  try {
    const response = await axios.get(API_URL + "/getParticipant",headers);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
const getNombreParticipant = async () => {
  try {
    const response = await axios.get(API_URL + "/nombreParticipant",headers);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
// Get participant by ID
const getParticipantById = async (participantId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${participantId}`,headers);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Add new participant
const addParticipant = async (participantData) => {
  try {
    const response = await axios.post(API_URL + "/addParticipant", participantData,headers);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

// Edit participant
const editParticipant = async (participantId, participantData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${participantId}`, participantData,headers);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

const deletParticipant = async (participantId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${participantId}`,headers);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

const participantService = {
  getParticipant,
  getParticipantById,
  addParticipant,
  editParticipant,
  deletParticipant,
  getNombreParticipant
};

export default participantService;