import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API_URL from '../info'
import axios from 'axios'
import Cookies from 'js-cookie'

import DescriptionElement from "../components/description";
import HeadingElement from "../components/heading";
import InputElement from "../components/input";
import LoginButton from "../components/loginButton";
import NavigateElement from "../components/navigate";
import ErrorMessageElement from "../components/errormsg";
import Loader from "../components/loader";

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")
    const [errorText, setErrorText] = useState("")
    const [showError, setShowError] = useState(false)
    const [authStaus, setAuthStatus] = useState("initial")

    const navigate = useNavigate()

    const sendRequest = async () => {
        try {
            const request = await axios.post(API_URL + "api/v1/user/signup", { firstName, lastName, username, password })
            Cookies.set('token', request.data.token, { expires: 3 })
            navigate('/dashboard?name=' + request.data.name)
            setResponse(request)
        }
        catch (e) {
            setShowError(true)
            setErrorText(e.response.data.message)
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



    const renderSigup = () => {
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
                return (<div className="min-h-screen min-w-screen bg-slate-400 flex flex-col justify-center align items-center">
                    <div className="bg-white rounded-lg w-fit p-4">
                        <HeadingElement text={'Sign Up'} />
                        <DescriptionElement text={'Enter your information to create an account'} />
                        <InputElement onchange={(e) => setFirstName(e.target.value)} inputText={"First Name"} placeHolderText={"John"} type={"text"} />
                        <InputElement onchange={(e) => setLastName(e.target.value)} inputText={"Last Name"} placeHolderText={"Doe"} type={"text"} />
                        <InputElement onchange={(e) => setUsername(e.target.value)} inputText={"Email"} placeHolderText={"johndoe@example.com"} type={"text"} />
                        <InputElement onchange={(e) => setPassword(e.target.value)} inputText={"Password"} type={"password"} />
                        {showError ? <ErrorMessageElement text={errorText} /> : null}
                        <LoginButton onclick={sendRequest} text={"Sign Up"} />
                        <NavigateElement text={"Already have an account? "} redirectPath={"/signin"} redirectText={"SignIn"} />
                    </div>
                </div>)

            default:
                return null
        }
    }

    return renderSigup()
}


export default Signup