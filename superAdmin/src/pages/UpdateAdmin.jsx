// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from 'axios'

// export default function UpdateAdmin(){

//     const [ admin, setAdmin ] = useState([])
//     const [ error, setError ] = useState(false)
//     const [ success, setSuccess ] = useState(false)
//     const { id } = useParams()

//     const [ focused, setFocused ] = useState(false)

//     const handleChange = (e) => {
//         setAdmin({...admin, [e.target.name] : e.target.value})
//     }


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(admin, "Updated")
//         try{
//             // Update Admin Info
//             await axios.put("http://localhost:8800/admin/" + id, admin)
//                 .then((res) => console.log(res, "response"))

//             setSuccess("Update Success")
//         } catch(err){
//             console.log(err)
//             setError(err.message)
//         } 
//         setTimeout(() => {
//             setSuccess(false)
//             setError(false)
//         }, 4000)   
//     }

//     useEffect(() => {
//         // Get A single Admin
//         axios.get("http://localhost:8800/admin/"+id)
//             .then(response => {
//                 setAdmin(response.data[0])
//             })
//             .catch(error => {
//                 setError(error.message)
//                 console.log(error.message)
//             })
//     }, [id])

// return(
//     <>
//     <div className="flex flex-row h-screen">
//         <div className="w-1/6">
//             <Menu />
//         </div>
//         <div className="pl-2 flex-1">
//             <div className="flex flex-col h-screen">
//                 <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
//                     <h1 className='font-semibold text-base sm:text-2xl'>Update Admin</h1>
//                     <p className=''>National Election Board of Ethiopia</p>
//                 </div>
//                 <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >

//                     <div className="text-center mb-8 text-2xl">
//                         <span className="p-3">Username: </span>  {admin.username}
//                     </div>

//                     {error && 
//                     <div className="bg-red-300 text-red-900 text-base p-3 m-5 w-full">
//                         {error}
//                     </div>

//                     }
//                     {success && 
//                     <div className="bg-emerald-200 text-emerald-900 text-base p-3 m-5 w-full">
//                         {success}
//                     </div>

//                     }

//                     <hr />
//                         <div className='flex flex-wrap gap-3 w-full mt-3 items-center '>
//                             <div className='flex flex-col gap-2 w-2/5'>
//                                 <label htmlFor="">First Name </label>

//                                 <input 
//                                     className="border-2 border-gray-300 rounded-md p-1 w-full"  
//                                     type="text"
//                                     name='fname'
//                                     value={admin.fname}
//                                     required
//                                     onBlur={(e) => setFocused(true) }
//                                     focused={focused.toString()}
//                                     pattern='^[A-Za-z/]+$'
//                                     onChange={e => handleChange(e)} />
//                                 <span className="span">First name only contain Aiphabet, no special charaters needed</span>
//                             </div>

//                             <div className='flex flex-col gap-2 w-2/5'>
//                                 <label htmlFor="">Middle Name </label>
//                                 <input 
//                                     className="border-2 border-gray-300 rounded-md p-1 w-full"  
//                                     type="text"
//                                     name='midname'
//                                     value={admin.midname}
//                                     required
//                                     onBlur={(e) => setFocused(true) }
//                                     focused={focused.toString()}
//                                     pattern='^[A-Za-z/]+$'
//                                     onChange={e => handleChange(e)} />
//                                 <span className="span">Middle name only contain Aiphabet, no special charaters needed</span>
//                             </div>
//                             <div className='flex flex-col gap-2 w-2/5'>
//                                 <label htmlFor="">Last Name </label>
//                                 <input 
//                                     className="border-2 border-gray-300 rounded-md p-1 w-full"  
//                                     type="text"
//                                     name='lname'
//                                     value={admin.lname}
//                                     required
//                                     onBlur={(e) => setFocused(true) }
//                                     focused={focused.toString()}
//                                     pattern='^[A-Za-z/]+$'
//                                     onChange={e => handleChange(e)} />
//                                 <span className="span">Last name only contain Aiphabet, no special charaters needed</span>
//                             </div>

//                             <div className='flex flex-col gap-2 w-2/5 '>
//                                 <label htmlFor="">Phone Number </label>
//                                 <div className="flex">
//                                     <b className="text-center flex p-2 bg-gray-300 rounded-l-md">+251 </b>
//                                     <input 
//                                         className="border-2 border-gray-300 rounded-r-md p-1 w-full" 
//                                         type="text" 
//                                         maxLength={9}
//                                         minLength={9}
//                                         name='phone'
//                                         value={admin.phone}
//                                         onBlur={(e) => setFocused(true)}
//                                         focused={focused.toString()}
//                                         pattern="^[7,9][0-9]+$"
//                                         required
//                                         onChange={e => handleChange(e)} />
//                                 </div>
//                                 <span className="span">Phone Number should start with +251 and Valid</span>
//                             </div>
//                             <div className='flex flex-col gap-2 w-2/5'>
//                                 <label htmlFor="">Email ( <span className="text-emerald-500 "> Optionl </span> ) <i className="text-3xl"></i></label>
//                                 <input 
//                                     className="border-2 border-gray-300 rounded-md p-1 w-full" 
//                                     type="email" 
//                                     placeholder='example@gmail.com'
//                                     name='email'
//                                     value={admin.email}
//                                     onBlur={(e) => setFocused(true)}
//                                     focused={focused.toString()}
//                                     pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
//                                     onChange={e => handleChange(e)} />
//                                 <span className="span">Email is not Valid</span>
//                             </div>
//                         </div>
//                         <div>
//                             <div className='flex flex-row text-center gap-1 sm:gap-3  text-black py-12 pl-3'>
//                                 <button 
//                                     onClick={e => handleSubmit(e)}
//                                     type="submit"
//                                     className='px-5 py-1 rounded-l-3xl rounded-r hover:bg-emerald-700 bg-white hover:text-white border border-emerald-600 hover'>
//                                         Update
//                                 </button>

//                                 <button 
//                                     className='px-5 py-1 rounded-l rounded-r-3xl hover:bg-stone-700 bg-white hover:text-white border border-stone-600 hover'>
//                                     <Link to={'/superAdmin'}>
//                                         CANCEL
//                                     </Link>
//                                 </button>

//                             </div>
//                         </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </>
// )}

import React, {  useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
// import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Menu from "../components/Menu";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const UpdateAdmin = () => {
    
    const { id } = useParams()
    // const { user } = useContext(AuthContext)
    const [admin, setAdmin] = useState([])
    const [focused, setFocused] = useState(false)

    const [file, setFile] = useState("")
    const [picture, setPicture] = useState("")

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFile = (e) => {
        setFile(e.target.files[0])
        setPicture(e.target.files[0])
    }

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = [
            admin.fname,
            admin.midname,
            admin.lname,
            admin.phone,
            admin.email,
            file
        ]

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        console.log(file, "File")
        try {
            // Change Profile image for admin
            await axios.put(`http://localhost:8800/admin/${id}`, data, config)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Updated")
                }).catch(err => console.log(err, "Error"))
        } catch (error) {

            setError(error.message)

        }

        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)
    }

    useEffect(() => {
        // Get A single Admin
        axios.get("http://localhost:8800/admin/" + id)
            .then(response => {
                setAdmin(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    }, [id])

    return (
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

                            {/* <div className="text-center mb-8 text-2xl">
                                <span className="p-3">Username: </span>  {admin.username}
                            </div> */}

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
                                <div className='flex flex-col gap-2 w-full'>

                                    <img

                                        className="w-32 h-32 rounded-full object-cover"
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : `http://localhost:8800/uploads/${admin.image}`
                                        }
                                        alt=""
                                    />
                                    <label htmlFor="logo" className='w-5'> <span className=' text-3xl'><DriveFolderUploadIcon /></span></label>
                                    <input
                                        className="p-1"
                                        id="logo"
                                        type="file"
                                        name='image'
                                        style={{ display: "none" }}
                                        value={picture.image}
                                        onChange={(e) => {
                                            handleFile(e)
                                        }} />
                                </div>
                                Username:
                                <span className='text-2xl font-bold text-gray-800 w-3/4'>
                                 {admin.username}
                                </span>

                                <div className='flex flex-col gap-2 w-2/5'>

                                    <label htmlFor="">First Name </label>

                                    <input
                                        className="border-2 border-gray-300 rounded-md p-1 w-full"
                                        type="text"
                                        name='fname'
                                        value={admin.fname}
                                        required
                                        onBlur={(e) => setFocused(true)}
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
                                        name='midname'
                                        value={admin.midname}
                                        required
                                        onBlur={(e) => setFocused(true)}
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
                                        name='lname'
                                        value={admin.lname}
                                        required
                                        onBlur={(e) => setFocused(true)}
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
                                            name='phone'
                                            value={admin.phone}
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
                                        name='email'
                                        value={admin.email}
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
                                        className='px-5 py-1 rounded-l-3xl rounded-r hover:bg-emerald-700 bg-white hover:text-white border border-emerald-600 hover'>
                                        Update
                                    </button>

                                    <button
                                        className='px-5 py-1 rounded-l rounded-r-3xl hover:bg-stone-700 bg-white hover:text-white border border-stone-600 hover'>
                                        <Link to={'/admin'}>
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
    )
}

export default UpdateAdmin
