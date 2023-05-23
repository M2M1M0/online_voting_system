import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Menu from "../components/Menu";
import './style.css'

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
    image:"",
    password : "",
    conpassword : "",
    userRole : "administrator"
}

export default function SignupAdmin(){

    const [ admin, setAdmin ] = useState(initialState)
    const [ stations, setStations ] = useState([])
    const [file, setFile] = useState("")

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ focused, setFocused ] = useState(false)

    const handleChange = (e) => {
        setAdmin({...admin, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log(admin, "admin")

        if(admin.stationid == 0){
            alert("Please Select Station!")
        } else{
            try{
                // Register Admin
                await axios.post("http://localhost:8800/admin/signup", admin)
                    .then(() => {
                        setSuccess("Successfully Register")
                        setAdmin(initialState)
                    setFocused(false)

                })
            } catch(error){
                console.log(error)
                if(error.response.status === 409 ) 
                {
                    // console.log(err.response.data)
                    setError("User Already exist!")
    
                } else if(error.response.status === 408 ){
                    setError("Password Doesn't Match!")
                }else {
                    setError(error.message)
                }
            }
        }
                
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)

    }
    

    useEffect(() => {
        // Get all stations
        axios.get("http://localhost:8800/station")
            .then(res => { 
                    setStations(res.data)
                    // console.log(res.data)
                })
            .catch(err => { setError(err.message)})
    })


return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/7">
            <Menu />
        </div>
        <div className="pl-2 flex-1">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-purple-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                    {/* <form> */}
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
                            <div className="flex flex-col gap-2 w-3/4 ">
                                <label htmlFor="">Full Name <span className='text-red-500 text-3xl'>*</span></label>
                                <div className='flex  gap-3'>
                                    <div>
                                        <input 
                                            className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                            type="text"
                                            value={admin.fname}
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
                                                value={admin.midname}
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
                                            value={admin.lname}
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
                                <div className='flex flex-col gap-2 w-2/5 '>
                                    <label htmlFor="">Phone Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <div className="flex">
                                        <b className="text-center flex p-2 bg-gray-300 rounded-l-md">+251 </b>
                                        <input 
                                            className="border-2 border-gray-300 rounded-r-md p-1 w-full" 
                                            type="text" 
                                            maxLength={9}
                                            minLength={9}
                                            value={admin.phone}
                                            name='phone'
                                            onBlur={(e) => setFocused(true)}
                                            focused={focused.toString()}
                                            pattern="^[7,9][0-9]+$"
                                            required
                                            onChange={e => handleChange(e)} />
                                    </div>
                                    <span className="span">Phone Number should start with +251 and Valid</span>
                                </div>
                            
                                <div className='flex flex-col gap-2  w-2/5'>
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

                                <div className='flex flex-col gap-2 w-2/5'>
                                    <label htmlFor="">Date of Birth <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="date" 
                                        value={admin.dob}
                                        name="dob"
                                        required
                                        onChange={e => handleChange(e)}/>
                                </div>

                                <div className='flex flex-col gap-2 w-2/5'>
                                    <label htmlFor="">Email ( <span className="text-emerald-500 "> Optionl </span> ) <i className="text-3xl"></i></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="email" 
                                        placeholder='example@gmail.com'
                                        value={admin.email}
                                        name='email'
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                        onChange={e => handleChange(e)} />
                                    <span className="span">Email is not Valid</span>

                                </div>

                                <div className='flex flex-col gap-2 w-2/5 '>
                                    <label htmlFor="">Username <span className='text-red-500 text-3xl'>*</span></label>
                                        <input 
                                            className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                            type="text" 
                                            value={admin.username}
                                            minLength={3}
                                            name="username"
                                            onBlur={(e) => setFocused(true)}
                                            focused={focused.toString()}
                                            required
                                            placeholder='Resident ID No.'
                                            onChange={e => handleChange(e)}/>
                                    <span className="span">Username Should have At least three character</span>

                                </div>

                                <div className='flex flex-col gap-2 w-2/5'>
                                    <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password"
                                        value={admin.password}
                                        minLength={8}
                                        name="password"
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^[A-Za-z0-9/@.#:'%^&*]+$"
                                        required
                                        onChange={e => handleChange(e)} />
                                    <span className="span">The Password field must be greater than 8 character for STRONG security</span>

                                </div>

                                <div className="flex flex-col gap-2 w-2/5">
                                    <label htmlFor="">
                                        Select Station <span className='text-red-500 text-3xl'>*</span>
                                    </label>
                                    <select 
                                        name="stationid"  
                                        onChange={e => handleChange(e)}
                                        required
                                        className="border-2 border-gray-300 rounded-md p-1 w-full bg-white" >
                                        <option value="0" ></option>
                                        { stations && stations.map((station, index) => (                                        
                                            <option key={index} value={station._id}>
                                                {station.stationname}
                                            </option>
                                        )) }

                                    </select>
                                </div>

                                <div className='flex flex-col gap-2 w-2/5'>
                                    <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password" 
                                        value={admin.conpassword}
                                        name="conpassword"
                                        pattern={admin.password}
                                        focused={focused.toString()}
                                        required
                                        onChange={e => handleChange(e)}/>
                                    <span className="span">Password don't match</span>

                                </div>
                                <div className='flex flex-col gap-2 w-2/5 pl-8'>
                                    <img
                                    
                                    className="w-32 h-32 border-2 rounded-full object-cover"
                                        src={
                                            file
                                            ? URL.createObjectURL(file)
                                            : null
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
                                            value={admin.image}
                                            onChange={(e) => {
                                                handleChange(e)
                                                setFile(e.target.files[0])
                                            }} />
                                </div>

                                
                            </div>
                        </div>  

                        <div className='flex flex-row text-center gap-1 sm:gap-3 py-8 pl-3'>
                            <button 
                                type="submit"
                                className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                    SUBMIT
                            </button>
                            <Link to={"/superAdmin/signupAdmin"}>
                            <button 
                                onClick={(e) => {
                                    setAdmin(initialState)
                                    setFocused(false)
                                }}
                                className='px-5 py-1 rounded-l rounded-r hover:border-2'>
                                    RESET
                            </button>
                            </Link>
                            <Link 
                                to={'/superAdmin'}
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