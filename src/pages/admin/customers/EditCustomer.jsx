import React, { useState, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router";
import ReactPaginate from "react-paginate";
import apis from "../../../apis";
import {reducer, initialState} from "../../../reducers/snackBarReducer";

export default function EditCustomer() {
  const [counterState, dispatch] = useReducer(reducer, initialState);


  //*1: synsc params from url to filters
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    perPage: searchParams.get("per_page") || 15,
  });

  const [listData, setListData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);
  // pagination
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    let valuesPerPage = 15;
    setLoadingGet(true);
    apis.products
      .getData(filters.page, valuesPerPage)
      .then(
        (res) => {
          const { products } = res.data.data;
          const { pagination } = res.data.data.meta;
          // xử lý products nếu cần (Xử lý computed data)
          setListData(products);
          setTotalPage(pagination.total_pages);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingGet(false);
        }, 1000);
      });
    return () => {};
  }, [filters]);

  const handleChangeFilters = (e) => {
    const key = e.target.name || "page";
    const value = e.target.value;
    setFilters({ ...filters, [key]: value });
  };

  // sync filters value to URL
    const handleSubmitSearchFilter = () => {
      const params = new URLSearchParams();
  
      params.set("page", filters.page);
      params.set("per_page", filters.perPage);
      setSearchParams(params, {
        preventScrollReset: true,
      });};
    // whenever filters is updated
    useEffect(() => {
      handleSubmitSearchFilter();
    }, [filters]);

  const handlePageClick = (data) => {
    console.log(data.selected);

    setFilters({ ...filters, "page": data.selected + 1 });
  };

  return (
    <>
      <div>Current page: {filters.page}</div>
      <div>total products in this page: {listData.length}</div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />


      <div>
        Reducer:
        <p>Count: {counterState.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Reset</button>
      </div>
    </>
  );
}
