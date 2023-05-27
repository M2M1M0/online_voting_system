import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Menu from "../components/Menu";

export default function UpdateParty(){

    const [ party, setParty ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const { id } = useParams()

    // console.log(party,"before")
    const handleChange = (e) => {
        setParty({...party, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            // Update Party Info
            await axios.put("http://localhost:8800/party/" + id, party)
                .then( () =>  setSuccess("Update Success"))
        } catch(err){
            console.log(err)
            setError(err.message)
        }    
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 3000)
    // console.log(party,"after")

    }
    useEffect(() => {
        // Get a Single Party
        axios.get("http://localhost:8800/party/"+id)
            .then(response => {
                setParty(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    }, [id])

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 flex-1">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Update Party</h1>
                    <p className=''>National Election Board of Ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    <div className="text-center mb-8 text-2xl">
                    </div>
                    {error && 
                        <div className="bg-red-300 text-red-900 text-1xl p-3 mx-16 w-full">
                            {error}
                        </div>

                        }
                        {success && 
                        <div className="bg-emerald-200 text-emerald-900 text-2xl p-3 mx-16 w-full">
                            {success}
                        </div>

                        }
                    <hr />
                    <div className='space-y-4'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Party Name </label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='partyname'
                                    required
                                    defaultValue={party.partyname}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Representative Name </label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='repname'
                                    required
                                    defaultValue={party.repname}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Logo </label>
                                <input 
                                    className="p-1" 
                                    type="file" 
                                    name='logo'
                                    required
                                    defaultValue={party.logo}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            
                        </div>
                        <div className='space-y-4'>
                            <div className='flex flex-col gap-2 text-black pr-24'>
                                <label htmlFor="">Description/ Slogan </label>
                                <textarea 
                                    className="p-1 bg-slate-200"
                                    name='slogan'
                                    defaultValue={party.slogan}
                                    onChange={(e) => handleChange(e)}  > 
                                </textarea> 
                            </div>
                            
                            

                            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-center gap-1 sm:gap-3  text-black  py-5'>
                                <button 
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'
                                    onClick={e => handleSubmit(e)}>
                                    <Link >
                                        Update
                                    </Link>
                                </button>
                                <Link
                                    className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500' 
                                    to={'/superAdmin'}>
                                    <button >
                                            CANCEL
                                    </button>
                                </Link>

                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}