import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import util from "../../util";

export default function ProductsDelete(props) {
  const [products, setProducts] = useState({});

  useEffect(() => {
    function get() {
        return Service.delete(props.match.params.productId).then((response) => {
          setProducts(response.data.products);
        });
      }
    get().finally(() => {
      Util.initView(true);
    });
  }, [props.match.params.productId]);

  function get() {
    return Service.delete(props.match.params.productId).then((response) => {
      setProducts(response.data.products);
    });
  }

  function remove(e) {
    e.preventDefault();
    Service.delete(props.match.params.productId, products)
      .then(() => {
        props.history.push(Util.getRef("/products"));
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post" onSubmit={remove}>
            <div className="row">
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_product_id">
                  Product Id
                </label>
                <input
                  readOnly
                  id="products_product_id"
                  name="ProductId"
                  className="form-control form-control-sm"
                  value={products.ProductId || ""}
                  type="number"
                  required
                />
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_name">
                  Name
                </label>
                <input
                  readOnly
                  id="products_name"
                  name="Name"
                  className="form-control form-control-sm"
                  value={products.Name || ""}
                  maxLength="50"
                />
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_description">
                  Description
                </label>
                <input
                  readOnly
                  id="products_description"
                  name="Description"
                  className="form-control form-control-sm"
                  value={products.Description || ""}
                  maxLength="50"
                />
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_price">
                  Price
                </label>
                <input
                  readOnly
                  id="products_price"
                  name="Price"
                  className="form-control form-control-sm"
                  value={products.Price || ""}
                  type="number"
                  step="0.1"
                />
              </div>
              <div className="mb-3 col-md-6 col-lg-4">
                <label className="form-label" htmlFor="products_stock_quantity">
                  Stock Quantity
                </label>
                <input
                  readOnly
                  id="products_stock_quantity"
                  name="StockQuantity"
                  className="form-control form-control-sm"
                  value={products.StockQuantity || ""}
                  type="number"
                />
              </div>
              <div className="col-12">
                <Link
                  className="btn btn-sm btn-secondary"
                  to={Util.getRef("/products")}
                >
                  Cancel
                </Link>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
