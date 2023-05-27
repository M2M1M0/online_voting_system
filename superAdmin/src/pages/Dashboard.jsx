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


export default function Dashboard() {

    const [admins, setAdmins] = useState(0)
    const [parties, setParties] = useState(0)
    const [stations, setStations] = useState(0)
    const [voters, setVoters] = useState(0)

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

    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/6">
                    <Menu />
                </div>
                <div className="sm:pl-2 pl-12 pt-3 w-5/6">
                    <div className="flex flex-col space-y-4">
                        <div className="font-semibold text-5xl text-sky-700 mt-3">
                            <h1>SuperAdmin Dashboard</h1>
                        </div>

                        <div className="flex flex-col flex-wrap w-auto  sm:mt-16 ">
                            <div className="grid grid-cols-1  gap-8 mx-3 sm:grid-cols-4 mt-8">
                                <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                    <span className="font-extralight ">ADMINS</span>
                                    <span className="text-3xl">{admins ? admins : <div className="text-red-700">-</div>}</span>
                                    <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-purple-700"><SupervisorAccountIcon /></span>
                                </div>
                                <div className="flex flex-col p-3 px-3 gap-3 border shadow-md relative">
                                    <span className="font-extralight">Parties</span>
                                    <span className="text-3xl">{parties ? parties : <div className="text-red-700">-</div>}</span>
                                    <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-emerald-700"><GroupsIcon /></span>
                                </div>
                                <div className="flex flex-col p-3 px-3 gap-3 border shadow-md relative">
                                    <span className="font-extralight">Stations</span>
                                    <span className="text-3xl">{stations ? stations : <div className="text-red-700">-</div>}</span>
                                    <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-sky-700"><RoomIcon /></span>
                                </div>
                                <div className="flex flex-col p-3 px-3 gap-3 border shadow-md relative">
                                    <span className="font-extralight">Voters</span>
                                    <span className="text-3xl">{voters ? voters : <div className="text-red-700">-</div>}</span>
                                    <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-stone-700"><PersonPinIcon /></span>
                                </div>

                            </div>

                        </div>

                        <div className="text-center ">
                            <div className="flex sm:flex-row flex-col pl-5 gap-12 mt-24">
                                <Link to={'/superAdmin/signupParty'}>
                                    <button className="px-3 py-2 rounded border-2 bg-sky-700 text-white hover:bg-white hover:text-sky-700 hover:border-sky-700">
                                        ADD PARTY
                                    </button>
                                </Link>
                                <Link to={'/superAdmin/regStation'}>
                                    <button className="px-3 py-2 rounded border-2 bg-emerald-700 text-white hover:bg-white hover:text-emerald-700 hover:border-emerald-700">
                                        ADD STATION
                                    </button>
                                </Link>
                                <Link to={'/superAdmin/signupAdmin'}>
                                    <button className="px-3 py-2 rounded border-2 bg-purple-950 text-white hover:bg-white hover:text-purple-950 hover:border-purple-700">
                                        ADD ADMIN
                                    </button>
                                </Link>

                            </div>
                        </div>

                        <div className="footer"></div>
                    </div>
                </div>
            </div>
        </>
    )
}