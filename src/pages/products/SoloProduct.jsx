import React, { useState } from "react";
import "./Products.css";
import useFetchData from "../../custom/useFetchData";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SoloProduct() {
  const { id } = useParams();

  const { loading, data, error } = useFetchData(
    `https://fakestoreapi.com/products/${id}`
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="container mt-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/products">All Products</Link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {data.category}
        </li>
      </ol>
      <ProductDetails props={data} />
      <Review />
    </section>
  );
}

export function ProductDetails({ props }) {
  const [cartdata, setCartData] = useState(
    JSON.parse(localStorage.getItem("shoppify-cart")) || []
  );
  const auth_status = localStorage.getItem("shoppify-auth-status");

  console.log(auth_status)

  const { category, description, id, image, price, rating, title } = props


  const handleAddtoCart = (data) => {
    if (auth_status == 'false') {
      (window.location.href = "/login");
    } else {
      const c_data = [...cartdata, data];
      setCartData(c_data);
      localStorage.setItem("shoppify-cart", JSON.stringify(c_data));
      toast.success("Added to Cart !");
    }
  };

  return (
    <div className="mb-3" key={id}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <span>{category}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div>
              {/* <h6>
                {" "}
                <span>Rating</span> : {rating.rate} / {rating.count}
              </h6> */}
              <h4>
                <span>
                  Price : <s>₹{Math.round(price) * 80 + 236}</s>{" "}
                </span>
                ₹ {Math.round(price) * 80}
              </h4>
            </div>
            <button
              onClick={() => handleAddtoCart(props)}
              className="btn btn-dark "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export function Review() {
  return (
    <div>
      <h5>Most Recent Reviews</h5>
      <p>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio eveniet
        inventore corrupti nostrum, enim fugit nam. Excepturi asperiores quas,
        earum reiciendis facere inventore assumenda pariatur, consequuntur eum
        quod necessitatibus facilis?
      </p>
      <span> - Shreya Modak</span>
      <hr />
      <p>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio eveniet
        inventore corrupti nostrum, enim fugit nam. Excepturi asperiores quas,
        earum reiciendis facere inventore assumenda pariatur, consequuntur eum
        quod necessitatibus facilis?
      </p>
      <span> - Mini Roy</span>
    </div>
  );
}