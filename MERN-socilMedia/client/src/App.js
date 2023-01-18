import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './style.scss';
import { useContext } from 'react';
import { Context } from './Context/context';

function App() {

  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Register/>} />
        <Route path="/login" element={user ? <Navigate to="/" replace={true}/> : <Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/register" element={user ? <Navigate to="/" replace={true}/> :<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
