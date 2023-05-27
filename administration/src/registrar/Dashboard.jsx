import axios from 'axios'
import { Link } from 'react-router-dom'
import Menu from './Menu'


import PersonPinIcon from '@mui/icons-material/PersonPin';
import RoomIcon from '@mui/icons-material/Room';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';


export default function Dashboard() {

    const { user } = useContext(AuthContext)

    const [voters, setVoters] = useState(0)
    const [station, setStation] = useState('')


    const stationid = user?.stationId
    useEffect(() => {
        // Get Station
        axios.get(`http://localhost:8800/station/${stationid}`)
            .then((res) => {
                // console.log(res.data[0].stationname, "res")
                setStation(res.data[0].stationname)
            }
            ).catch((err) => console.log(err))


        // COUNT ALL VOTER @... Station
        axios.get(`http://localhost:8800/voter/count/${stationid}`)
            .then((res) =>
                setVoters(res.request.response.split(":")[1].split("}")[0])
            )
            .catch((err) => console.log(err))
    })

    return (
        <>
            <div>
                <div className="flex flex-row">
                    <div className="w-1/6">
                        <Menu />
                    </div>
                    <div className="sm:pl-2 pl-12 pt-3 flex-1">
                        <div className="pl-2 pt-3 flex-1 overflow-y-auto h-screen flex flex-col justify-around relative">
                            <div className="font-semibold text-5xl  top-5 absolute text-sky-700">
                                <h1>Registrar Dashboard</h1>
                            </div>
                            <div className="flex flex-col flex-wrap w-auto sm:mt-5 mt-24">
                                <div className="grid grid-cols-1  gap-8 mx-3 sm:grid-cols-4">
                                    <div className="flex flex-col p-3 px-3 gap-5 h-28 border shadow-md relative">
                                        <span className="font-extralight ">Station</span>
                                        <span className="text-3xl">{station ? station : <div className="text-red-700">-</div>}</span>
                                        <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-purple-700"><RoomIcon /></span>
                                    </div>
                                    <div className="flex flex-col p-3 px-3 gap-3 border shadow-md relative">
                                        <span className="font-extralight">Voters</span>
                                        <span className="text-3xl">{voters ? voters : <div className="text-red-700">-</div>}</span>
                                        <span className="absolute bottom-3 right-5 p-1 bg-purple-300 rounded text-emerald-700"><PersonPinIcon /></span>
                                    </div>


                                </div>

                            </div>

                            <div className="text-center ">
                                <div className="space-y-16 space-x-24">

                                    <Link to={'/registrar/signupVoter'}>
                                        <button className="px-3 py-2 rounded border-2  bg-purple-950 text-white hover:bg-white hover:text-purple-950 hover:border-purple-700">
                                            ADD VOTER
                                        </button>
                                    </Link>
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
    )
}