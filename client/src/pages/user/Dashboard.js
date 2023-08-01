import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container mx-auto  m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3 className="text-capitalize">{auth?.user?.name}</h3>
            <h3>{auth?.user?.email}</h3>
            <h3>{auth?.user?.address}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
