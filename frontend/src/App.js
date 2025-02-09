import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './routes/login';
import Register from './routes/register';
import  Menu  from './routes/menu';
import {  AuthProvider } from './contexts/useAuth';
// import PrivateRoute from './components/private_route';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute><Menu/></PrivateRoute>} /> */}
        <Route path="/" element={<Menu/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
