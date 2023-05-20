import axios from 'axios'
import { Link } from 'react-router-dom'
import Menu from './Menu'

// import GroupsIcon from '@mui/icons-material/Groups';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import RoomIcon from '@mui/icons-material/Room';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';


export default function Dashboard(){

    const { user } = useContext(AuthContext)
    

    // const [ parties, setParties ] = useState(0)
    const [ voters, setVoters ] = useState(0)
    const [ station, setStation ] = useState('')


    const stationid = user?.stationId
    useEffect(() => {
        // Get Station
        axios.get(`http://localhost:8800/station/${stationid}`)
            .then((res) => 
            {
                // console.log(res.data[0].stationname, "res")
                setStation(res.data[0].stationname)
            }
            ).catch((err) => console.log(err))



        // // COUNT PARTIES @... Station
        // axios.get(`http://localhost:8800/party/@/${station}`)
        //     .then((res) => 
        //     {
        //         setParties(res.request.response.split(":")[1].split("}")[0])
        //     }
        //     )
        //     .catch((err) => console.log(err))

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
            <div className="pl-2 pt-3 w-5/6">
                <div className="flex flex-col space-y-4">
                    <div className="font-semibold text-5xl text-sky-700">
                        <h1>Registrar Dashboard</h1>
                    </div>
                    <div className="flex flex-col   bg-slate-900">
                        <div className="p-4 grid grid-cols-4 space-x-3 ">                                   
                            <div className="pl-2 pt-3 h-32 flex flex-col bg-stone-500 hover:bg-stone-400 relative cursor-pointer">
                                <span className="text-gray">Station</span>
                                <h1 className="py-2 text-3xl font-semibold">{station ? station : <div className="text-red-700">-</div>}</h1>
                                <span className="absolute top-0 right-0 p-2"> <RoomIcon /> </span>
                            </div>
                            {/* <div className="pl-2 pt-3 flex flex-col bg-emerald-500 hover:bg-emerald-400 relative cursor-pointer">
                                <span className="text-gray">Parties</span>
                                <h1 className="py-2 text-3xl font-semibold">{ parties }</h1>
                                <span className="absolute top-0 right-0 p-2"> <GroupsIcon /> </span>
                            </div> */}

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
                                <Link to={'/registrar/signupVoter'}>
                                    ADD VOTERS
                                </Link>        
                            </button>
                            {/* <button className="px-3 py-2 rounded border-2 border-sky-400 hover:bg-sky-500 hover:text-white">
                                <Link to={'/registrar/report'}>
                                    REPORT
                                </Link>
                            </button> */}
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