import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'


export default function Report(){

    const { user } = useContext(AuthContext)
    const stationid = user?.stationId

    const [ station, setStation ] = useState('')
    const [voters, setVoters] = useState(null)
    const [votesCaste, setVotesCaste] = useState(null)
    
    const [castedParty, setCastedParty] = useState([])



    useEffect(() => {
        // Get Station
        axios.get(`http://localhost:8800/station/${stationid}`)
            .then((res) => 
            {
                // console.log(res.data[0].stationname, "res")
                setStation(res.data[0].stationname)
            }
            ).catch((err) => console.log(err))

        // Count Number of Registered user in this Station
        axios.get(`http://localhost:8800/voter/count/${stationid}`)
            .then(res => {
                setVoters(res.request.response.split(":")[1].split("}")[0])
            })
            .catch(err => console.log(err))

        // Count Number of Voter who gave thier vote
        axios.get(`http://localhost:8800/voter/count/votes/${stationid}`)
        .then(res => {
            const votes = res.request.response.split(":")[1].split("}")[0]
            setVotesCaste(((votes/voters) * 100).toFixed(0))
        })
        .catch(err => console.log(err))


        // Casted Parties
        axios.get(`http://localhost:8800/vote/castedCandidates/${stationid}`)
        .then(res => {
            setCastedParty(res.data)
        })
        .catch(err => console.log(err))
        

    })

    return(
        <>
         <div className="flex flex-row">
            <div className="w-1/6">
                <Menu />
            </div>
            <div className="pl-2 pt-3 w-5/6">
                <h1 className="text-2xl text-center">Report</h1>
                <h1 className="text-sky-400 text-2xl">{station ? station : <div className="text-red-700">-</div>} Station</h1>
                <div className="flex gap-4 p-8 flex-col">
                    <div className="flex gap-5">
                        <h1 className="text-lg"> Registered Voter</h1>
                        <span className="text-bold">{voters}</span>
                    </div>
                    {/*  */}
                    <div className="flex gap-12">
                        <div className="flex flex-col font-sans text-base bg-white text-emerald-500 gap-5 w-64 max-h-max p-5 shadow-2xl">
                            <h1>People who caste thier Voter</h1>
                            
                            {/* <span className="text-bold">{votesCaste}</span> */}
                            <div style={{ width: 100, height: 100 }}>
    
                                <CircularProgressbar
                                    value={votesCaste}
                                    text={`${votesCaste}%`}
                                    styles={buildStyles({
                                        textSize: '16px',
                                        // Colors
                                        pathColor: `rgba(90, 100, 200, ${votesCaste / 100})`,
                                        textColor: '#888',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#ff98c7',
                                    })}
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-col font-sans text-base bg-white text-sky-500 gap-5 w-64 max-h-max p-5 shadow-2xl">
                            <h1>People who didn't caste thier Voter</h1>
                            {/* <span className="text-bold">{voters - votesCaste}</span> */}
                            <div style={{ width: 100, height: 100 }}>
                                <CircularProgressbar
                                    value={votesCaste}
                                    text={`${100 - votesCaste}%`}
                                    styles={buildStyles({
                                       // Text size
                                        textSize: '16px',
                                        // Colors
                                        pathColor: `rgba(250, 35, 20, ${votesCaste / 100})`,
                                        textColor: '#f88',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#fff',
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Participated party */}
                    <div >
                        <h1>Parties and thier votes</h1>
                    </div>
                    <div className="flex gap-5">
                        <h2>Name</h2>
                        <div className="flex flex-col">
                            {castedParty.map((party, index) => (
                            <span key={index}
                            className="text-bold"> {party.partyname }</span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Grapgh report */}
               
            </div>
        </div>
        </>
    )
}