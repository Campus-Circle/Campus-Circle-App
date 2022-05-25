import React from "react";
import { useTable, useSortBy } from "react-table";
import { IoCaretDownOutline } from "react-icons/io5";
import { motion } from "framer-motion";
function Table({
  columns: userColumns,
  data,
  renderRowSubComponent,
  className,
  headerCellClassName,
  dataCellClassName,
  rowCellClassName,
  headerRowClassName,
  headerFontWeight,
}) {
  console.log(userColumns);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useSortBy

    // for sub components too!
  );

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
      </pre> */}
      <table {...getTableProps()} className={`${className}`}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={`${headerRowClassName}`}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                  className={`${headerCellClassName}`}
                  style={{
                    fontWeight: headerFontWeight,
                  }}
                >
                  <div className={`flex items-center`}>
                    <div>{column.render("Header")}</div>
                    <IoCaretDownOutline
                      className={`mx-2
                        ${
                          column.isSorted
                            ? "opacity-100 translate-x-0"
                            : "rotate-45 -translate-x-6 opacity-0"
                        }

                        ${
                          column.isSorted
                            ? column.isSortedDesc
                              ? ""
                              : "rotate-180"
                            : ""
                        }
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
          {rows.map((row, i) => {
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
                            width: cell.column.width,
                          },
                        })}
                        className={`${dataCellClassName}`}
                      >
                        {cell.render("Cell")}
                      </motion.td>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <br />
      {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
    </>
  );
}

export default Table;
