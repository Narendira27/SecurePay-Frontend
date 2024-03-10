import Cookies from "js-cookie"
import axios from 'axios'
import API_URL from '../info'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Loader from "../components/loader"

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState('inital')
    const [loading, setLoading] = useState(true)
    const [responseInfo, setResponseInfo] = useState({});

    useEffect(() => {
        const sendReq = async () => {
            const cookieInfo = Cookies.get('token')
            try {
                const response = await axios.get(API_URL + "api/v1/user/me", { headers: { Authorization: "Bearer " + cookieInfo } })
                setResponseInfo(response.data);
                setStatus('success')

            } catch {
                setStatus('fail')

            } finally {
                setLoading(false)
            }

        }
        sendReq()
    }, [])

    if (status === 'success') {
        localStorage.setItem("name", responseInfo.name)
        return <>{children}</>
    }

    if (status === 'fail') {
        return <Navigate to="/signin" />
    }

    if (loading) {
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center ">
            <Loader />
        </div>
    }

}

export default ProtectedRoute