import React, { useContext} from "react";

import { authContext } from "../../context/AuthContext";
import CartCard from "./CartCard";
import "./Cart.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartContext } from "../../context/CartContext";

export default function Cart() {

  const { isAuth } = useContext(authContext);
  const { cart, counts, handleRemoveCartItem, handleDec, handleInc} =
    useContext(cartContext);

  if (isAuth == false) {
    window.location.href = "/login";
  }

  const total = cart.reduce((initial, el) => initial + el.price, 0);
 
  return (
    <div className="container mt-3">
      {cart?.length > 0 ? (
        cart?.map((el) => (
          <CartCard
            props={el}
            handleRemoveCartItem={handleRemoveCartItem}
            counts={counts}
            handleDec={handleDec}
            handleInc={handleInc}/>
        ))
      ) : (
        <div style={{ height: "40vh", textAlign: "center" }}>
          Add items first
        </div>
      )}
      <hr />
      <ToastContainer />
      <Checkoutfn props={total} />
    </div>
  );
}

export function Checkoutfn({ props }) {
  const { removeCartItems,totalBill } = useContext(cartContext);
  return (
    <div className="text-end">
      <h3>Total : ₹{Math.round(totalBill) * 80}/-</h3>
      <button
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#paymentModal"
      >
        {" "}
        Checkout
      </button>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="paymentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Payment of ₹{Math.round(totalBill) * 80}/-</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <PaymentForm />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success w-100"
                data-bs-dismiss="modal"
                onClick={removeCartItems}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentForm() {
  return (
    <form>
      <input
        type="tel"
        minLength={16}
        required
        placeholder="XXXX XXXX XXXX XXXX"
        className="form-control"/>
      <div className="d-flex mt-2 gap-3">
        <input type="date" className="form-control" required />
        <input
          type="tel"
          required
          maxLength={3}
          className="form-control"
          placeholder="CVV"
        />
      </div>
    </form>
  );
}