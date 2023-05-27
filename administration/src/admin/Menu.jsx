import { Link, useNavigate } from 'react-router-dom'
// import  { IoMdArrowDropdown } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import defaultImg from '../images/userdefault.png'

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
    <div className="h-screen bg-white text-gray-600 pr-3 border-r-2 border-gray-100 fixed w-32 sm:w-auto">
        <div className="flex flex-col">
            <img 
                className="mx-8 mt-6 h-20 w-20 rounded-full cursor-pointer "
                src={
                    user.image 
                    ? `http://localhost:8800/uploads/${user.image}` :
                    defaultImg
                }
                alt="" 
            />
            <div className='text-right pr-5'>
                <span>{user.username}</span>
            </div>
            
            <ul className="py-8 space-y-0 mt-4 ">
                <Link to={'/admin'}>
                    <li className="p-3 hover:bg-gray-100 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"><DashboardIcon/></span>
                        <span>Dashoard</span>
                    </li>
                </Link>

                <Link to={'/admin/signupRegistrar'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <PersonAddIcon/></span>
                        <span>Add Registrar</span>
                    </li>
                </Link>


                <Link to={'/admin/manageRegistrar'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <ManageAccountsIcon/></span>
                        <span>Manage Registrar</span>
                    </li>
                </Link>

                <Link to={'/admin/report'}>                      
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3"> 
                        <span className="text-purple-800">
                            <AssessmentIcon/>    
                        </span>
                        <span>Report</span>
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


