import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Menu from "./Menu";
import { AuthContext } from "../context/authContext";
import './style.css'

const initialState = {
    fname : "",
    midname : "",
    lname : "",
    phone : "",
    email : "",
    stationId : 0,
    gender : "",
    dob : "",
    IDnumber : "",
    password : "",
    conpassword : "",
    userRole : "voter"
}

export default function SignupAdmin(){
    const { user } = useContext(AuthContext)



    const [ voter, setVoter ] = useState(initialState)

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ focused, setFocused ] = useState(false)

    const handleChange = (e) => {
        setVoter({...voter, [e.target.name] : e.target.value})
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        // const data = new FormData(e.target)
        // console.log(Object.fromEntries(data.entries()), "Entries")
        console.log(voter, "Voter")
        

        try{
            
            // REGISTER VOTER
            await axios.post("http://localhost:8800/voter/signup", voter)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Register")
                    setVoter(initialState)
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
        setVoter({...voter, stationId: currentStation})

    },[])  /// re-render too many times when use dependemcies else it won't create multiple voter

    

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
                <Menu />
            </div>
        <div className="sm:pl-2 pl-9 pt-3 w-5/6">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="overflow-scroll" >
                
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
                    <form  onSubmit={e => handleSubmit(e)} className="pl-5">
                        <div>
                            <div className="flex flex-col gap-2  ">
                                <label htmlFor="">Full Name <span className='text-red-500 text-3xl'>*</span></label>
                                <div className='flex  gap-3'>
                                    <div>
                                        <input 
                                            className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                            type="text"
                                            value={voter.fname}
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
                                                value={voter.midname}
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
                                            value={voter.lname}
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
                                            value={voter.phone}
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
                                        value={voter.dob}
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
                                        value={voter.email}
                                        name='email'
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                        onChange={e => handleChange(e)} />
                                    <span className="span">Email is not Valid</span>

                                </div>

                                <div className='flex flex-col gap-2 w-5/12 '>
                                    <label htmlFor="">ID Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="text" 
                                        value={voter.IDnumber}
                                        minLength={18}
                                        maxLength={18}
                                        name="IDnumber"
                                        onBlur={(e) => setFocused(true)}
                                        focused={focused.toString()}
                                        pattern="^[I][D][/]([A-Z]){2,2}[/][W]([0-9]){2,2}[/]([0-9]){8,8}$"
                                        required
                                        placeholder='Resident ID No.'
                                        onChange={e => handleChange(e)}/>
                                    <span className="span">Your ID should contain 18 character including '/' upper case and number only The format likes "ID/AA/W00/00000000"</span>

                                </div>

                                <div className='flex flex-col gap-2 w-5/12'>
                                <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password"
                                        value={voter.password}
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

                                <div className="w-5/12">
                                    <input 
                                        type="hidden" 
                                        name="userRole"
                                        value="voter"
                                        onChange={e => handleChange(e)}/>
                                </div>

                                <div className='flex flex-col gap-2 w-5/12'>
                                    <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                        type="password" 
                                        value={voter.conpassword}
                                        name="conpassword"
                                        pattern={voter.password}
                                        focused={focused.toString()}
                                        required
                                        onChange={e => handleChange(e)}/>
                                    <span className="span">Password don't match</span>

                                </div>

                                
                            </div>
                        </div>  

                        <div className='flex flex-row text-center gap-1 sm:gap-3 py-8 pl-3'>
                            <button 
                                type="submit"
                                className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                    SUBMIT
                            </button>
                            <Link to="/registrar/signupVoter">
                                <button 
                                    onClick={(e) => {
                                        setFocused(false)
                                        setVoter(initialState)

                                    }}
                                    className='px-5 py-1 rounded-l rounded-r hover:border-2'>
                                        RESET
                                </button>
                            </Link>
                            <Link 
                                to={'/registrar'}
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