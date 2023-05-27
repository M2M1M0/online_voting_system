import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/authContext'
import evoting from '../images/e-voting.png'


export default function CastVote() {

    const { user, dispatch } = useContext(AuthContext)
    const stationid = user?.stationId
    const voterId = user?._id

    const [candidates, setCandidates] = useState([])
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/')
    }

    const giveVote = (partyId) => {
        // console.log("clicked")
        const vote = {
            voterId: voterId,
            stationId: stationid,
            partyId: partyId
        }

        console.log(vote, "data")
        // Submit votes
        if (window.confirm("Confirm your submission")) {
            axios.post("http://localhost:8800/vote/submitVote", vote)
                .then(() => {
                    navigate('/voter/confirmation')
                }).catch(err => {
                    console.log(err.response.data)
                    setError(err.response.data)
                })
            setTimeout(() => {
                setError(false)
                navigate('/')
            }, [3000])
        }



    }

    const [station, setStation] = useState([])

    useEffect(() => {

        //Get Station Name
        axios.get("http://localhost:8800/station/" + stationid)
            .then(response => {
                // console.log(response.data[0].stationname, "res") 
                setStation(response.data[0].stationname)
            })
        // Get This station Candidates
        axios.get("http://localhost:8800/vote/candidates/" + station)
            .then(response => {
                // console.log(response.data) 
                setCandidates(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })

    })


    return (
        <>
            <div className="h-screen w-screen overflow-y-auto px-12">
                <div className="w-full flex flex-row justify-between">
                    <img src={evoting} alt="Oops" className="w-48 h-full pt-5" />
                    <h1 className="text-center text-sky-300 text-5xl font-sans m-5">Cast Your vote</h1>

                    <button onClick={(e) => logout()}>
                        logout
                    </button>
                </div>

                <hr />
                <br />
                <div className="flex flex-wrap gap-8 w-auto justify-center">
                    {candidates.length ? candidates.map((candidates, index) => (
                        <div key={index} className='flex flex-col justify-between w-56 h-64 p-5 shadow-2xl bg-gray-200'>
                            <div className="items-center w-full">
                                <img className=" h-20 w-full px-3 shadow rounded" src={`http://localhost:8800/uploads/${candidates.logo}`} alt="" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-extrabold text-2xl'>{(candidates.partyname)}</h1>
                                <h1>{candidates.repname}</h1>
                            </div>
                            <div
                                onClick={() => {
                                    giveVote(candidates._id)
                                }}
                            >
                                <button className=' text-white font-bold cursor-pointer rounded px-5 py-1 bg-purple-800 hover:bg-purple-600'>Vote</button>
                            </div>
                        </div>
                    )) : null}
                </div>
                <br />
                <div className="w-full pt-8 grid place-items-center">
                    <table className="table w-2/3 mx-2 p-1 border-collapse border border-slate-900 text-left">
                        <thead>
                            <tr className="border text-white bg-slate-900">
                                <th scope="col" className="p-3">#</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Party</th>
                                <th scope="col">Candidate Name</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {candidates.length ? candidates.map((candidates, index) => (
                                <tr className="border" key={index}>
                                    <td className="p-3 ">{index + 1}</td>
                                    <td className="font-mono py-1 ">
                                        <img
                                            className='w-12 h-12 rounded-full'
                                            src={`http://localhost:8800/uploads/${candidates.logo}`} alt="" />
                                    </td>
                                    <td className="font-extrabold">{candidates.partyname}</td>
                                    <td>{candidates.repname}</td>
                                    <td className="flex text-base space-x-6 mt-2">
                                        <div
                                            onClick={() => {
                                                giveVote(candidates._id)
                                            }}
                                            className="rounded-3xl px-5 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                            Vote
                                        </div>
                                        {/* </Link> */}
                                    </td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>

                    {error &&
                        <div className="bg-red-300 text-red-900 text-1xl p-3 m-2 w-2/3">
                            {error}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}