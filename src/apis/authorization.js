import axios from "axios";
import { useNavigate } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

// const token = JSON.parse(localStorage.getItem('token'));
const authorization = {
    
    login(body = {}) {
		return axios.post(`${VITE_API_URL}/api/admin/auth/login`, body);
            // {headers: {"Authorization" : `Bearer ${token}`}, body});
	},

    //path
    register(body = {}) {
        return axios.post(`${VITE_API_URL}/api/admin/auth/register`, body);
    },
    
    logout() {
    
    }


}


export default authorization;