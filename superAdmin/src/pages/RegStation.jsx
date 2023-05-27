import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Menu from "../components/Menu"
import './style.css'


const initialState = {
    stationname : "",
    admin : "",
    contact : "",
    location: ""
}

export default function RegStation(){

    const [ station, setStation ] = useState(initialState)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const [ focused, setFocused ] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setStation({...station, [name] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Register Station
        axios.post("http://localhost:8800/station/signup", station)
            .then(() => {
                setSuccess("Successfully Added")
                setStation(initialState)
                setFocused(false)

            })
            .catch(err => {
                if(err.response.status === 403){
                    setError(err.response.data)
                } else {
                    setError(err.message)
                    console.log(err)
                }
            })
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000)
        

    }

   

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 flex-1">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Station Registeration</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="px-3 pb-4 pt-2 sm:px-16 sm:py-8 overflow-scroll" >
                    <form onSubmit={e => handleSubmit(e)}>
                        {
                            error &&
                            <div className="bg-red-300 text-red-700 text-base p-2">{error}</div>
                        }
                        {
                            success &&
                            <div className="bg-emerald-300 text-emerald-700 text-base p-2">{success}</div>
                        }

                           
                        <div className="flex flex-wrap gap-3 w-full mt-3 ">

                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Station Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    type="text"
                                    name='stationname'
                                    required
                                    onBlur={(e) => setFocused(true)}
                                    focused={focused.toString()}
                                    pattern="^[A-Za-z]+$"
                                    value={station.stationname}
                                    onChange={(e) => handleChange(e)} />
                                <span className="span">Station name must Alphabet </span>

                            </div>
                           
                            <div className='flex flex-col gap-2 w-2/5 '>
                                <label htmlFor="">Phone Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <div className="flex">
                                        <b className="text-center flex p-2 bg-gray-300 rounded-l-md">+251 </b>
                                        <input 
                                            className="border-2 border-gray-300 rounded-r-md p-1 w-full" 
                                            type="text" 
                                            maxLength={9}
                                            minLength={9}
                                            value={station.contact}
                                            name='contact'
                                            onBlur={(e) => setFocused(true)}
                                            focused={focused.toString()}
                                            pattern="^[7,9][0-9]+$"
                                            required
                                            onChange={e => handleChange(e)} />
                                    </div>
                                <span className="span">Phone Number should start with +251 and Valid</span>
                            </div>
                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Station Location (Address) <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    type="text"
                                    name='location'
                                    required
                                    value={station.location}
                                    onChange={(e) => handleChange(e)} />

                            </div>
                            <div className='flex flex-col gap-2 w-2/5 '>
                                {/* <label htmlFor="">Administrator <span className='text-3xl'></span></label> */}
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    type="hidden"
                                    name='admin'
                                    maxLength={18}
                                    minLength={18}
                                    placeholder="Admin Username"
                                    value={station.admin}
                                    onBlur={(e) => setFocused(true)}
                                    focused={focused.toString()}
                                    pattern="^[I][D][/][A-Z]{2}[/][W]{1}[0-9]{2}[/][0-9]+$"
                                    onChange={(e) => handleChange(e)} />
                                <span className="span">Username must be Valid. The Format is ID/**/W**/********</span>

                            </div>
                            
                        </div>
                        <div className='flex flex-row text-center gap-1 sm:gap-3 my-4  text-black  py-5'>
                            <button 
                                className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                    SUBMIT
                            </button>
 
                            <Link to={"/superAdmin/regStation"}>
                            <button 
                                onClick={e => {
                                    setFocused(false)
                                    setStation(initialState)
                                }}
                                className='px-5 py-1 rounded-l rounded-r  bg-slate-200 hover:bg-slate-300'>
                                    RESET
                            </button>
                            </Link>
                            <Link 
                                className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'
                                to={'/superAdmin'}>
                                <button >
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