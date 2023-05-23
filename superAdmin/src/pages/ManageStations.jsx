import Menu from "../components/Menu";
import  { MdPersonSearch } from 'react-icons/md'
import  { RxUpdate } from 'react-icons/rx'
import  { TiUserDelete } from 'react-icons/ti'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function ManageStations(){

    const [ station, setStation ] = useState([])
    const [ searchkey, setSearch ] = useState([])
    const [ find, setFind ] = useState([])

    const [ error, setError ] = useState(false)

    const search = (key) => {
        // Search 
        axios.get("http://localhost:8800/station/search/"+key)
            .then(response => {
                // console.log(response.data, "result") 
                setFind(response.data)
                if(response.data.length === 0){
                    setError("Search not Found")
                }
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })

        setTimeout(() => {
            setError(false)
        }, 3000)
    }
    
    const reload = () => {
        setFind([])
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure! you want to delete this Admin?")){
            // Remove station
            try{
                await axios.delete(`http://localhost:8800/station/${id}`)
                .then(() => console.log("Delete success"))
                // .then((response) => console.log(response, "res"))
                // .then((response) => setStation(response))
            } catch(err){
                console.log(err.message)
                setError(err.message)
            }
            
        }
        
    }

    useEffect(() => {
        // Get all Stations
        axios.get("http://localhost:8800/station")
            .then(response => {
                // console.log(response.data) 
                setStation(response.data)
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    })


return(
    <>
    <div className="flex flex-row">
        <div className="w-1/7">
            <Menu />
        </div>
        <div className="pl-2 pt-3 flex-1">
            <div className="flex flex-col space-y-5">
                <div className="font-semibold text-5xl text-sky-700">
                    <h1>Manage Stations</h1>
                </div>
                <div className="flex flex-row space space-x-96">
                    <div className="flex flex-row space-x-5">
                        <div className="text-center flex">
                            <input
                                className="pl-5 border-sky-700 bg-white w-72 hover:bg-slate-300" 
                                type="text" 
                                name="key"
                                onChange={e => setSearch(e.target.value)}
                                placeholder=" Search station/ by contact"/>  

                            <button     
                                onClick={() => search(searchkey)}
                                className=" px-2 rounded-r-2xl bg-slate-950 text-white ">
                                    
                                <MdPersonSearch 
                                    className="text-4xl"/>
                            </button> 
                        </div>
                         
                        <button 
                            onClick={(e) => reload()} 
                            className="p-1 px-3 border-neutral-600 bg-sky-300 text-lg font-mono rounded-2xl hover:bg-sky-400 hover:text-white">
                            Reload
                        </button>  
                    </div>  
                    <div>
                        <Link to={'/superAdmin/regStation'}>
                            <button 
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-400 text-white"> 
                                Add Station
                            </button> 
                        </Link>
                                     
                    </div>
                </div>
                <div className="flex flex-col bg-slate-900">
                    <div className="mx-0 bg-white w-auto h-80 overflow-scroll ">
                        <table className="table w-full mx-2 p-1 border-collapse border border-slate-900 text-left">
                            <thead>
                                <tr className="border text-white bg-slate-900">
                                    <th scope="col" className="p-3">#</th>
                                    <th scope="col">Station Name</th>
                                    <th scope="col">Admin</th>
                                    <th scope="col">Contact</th>
                                    <th className="pl-8" scope="col">Actions</th>
                                </tr>
                            </thead>
                                
                            <tbody>
                                {find.length ? find.map((found, index) => (
                                <tr className="border" key={found._id}>
                                    <td className="p-3 ">{index + 1}</td>
                                    <td className="font-bold">{found.stationname}</td>
                                    <td>{found.admin}</td>
                                    <td>{found.contact}</td>
                                    <td className="flex text-base space-x-6 mt-2">
                                        <Link to={`/superAdmin/updateStation/${found._id}`}>
                                            <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                                <RxUpdate className="text-2xl"/>
                                            </div>
                                        </Link>

                                        <div onClick={() => handleDelete(found._id)}
                                            className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                            <TiUserDelete className="text-2xl" />
                                        </div>
                                    </td>
                                </tr>
                                )) : station.length ? station.map((station, index) => (
                                <tr className="border" key={station._id}>
                                    <td className="p-3 ">{index + 1}</td>
                                    <td className="font-bold">{station.stationname}</td>
                                    <td>{station.admin}</td>
                                    <td>{station.contact}</td>
                                    <td className="flex text-base space-x-6 mt-2">
                                        <Link to={`/superAdmin/updateStation/${station._id}`}>
                                            <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                                <RxUpdate className="text-2xl"/>
                                            </div>
                                        </Link>

                                        <div onClick={() => handleDelete(station._id)}
                                            className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                            <TiUserDelete className="text-2xl" />
                                        </div>
                                    </td>
                                </tr>
                                )) : null }
                            </tbody>
                        </table>
                        {error && 
                        <div className="bg-red-300 text-red-900 text-1xl p-3 m-2 w-full">
                            {error}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}