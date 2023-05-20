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
import Approvals from "./pages/Approval";
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


// import { AuthContext } from "./context/authContext";
// import { useContext } from "react";

const App = () => {
  
  // const ProtectedRoute = ({children}) => {
  //   const { user } = useContext(AuthContext)
  //   if(user && user?.userRole === "superadmin"){
  //     return children
  //   } else {
  //     return <Navigate to={'/login'} />
  //   }
  // }
 
    return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
      
          <Route path="/superAdmin" element={<SuperAdminDashboard/>}/>
          <Route path="/superAdmin/signupAdmin" element={<SignupAdmin />} />
          <Route path="/superAdmin/updateAdmin/:id" element={<UpdateAdmin />} />
          <Route path="/superAdmin/signupParty" element={<SignupParty />} />
          <Route path="/superAdmin/updateParty/:id" element={<UpdateParty />} />
          <Route path="/superAdmin/manageAdmins" element={<ManageAdmins />} />
          <Route path="/superAdmin/manageSingleParty/:id" element={<ManageSingleParty />} />
          <Route path="/superAdmin/manageParties" element={<ManageParties />} />
          <Route path="/superAdmin/regStation" element={<RegStation />} />
          <Route path="/superAdmin/manageStations" element={<ManageStations />} />
          <Route path="/superAdmin/updateStation/:id" element={<UpdateStation />} />
          <Route path="/superAdmin/approval" element={<Approvals />} />
          <Route path="/superAdmin/report" element={<Reports />} />
      
      
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </BrowserRouter>
    </>
   
    )
}

export default App;
