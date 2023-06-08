import {
  BrowserRouter,
    Navigate,
    Route,
    Routes,
  } from "react-router-dom"



// SuperAdmin Pages 
import SuperAdminDashboard from "./pages/Dashboard";
import ManageAdmins from "./pages/ManageAdmins";
import ManageParties from "./pages/ManageParties";
import SignupAdmin from "./pages/SignupAdmin";
import SignupParty from "./pages/SignupParty";
import Reports from "./pages/Report";
import RegStation from "./pages/RegStation";
import UpdateParty from "./pages/UpdateParty";
import UpdateAdmin from "./pages/UpdateAdmin";
import ManageSingleParty from "./pages/ManageSingleParty";
import ManageStations from "./pages/ManageStations";
import UpdateStation from "./pages/UpdateStation";


// Index Pages
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ElectionTime from "./pages/ElectionTime";


import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const App = () => {
  
  const ProtectedRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    if(user && user?.userRole === "superadmin"){
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
          <Route path="/forgetPassword" element={<ForgetPassword />} />
      
          <Route path="/superAdmin" element={<ProtectedRoute><SuperAdminDashboard/></ProtectedRoute>}/>
          <Route path="/superAdmin/signupAdmin" element={<ProtectedRoute><SignupAdmin /></ProtectedRoute>} />
          <Route path="/superAdmin/updateAdmin/:id" element={<ProtectedRoute><UpdateAdmin /></ProtectedRoute>} />
          <Route path="/superAdmin/signupParty" element={<ProtectedRoute><SignupParty /></ProtectedRoute>} />
          <Route path="/superAdmin/updateParty/:id" element={<ProtectedRoute><UpdateParty /></ProtectedRoute>} />
          <Route path="/superAdmin/manageAdmins" element={<ProtectedRoute><ManageAdmins /></ProtectedRoute>} />
          <Route path="/superAdmin/manageSingleParty/:id" element={<ProtectedRoute><ManageSingleParty /></ProtectedRoute>} />
          <Route path="/superAdmin/manageParties" element={<ProtectedRoute><ManageParties /></ProtectedRoute>} />
          <Route path="/superAdmin/regStation" element={<ProtectedRoute><RegStation /></ProtectedRoute>} />
          <Route path="/superAdmin/manageStations" element={<ProtectedRoute><ManageStations /></ProtectedRoute>} />
          <Route path="/superAdmin/updateStation/:id" element={<ProtectedRoute><UpdateStation /></ProtectedRoute>} />
          <Route path="/superAdmin/electionTime" element={<ProtectedRoute><ElectionTime /></ProtectedRoute>} />
          <Route path="/superAdmin/report" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      
      
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </BrowserRouter>
    </>
   
    )
}

export default App;
