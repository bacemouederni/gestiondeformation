import axios from "axios";
const API_URL = "http://localhost:3001/api/v1/";

const login = async(data) => {

    try {

        const response = await axios.post(API_URL + "login",data);
        console.log(response.data);
       return response.data;
     } catch (err) {
       return err.message;
      }
}


const isAuthentificated = () => {
  const token = localStorage.getItem('token')
  if (token != null) {
    var decoded = jwt_decode(token)
    var datenow = new Date()
    const milliseconds = decoded.exp * 1000
    const expdate = new Date(milliseconds)

    if (datenow < expdate) {
      return true
    } else {
      localStorage.removeItem('token')
      return false
    }
  } else {
    return false
  }
}

const getAuthUserId = () => {
    const token = localStorage.getItem('token')
    if (token != null) {
      var decoded = jwt_decode(token)
      return decoded.user_id
    } else {
      return ''
    }
  }
  const auth = {
    login,
    isAuthentificated,
    getAuthUserId,
  }
  
  export default auth
  
  
