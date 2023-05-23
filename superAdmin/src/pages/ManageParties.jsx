import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import  { MdSearch } from 'react-icons/md'
import  { RxUpdate } from 'react-icons/rx'
import  { MdDelete } from 'react-icons/md'
import  { AiOutlineFolderView } from 'react-icons/ai'


export default function ManageParties(){

    const [ party, setParty ] = useState([])
    const [ searchkey, setSearch ] = useState([])
    const [ find , setFind ] = useState([])

    const [ error, setError ] = useState(false)

    // console.log(party)
    const search = (key) => {
        // Search 
        axios.get("http://localhost:8800/party/search/"+key)
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

    const handleDelete = (id) => {
        if(window.confirm("Are you sure! you want to delete this Party?")){
            // Remove party
            axios.delete(`http://localhost:8800/party/${id}`)
            .then(() => console.log("Delete success"))
            // .then(data => setParty(data))
            .catch(err => setError(err.message))
        }
        
    }

    useEffect(() => {
        // Get All Parties
        axios.get("http://localhost:8800/party")
            .then(response => {
                // console.log(response.data) 
                setParty(response.data)
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
                    <h1>Manage Parties</h1>
                </div>
                <div className="flex flex-row space space-x-96">
                    <div className="flex flex-row space-x-5">
                        <div className="text-center flex">
                            <input
                                className="pl-5 border-sky-700 bg-white w-72 hover:bg-slate-300" 
                                type="text" 
                                name="key"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder=" Search Candidate"/>  

                            <button 
                                onClick={() => search(searchkey)}
                                className=" px-2 rounded-r-2xl bg-slate-950 text-white hover:bg-slate-700 ">
                                
                                <MdSearch 
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
                        <Link to={'/superAdmin/signupParty'}>
                            <button 
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-400 text-white"> 
                                Add Party 
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
                                <th scope="col">Party Name</th>
                                <th scope="col">Representative</th>
                                <th scope="col">Logo</th>
                                <th className="pl-8" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {find.length ? find.map((found, index) => (
                            <tr className="border" key={found._id}>
                                <td className="p-3 ">{index + 1}</td>
                                <td className="font-extrabold">{found.partyname} </td>
                                <td className="font-mono ">{found.repname}</td>
                                <td><img 
                                    className="w-16 h-16"
                                    src={found.logo} alt="" />
                                </td>
                                <td className="flex text-base space-x-6 mt-2">
                                    <Link to={'/superAdmin/manageSingleParty/'+ found._id}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-sky-500 hover:bg-sky-300">
                                            <AiOutlineFolderView className="text-2xl" />
                                        </div>
                                    </Link>
                                    <Link to={`/superAdmin/updateParty/${found._id}`}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                            <RxUpdate className="text-2xl"/>
                                        </div>
                                    </Link>

                                    <div onClick={() => handleDelete(found._id)}
                                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                        <MdDelete className="text-2xl" />
                                    </div>
                                </td>
                            </tr>
                            )) : party.length ? party.map((party, index) => (
                            <tr className="border" key={party._id}>
                                <td className="p-3 ">{index + 1}</td>
                                <td className="font-extrabold">{party.partyname} </td>
                                <td className="font-mono ">{party.repname}</td>
                                <td><img 
                                    className="w-16 h-16"
                                    src={party.logo} alt="" />
                                </td>
                                <td className="flex text-base space-x-6 mt-2">
                                    <Link to={'/superAdmin/manageSingleParty/'+ party._id}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-sky-500 hover:bg-sky-300">
                                            <AiOutlineFolderView className="text-2xl" />
                                        </div>
                                    </Link>
                                    <Link to={`/superAdmin/updateParty/${party._id}`}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                            <RxUpdate className="text-2xl"/>
                                        </div>
                                    </Link>

                                    <div onClick={() => handleDelete(party._id)}
                                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                        <MdDelete className="text-2xl" />
                                    </div>
                                </td>
                            </tr>
                            )) : null }
                        </tbody>
                    </table>
                    {error && 
                    <div className="grid grid-cols-2 bg-red-300 text-red-900 text-1xl p-3 m-2 w-full">
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