// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import axios from 'axios'
// ICONS
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import RoomIcon from '@mui/icons-material/Room';


export default function Dashboard(){

    const [ admins, setAdmins] = useState(0)
    const [ parties, setParties] = useState(0)
    const [ stations, setStations] = useState(0)
    const [ voters, setVoters] = useState(0)

    useEffect(() => {
        // COUNT All ADMINS
        axios.get("http://localhost:8800/admin/all/count")
            .then(data => {
                setAdmins(data.request.response.split(":")[1].split("}")[0])
            }).catch(err => console.log(err))

        // COUNT All Parties
        axios.get("http://localhost:8800/party/all/count")
            .then(data => {
                setParties(data.request.response.split(":")[1].split("}")[0])
            }).catch(err => console.log(err))

        // COUNT All Stations
        axios.get("http://localhost:8800/station/all/count")
            .then(data => {
                setStations(data.request.response.split(":")[1].split("}")[0])
            }).catch(err => console.log(err))

        // COUNT All Voters
        axios.get("http://localhost:8800/voter/all/count")
            .then(data => {
                setVoters(data.request.response.split(":")[1].split("}")[0])
            }).catch(err => console.log(err))

    })

return(
    <>
    <div className="flex flex-row">
            <div className="w-1/5">
                <Menu />
            </div>
            <div className="pl-2 pt-3 w-4/5">
                <div className="flex flex-col space-y-4">
                    <div className="font-semibold text-5xl text-sky-700">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="flex flex-col bg-slate-900">
                        <div className="p-4 grid grid-cols-4 space-x-3 ">                                   
                            <div className="pl-2 pt-3 flex flex-col bg-sky-500  hover:bg-sky-400  h-28 relative cursor-pointer">
                                <span className="text-gray">ADMINS</span>
                                <h1 className="py-2 text-3xl font-semibold">{admins ? admins : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute top-0 right-0 p-2"> <SupervisorAccountIcon /> </span>
                            </div>

                            <div className="pl-2 pt-3 flex flex-col bg-emerald-500 hover:bg-emerald-400 relative cursor-pointer">
                                <span className="text-gray">Parties</span>
                                <h1 className="py-2 text-3xl font-semibold">{parties ? parties : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute top-0 right-0 p-2"> <GroupsIcon /> </span>
                            </div>
                            <div className="pl-2 pt-3 flex flex-col bg-stone-500 hover:bg-stone-400 relative cursor-pointer">
                                <span className="text-gray">Stations</span>
                                <h1 className="py-2 text-3xl font-semibold">{stations ? stations : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute top-0 right-0 p-2"> <RoomIcon /> </span>
                            
                            </div>
                            <div className="pl-2 pt-3 flex flex-col bg-yellow-500 hover:bg-yellow-400 relative cursor-pointer">
                                <span className="text-gray">Voters</span>
                                <h1 className="py-2 text-3xl font-semibold">{voters ? voters : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute top-0 right-0 p-2"> <PersonPinIcon /> </span>
                            
                            </div> 
                        </div>
                        <div className="text-right">
                            <h1 className="text-white px-3 pb-2">#</h1>
                        </div>
                    </div>
                    <div className="text-center ">
                        <div className="space-y-16 space-x-24">
                            <button className="px-3 py-2 rounded border-2 border-gray-400 hover:bg-gray-500 hover:text-white">
                                <Link to={'/superAdmin/signupAdmin'}>
                                    ADD ADMINS
                                </Link>        
                            </button>
                            <button className="px-3 py-2 rounded border-2 border-sky-400 hover:bg-sky-500 hover:text-white">
                                <Link to={'/superAdmin/signupParty'}>
                                    ADD PARTIES
                                </Link>
                            </button>
                            <button className="px-3 py-2 rounded border-2 border-emerald-400 hover:bg-emerald-500 hover:text-white">
                                <Link to={'/superAdmin/regStation'}>
                                    ADD STATIONS
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        {/* <FOOTER /> */}
                    </div>
                </div>
            </div>
        </div>
    </>
)}