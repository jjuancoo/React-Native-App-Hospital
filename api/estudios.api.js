import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
    const {token} = useAuth();

    const intanceAPI = axios.create({
        baseURL: 'https://privilegecare-deploy-gqmt.onrender.com'
    })

    //Interceptar para agregar el token al header
    intanceAPI.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, 
        error => Promise.reject(error)
    )

    return intanceAPI;
}

export default useAxios;