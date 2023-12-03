import React from 'react';

function Pagination({ index ,setCurrPage,handlePagintion}) {
  return (
    <li>
      <button
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={()=>{
          setCurrPage(index+1);
          handlePagintion(index+1);
        }}
      >
        {index + 1}
      </button>
    </li>
  );
}

export default Pagination;
