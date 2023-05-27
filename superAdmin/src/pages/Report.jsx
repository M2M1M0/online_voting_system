import Menu from "../components/Menu";
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useReactToPrint } from 'react-to-print'
import { useRef } from "react";
import { Line } from "rc-progress"

export default function Report() {

    const componentRef = useRef()
    const printReport = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Report"
    })

    const [voters, setVoters] = useState(0)
    const [votes, setVotes] = useState(0)
    const [votesCaste, setVotesCastePercentile] = useState(0)
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
                setVotes(votes)
                setVotesCastePercentile(((votes / voters) * 100).toFixed(0))
            })
            .catch(err => console.log(err))

        // Casted Parties
        axios.get(`http://localhost:8800/vote/castedCandidates`)
            .then(res => {
                setCastedParty(res.data)
            })
            .catch(err => console.log(err))


    })

    // const percentage = 67


    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/6">
                    <Menu />
                </div>
                <div className="sm:pl-4 pl-12 pt-3 w-5/6">

                    <h1 className="text-2xl text-center">Report</h1>
                    <div className="flex gap-4 p-8 flex-col">
                        <div className="flex gap-5">
                            <h1 className="text-lg">Total Registered Voter</h1>
                            <span className="text-bold">{voters}</span>
                        </div>
                        {/*  */}
                        <div className="flex sm:flex-row flex-col gap-12">
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
                                        value={votesCaste && 100 - votesCaste}
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
                        <table className="table sm:w-1/2 w-full border-collapse border border-slate-900 text-left">
                            <thead>
                                <tr className="bg-sky-500 border">
                                    <th>#</th>
                                    <th>Party Name</th>
                                    <th>Votes</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {castedParty.map((party, index) => (
                                    <tr key={index} className="text-2xl border border-emerald-400">
                                        <td>{index + 1}</td>
                                        <td>{party.partyname}</td>
                                        <td>{party.votes_count}</td>
                                        <td className="pr-4">
                                            
                                            <Line 
                                                percent={((party.votes_count) / (votes)).toFixed(2) * 100}
                                                strokeColor={
                                                    (((party.votes_count) / (votes)).toFixed(2) * 100) > 49
                                                    ? "#090" 
                                                    : (((party.votes_count) / (votes)).toFixed(2) * 100) > 40
                                                    ? "#012c4f"
                                                    : "#f12e45"
                                                }
                                                strokeWidth={5}
                                                stoke
                                            />
                                            {/* {((party.votes_count) / (votes)).toFixed(2) * 100}% */}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Print button */}
                    <button
                        onClick={printReport}
                        className="p-2 w-auto border-sky-500 border-2 hover:bg-sky-500 rounded hover:text-white">
                        Print out 
                    </button>
                    
                    {/* Printable Report */}
                    <div ref={componentRef} className="w-full h-screen p-6 ">
                        <h1 className="text-center font-extrabold text-2xl">Report</h1>
                    </div>


                </div>
            </div>
        </>
    )
}