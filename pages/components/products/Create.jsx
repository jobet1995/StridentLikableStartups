import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import util from "../../util";

export default function ProductsCreate(props) {
  const [products, setProducts] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Util.initView(true);
  }, []);

  function create(e) {
    e.preventDefault();
    Service.create(products)
      .then(() => {
        props.history.push(Util.getRef("/products"));
      })
      .catch((e) => {
        if (e.response.data.errors) {
          setErrors(e.response.data.errors);
        } else {
          alert(e.response.data.message);
        }
      });
  }

  function onChange(e) {
    let data = { ...products };
    data[e.target.name] = e.target.value;
    setProducts(data);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post" onSubmit={create}>
            <div className="row">
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_name">
                  Name
                </label>
                <input
                  id="products_name"
                  name="Name"
                  className="form-control form-control-sm"
                  onChange={onChange}
                  value={products.Name || ""}
                  maxLength="50"
                />
                {errors.Name && (
                  <span className="text-danger">{errors.Name}</span>
                )}
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_description">
                  Description
                </label>
                <input
                  id="products_description"
                  name="Description"
                  className="form-control form-control-sm"
                  onChange={onChange}
                  value={products.Description || ""}
                  maxLength="50"
                />
                {errors.Description && (
                  <span className="text-danger">{errors.Description}</span>
                )}
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_price">
                  Price
                </label>
                <input
                  id="products_price"
                  name="Price"
                  className="form-control form-control-sm"
                  onChange={onChange}
                  value={products.Price || ""}
                  type="number"
                  step="0.1"
                />
                {errors.Price && (
                  <span className="text-danger">{errors.Price}</span>
                )}
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_stock_quantity">
                  Stock Quantity
                </label>
                <input
                  id="products_stock_quantity"
                  name="StockQuantity"
                  className="form-control form-control-sm"
                  onChange={onChange}
                  value={products.StockQuantity || ""}
                  type="number"
                />
                {errors.StockQuantity && (
                  <span className="text-danger">{errors.StockQuantity}</span>
                )}
              </div>
              <div className="col-12">
                <Link
                  className="btn btn-sm btn-secondary"
                  to={Util.getRef("/products")}
                >
                  Cancel
                </Link>
                <button className="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
