import React, { useState, useEffect } from 'react'
import Items from "./Item"
import ReactPaginate from 'react-paginate';
import apis from "../../apis";

export default function PaginatedItems({ itemsPerPage }) {
    const [listData, setListData] = useState(1);
    const listDatas = 100;
    let pages = [];
    for (let i = 1; i <= listDatas; i++) {
        pages.push(i);
    }

    useEffect(() => {
      apis.categories
        .getData()
        .then(
          (res) => {
            const { pagination } = res.data.meta;
            // xử lý categories nếu cần (Xử lý computed data)
            setListData(pagination.total);
          },
          (err) => {
            console.log(err);
          }
        );
      return () => {};
    }, []);

    // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = pages.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pages.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pages.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        onPageActive
      />
    </>
  )
}
