import { useEffect, useState } from "react";
import BalanceComponent from "../components/balance";
import NavBar from "../components/navbar";
import UserElement from "../components/users";
import axios from "axios";
import API_URL from '../info'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";


export default function Dashboard() {
    const [searchValue, setSearchValue] = useState("")
    const [userList, setUserList] = useState([])
    const [balance, setBalance] = useState(0)
    const [menu, setMenu] = useState(false)
    const [loading, setLoading] = useState(true)

    const name = localStorage.getItem("name")
    const navigate = useNavigate()

    useEffect(() => {
        const authToken = Cookies.get('token')
        const url = `${API_URL}api/v1/user/bulk?filter=${searchValue}`
        const Auth = `Bearer ${authToken}`
        axios.get(url, { headers: { Authorization: Auth } })
            .then((response) => {
                const filteredData = response.data.users.filter((each) => each.firstName !== name)
                setUserList(filteredData)
            })
        axios.get(API_URL + "api/v1/account/balance", { headers: { Authorization: Auth } })
            .then((response) => {
                setBalance(response.data.Balance.toFixed(2))
                setLoading(false)
            })
    }, [searchValue, name])


    const terminateSession = () => {
        localStorage.removeItem("name")
        Cookies.remove("token")
        navigate("/signin")
    }

    return loading ? (<div className="min-h-screen min-w-screen flex flex-col justify-center items-center " >
        < Loader />
    </div >)
        : (<>
            <NavBar onclickprofile={() => { setMenu((prev) => !prev) }} menu={menu} UserName={name} onclickButton={() => terminateSession()} />
            <BalanceComponent balance={balance} />
            <UserElement onClickSend={(id, name) => navigate(`/send?id=${id}&name=${name}`)} onChangeSearch={(e) => setSearchValue(e.target.value.toUpperCase())} usersList={userList} />
        </>)
}

// { console.log(id, name) }