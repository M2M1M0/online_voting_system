import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useReactToPrint } from 'react-to-print'
import { useRef } from "react";
import { Line } from "rc-progress"


export default function Report() {

    const { user } = useContext(AuthContext)
    const stationid = user?.stationId

    const [station, setStation] = useState('')
    const [voters, setVoters] = useState(0)
    const [votes, setVotes] = useState(0)

    const [votesCaste, setVotesCaste] = useState(0)

    const [castedParty, setCastedParty] = useState([])

    const componentRef = useRef()
    const printReport = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Report"
    })

    useEffect(() => {
        // Get Station
        axios.get(`http://localhost:8800/station/${stationid}`)
            .then((res) => {
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
                setVotes(votes)

                setVotesCaste(((votes / voters) * 100).toFixed(0))
            })
            .catch(err => console.log(err))


        // Casted Parties
        axios.get(`http://localhost:8800/vote/castedCandidates/${stationid}`)
            .then(res => {
                setCastedParty(res.data)
            })
            .catch(err => console.log(err))


    })

    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/6">
                    <Menu />
                </div>
                <div className="sm:pl-4 pl-12 pt-3 w-5/6">
                    <h1 className="text-2xl text-center">Report</h1>
                    <h1 className="text-sky-400 text-2xl">{station ? station : <div className="text-red-700">-</div>} Station</h1>
                    <div className="flex gap-4 p-8 flex-col">
                        <div className="flex gap-5">
                            <h1 className="text-lg"> Registered Voter</h1>
                            <span className="text-bold">{voters}</span>
                        </div>
                        {/*  */}
                        <div className="flex sm:flex-row flex-col gap-12">
                            <div className="flex flex-col font-sans text-base bg-white text-emerald-500 gap-5 w-64 max-h-max p-5 shadow-2xl">
                                <h1>People who caste thier Votes</h1>

                                {/* <span className="text-bold">{votesCaste}</span> */}
                                <div style={{ width: 100, height: 100 }}>

                                    <CircularProgressbar
                                        value={votesCaste ? votesCaste : 0}
                                        text={`${votesCaste ? votesCaste : 0}%`}
                                        styles={buildStyles({
                                            textSize: '16px',
                                            // Colors
                                            pathColor: `rgba(10, 250, 10, ${votesCaste / 100})`,
                                            textColor: '#888',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#ff98c7',
                                        })}

                                    />
                                </div>
                            </div>
                            <div className="flex flex-col font-sans text-base bg-white text-sky-500 gap-5 w-64 max-h-max p-5 shadow-2xl">
                                <h1>People who didn't caste thier Votes</h1>
                                {/* <span className="text-bold">{voters - votesCaste}</span> */}
                                <div style={{ width: 100, height: 100 }}>
                                    <CircularProgressbar
                                        value={votesCaste ? votesCaste : null}
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
                                        <td>
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
                        <h1 className="text-center text-2xl">{station} Report</h1>
                    </div>


                </div>
            </div>
        </>
    )
}