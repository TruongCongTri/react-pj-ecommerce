import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router";
import ReactPaginate from "react-paginate";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
// import SearchInput from "../../../components/forms/SearchInput";
import CategoryTable from "../../../components/tables/CategoryTable";

import HeaderIcon from "../../../components/icons/HeaderIcon";
import { PiExportBold } from "react-icons/pi";
import { HiMiniPlus } from "react-icons/hi2";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import apis from "../../../apis";

export default function CategoriesDashboard() {
  
  //* btn
  const navigate = useNavigate();
  const handleAddCate = () => {
    navigate("/admin/categories/add");
  };
  const handleExportCate = () => {
    console.log("export cate");
  };

  //*1: synsc params from url to filters
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || 1,
    perPage: searchParams.get("per_page") || 15,
  });
  // console.log(filters);

  //*2: khởi tạo filters
  const [currentPage, setCurrentPage] = useState();
  const [searchValue, setSearchValue] = useState();
  const [valuePerPage, setValuePerPage] = useState();

  useEffect(() => {
    setCurrentPage(filters.page);
    setSearchValue(filters.search);
    setValuePerPage(filters.perPage);
  }, [filters]);

  //*3: call api get list of data base on values from filters
  // Lưu lại danh sách categories từ server
  const [listData, setListData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);
  // pagination
  const [totalPage, setTotalPage] = useState((1));
  console.log(`init total page ${totalPage}`);

  // call api get list cate data
  useEffect(() => {
    setLoadingGet(true);
    apis.categories
      .getData(currentPage, valuePerPage)
      .then(
        (res) => {
          const { categories } = res.data.data;
          const { pagination } = res.data.meta;
          // xử lý categories nếu cần (Xử lý computed data)
          setListData(categories);

          setTotalPage((pagination.total_pages));
          console.log(`total page ${pagination.total_pages}`);

          // setTotalData(pagination.total);
          // if (pagination.count == totalData) {
          //   setFromData(1);
          // } else if (currentPage < totalPage) {
          //   setFromData(pagination.per_page * (currentPage - 1) + 1);
          // } else {
          //   setFromData(totalData - pagination.count + 1);
          // }

          // if (pagination.count == totalData) {
          //   setToData(totalData);
          // } else if (currentPage < totalPage) {
          //   setToData(pagination.per_page * currentPage);
          // } else {
          //   setToData(totalData);
          // }
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
  }, [filters, currentPage]);

  //*5: sync filters value to URL
  // update filters
  const handleChangeFilters = (e) => {
    const key = e.target.name || "page";
    const value = e.target.value;
    setFilters({ ...filters, [key]: value });
    console.log("handle change filters");
    console.log(filters);
    console.log(`handle change filters - page index ${filters.page}`);
  };

  // sync filters value to URL
  const handleSubmitSearchFilter = () => {
    const params = new URLSearchParams();

    params.set("search", filters.search);
    params.set("page", filters.page);
    params.set("per_page", filters.perPage);
    setSearchParams(params, {
      preventScrollReset: true,
    });

    console.log("handle submit search filters");
    console.log(`handle submit search filters - page index ${filters.page}`);
  };
  // whenever filters is updated
  useEffect(() => {
    handleSubmitSearchFilter();
  }, [filters]);

  //*6: handle pagination
  // xử lý chuyển trang
  const handlePageClick = (data) => {
    console.log("handle click page");
    console.log(`clicked page index ${data.selected + 1}`);

    const key = "page";
    const value = data.selected + 1;
    setFilters({ ...filters, [key]: value });

    // const params = new URLSearchParams();

    // params.set("search", filters.search);
    // params.set("page", filters.page);
    // params.set("per_page", filters.perPage);
    // setSearchParams(params, {
    //   preventScrollReset: true,
    // });
  };

  //*7: update listData based on search value
  // Dùng để lọc dữ liệu theo search params
  const [filteredData, setFilteredData] = useState([]);

  // being called whenever listData or filters is updated
  useEffect(() => {
    const filtered = listData;
    setFilteredData(filtered);

    setFilteredData(
      listData.filter((o) =>
        o.name
          .trim()
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase())
      )
    );
    // setCurrentPage(filters.page);
    // console.log(currentPage);
  }, [listData, filters, currentPage]);

  // calculate from and to data of each page
  // const [totalData, setTotalData] = useState(0);
  // const [fromData, setFromData] = useState(0);
  // const [toData, setToData] = useState(0);

  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#DEDEFA]"
            text="text-[#5C59E8] font-semibold text-sm"
            type="submit"
            icon={<PiExportBold />}
            iconStyle="size-5"
            onClick={handleExportCate}
          >
            Export
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white font-semibold text-sm"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleAddCate}
          >
            Add Category
          </NormalButton>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        {/* <SearchInput
          size="min-w-[320px] max-w-[320px] "
          icon={<HiMiniMagnifyingGlass />}
          placeholder="Search category. . ."
          name="categorySearch"
          data={listData}
          updatedData={(_value) => {
            setFilteredData(_value);
           }}
        /> */}
        <div
          className={`flex items-center rounded-lg min-h-10 max-h-10 min-w-[320px] max-w-[320px] bg-white border`}
        >
          <div className="flex w-full px-3 py-2">
            {/* {props.label ? <label htmlFor={props.id}>{props.label}</label> : <></>}  */}

            <HeaderIcon
              item={<HiMiniMagnifyingGlass />}
              styling={`mr-1 size-5 text-neutral-500`}
            />
            <input
              type="text"
              onChange={handleChangeFilters}
              placeholder="Search category. . ."
              name="search"
              value={filters.search}
              className={`text-neutral-400 font-normal text-sm placeholder:text-neutral-400 w-full focus:outline-none`}
            />
            <button
              type="submit"
              className="text-white "
              // onClick={handleSubmitSearchFilter}
            >
              <HeaderIcon
                item={<HiMiniMagnifyingGlass />}
                styling={`mr-1 size-5 text-neutral-500`}
              />
            </button>
          </div>
        </div>

        <NormalButton
          color="bg-white"
          border="border"
          text="text-neutral-500 font-medium text-sm"
          size="min-w-[98px] max-w-[98px] min-h-10 max-h-10"
          type="submit"
          icon={<HiMiniAdjustmentsHorizontal />}
          iconStyle="size-5"
        >
          Filters
        </NormalButton>
      </div>
      <div className="rounded-lg w-full text-left bg-white border">
        <CategoryTable data={filteredData} loading={loadingGet}></CategoryTable>
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              {/* <span className="font-medium"> {fromData} </span>
              to
              <span className="font-medium"> {toData} </span>
              of
              <span className="font-medium"> {totalData} </span> */}
              results
            </p>
          </div>
          <div className="font-semibold text-base">
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
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
