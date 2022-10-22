import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { IoCaretDownOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

function Table({
  columns: userColumns,
  data,
  renderRowSubComponent,
  className,
  headerCellClassName,
  dataCellClassName,
  rowCellClassName,
  headerRowClassName,
  headerFontWeight
}) {
  console.log(userColumns);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { expanded, pageIndex, pageSize }
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        expanded: {},
        pageIndex: 0
      }
    },
    useSortBy,
    usePagination
    // for sub components too!
  );

  return (
    <>
      <table {...getTableProps()} className={`${className}`}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={`${headerRowClassName}`}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    style: { minWidth: column.minWidth, width: column.width }
                  })}
                  className={`${headerCellClassName}`}
                  style={{
                    fontWeight: headerFontWeight
                  }}
                >
                  <div className={`flex items-center justify-center`}>
                    <div>{column.render('Header')}</div>
                    <IoCaretDownOutline
                      className={`mx-2
                        ${
                          column.isSorted
                            ? 'opacity-100 translate-x-0'
                            : 'rotate-45 -translate-x-6 opacity-0'
                        }

                        ${column.isSorted ? (column.isSortedDesc ? '' : 'rotate-180') : ''}
                        transition-all
                    `}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment key={i}>
                <tr className={`${rowCellClassName}`}>
                  {row.cells.map((cell) => {
                    return (
                      <motion.td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width
                          }
                        })}
                        className={`${dataCellClassName}`}
                      >
                        {cell.render('Cell')}
                      </motion.td>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="inline-flex my-4 justify-center w-full sticky">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`p-2 bg-primary/80 hover:bg-primary text-white transition-all
            ${canPreviousPage ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
          `}
        >
          <HiChevronLeft />
        </button>
        <div className="self-center w-20 h-8 flex justify-center items-center text-center bg-gray-100">
          {pageIndex + 1} of {pageCount}
        </div>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`p-2 bg-primary/80 hover:bg-primary text-white transition-all
            ${canNextPage ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
          `}
        >
          <HiChevronRight />
        </button>
      </div>
    </>
  );
}

export default Table;
