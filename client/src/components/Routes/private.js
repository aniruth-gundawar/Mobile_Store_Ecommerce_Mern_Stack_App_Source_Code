import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Redirect from "../Redirect";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`/api/v1/auth/user-auth`);
      if (res.data.ok) setOk(true);
      else setOk(false);
    };
    if (auth?.token) authCheck();
    else navigate("/");
  }, [auth?.token]);

  return ok ? <Outlet /> : <Redirect />;
}
