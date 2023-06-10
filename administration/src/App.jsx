import {
  BrowserRouter,
  Navigate,
  Route,
    Routes,
  } from "react-router-dom"
  
  import { AuthContext } from "./context/authContext";
import { useContext } from "react";

// Admin Pages
import AdminDashboard from "./admin/Dashboard";
import UpdateAdminInfo from "./admin/UpdateAdminInfo";
import UpdateAdminProfile from "./admin/UpdateAdminProfile";
import SignupRegistrar from "./admin/SignupRegistrar";
import UpdateRegistrar from "./admin/UpdateRegistrar";
import ManageRegistrar from "./admin/ManageRegistrar";
import Report from "./admin/Report";


// Registrar Pages
import Dashboard from "./registrar/Dashboard";
import UpdateRegistrarInfo from "./registrar/UpdateRegistrarInfo";
import UpdateRegistrarProfile from "./registrar/UpdateRegistrarProfile";
import SignupVoter from "./registrar/SignupVoter";
import UpdateVoter from "./registrar/UpdateVoter";
import ManageVoter from "./registrar/ManageVoter";

// Index Pages
import Login from "./Login";




const App = () => {
  
  const AdminRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    if(user && user?.userRole === "administrator"){
      return children
    } else {
      return <Navigate to={'/login'} />
    }
  }

  const RegistrarRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    if(user && user?.userRole === "registrar"){
      return children
    } else {
      return <Navigate to={'/login'} />
    }
  }
    
    return (
    <>  
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />

          {/*  */}
      
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute> } />
          <Route path="/admin/updateInfo" element={ <UpdateAdminInfo />  } />
          <Route path="/admin/updateProfileImage" element={ <UpdateAdminProfile />  } />
         
          <Route path="/admin/signupRegistrar" element={<AdminRoute><SignupRegistrar /></AdminRoute> } />
          <Route path="/admin/updateRegistrar/:id" element={<AdminRoute><UpdateRegistrar /></AdminRoute> } />
          <Route path="/admin/manageRegistrar" element={<AdminRoute><ManageRegistrar /></AdminRoute>} />
          <Route path="/admin/report" element={<Report />} />
      
          {/*  */}

          <Route path="/registrar" element={<Dashboard /> } />
          <Route path="/registrar/updateInfo" element={ <UpdateRegistrarInfo />  } />
          <Route path="/registrar/updateProfileImage" element={ <UpdateRegistrarProfile />  } />

          <Route path="/registrar/signupVoter" element={<RegistrarRoute><SignupVoter /></RegistrarRoute> } />
          <Route path="/registrar/updateVoter/:id" element={<RegistrarRoute><UpdateVoter /></RegistrarRoute> } />
          <Route path="/registrar/manageVoter" element={<RegistrarRoute><ManageVoter /></RegistrarRoute>} />
      
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </BrowserRouter>
    </>
   
    )
}

export default App;
