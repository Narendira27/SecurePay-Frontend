
import { Link } from 'react-router-dom'


const NavigateElement = (props) => {

    const { text, redirectPath, redirectText } = props

    return (
        <div className='flex flex-row mt-3 w-full justify-center  '>
            <p className='text-slate-950'>{text}</p>
            <Link className='text-slate-950 ml-1' to={redirectPath} >{redirectText}</Link>
        </div>
    )


}

export default NavigateElement 