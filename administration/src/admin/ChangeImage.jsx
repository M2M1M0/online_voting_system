import React, { useContext, useState } from 'react'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { AuthContext } from '../context/authContext';
import userdefault from '../images/userdefault.png'
import axios from 'axios';
import Menu from "./Menu";
import { Link } from 'react-router-dom';


const ChangeImage = () => {

    const { user } = useContext(AuthContext)


    const [file, setFile] = useState("")
    const [picture, setPicture] = useState("")

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFile = (e) => {
        setFile(e.target.files[0])
        setPicture(e.target.files[0])
    }

    const changePicture = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
console.log(file, "File")
        try {
            // Change Profile image for admin
            await axios.put("http://localhost:8800/admin/changeProfile/"+user._id, file, config)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Changed")
                }).catch(err => console.log(err, "Error"))
        } catch (error) {

            setError(error.message)

        }
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)
    }

    return (
        <div className='flex flex-row h-screen'>
            <div className='w-1/6'>
                <Menu />
            </div>
            <div className='pl-2 pt-32 w-5/6'>
                <h1 className='text-3xl text-gray-600 text-center underline'>
                    Change your profile picture
                </h1>
                <br />
                <hr />
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
                <br />
                <div className='flex flex-col gap-2 w-5/12 py-8 justify-center items-center'>
                    <form action="" onSubmit={e => changePicture(e)}>

                        <img

                            className="w-32 h-32 rounded-full object-cover"
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : userdefault
                            }
                            alt=""
                        />
                        <label htmlFor="logo"> <span className=' text-3xl'><DriveFolderUploadIcon /></span></label>
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

                        <div className='flex p-3 gap-2 my-8'>
                            <button
                                type="submit"
                                className='px-5 py-1 rounded-l-3xl rounded-r hover:bg-sky-700 border border-sky-800 hover:text-white'>
                                Change
                            </button>

                            <Link
                                to={'/admin'}
                                className='px-5 py-1 rounded-l rounded-r-3xl border border-gray-800 hover:bg-slate-900  hover:text-white'>
                                <button>
                                    CANCEL
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ChangeImage
