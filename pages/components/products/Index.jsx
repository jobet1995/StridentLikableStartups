import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import util from "../../util";
import Service from "./Service";

export default function ProductsIndex(props) {
  const [productses, setProductses] = useState([]);
  const [paging, setPaging] = useState({
    current: 1,
    size: 1,
    last: 1,
  });

  useEffect(() => {
    Util.initView();
  }, []);

  useEffect(() => {
    get();
  }, [props.location]);

  function get() {
    Service.get()
      .then((response) => {
        let query = Util.getQuery();
        setProductses(response.data.productses);
        setPaging({
          current: parseInt(query.page) || 1,
          size: parseInt(query.size) || 10,
          last: response.data.last,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col-12">
            <input id="searchbar_toggle" type="checkbox" />
            <div id="searchbar" className="mb-4">
              <div className="form-group col-lg-2 me-2 mb-lg-0 mb-3">
                <select
                  id="search_col"
                  onChange={() => Util.searchChange()}
                  className="form-select form-select-sm"
                >
                  <option value="Products.ProductId" data-type="number">
                    Products Product Id
                  </option>
                  <option value="Products.Name">Products Name</option>
                  <option value="Products.Description">
                    Products Description
                  </option>
                  <option value="Products.Price" data-type="number">
                    Products Price
                  </option>
                  <option value="Products.StockQuantity" data-type="number">
                    Products Stock Quantity
                  </option>
                </select>
              </div>
              <div className="form-group col-lg-2 me-2 mb-lg-0 mb-3">
                <select id="search_oper" className="form-select form-select-sm">
                  <option value="c">Contains</option>
                  <option value="e">Equals</option>
                  <option value="g">&gt;</option>
                  <option value="ge">&gt;&#x3D;</option>
                  <option value="l">&lt;</option>
                  <option value="le">&lt;&#x3D;</option>
                </select>
              </div>
              <div className="form-group col-lg-2 me-2 mb-lg-0 mb-3">
                <input
                  id="search_word"
                  autoComplete="off"
                  onKeyUp={(event) => Util.search(event)}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => Util.search()}
                >
                  Search
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => Util.clearSearch()}
                >
                  Clear
                </button>
              </div>
            </div>
            <table className="table table-sm table-striped table-hover">
              <thead>
                <tr>
                  <th
                    className={Util.getSortClass("Products.ProductId", "asc")}
                  >
                    <Link
                      to={Util.getLink(
                        paging,
                        "sort",
                        "Products.ProductId",
                        "asc",
                      )}
                    >
                      Product Id
                    </Link>
                  </th>
                  <th className={Util.getSortClass("Products.Name")}>
                    <Link to={Util.getLink(paging, "sort", "Products.Name")}>
                      Name
                    </Link>
                  </th>
                  <th className={Util.getSortClass("Products.Description")}>
                    <Link
                      to={Util.getLink(paging, "sort", "Products.Description")}
                    >
                      Description
                    </Link>
                  </th>
                  <th
                    className={
                      Util.getSortClass("Products.Price") +
                      " d-none d-md-table-cell"
                    }
                  >
                    <Link to={Util.getLink(paging, "sort", "Products.Price")}>
                      Price
                    </Link>
                  </th>
                  <th
                    className={
                      Util.getSortClass("Products.StockQuantity") +
                      " d-none d-md-table-cell"
                    }
                  >
                    <Link
                      to={Util.getLink(
                        paging,
                        "sort",
                        "Products.StockQuantity",
                      )}
                    >
                      Stock Quantity
                    </Link>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productses.map((products, index) => (
                  <tr key={index}>
                    <td className="text-center">{products.ProductId}</td>
                    <td>{products.Name}</td>
                    <td>{products.Description}</td>
                    <td className="d-none d-md-table-cell text-end">
                      {products.Price}
                    </td>
                    <td className="d-none d-md-table-cell text-end">
                      {products.StockQuantity}
                    </td>
                    <td className="text-center">
                      <Link
                        className="btn btn-sm btn-secondary"
                        to={`/products/${products.ProductId}`}
                        title="View"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      <Link
                        className="btn btn-sm btn-primary"
                        to={`/products/edit/${products.ProductId}`}
                        title="Edit"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger"
                        to={`/products/delete/${products.ProductId}`}
                        title="Delete"
                      >
                        <i className="fa fa-times"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row mb-1">
              <div className="col-md-3 col-6">
                <label>
                  Show
                  <select
                    id="page_size"
                    onChange={(event) => props.history.push(event.target.value)}
                    value={Util.getLink(paging, "size", paging.size)}
                  >
                    <option value={Util.getLink(paging, "size", 10)}>10</option>
                    <option value={Util.getLink(paging, "size", 20)}>20</option>
                    <option value={Util.getLink(paging, "size", 30)}>30</option>
                  </select>
                  entries
                </label>
              </div>
              <div className="col-md-9 col-6">
                <div className="float-right d-none d-md-block">
                  <ul className="pagination flex-wrap">
                    <li
                      className={`page-item${paging.current <= 1 ? " disabled" : ""}`}
                    >
                      <Link
                        className="page-link"
                        to={Util.getLink(paging, "page", paging.current - 1)}
                      >
                        Prev
                      </Link>
                    </li>
                    {Util.getPages(paging.last).map((page) => (
                      <li
                        key={page}
                        className={`page-item${paging.current == page ? " active" : ""}`}
                      >
                        <Link
                          className="page-link"
                          to={Util.getLink(paging, "page", page)}
                        >
                          {page}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item${paging.current >= paging.last ? " disabled" : ""}`}
                    >
                      <Link
                        className="page-link"
                        to={Util.getLink(paging, "page", paging.current + 1)}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="float-right d-block d-md-none">
                  <label>
                    {" "}
                    Page
                    <select
                      id="page_size"
                      onChange={(event) =>
                        props.history.push(event.target.value)
                      }
                      value={Util.getLink(paging, "page", paging.current)}
                    >
                      {Util.getPages(paging.last).map((page) => (
                        <option
                          key={page}
                          value={Util.getLink(paging, "page", page)}
                        >
                          {page}
                        </option>
                      ))}
                    </select>
                  </label>{" "}
                  of <span>{paging.last}</span>
                  <div className="btn-group">
                    <Link
                      className={` btn btn-primary btn-sm${paging.current <= 1 ? " disabled" : ""}`}
                      to={Util.getLink(paging, "page", paging.current - 1)}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </Link>
                    <Link
                      className={` btn btn-primary btn-sm${paging.current >= paging.last ? " disabled" : ""}`}
                      to={Util.getLink(paging, "page", paging.current + 1)}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link className="btn btn-sm btn-primary" to="/products/create">
              Create
            </Link>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "#searchbar_toggle_menu { display: inline-flex!important }",
            }}
          />
        </div>
      </div>
    </div>
  );
}
