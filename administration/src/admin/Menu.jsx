import { Link, useNavigate } from 'react-router-dom'
// import  { IoMdArrowDropdown } from 'react-icons/io'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import defaultImg from '../images/userdefault.png'

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menu() {
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    const logout = () => {
        if (window.confirm("You are going out. Are you sure?")) {
            dispatch({ type: "LOGOUT" })
            navigate("/")
        }
    }

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <div className="h-screen bg-white text-gray-600 pr-3 border-r-2 border-gray-100 fixed w-32 sm:w-auto">
                <div className="flex flex-col">
                    <div className='flex flex-col relative'>

                        <img
                            className="mx-8 mt-6 h-24 w-24 rounded-full"
                            src={
                                user.image
                                    ? `http://localhost:8800/uploads/${user.image}` :
                                    defaultImg
                            }
                            alt="Image"
                        />
                        <button
                            onClick={() => setOpen(!open)}
                            className='absolute right-12 bottom-4 text-3xl cursor-pointer'>
                            <AssessmentIcon />
                        </button>

                        <div className={`absolute -right-6 -bottom-16 p-3 rounded-lg bg-slate-950  ${open ? "block" : "hidden"}`}>
                            <ul className='flex flex-col text-white gap-2'>

                                <Link to={'/admin/updateInfo'}>
                                    <li className='hover:bg-slate-900 px-2'>Personal Info</li>
                                </Link>

                                <Link to={'/admin/updateProfileImage'}>
                                    <li className='hover:bg-slate-900 px-2'>Profile Picture</li>
                                </Link>

                            </ul>
                        </div>

                        <div className='text-right w-full pr-8'>
                            <span>{user.username}</span>
                        </div>
                    </div>

                    <ul className="py-8 space-y-0 mt-4 ">
                        <Link to={'/admin'}>
                            <li className="p-3 hover:bg-gray-100 hover:tracking-wide space-x-3">
                                <span className="text-purple-800"><DashboardIcon /></span>
                                <span>Dashoard</span>
                            </li>
                        </Link>

                        <Link to={'/admin/signupRegistrar'}>
                            <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                                <span className="text-purple-800"> <PersonAddIcon /></span>
                                <span>Add Registrar</span>
                            </li>
                        </Link>


                        <Link to={'/admin/manageRegistrar'}>
                            <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                                <span className="text-purple-800"> <ManageAccountsIcon /></span>
                                <span>Manage Registrar</span>
                            </li>
                        </Link>

                        <Link to={'/admin/report'}>
                            <li className="p-3 hover:bg-gray-200 hover:tracking-wide space-x-3">
                                <span className="text-purple-800">
                                    <AssessmentIcon />
                                </span>
                                <span>Report</span>
                            </li>
                        </Link>

                    </ul>
                    <span
                        onClick={() => logout()}
                        className="p-3 hover:bg-gray-200 space-x-3 hover:tracking-wide cursor-pointer">

                        <span className="text-purple-800"><LogoutIcon /></span>
                        <span>Logout</span>
                    </span>
                </div>

            </div>
        </>
    )
}


