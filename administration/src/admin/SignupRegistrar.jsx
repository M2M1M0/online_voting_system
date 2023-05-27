import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Menu from "./Menu";
import { AuthContext } from "../context/authContext";
import './style.css'
import userdefault from '../images/userdefault.png'

//ICONS
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const initialState = {
    fname : "",
    midname : "",
    lname : "",
    phone : "",
    email : "",
    stationid : 0,
    gender : "",
    dob : "",
    username : "",
    image: "",
    password : "",
    conpassword : "",
}

export default function SignupRegistrar(){
    const { user } = useContext(AuthContext)


    const [file, setFile] = useState("")
    const [ registrar, setRegistrar ] = useState(initialState)

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ focused, setFocused ] = useState(false)

    const handleChange = (e) => {
        setRegistrar({...registrar, [e.target.name] : e.target.value})
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const data = [
            registrar.fname,
            registrar.midname,
            registrar.lname,
            registrar.phone,
            registrar.email,
            registrar.stationid,
            registrar.gender,
            registrar.dob,
            registrar.username,
            registrar.password,
            registrar.conpassword,
            file
        ]

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        
        try{
            
            // REGISTER registrar
            await axios.post("http://localhost:8800/registrar/signup", data, config)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Register")
                    setRegistrar(initialState)
                    setFocused(false)
            })
        } catch(error){

            if(error.response.status === 409 ) 
            {
                setError("User Already exist!")

            }else if(error.response.status === 408 ){
                setError("Password Doesn't Match!")
            } else {
                setError(error.message)
            }
           
        }   
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000) 
        
    }

    useEffect(() => {
        
        const currentStation = user?.stationId
        setRegistrar({...registrar, stationid: currentStation})

    },[])  /// re-render too many times when use dependemcies else it won't create multiple voter

    

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
                <Menu />
            </div>
        <div className="pl-2 pt-3 w-5/6">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    {error && 
                    <div className="bg-red-300 text-red-900 text-base p-3 m-5 w-full">
                        {error}
                    </div>

                    }
                    {success && 
                    <div className="bg-emerald-200 text-emerald-900 text-base p-3 m-5 w-full">
                        {success}
                    </div>

                    }
                    <form  onSubmit={e => handleSubmit(e)} className="px-8">
                        <div>
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="">Full Name <span className='text-red-500 text-3xl'>*</span></label>
                                <div className='flex  gap-3'>
                                    <div>
                                        <input 
                                            className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                            type="text"
                                            value={registrar.fname}
                                            name='fname'
                                            placeholder="First name"
                                            onBlur={(e) => setFocused(true) }
                                            focused={focused.toString()}
                                            pattern='^[A-Za-z/]+$'
                                            required
                                            onChange={e => handleChange(e)} />
                                        <span className="span">First name only contain Aiphabet, no special charaters needed</span>
                                    </div>
                                    <div>
                                        <input 
                                                className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                                type="text"
                                                value={registrar.midname}
                                                name='midname'
                                                placeholder="Middle name"

                                                onBlur={(e) => setFocused(true)}
                                                focused={focused.toString()}
                                                pattern="^[A-Za-z/]+$"
                                                required
                                                onChange={e => handleChange(e)} />
                                        <span className="span">Middle name only contain Aiphabet, no special charaters needed</span>
                                    </div>
                                    <div>
                                        <input 
                                            className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                            type="text"
                                            value={registrar.lname}
                                            name='lname'
                                            placeholder="Last name"

                                            onBlur={(e) => setFocused(true)}
                                            focused={focused.toString()}
                                            pattern="^[A-Za-z/]+$"
                                            required
                                            onChange={e => handleChange(e)} />
                                        <span className="span">Last name only contain Aiphabet, no special charaters needed</span>
                                    </div>
                                
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 w-full mt-3 items-center ">
                                <div className='flex flex-col gap-2 w-5/12 '>
                                    <label htmlFor="">Phone Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <div className="flex">
                                        <b className="text-center flex p-2 bg-gray-300 rounded-l-md">+251 </b>
                                        <input 
                                            className="border-2 border-gray-300 rounded-r-md p-1 w-full" 
                                            type="text" 
                                            maxLength={9}
                                            minLength={9}
                                            value={registrar.phone}
                                            name='phone'
                                            onBlur={(e) => setFocused(true)}
                                            focused={focused.toString()}
                                            pattern="^[7,9][0-9]+$"
                                            required
                                            onChange={e => handleChange(e)} />
                                    </div>
                                        <span className="span">Phone Number should start with 7 or 9 </span>

                                </div>
                            
                                <div className='flex flex-col gap-2  w-5/12'>
                                    <label htmlFor="">Gender <span className='text-red-500 text-3xl'>*</span></label>
                                    <div className="space-x-6  flex flex-row">
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Male" 
                                                focused={focused.toString()}

                                                onChange={e => handleChange(e)}/> Male
                                        </div>
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Female"
                                                focused={focused.toString()}

                                                onChange={e => handleChange(e)}/> Female
                                        </div>
                                    <span className="span">Choose your Gender</span>
                                        
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 w-5/12'>
                                    <label htmlFor="">Date of Birth <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="date" 
                                        value={registrar.dob}
                                        name="dob"
                                        required
                                        onChange={e => handleChange(e)}/>
                                </div>

                                <div className='flex flex-col gap-2 w-5/12'>
                                    <label htmlFor="">Email ( <span className="text-emerald-500 "> Optionl </span> )</label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="email" 
                                        placeholder='example@gmail.com'
                                        value={registrar.email}
                                        name='email'
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                        onChange={e => handleChange(e)} />
                                    <span className="span">Email is not Valid</span>

                                </div>

                                <div className='flex flex-col gap-2 w-5/12 '>
                                    <label htmlFor="">Username <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="text" 
                                        value={registrar.username}
                                        minLength={3}
                                        name="username"
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        required
                                        placeholder='Resident ID No.'
                                        onChange={e => handleChange(e)}/>
                                    <span className="span">Username Should have At least three character</span>

                                </div>

                                <div className='flex flex-col gap-2 w-5/12 pl-8'>
                                    <img
                                    
                                    className="w-32 h-32 rounded-full object-cover"
                                        src={
                                            file
                                            ? URL.createObjectURL(file)
                                            : userdefault
                                        }
                                        alt=""
                                        />
                                        <label htmlFor="logo">Add Profile Picture: <DriveFolderUploadIcon/><span className=' text-3xl'></span></label>
                                        <input 
                                            className="p-1" 
                                            id="logo"
                                            type="file" 
                                            name='image'
                                            style={{display: "none"}}
                                            value={registrar.image}
                                            onChange={(e) => {
                                                handleFile(e)
                                            }} />
                                </div>


                                <div className='flex flex-col gap-2 w-5/12'>
                                    <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password"
                                        value={registrar.password}
                                        minLength={8}
                                        maxLength={16}
                                        name="password"
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})+$"
                                        required
                                        onChange={e => handleChange(e)} />
                                    <span className="span">The Password field must at least a number, and at least a special character</span>

                                </div>

                               

                                <div className='flex flex-col gap-2 w-5/12'>
                                    <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password" 
                                        value={registrar.conpassword}
                                        name="conpassword"
                                        pattern={registrar.password}
                                        focused={focused.toString()}
                                        required
                                        onChange={e => handleChange(e)}/>
                                    <span className="span">Password don't match</span>

                                </div>
                                
                                <div className="w-5/12">
                                    <input 
                                        type="hidden" 
                                        name="userRole"
                                        value="registrar"
                                        onChange={e => handleChange(e)}/>
                                </div>
                                
                            </div>
                        </div>  

                        <div className='flex flex-row text-center gap-1 sm:gap-3 py-8 pl-3'>
                            <button 
                                type="submit"
                                className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                    SUBMIT
                            </button>
                            <Link to="/admin/signupRegistrar">
                                <button 
                                    onClick={(e) => {
                                        setFocused(false)
                                        setRegistrar(initialState)

                                    }}
                                    className='px-5 py-1 rounded-l rounded-r hover:border-2'>
                                        RESET
                                </button>
                            </Link>
                            <Link 
                                to={'/admin'}
                                className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'>
                                <button>
                                    CANCEL
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
)}