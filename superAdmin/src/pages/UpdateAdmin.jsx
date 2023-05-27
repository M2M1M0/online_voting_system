import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Menu from "../components/Menu";

export default function UpdateAdmin(){

    const [ admin, setAdmin ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const { id } = useParams()

    const [ focused, setFocused ] = useState(false)

    const handleChange = (e) => {
        setAdmin({...admin, [e.target.name] : e.target.value})
    }

    // const handleFile = (e) => {
    //     setFile(e.target.files[0])

    // }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            // Update Admin Info
            await axios.put("http://localhost:8800/admin/" + id, admin)
                .then(() => {
                    setSuccess("Update Success")
            }).catch(err => setError(err.message))
        } catch(err){
            console.log(err)
            setError(err.message)
        } 
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)   
    }

    useEffect(() => {
        // Get A single Admin
        axios.get("http://localhost:8800/admin/"+id)
            .then(response => {
                setAdmin(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    })

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 flex-1">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Update Admin</h1>
                    <p className=''>National Election Board of Ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    <div className="text-center mb-8 text-2xl">
                        <span className="p-3">Username: </span>  {admin.username}
                    </div>
                     
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

                    <hr />
                        <div className='flex flex-wrap gap-3 w-full mt-3 items-center '>
                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">First Name </label>
                                
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full"  
                                    type="text"
                                    value={admin.fname}
                                    name='fname'
                                    required
                                    onBlur={(e) => setFocused(true) }
                                    focused={focused.toString()}
                                    pattern='^[A-Za-z/]+$'
                                    onChange={e => handleChange(e)} />
                                <span className="span">First name only contain Aiphabet, no special charaters needed</span>
                            </div>
                            
                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Middle Name </label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full"  
                                    type="text"
                                    value={admin.midname}
                                    name='midname'
                                    required
                                    onBlur={(e) => setFocused(true) }
                                    focused={focused.toString()}
                                    pattern='^[A-Za-z/]+$'
                                    onChange={e => handleChange(e)} />
                                <span className="span">Middle name only contain Aiphabet, no special charaters needed</span>
                            </div>
                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Last Name </label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full"  
                                    type="text"
                                    value={admin.lname}
                                    name='lname'
                                    required
                                    onBlur={(e) => setFocused(true) }
                                    focused={focused.toString()}
                                    pattern='^[A-Za-z/]+$'
                                    onChange={e => handleChange(e)} />
                                <span className="span">Last name only contain Aiphabet, no special charaters needed</span>
                            </div>

                            <div className='flex flex-col gap-2 w-2/5 '>
                                <label htmlFor="">Phone Number </label>
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
                        </div>
                        <div>
                            <div className='flex flex-row text-center gap-1 sm:gap-3  text-black py-12 pl-3'>
                                <button 
                                    onClick={e => handleSubmit(e)}
                                    type="submit"
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        Update
                                </button>
                               
                                <button 
                                    className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'>
                                    <Link to={'/superAdmin'}>
                                        CANCEL
                                    </Link>
                                </button>

                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}