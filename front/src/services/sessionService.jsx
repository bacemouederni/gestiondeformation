// import axios from "axios";
// const API_URL = "http://localhost:3001";

//  // Get sessions
//  const getSession = async () => {
//     try {
//       const response = await axios.get(API_URL + "/getSession");
//       // console.log(response.data);
//      return response.data;
//    } catch (err) {
//      return err.message;
//     }
//   };
//   // Get session by ID
//  const getSessionById = async (sessionId) => {
//   //  console.log('services',userId);
//     try {
      
//       const response = await axios.get(`${API_URL}/getSessionById/${sessionId}`);
//       console.log('response',response.data);
//       return response.data;
//     } catch (err) {
//       return err.message;
//     }
// };

//   // Add new session
// const ajoutSession = async (sessionData) => {
//     try {
//       //  console.log('service',formationData);
       
//       const response = await axios.post(API_URL + "/ajoutSession", sessionData);
//       // / console.log(response);
  
      
//     } catch (err) {
//       return err.message;
//     }
//   };
//   // Edit session
//   const editSession = async (sessionId, sessionData) => {
//     try {
//       const response = await axios.put(`${API_URL}/editSession/${sessionId}`,sessionData);
//      return response.data;
//    } catch (err) {
//     return err.message;
//     }
//   };
//   const deletSession = async (sessionId) => {
//     try {
//       const response = await axios.delete(`${API_URL}/deletSession/${sessionId}`);
//       return  response.data;
//     } catch (err) {
//       return err.message;
//     }
//  };
  






//   const sessionService = {
//     getSession,
//     getSessionById,
//     ajoutSession,
//     editSession,
//     deletSession,
    
 
//  };
 
//  export default sessionService;
 