import React from "react";
import { useTable, useSortBy } from "react-table";
import { IoCaretDownOutline } from "react-icons/io5";

function Table({
  columns: userColumns,
  data,
  renderRowSubComponent,
  rootClassName,
  headerCellClassName,
  dataCellClassName,
  rowCellClassName,
  headerRowClassName,
}) {
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
      <table {...getTableProps()} className={`${rootClassName}`}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={`${headerRowClassName}`}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${headerCellClassName}`}
                >
                  <span className={`flex justify-center items-center`}>
                    {column.render("Header")}

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
                  </span>
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
                      <td
                        {...cell.getCellProps()}
                        className={`${dataCellClassName}`}
                      >
                        {cell.render("Cell")}
                      </td>
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
