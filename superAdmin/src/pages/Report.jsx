import Menu from "../components/Menu";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print'

export default function Report(){

    

    const [voters, setVoters] = useState(null)
    const [votesCaste, setVotesCaste] = useState(null)
    const [castedParty, setCastedParty] = useState([])



    useEffect(() => {
        // Count Number of Registered Voter
        axios.get(`http://localhost:8800/voter/all/count`)
            .then(res => {
                setVoters(res.request.response.split(":")[1].split("}")[0])
            })
            .catch(err => console.log(err))

        // Count Number of Voter who gave thier vote
        axios.get(`http://localhost:8800/voter/who/gavevote`)
        .then(res => {
            const votes = res.request.response.split(":")[1].split("}")[0]
            setVotesCaste(((votes/voters) * 100).toFixed(0))
        })
        .catch(err => console.log(err))

        // Casted Parties
        axios.get(`http://localhost:8800/vote/castedCandidates`)
        .then(res => {
            setCastedParty(res.data)
        })
        .catch(err => console.log(err))
        

    })

    const percentage = 67
  

return(
    <>
     <div className="flex flex-row">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 pt-3 w-5/6">
            <h1 className="text-2xl text-center">Report</h1>
            <div className="flex gap-4 p-8 flex-col">
                <div className="flex gap-5">
                    <h1 className="text-lg">Total Registered Voter</h1>
                    <span className="text-bold">{voters}</span>
                </div>
                {/*  */}
                <div className="flex gap-12 ">
                    <div className="flex flex-col font-sans text-base bg-white text-emerald-500 gap-3 w-64 max-h-max p-5 shadow-2xl">
                        <h1>People who caste thier Votes</h1>
                        
                        {/* <span className="text-bold">{votesCaste}</span> */}
                        <div className="text-center w-28 h-28">

                            <CircularProgressbar
                                value={votesCaste}
                                text={`${votesCaste}%`}
                                styles={buildStyles({
                                    // Text size
                                    textSize: '16px',
                                    // Colors
                                    pathColor: `rgba(14, 160, 253, ${votesCaste / 100})`,
                                    textColor: '#888',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#ff98c7',
                                })}
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-col font-sans text-base bg-white text-sky-500 gap-3 w-64 max-h-max p-5 shadow-2xl">
                        <h1>People who didn't caste thier Votes</h1>
                        {/* <span className="text-bold">{voters - votesCaste}</span> */}
                        <div style={{ width: 100, height: 100 }}>
                            <CircularProgressbar
                                value={100 - votesCaste}
                                text={`${100 - votesCaste}%`}
                                styles={buildStyles({
                                    // Text size
                                    textSize: '16px',
                                    // Colors
                                    pathColor: `rgba(250, 35, 20, ${votesCaste / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#ff98c7',
                                })}
                                
                            />
                        </div>
                    </div>
                </div>
                {/*  */}
                <div >
                    <h1 >Votes</h1>
                </div>
                <table className="table w-1/3 border-collapse border border-slate-900 text-left">
                    <thead>
                        <tr className="bg-sky-500 border">
                            <th>#</th>
                            <th>Party Name</th>
                            <th>Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {castedParty.map((party, index) => (
                        <tr key={index} className="text-2xl border border-emerald-400">
                            <td>{index +1}</td>
                            <td>{party.partyname }</td>
                            <td>{party.votes_count}</td>
                        </tr> 
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Printable Report */}


        </div>
    </div>
    </>
)
}