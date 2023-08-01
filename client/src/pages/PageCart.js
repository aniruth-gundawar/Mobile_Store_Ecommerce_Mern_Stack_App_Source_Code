import React, { useState, useEffect } from "react";
import CustomizedTables from "../components/CustomizedTables";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ToastContainer, toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const PageCart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [t, setT] = useState(0);
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.quanti;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart?.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const increase = (pid) => {
    let index = cart?.findIndex((item) => item._id === pid);
    if (cart[index].quantity <= cart[index].quanti) {
      toast.error("product Out of stock", {
        position: "top-center",
      });

      return;
    }
    cart[index].quanti++;
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify([...cart]));
  };
  const decrease = (pid) => {
    let index = cart?.findIndex((item) => item._id === pid);
    if (cart[index].quanti <= 0) return;
    cart[index].quanti--;

    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify([...cart]));
  };

  useEffect(() => {
    let total = 0;
    cart?.map((item) => {
      total += item.quanti;
    });
    setT(total);
  }, [cart]);
  const handlePayment = async () => {
    let check = true;
    try {
      cart.map(async (item) => {
        const quantity = item.quanti;
        const { data } = await axios.put(
          `/api/v1/products/update-product-quantity/${item._id}`,
          { quantity }
        );
        if (!data.success) {
          check = false;
          console.log(data?.error);
          toast.error(
            "prodcut out of stock .If amount is debited ,  amount will be credited in 48 hours ",
            {
              position: "top-center",
            }
          );

          return;
        }
      });
      if (check) {
        setLoading(true);
        const { nonce } = await instance.requestPaymentMethod();
        console.log(cart);
        const { data } = await axios.post(
          `/api/v1/products/braintree/payment`,
          {
            nonce,
            cart,
          }
        );
        setLoading(false);
        localStorage.removeItem("cart");

        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h5 className="text-capitalize">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h5>
            <h4>
              {cart?.length > 0
                ? `you have ${t} items in ur cart ${
                    auth?.token ? "" : `.please login to checkout`
                  }`
                : " your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <TableContainer
              sx={{ maxWidth: 1200, maxHeight: 600, margin: "auto" }}
              component={Paper}
            >
              <Table stickyHeader aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      product Name
                    </StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Remove</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart &&
                    cart.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          style={{ maxWidth: 100 }}
                          align="center"
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ maxWidth: 100 }}
                          align="center"
                        >
                          <img
                            src={`/api/v1/products/product-photo/${row._id}`}
                            width="100px"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.price}
                          {/* {row?.row.price !== null
                            ? row.price.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                            : ""} */}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button>
                            <RemoveIcon
                              onClick={() => decrease(row._id)}
                              fontSize="small"
                            />
                          </Button>
                          {row.quanti}

                          <Button>
                            <AddIcon
                              onClick={() => increase(row._id)}
                              fontSize="small"
                            />
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button onClick={() => removeCartItem(row._id)}>
                            <DeleteIcon
                              fontSize="large"
                              style={{ color: "red" }}
                            />
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p> Total | Checkout </p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </Button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || t <= 0 ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCart;
