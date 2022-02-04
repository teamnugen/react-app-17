import React, { useState } from "react";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

/*
[  <-- sorted by full name asc
  {
    // top row (expandible row attributes)
    fullName: 'Smith, John',  <- most recent?
    tokenId: tokenId,
    lastStatus: APPROVED,
    expanded: false,
    children: [   <-- sorted by date
      { .. },
      { .. },
    ]
  },
  ...
]
*/

const columns = [
  { dataKey: "button", title: "" },
  { dataKey: "name", title: "Name" },
  { dataKey: "tokenId", title: "Token ID" },
  { dataKey: "created", title: "Submitted" },
  { dataKey: "workflowStatus", title: "Request Status" },
];

export default function GroupedTableV3({ tableData }) {
  console.log("RENDERRRRRRRRRRR");
  // console.table(tableData);

  const [tableRows, setTableRows] = useState(tableData);

  const toggleTableRow = (selectedRow) => {
    // console.log("toggleTableRow", selectedRow);

    let tempRows = [...tableRows];
    let found = tempRows.find((row) => row.tokenId === selectedRow.tokenId);
    found.expanded = !found.expanded;

    console.table(tempRows);

    setTableRows(tempRows);
  };

  return (
    <div>
      <p>Expanded Rows:</p>
      <ul>
        {tableRows.map((item) => item.expanded && <li>{item.fullName}</li>)}
      </ul>

      <TableContainer component={Paper}>
        <Table aria-label="simple grouped table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Full Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell colSpan={2}>Request Status</TableCell>
              {/* {columns.map(item => (
        <TableCell key={item.title}>{item.title}</TableCell>
      ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell colSpan={columns.length} onClick={() => toggleTableRow(row)}>
                    <IconButton>
                      {row.expanded ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                    <span>{row.fullName}</span>
                  </TableCell>
                  <TableCell>{row.lastStatus}</TableCell>
                  <TableCell>{row.created}</TableCell>
                </TableRow>
                {row.expanded && row.children.map((child) => (
                  <TableRow key={row.id}>
                    <TableCell />
                    <TableCell />
                    <TableCell>{child.lastName}</TableCell>
                    <TableCell>{child.firstName}</TableCell>
                    <TableCell>{child.created}</TableCell>
                    <TableCell>{child.workflowStatus}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell size="small"/>
            <TableCell>Full Name</TableCell>
            <TableCell>Token ID</TableCell>
            <TableCell>Submitted</TableCell>
            <TableCell>Request Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <React.Fragment>
              <TableRow key={index}>
                <TableCell onClick={() => toggleTableRow(item)}>
                  <IconButton>
                    {item.expanded ? <ExpandMore /> : <ExpandLess />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <span>{item.fullName}</span>
                </TableCell>
              </TableRow>
              {item.expanded &&
                item.children.map((child) => (
                  {columns.map((col) => (
                    <TableCell key={col.dataKey}>
                      {child[col.dataKey]}
                    </TableCell>
                  ))}
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
}

// export default GroupedTableV3;
