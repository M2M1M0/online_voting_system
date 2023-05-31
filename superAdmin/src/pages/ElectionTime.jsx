import Menu from "../components/Menu";
// import date from "date-and-time"
import { useEffect, useState } from "react";
// import moment from "moment"
import Moment from "react-moment"
import axios from "axios"


export default function ElectionTime() {

    // const now =  Date.now()
    // date.format(now, "YYYY/MM/DD HH:mm:ss")
    // const now = moment(Date.now())

    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")


    const [getTime, setElection] = useState("")

    // const startDate = moment(start)
    // const endDate = moment(end)
    // const difference = moment(endDate).diff(startDate)

    const [success, setSuccess] = useState(false)

    const setElectionTime = (e) => {
        e.preventDefault()

        // Send to DB
        axios.post(`http://localhost:8800/time/setElectiontime?startDate=${start}&endDate=${end}`)
            .then((res) => {
                setSuccess(res.data)
                // console.log("Setted")
            })
            .catch((err) => console.log(err))

            setStart("")
            setEnd("")

        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    useEffect(() => {
        //getElectionTime

        axios.get("http://localhost:8800/time/getElectionTime")
            .then((time) => {
                setElection(time.data[0])
                // console.log(time)
            })
            .catch((err) => console.log(err))


    })

    return (
        //  time/setElectionime
        <>
            <div className="flex flex-row">
                <div className="w-1/5">
                    <Menu />
                </div>
                <div className="pl-2 pt-3 w-4/5">
                    <h1 className="text-center text-lg">Set Election Time</h1>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-4xl font-extrabold text-gray-900">Election Time</h1>

                        <div className="flex gap-6 items-center ">
                            <h2 className="font-semibold text-gray-800 text-2xl">
                                Start on:
                            </h2>
                            <Moment >
                                {getTime.startDate}
                            </Moment>

                        </div>

                        <div className="flex gap-6 items-center">
                            <h2 className="font-semibold text-gray-800 text-2xl">
                                End on:
                            </h2>
                            <Moment>
                                {getTime.endDate}
                            </Moment>
                            <h2 className="font-semibold text-gray-800 text-2xl">
                                Current :
                            </h2>
                            <Moment>
                                {Date.now()}
                            </Moment>
                        </div>

                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="w-1/2">
                        {
                            success &&
                            <div className="bg-emerald-300 text-emerald-700 text-base p-2">{success}</div>
                        }
                    </div>

                    <form action="" onSubmit={(e) => setElectionTime(e)}>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-4">
                                <h1 className="text-lg font-extrabold text-gray-600 ">
                                    Set Start date :
                                </h1>
                                <div>
                                    <input
                                        className="border border-sky-500 rounded p-2"
                                        type="datetime-local"
                                        value={start}
                                        required
                                        onChange={(e) => setStart(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 ">
                                <h1 className="text-lg font-extrabold text-gray-600 ">
                                    Set End date :
                                </h1>
                                <div>
                                    <input
                                        className="border border-sky-500 rounded p-2"
                                        type="datetime-local"
                                        value={end}
                                        required
                                        onChange={(e) => setEnd(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <input

                                    type="submit"
                                    value="Set Election Time"
                                    
                                    className="my-8 bg-purple-950 text-white border-none rounded px-5 py-2 cursor-pointer hover:bg-purple-900" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}