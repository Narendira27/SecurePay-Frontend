import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_URL from '../info';
import { useEffect, useState } from "react";
import Loader from "../components/loader";

const RootRoute = () => {
    const [responseInfo, setResponseInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('inital')


    const fetchData = async () => {
        const authToken = Cookies.get('token');
        const Auth = `Bearer ${authToken}`;
        try {
            const response = await axios.get(API_URL + "api/v1/user/me", { headers: { Authorization: Auth } });
            setResponseInfo(response.data);
            setStatus("success")
        } catch (error) {
            setStatus("fail")
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (status === "fail") {
        return <Navigate to="/signin" />;
    }

    if (loading) {
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center ">
            <Loader />
        </div>
    }

    localStorage.setItem("name", responseInfo.name)

    return <Navigate to="/dashboard" />;
};

export default RootRoute;
