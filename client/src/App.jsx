import {
  BrowserRouter,
    Navigate,
    Route,
    Routes,
  } from "react-router-dom"



// Index Pages
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";

// Voter Pages
import Home from "./pages/Home";
import CastVote from "./pages/CastVote";
import VotesConfirmation from "./pages/VotesConfirmation";

import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const App = () => {

  const ProtectedRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    if(user ){
      return children
    } else {
      return <Navigate to={'/login'} />
    }
  }

    
    return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
      
          <Route path="/voter/station/:station" element={<ProtectedRoute> <CastVote />  </ProtectedRoute>} />
          <Route path="/voter/confirmation" element={<ProtectedRoute> <VotesConfirmation /> </ProtectedRoute>} />
      
          
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </BrowserRouter>
    </>
   
    )
}

export default App;
