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
    <div className="h-screen bg-slate-900 text-white">
        <div className="flex flex-col">
            <img 
                className="mx-3 mt-2 h-24 w-24 rounded-full cursor-pointer"
                src={img} alt="" />
                <div className='flex pl-20'>
                    <span>{user ? user.fname : <>Super Admin</>}</span>
                </div>
            
            <ul className="py-8 space-y-0">
                <Link to={'/superAdmin'}>
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                            <DashboardIcon/>
                            <span>Dashoard</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageAdmins'}>   
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                            <ManageAccountsIcon/>
                            <span>Manage Admins</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageParties'}>   
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                            <ManageAccountsIcon/>
                            <span>Manage Parties</span>
                    </li>
                </Link>
                <Link to={'/superAdmin/manageStations'}>   
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                            <ManageAccountsIcon/>
                            <span>Manage Stations</span>
                    </li>
                </Link>
               
                <Link to={'/superAdmin/report'}>     
                    <li className="p-3 hover:bg-slate-950 space-x-3">      
                            <AssessmentIcon/>                 
                            <span>Report</span>
                    </li>
                </Link>
            </ul>
            <span 
                onClick={() => logout()}
                className="p-3 hover:bg-slate-950 space-x-3 cursor-pointer">
                    <LogoutIcon/>
                    <span>Logout</span>
            </span>
        </div>
    </div>
    </>
)}

