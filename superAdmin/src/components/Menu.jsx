import { Link, useNavigate } from "react-router-dom";
import img from '../images/userdefault.png'

//ICONS
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContext } from "react";
import { AuthContext } from '../context/authContext'

export default function Menu(){

    const { user, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()
    

    const logout = async () => {
        if(window.confirm("You are going out. Are you Sure!")){
            dispatch({type: "LOGOUT"})
            navigate("/")
        }
    }

return(
    <>
    <div className="h-screen bg-white text-stone-500 pr-3 border-r-2 border-gray-100 fixed w-32 sm:w-auto">
        <div className="flex flex-col ">
            <img 
                className="mx-3 mt-6 h-20 w-20 rounded-full cursor-pointer"
                src={img} alt="" />
            <div className='text-right pr-5'>
                <span>{user ? user.fname : <>Super Admin</>}</span>
            </div>
            
            <ul className="py-8 space-y-0 mt-4 ">
                <Link to={'/superAdmin'}>
                    <li className="p-3 hover:bg-gray-100 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"><DashboardIcon/></span>
                        <span>Dashoard</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageAdmins'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <ManageAccountsIcon/></span>
                        <span>Manage Admins</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageParties'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <ManageAccountsIcon/></span>
                        <span>Manage Parties</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageStations'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-normal space-x-3">
                        <span className="text-purple-800"> <ManageAccountsIcon/></span>
                        <span>Manage Stations</span>
                    </li>
                </Link>
               
                <Link to={'/superAdmin/report'}>     
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">      
                        <span className="text-purple-800"><AssessmentIcon/></span>
                        <span>Report</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/electionTime'}>     
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">      
                        {/* <span className="text-purple-800"><AssessmentIcon/></span> */}
                        <span>Set Time</span>
                    </li>
                </Link>
                
            </ul>
            <span 
                onClick={() => logout()}
                className="p-3 hover:bg-gray-200 space-x-3 hover:tracking-wide cursor-pointer">
                    
                    <span className="text-purple-800"><LogoutIcon/></span>
                    <span>Logout</span>
            </span>
        </div>
    </div>
    </>
)}

