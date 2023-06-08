import axios from "axios"
import { useContext,    useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"

import evoting from '../images/e-voting.png'
import Flag_of_Ethiopia from '../images/Flag_of_Ethiopia.png'
import logo from '../images/nebe-logo.png'
import '../login.css'

export default function Login() {
    
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const station  = user?.station
    const navigate = useNavigate()

    const [ credentials, setCredentials ] = useState({
        username : "",
        password : ""
    })
    

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.name] : e.target.value}) )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            dispatch({ type: "LOGIN_START" })

        try {
            const res = await axios.post("http://localhost:8800/auth/login", credentials)
            console.log(res.data, "response")
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })

            if(res.data.userRole === "superadmin"){
                navigate(`/superAdmin`)
                
            }else if(res.data.userRole)
            {
                dispatch({ type: "LOGIN_FAILURE"})
                alert("You are not Allowed Here!!!")
            } else {
                navigate("/")
            }
        
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }
    

    return(
    <>
    <div className="h-screen w-screen px-12 flex flex-col gap-6 pt-5">
        <div className="w-full flex justify-between">
            <div></div>
            <Link to={'/'}>
                <img src={evoting} alt="Oops" className="w-48 h-full cursor-pointer"/>
            </Link>
            <img src={Flag_of_Ethiopia} alt="" className='sm:w-24 sm:h-12 h-8 w-16'/>

        </div>
        <div className="flex sm:flex-row gap-8 flex-col-reverse h-auto w-auto rounded border shadow-2xl p-8 pb-0 ">
            <div className="sm:w-1/2 w-full flex place-items-center">
                <img src={logo} alt="Oops" className="w-full sm:pr-16 p-0"/>
            </div>
            <div className="sm:w-1/2 w-full  flex flex-col space-y-6 sm:pb-16 p-1 sm:mx-5 mx-2 bg-gray-100">
                <h3 className="welcome text-center sm:text-4xl text-1xl font-normal py-3 transition ease-in-out delay-150  hover:scale-110">
                    WELCOME
                </h3>
                { error && 
                <div className="text-base p-5 text-red-800 bg-red-300 w-full mr-2">
                    {error}
                </div>
                }
                <form action="" className="sm:px-8 px-0">
                    <div className="space-y-4 ">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="" className="mx-3">Username</label>
                            <input 
                                className="text-black p-2 px-3 rounded placeholder:text-slate-500 bg-purple-300 mx-2"
                                type="text"
                                name="username"
                                placeholder="Enter Username " 
                                onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="" className="mx-3">Password</label>
                            <input 
                                className="text-black p-2 px-3 rounded placeholder:text-slate-500 bg-purple-300 mx-2"
                                type="password"
                                name="password"
                                placeholder="Enter Password" 
                                onChange={handleChange}/>
                            <div className="text-sky-600 mx-3">
                                {/* <Link to={'/forgetPassword'}>
                                    forget password ?
                                </Link> */}
                            </div>
                        </div>
                        <div className="grid place-items-end pr-8">
                            <button
                                onClick={(e) => handleSubmit(e)} 
                                disabled={loading}
                                className="px-12 py-2 text-lg rounded-2xl bg-purple-500 hover:text-white text-black hover:bg-purple-700">
                                {loading ? <>loading</> : <>LOGIN</> }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
    )
}