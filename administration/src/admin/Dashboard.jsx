import axios from 'axios'
import { Link } from 'react-router-dom'
import Menu from './Menu'

import GroupsIcon from '@mui/icons-material/Groups';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import RoomIcon from '@mui/icons-material/Room';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';


export default function Dashboard(){

    const { user } = useContext(AuthContext)
    

    const [ parties, setParties ] = useState(0)
    const [ voters, setVoters ] = useState(0)
    const [ station, setStation ] = useState('')
    const [ registrar, setRegistrar ] = useState(0)


    const stationid = user?.stationId
    useEffect(() => {
        // Get Station
        axios.get(`http://localhost:8800/station/${stationid}`)
            .then((res) => 
                setStation(res.data[0].stationname)
            ).catch((err) => console.log(err))

        // COUNT Registrar @... Station
        axios.get(`http://localhost:8800/registrar/@/${stationid}`)
            .then((res) => 
                setRegistrar(res.request.response.split(":")[1].split("}")[0])
            )
            .catch((err) => console.log(err))


        // COUNT PARTIES @... Station
        axios.get(`http://localhost:8800/party/@/${station}`)
            .then((res) => 
                setParties(res.request.response.split(":")[1].split("}")[0])
            )
            .catch((err) => console.log(err))

        // COUNT ALL VOTER @... Station
        axios.get(`http://localhost:8800/voter/count/${stationid}`)
            .then((res) => 
                setVoters(res.request.response.split(":")[1].split("}")[0])
            )
            .catch((err) => console.log(err))
    })

return(
    <>
    <div>
        <div className="flex flex-row">
            <div className="w-1/6">
                <Menu />
            </div>
            <div className="sm:pl-2 pl-12 pt-3 w-5/6">
                <div className="flex flex-col space-y-4">
                    <div className="font-semibold text-5xl text-sky-700">
                        <h1>Dashboard</h1>
                    </div>
                    
                    <div className="flex flex-col flex-wrap w-auto sm:mt-5 mt-48">
                        <div className="grid grid-cols-1  gap-8 mx-3 sm:grid-cols-4">                                   
                            <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                <span className="text-gray">Station</span>
                                <h1 className="py-2 text-3xl font-semibold">{station ? station : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-purple-700"><RoomIcon /></span>
                            </div>
                            <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                <span className="text-gray">Registrar</span>
                                <h1 className="py-2 text-3xl font-semibold">{registrar ? registrar : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-sky-700"><PersonPinIcon /></span>
                            </div>
                            <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                <span className="text-gray">Parties</span>
                                <h1 className="py-2 text-3xl font-semibold">{ parties ? parties : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-emerald-700"><GroupsIcon /></span>
                                
                            </div>
                            <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                <span className="text-gray">Voters</span>
                                <h1 className="py-2 text-3xl font-semibold">{voters ? voters : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-purple-700"><PersonPinIcon /></span>
                            </div>

                        </div>
                        
                    </div>
                    <div className="flex flex-wrap">
                        <div className="sm:space-y-24 space-y-5 space-x-24">
                            <button className="px-3 py-2 rounded border-2  bg-purple-950 text-white hover:bg-white hover:text-purple-950 hover:border-purple-700">
                                <Link to={'/admin/signupRegistrar'}>
                                    Add registrar
                                </Link>        
                            </button>
                            <button className="px-3 py-2 rounded border-2  bg-emerald-950 text-white hover:bg-white hover:text-emerald-950 hover:border-emerald-700">
                                <Link to={'/admin/report'}>
                                    report
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

    </div>
    </>
)}