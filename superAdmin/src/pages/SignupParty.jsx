import axios from 'axios'
import { useState } from "react"
import { Link } from "react-router-dom"
import Menu from "../components/Menu"
import './style.css'

//ICONS
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const initialState = {
    partyname : "",
    repname : "",
    logo : "",
    slogan : ""
}

export default function SignupParty(){
    const [file, setFile] = useState("");

    const [ party, setParty ] = useState(initialState)

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ focused, setFocused ] = useState(false)

   
    const handleChange = (e) => {
        setParty({...party, [e.target.name] : e.target.value})
    }


    const handleSubmit =  (e) => {
        
        e.preventDefault()
        console.log(file.name, "File")
        console.log(party, "Party")
        
        // "content-type": multipart/formData
         axios.post("http://localhost:8800/party/signup", party
         
         )
             .then(res => {
                 // console.log(res, "response")
                 setSuccess("Successfully Register")
                 setParty(initialState)
                 setFocused(false)
                  
             })
             .catch(err => {
                 console.log(err)
                 setError(err.message)
             })
 
             setTimeout(() => {
                 setSuccess(false)
                 setError(false)
             }, 4000)
         }

        // const data = new FormData()
        // data.append("file", file)
        // data.append("upload_preset", "upload")

    
            // try {
            //     const uploadRes = await axios.post(
            //         "http://localhost:8800/public/images", data
            //         )
                    
            //     const { url } = uploadRes.data
                
            //     const newParty = {
            //         ...party,
            //         logo: url,
            // };
            // console.log(newParty, "Party")
            //     // Register Party
            //     // await axios.post("http://localhost:8800/party/signup", newParty)

            // } catch (err) {
            //     console.log(err)
            // }
        
    
        
        


return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/5">
            <Menu />
        </div>
        <div className="pl-2 w-4/5">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="px-3 pb-4 pt-2 sm:px-16 sm:py-8 overflow-scroll" >
                    {error && 
                    <div className="bg-red-300 text-red-900 text-base p-3 mx-16 ">
                        {error}
                    </div>

                    }
                    {success && 
                    <div className="bg-emerald-200 text-emerald-900 text-base p-3 mx-16 ">
                        {success}
                    </div>

                    }
                    <form action=""  onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-wrap gap-5 w-full mt-3 ">

                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Party Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    type="text"
                                    name='partyname'
                                    required
                                    onBlur={(e) => setFocused(true)}
                                    focused={focused.toString()}
                                    pattern="^[A-Za-z]+$"
                                    value={party.partyname}
                                    onChange={(e) => handleChange(e)} />
                                <span className="span">Party name must Alphabet </span>

                            </div>

                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Representative Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    type="text"
                                    name='repname'
                                    required
                                    onBlur={(e) => setFocused(true)}
                                    focused={focused.toString()}
                                    pattern="^[A-Za-z ]+$"
                                    value={party.repname}
                                    onChange={(e) => handleChange(e)} />
                                <span className="span">Representative Name must Alphabet </span>
                            </div>
                            
                            <div className='flex flex-col gap-2 w-2/5'>
                                <img
                                
                                className="w-32 h-32 border-2 rounded-full object-cover"
                                    src={
                                        file
                                        ? URL.createObjectURL(file)
                                        : null
                                    }
                                    alt=""
                                    />
                                     <label htmlFor="logo">Add Logo: <DriveFolderUploadIcon/><span className=' text-3xl'></span></label>
                                    <input 
                                        className="p-1" 
                                        id="logo"
                                        type="file" 
                                        name='logo'
                                        style={{display: "none"}}
                                        required
                                        value={party.logo}
                                        onChange={(e) => {
                                            handleChange(e)
                                            setFile(e.target.files[0])
                                        }} />
                            </div>

                            <div className='flex flex-col gap-2 w-2/5'>
                                <label htmlFor="">Description/ Slogan ( <span className="text-emerald-500 "> Optionl </span> ) <i className="text-3xl"></i> </label>
                                <textarea 
                                    className="border-2 border-gray-300 rounded-md p-1 w-full" 
                                    name='slogan'
                                    rows={4}
                                    value={party.slogan}
                                    onChange={(e) => handleChange(e)}  > 
                                </textarea> 
                            </div>
                            
                        </div>
                            
                        <div className='flex flex-col gap-2 w-2/5 my-12'>
                               
                            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-center gap-1 sm:gap-3  text-black  py-5'>
                                <button 
                                    type="submit"
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        SUBMIT
                                </button>

                                <Link to={"/superAdmin/signupParty"}>
                                <button 
                                    onClick={e => {
                                        setFocused(false)
                                        setParty(initialState)
                                    }}
                                    className='px-5 py-1 rounded-l rounded-r  bg-slate-200 hover:bg-slate-300'>
                                        RESET
                                </button>
                                </Link>
                                
                                <Link 
                                    className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'
                                    to={'/superAdmin'}>
                                    <button >
                                            CANCEL
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
        </div>
    </div>
    </>
)}