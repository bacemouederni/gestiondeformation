import axios from "axios";
const API_URL = "http://localhost:3001/api/v1";
const token = localStorage.getItem('token');
 const headers= {
  headers:{
  Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
}

 // Get formations
 const getFormation = async () => {
    try {
      const response = await axios.get(API_URL + "/formation",headers);
    // console.log(response.data);
     return response.data;
   } catch (err) {
     return err.message;
    }
  };
   // Get formations
 const getNombreFormation = async () => {
  try {
    const response = await axios.get(API_URL + "/nombreformation",headers);
  // console.log(response.data);
   return response.data;
 } catch (err) {
   return err.message;
  }
};
  // Get formation by ID
 const getFormationById = async (formationId) => {
  //  console.log('services',formationId);
    try {
      
      const response = await axios.get(`${API_URL}/formation/${formationId}`,headers);
      console.log('response',response.data);
      return response.data;
    } catch (err) {
      return err.message;
    }
};
//console.log('fla',getFormationById());
  // Add new formateur
const addFormation = async (formationData) => {
    try {
      //  console.log('service',formationData);
       
      const response = await axios.post(API_URL + "/formation", formationData,headers);
      // console.log(response);
  
      
    } catch (err) {
      return err.message;
    }
  };
  // Edit formateur
  const editFormation = async (formationId, formationData) => {
    try {
      const response = await axios.put(`${API_URL}/formation/${formationId}`,formationData,headers);
     return response.data;
   } catch (err) {
    return err.message;
    }
  };
  const deletFormation = async (formationId) => {
    try {
      const response = await axios.delete(`${API_URL}/formation/${formationId}`,headers);
      return  response.data;
    } catch (err) {
      return err.message;
    }
 };
  






  const formationService = {
    getFormation,
    getFormationById,
    addFormation,
    editFormation,
    deletFormation,
    getNombreFormation
 
 };
 
 export default formationService;
 