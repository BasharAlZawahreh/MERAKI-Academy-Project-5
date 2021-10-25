import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import "./Users.css";
import axios from "axios";
import { setUser, deleteUser, updateUser } from "../../../actions/users";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import jwtDecode from "jwt-decode";

const Styles = styled.div`
  padding: 3rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem",
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem",
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {/* <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div> */}
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function Users() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      adminToken: state.adminToken.adminToken,
      users: state.user.users,
    };
  });

  let token = state.adminToken || localStorage.getItem("token");
  const isSuperAdmin = jwtDecode(token).role === "SuperAdmin";

  const toggleBlockUser = async (id) => {
    const res = await axios.patch(
      `http://localhost:5000/admin/blockUser/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateUser(id));
  };

  const makeAdmin = async (id) => {
    await axios
      .post(
        `http://localhost:5000/admin/makeAdmin/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        swal('Admin set successfully!')
        dispatch(deleteUser(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = React.useMemo(() => [
    {
      Header: "Name",
      columns: [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstName",
        },
        {
          Header: "Last Name",
          accessor: "lastName",
          // Use our custom `fuzzyText` filter on this column
          filter: "fuzzyText",
        },
      ],
    },
    {
      Header: "Info",
      columns: [
        {
          Header: "Email",
          accessor: "email",
          filter: "fuzzyText",
        },
        {
          Header: "SSN",
          accessor: "ssn",
          filter: "fuzzyText",
        },
        // {
        //   Header: "Mobile",
        //   accessor: "mobile",
        //   filter: "fuzzyText",
        // },
        {
          Header: "Age",
          accessor: "age",
          Filter: NumberRangeColumnFilter,
          filter: "between",
        },
        {
          Header: "Role",
          accessor: "role",
          filter: "fuzzyText",
        },
        {
          Header: "City",
          accessor: "city",
          filter: "fuzzyText",
        },
        {
          Header: "License",
          id: "license_img",
          accessor: "license_img",
          filter: "none",
          Cell: ({ cell }) => (
            <img src={cell.row.values.license_img} alt="license" />
          ),
        },
        {
          Header: "Block user",
          id: "is_Blocked",
          accessor: "is_Blocked",
          Cell: ({ cell }) => {
            let ava = cell.row.values.is_Blocked ? true : false;

            return (
              <label class="switch1">
                <input
                  type="checkbox"
                  checked={ava}
                  onClick={() => toggleBlockUser(cell.row.values.id)}
                />
                <span class="slider1 round1"></span>
              </label>
            );
          },
        },
        {
          Header: "Make Admin",
          id: "makeAdmin",
          accessor: "makeAdmin",
          Cell: ({ cell }) => {
            return (
              <button
                onClick={() => {
                  isSuperAdmin
                    ? makeAdmin(cell.row.values.id)
                    : swal('Error',"Sorry, only super admin can do this!");
                }}
              >
                Make Admin
              </button>
            );
          },
        },
      ],
    },
  ]);

  const data = state.users.map((e) => {
    return {
      id: e.user_id,
      firstName: e.firstName,
      lastName: e.lastName,
      age: e.age,
      city: e.city,
      email: e.email,
      ssn: e.ssn,
      role: e.role,
      license_img: e.license_img,
      mobile: e.mobile,
      is_Blocked: e.is_Blocked,
    };
  });

  return <Styles>{data && <Table columns={columns} data={data} />}</Styles>;
}

export default Users;
