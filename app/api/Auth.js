import axios from "axios";
import Endpoint from "../constant/constant";

const Auth = async (email, password) => {
    try {
        const response = await axios.post(Endpoint.BASE_URL + Endpoint.LOGIN, { 
          email: email,
          password: password,
        });
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export const Logout = async (token) => {
    try {
        const response = await axios.post(Endpoint.BASE_URL + Endpoint.LOGOUT, { 
          token: token,
        });
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export default Auth 