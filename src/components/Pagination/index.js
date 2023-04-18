import React from "react";
import _ from "lodash";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <>
      <div className="flex justify-end mt-10">
        <nav aria-label="Page navigation example flex">
          <ul class="flex items-center -space-x-px">
            {pages.map((page, index) => {
              return (
                <li
                  key={index}
                  className={
                    page === currentPage
                      ? "px-3 py-2 mx-2 leading-tight text-white bg-datasense-blue border rounded-md border-gray-300"
                      : "px-3 py-2 mx-2 leading-tight text-black bg-light-gray border rounded-md border-gray-300"
                  }
                  onClick={() => onPageChange(page)}
                  style={{ cursor: "pointer" }}
                >
                  <a>{page}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
