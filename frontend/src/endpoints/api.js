import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/'

const LOGIN_URL = `${BASE_URL}token/`
const REGISTER_URL = `${BASE_URL}register/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const LOGOUT_URL = `${BASE_URL}logout/`
const NOTES_URL = `${BASE_URL}notes/`
const AUTH_URL = `${BASE_URL}authenticated/`

axios.defaults.withCredentials = true; 


export const login = async (username, password) => {
    try {
        const response = await axios.post(
            LOGIN_URL, 
            { username, password },  // Object shorthand for cleaner syntax
            { withCredentials: true }  // Ensures cookies are included
        );
        return response.data.success
    } catch (error) {
        console.error("Login failed:", error);
        return false;  // Return false or handle the error as needed
    }
};

export const refresh_token =async()=>{
    const response = await axios.post(REFRESH_URL, {},{ withCredentials: true });
    return response.data.refreshed;
}
export const get_notes = async () => {
    try{
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        return response.data;
    }
    catch(error){
        console.error("Get notes failed:", error);
        return call_refresh(error,axios.get(NOTES_URL, { withCredentials: true }));
    }
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password}, { withCredentials: true });
    return response.data;
};

export const call_refresh = async (error,func) => {
    if(error.response && error.response.status === 401){
       const tokenRefreshed = await refresh_token();
         if(tokenRefreshed){
              const retryOriginalRequest = await func();
              return retryOriginalRequest.data;
         }
    }
    return false;
}


export const logout =async()=>{
    try {
        await axios.post(LOGOUT_URL, {},{ withCredentials: true });
        return true;
    }
    catch(error){
        return false
    }
}

export const is_authenticated =async()=>{
    try {
        await axios.post(AUTH_URL, {},{ withCredentials: true });
        return true;
    }
    catch(error){
        return false
    }
}