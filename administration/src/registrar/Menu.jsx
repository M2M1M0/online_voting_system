import { Link, useNavigate } from 'react-router-dom'
// import  { IoMdArrowDropdown } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import defaultImg from '../images/userdefault.png'

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
// css
// import './menu.css'


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
    <div className="h-screen bg-white text-gray-700 pr-3 border-r-2 border-gray-100 fixed w-32 sm:w-auto">
        <div className="flex flex-col flex-wrap p-2">
            <img 
                className="mx-8 mt-6 h-20 w-20 rounded-full cursor-pointer "
                src={
                    user.image 
                    ? `http://localhost:8800/uploads/${user.image}` :
                    defaultImg
                }
                alt="" 
            />
            <div className='text-right w-full pr-8'>
                <span>{user.username}</span>
            </div>
            
            <ul className="py-8 space-y-0 mt-4 ">
                <Link to={'/registrar'}>
                    <li className="p-3 hover:bg-gray-100 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"><DashboardIcon/></span>
                        <span className=''>Dashoard</span>
                    </li>
                </Link>
                <Link to={'/registrar/signupVoter'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <PersonAddIcon/></span>
                        <span className=''>Add Voter</span>
                    </li>
                </Link>
                <Link to={'/registrar/manageVoter'}>   
                    <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                        <span className="text-purple-800"> <ManageAccountsIcon/></span>
                        <span className=''>Manage Voters</span>
                    </li>
                </Link>
                
                
            </ul>
            <span 
                onClick={() => logout()}
                className="p-3 hover:bg-gray-200 space-x-3 hover:tracking-wide cursor-pointer">
                    
                    <span className="text-purple-800"><LogoutIcon/></span>
                    <span className=''>Logout</span>
            </span>
        </div>
    </div>
    
    </>
)}