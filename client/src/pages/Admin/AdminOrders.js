import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import moment from "moment";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="row ">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-8 ">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mt-3">
                <div class="table-responsive-sm">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td class="text-capitalize">{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Failed" : "Success"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <Link
                      to={`/products/product/${p.slug}`}
                      className="nav-link"
                    >
                      <div className="row  p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/products/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <h4 className="mt-2">{p.name}</h4>
                          {/* <p className="mt-2">
                            {p.description.substring(0, 60)}
                          </p> */}
                          <p className="text-success mt-2">
                            {p.price.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                          <p className="mt-2">Quantity : {p.quanti}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
