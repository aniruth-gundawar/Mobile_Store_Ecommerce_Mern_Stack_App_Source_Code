import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Redirect from "../Redirect";
import { useNavigate } from "react-router-dom";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`/api/v1/auth/admin-auth`);
      if (res.data.ok) setOk(true);
      else setOk(false);
    };
    if (auth?.token) authCheck();
    else navigate("/");
  }, [auth?.token]);

  return ok ? <Outlet /> : navigate("/");
}
