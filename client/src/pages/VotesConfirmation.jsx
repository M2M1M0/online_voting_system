import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VotesConfirmation() {

    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
            dispatch({ type: "LOGOUT"})
        }, 3000)
    })

    

    return ( 
    <>
    <div className="text-center h-screen w-screen p-32 ">
        <h1 className="text-5xl font-semibold text-emerald-600">
            Thanks for your Vote! 
        </h1>
        <hr />
    </div>
    </>
    );
}

export default VotesConfirmation;