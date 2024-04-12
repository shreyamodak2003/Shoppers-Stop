import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import useFetchData from "../../custom/useFetchData";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";

export default function Products() {
  const { data, loading, error } = useFetchData("https://fakestoreapi.com/products")
  const [products, setProducts] = useState([])
  const [searchProduts, setSearchProduts] = useState([])

  useEffect(() => {
    if (data) {
      setProducts((p) => data)
      setSearchProduts((p) => data)
    }
  }, [data])

  // reset func
  const handleReset = () => {
    setProducts((p) => data)
  };
  // search funct
  const debounce = (func, delay) => {
    let id
    return (...args) => {
      clearTimeout(id)
      id = setTimeout(() => {
        func(...args)
      }, delay)
    };
  };

  const searchData = debounce((text) => {
    const s_data = data.filter(
      (el) => el.category.toLowerCase().includes(text.toLowerCase())
    )
    
    setProducts(s_data)
  }, 500)

  const handleInput = (e) => {
    searchData(e.target.value);
  }

  //sorting  functionality
  const handleSort = (state) => {
    if (state === "l-h") {
      const l_h_data = [...data].sort((a, b) => a.price - b.price)
      setProducts(l_h_data)
    } else {
      const l_h_data = [...data].sort((a, b) => b.price - a.price)
      setProducts(l_h_data)
    }
  }

  // filter functionality
  const handleFilter = (str) => {
    const f_data = [...data].filter((el) => el.category === str)
    setProducts(f_data)
  }

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className="products-main">
        <DesktopFind handleFilter={handleFilter} handleSort={handleSort} />
        <MobileFind handleFilter={handleFilter} handleSort={handleSort} />
        <div className=" container product-card">
           <div className="d-flex align-items-center gap-2 mt-3">
              <button 
                onClick={handleReset} className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Reset">
                <i class="bi bi-arrow-counterclockwise"></i>
              </button>
              <input type="text" placeholder="search product here" className="form-control" onChange={handleInput}/>
            </div>
            <div className="product-card-main mt-3 mb-3">
              {products?.map((el) => (<ProductCard key={el.id} props={el} />
              ))}
            </div>
          </div>
    </div>
  )
}

export function DesktopFind({ handleFilter, handleSort }) {
  return (
    <div className="product-filter container">
      <h4 className="mt-3">Find products accordingly</h4>
      <hr />
      <h6>Sort by Price</h6>
      <p onClick={() => handleSort("l-h")}>
        <i class="bi bi-arrow-down-circle"></i>&nbsp;Low to High
      </p>
      <p onClick={() => handleSort("h-l")}>
        <i class="bi bi-arrow-up-circle"></i>&nbsp;High to Low
      </p>
      <h6>Filter by Category</h6>
      <p onClick={() => handleFilter("men's clothing")}>Men</p>
      <p onClick={() => handleFilter("women's clothing")}>Women</p>
      <p onClick={() => handleFilter("jewelery")}>Jewelery</p>
      <p onClick={() => handleFilter("electronics")}>Electronics</p>
    </div>
  )
}

export function MobileFind({ handleFilter, handleSort }) {
  return (
    <div className="product-filter-mobile container">
      <h4 data-bs-toggle="offcanvas"data-bs-target="#offcanvasBottom"aria-controls="offcanvasBottom">
        <i class="bi bi-view-list"></i>&nbsp;Find products accordingly
      </h4>

      <div
        class="offcanvas offcanvas-bottom"
        style={{ height: "400px" }}
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel"></h5>
          <button type="button"class="btn-close text-reset"data-bs-dismiss="offcanvas"aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <h6>Sort by Price</h6>
          <p onClick={() => handleSort("l-h")} data-bs-dismiss="offcanvas">
            <i class="bi bi-arrow-down-circle"></i>&nbsp;Low to High
          </p>
          <p onClick={() => handleSort("h-l")} data-bs-dismiss="offcanvas">
            <i class="bi bi-arrow-up-circle"></i>&nbsp;High to Low
          </p>
          <h6>Filter by Category</h6>
          <p onClick={() => handleFilter("men's clothing")} data-bs-dismiss="offcanvas">
            Men
          </p>
          <p onClick={() => handleFilter("women's clothing")}data-bs-dismiss="offcanvas">
            Women
          </p>
          <p onClick={() => handleFilter("jewelery")}data-bs-dismiss="offcanvas">
            Jewelery
          </p>
          <p onClick={() => handleFilter("electronics")}data-bs-dismiss="offcanvas">
            Electronics
          </p>
        </div>
      </div>
    </div>
  )
}