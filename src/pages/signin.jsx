import { useEffect, useState } from "react";
import DescriptionElement from "../components/description";
import HeadingElement from "../components/heading";
import InputElement from "../components/input";
import LoginButton from "../components/loginButton";
import NavigateElement from "../components/navigate";
import axios from "axios";
import Cookies from 'js-cookie'
import API_URL from '../info'
import { useNavigate, Navigate } from "react-router-dom";
import ErrorMessageElement from "../components/errormsg";
import Loader from "../components/loader";

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [authStaus, setAuthStatus] = useState("initial")

    const navigate = useNavigate()

    const onLogin = async () => {
        try {
            const serverResponse = await axios.post(API_URL + "api/v1/user/signin", { username, password })
            Cookies.set('token', serverResponse.data.token, { expires: 3 })
            navigate('/dashboard')
            setResponse(serverResponse)
        }
        catch (e) {
            setShowError(true)
            setErrorMsg(e.response.data.message)
        }
    }

    useEffect(() => {

        const authInfo = async () => {
            const authToken = Cookies.get('token');
            const Auth = `Bearer ${authToken}`;
            try {
                const authRes = await axios.get(API_URL + "api/v1/user/me", { headers: { Authorization: Auth } })
                localStorage.setItem("name", authRes.data.name)
                setAuthStatus("success")
            }
            catch {
                setAuthStatus("fail")
            }
        }
        authInfo()
    }, [])


    const renderSigin = () => {
        switch (authStaus) {
            case 'initial':
                return (
                    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center ">
                        <Loader />
                    </div>
                )

            case 'success':
                return <Navigate to="/dashboard" />

            case 'fail':
                return (< div className="min-h-screen min-w-screen bg-slate-400 flex flex-col justify-center align items-center" >
                    <div className="bg-white rounded-lg w-fit p-4">
                        <HeadingElement text={'Sign In'} />
                        <DescriptionElement text={'Enter your credentials to acess your account'} />
                        <InputElement onchange={(e) => setUsername(e.target.value)} inputText={"Email"} placeHolderText={"johndoe@example.com"} type={"text"} />
                        <InputElement onchange={(e) => setPassword(e.target.value)} inputText={"Password"} type={"password"} />
                        <LoginButton onclick={onLogin} text={"Sign In"} />
                        <NavigateElement text={"Don't have an acount? "} redirectPath={"/signup"} redirectText={"SignUp"} />
                        {showError ? <ErrorMessageElement text={errorMsg} /> : null}
                    </div>
                </ div>)

            default:
                return null
        }
    }

    return renderSigin()
}


export default Signin