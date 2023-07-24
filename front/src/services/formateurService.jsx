import axios from "axios";
const API_URL = "http://localhost:3001/api/v1/";
const token = localStorage.getItem('token');
 const headers= {
  headers:{
  Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
}


 // Get formateurs
 const getFormateur = async () => {
    try {
      const response = await axios.get(API_URL + "/getFormateur",headers);
     return response.data;
   } catch (err) {
     return err.message;
    }
  };
   // Get nombre formateurs
 const getNombreFormateur = async () => {
  try {
    const response = await axios.get(API_URL + "/nombreFormateur",headers);

    console.log(response.data);
   return response.data;
 } catch (err) {
   return err.message;
  }
};
  // Get user by ID
 const getFormateurById = async (formateurId) => {
  //  console.log('services',userId);
    try {
      
      const response = await axios.get(`${API_URL}/user/${formateurId}`,headers);
      console.log('response',response.data)
      return response.data;
    } catch (err) {
      return err.message;
    }
};

  // Add new formateur
const addFormateur = async (formateurData) => {
    try {
      //  console.log('service',formationData);
       
      const response = await axios.post(API_URL + "/addFormateur", formateurData,headers);
       console.log(response);
  
      
    } catch (err) {
      return err.message;
    }
  };
  // Edit formateur
  const editFormateur = async (formateurId, formateurData) => {
    try {
      const response = await axios.put(`${API_URL}/user/${formateurId}`,formateurData,headers);
     return response.data;
   } catch (err) {
    return err.message;
    }
  };
  const deletFormateur = async (formateurId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${formateurId}`,headers);
      return  response.data;
    } catch (err) {
      return err.message;
    }
 };
  






  const formateurService = {
    getFormateur,
    getFormateurById,
    addFormateur,
    editFormateur,
    deletFormateur,
    getNombreFormateur
 };
 
 export default formateurService;
 