import React from "react";
import "./Cart.css";


export default function CartCard({
  props,
  handleRemoveCartItem,
  counts,
  handleDec,
  handleInc,
}) {
  return (
    <>
      <div className="cart-card-main">
        <img width={60} height={60} src={props.image} alt="name" />
        <p>{props.title.substring(0, 10)}</p>
        <h6> Price : ₹{Math.round(props.price) * 80}</h6>
        <div className="d-flex align-items-center  gap-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleDec(props.id)}
            disabled={counts[props.id] === 1}
          >
            -
          </button>
          <p className="mt-2">{counts[props.id] || 1}</p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleInc(props.id)}
            disabled={counts[props.id] === 5}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => handleRemoveCartItem(props.id)}
        >
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </>
  );
}