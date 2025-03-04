import { createContext ,useContext,useEffect,useState} from "react";
import { is_authenticated, login,register } from "../endpoints/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);
    const nav =useNavigate();
    const get_authenticated_user = async()=>{
        try{
           const success =  await is_authenticated();
           setIsAuthenticated(success);
        }
        catch(error){
            setIsAuthenticated(false);
        }finally{
            setLoading(false);
        }
    }

    const login_user = async(username,password)=>{
        const success =  await login(username,password);
        if(success){
            setIsAuthenticated(true);
            nav('/dashboard');
        }
        
    }

    const registered_user =async(username,email,password,cpassword)=>{
        if(password === cpassword){
            try{
                await register(username,email,password);
                alert('User Successfully Registred');
            } 
            catch(error){
                alert('User already exists');
            }
        }
        else{
            alert('Passwords do not match');
        }

    }
    useEffect(() => {
        get_authenticated_user();
    }, [window.location.pathname])
return(
    <AuthContext.Provider value={{isAuthenticated,loading,login_user,registered_user}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = ()=> useContext(AuthContext);