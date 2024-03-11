import { useState } from 'react'
import HeadingElement from '../components/heading'
import SendForm from '../components/sendform'
import { Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import API_URL from '../info'
import PaymentButton from '../components/paymentButton'

import successImg from '../assets/checked.png'
import failureImg from '../assets/decline.png'

import Loader from '../components/loader'


const Send = () => {
    const [amount, setAmount] = useState(0)
    const [paymentStatus, setPaymentStatus] = useState("initial")
    const [loadingStaus, setLoadingStatus] = useState(false)

    const [params] = useSearchParams()
    const id = params.get("id")
    const name = params.get("name")

    if (id === null || name === null) {
        return <Navigate to="/dashboard" />
    }

    const renderPaymentCard = () => {
        switch (paymentStatus) {
            case 'initial':
                return (
                    <>
                        <HeadingElement text={"Send Money"} />
                        <SendForm onchange={(e) => setAmount(e.target.value)} onclick={async () => {
                            setLoadingStatus(true)
                            const authToken = Cookies.get('token')
                            const Auth = `Bearer ${authToken}`
                            try {
                                await axios.post(API_URL + "api/v1/account/transfer", { to: id, amount: parseInt(amount) }, { headers: { Authorization: Auth } })
                                setPaymentStatus('success')
                                setLoadingStatus(false)
                            }
                            catch {
                                setPaymentStatus('failure')
                                setLoadingStatus(false)
                            }

                        }} name={name} />
                    </>
                )
            case 'failure':
                return (
                    <div className='flex flex-col justify-center items-center'>
                        <HeadingElement text={"Payment Failed"} />
                        <img className='h-20 w-20 mt-4 mb-4' src={failureImg} />
                        <PaymentButton onclick={() => setPaymentStatus('initial')} text={"Try Again"} />
                    </div>

                )
            case 'success':
                return (
                    <div className='flex flex-col justify-center items-center'>
                        <HeadingElement text={"Payment Successfull"} />
                        <img className='h-20 w-20 mt-4 mb-4' src={successImg} />
                        <PaymentButton onclick={() => setPaymentStatus('initial')} text={"Pay Again"} />
                    </div>

                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen min-w-screen bg-slate-100 flex flex-col justify-center align items-center">
            {!loadingStaus ? (<div className="bg-white border border-solid border-neutral-300 p-4  rounded-lg h-120 w-100">
                {renderPaymentCard()}
            </div>) : <Loader />}
        </div>
    )
}



export default Send