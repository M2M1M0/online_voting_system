// import img from '../../images/userdefault.png'
import { Link } from 'react-router-dom'
import voting from '../images/e-voting.png'


export default function Home(){

return(
    <>
    <div className='flex flex-col sm:flex-row'>
        <div className='text-center  sm:pl-5 pl-12 sm:py-32 py-5 sm:w-1/5 w-full'>
            <img src={voting} alt="" className='sm:w-full sm:h-64 h-32 w-full'/>
        </div>
        <div  className=' sm:w-4/5 w-full rounded-2xl border sm:text-5xl text-2xl text-center font-extrabold font-serif sm:py-16 sm:px-24 py-16 px-5 flex flex-col gap-2 sm:my-24 my-12 shadow-2xl sm:h-96 h-72 '>
            <div>If I can trust an app for banking,</div>
            <div>I can trust an app for voting.</div>
            <div className='flex text-right sm:text-left sm:mt-20 mt-8'>
                <Link to={'/login'}>
                    <button 
                        className='rounded-2xl text-base font-sans sm:px-8 sm:py-3 px-5 py-2 bg-sky-950 text-white  hover:text-sky-950 hover:bg-white hover:border-2 hover:border-sky-900'>
                            GET STARTED
                    </button>
                </Link>
            </div>
        </div>
    </div>
    </>
)}