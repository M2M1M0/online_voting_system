import React, { useContext, useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Menu from "./Menu";
import { useEffect } from 'react';


const UpdateAdminProfile = () => {

    const { user } = useContext(AuthContext)
    const [admin, setAdmin] = useState([])

    const [file, setFile] = useState("")
    const [picture, setPicture] = useState("")

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFile = (e) => {
        setFile(e.target.files[0])
        setPicture(e.target.files[0])
    }

    const changeProfile = async (e) => {
        e.preventDefault()

        // changeProfile/:id
        const data = [file]

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        try {
            // Change Profile info for admin
            await axios.put(`http://localhost:8800/admin/changeProfile/${user._id}`, data, config)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Updated")
                }).catch(err => console.log(err, "Error"))
        } catch (error) { setError(error.message) }

        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)
    }

    
    useEffect(() => {
        // Get A single Admin
        axios.get("http://localhost:8800/admin/" + user._id)
            .then(response => {
                setAdmin(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })


    }, [user._id])


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
                            <br /><br />
                            <form onSubmit={(e) => changeProfile(e)}>
                                <div className='flex flex-col gap-10 w-full'>
    
                                    <div className='flex flex-col'>
                                        <img

                                            className="w-32 h-32 rounded-full object-cover"
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : `http://localhost:8800/uploads/${user.image}`
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

                                    <div>
                                        <input
                                            type="submit"
                                            className='text-lg text-white ml-3 px-3 p-2 bg-teal-500 hover:bg-teal-700 cursor-pointer  rounded-2xl w-36'
                                            value="Update Profile" />
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateAdminProfile
