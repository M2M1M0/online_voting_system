import { Link, useNavigate } from 'react-router-dom'
// import  { IoMdArrowDropdown } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import img from '../images/userdefault.png'

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menu(){
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    const logout =  () => {
        if(window.confirm("You are going out. Are you sure?")){
            dispatch({type: "LOGOUT"})
            navigate("/")
        }
    }


return(
    <>
    <div className="h-screen bg-slate-900 text-white">
        <div className="flex flex-col">
            <img 
                className="mx-3 m-2 h-24 w-24 rounded-full"
                src={img} alt="" />
                <div className='flex pl-20'>
                    <span>{user.username}</span>
                </div>
            <ul className="py-8 space-y-0">
                <Link to={'/admin'}>
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                        <DashboardIcon />
                            <span>Dashoard</span>
                    </li>
                </Link>
                {/* <Link to={'/admin/signupVoter'}>
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                        <PersonAddIcon/>
                            <span>Add Voter</span>
                    </li>
                </Link> */}
                <Link to={'/admin/signupRegistrar'}>
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                        <PersonAddIcon/>
                            <span>Add Registrar</span>
                    </li>
                </Link>
                <Link to={'/admin/manageRegistrar'}>   
                    <li className="p-3 hover:bg-slate-950 space-x-3">
                        <ManageAccountsIcon/>
                            <span>Manage Registrar</span>
                    </li>
                </Link>
                
                <Link to={'/admin/report'}>                      
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