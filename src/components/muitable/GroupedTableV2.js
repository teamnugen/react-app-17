import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const columns = [
  { dataKey: "tokenId", title: "tokenId" },
  { dataKey: "created", title: "Submitted" },
  { dataKey: "name", title: "Name" },
  { dataKey: "workflowStatus", title: "Status" }
];

const rows = [
  { firstName: "John", lastName: "Smith", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T01:58:59.525Z", workflowStatus: " ACCTREQ-DENIED" },
  { firstName: "Adam", lastName: "Smith", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T01:30:02.796Z", workflowStatus: " ACCTREQ-DENIED" },
  { firstName: "John", lastName: "Smoth", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T02:00:33.034Z", workflowStatus: " ACCTREQ-APPROVED" },
  { firstName: "Mike", lastName: "Nugen", tokenId: "560459ea-b47a-4801-97b4-cc3500c6680a", created: "2021-02-19T01:37:36.910Z", workflowStatus: " ACCTREQ-APPROVED" },  
];

const getGroupedData = rows => {
  const groupedData = rows.reduce((acc, item) => {
    let key = item['tokenId'];
    let groupData = acc[key] || [];
    acc[key] = groupData.concat([item]);
    return acc;
  }, {});
  return groupedData;
}

const getGroupIDs = (groups) => {
  const expGroups = {};
  Object.keys(groups).forEach(item => {
    expGroups[item] = false;
  });

  return expGroups;
};

function GroupedTableV2(props) {
  // let { rows, columns } = props;
  let groupedData = getGroupedData(rows);
  let groups = getGroupIDs(groupedData);


  const [expandedGroups, setState] = useState(groups);
  console.log('expandedGroups', expandedGroups);

  const expandRow = groupVal => {
    // console.log('groupVal', groupVal);
    console.log('expandedGroups[groupVal]', expandedGroups[groupVal]);

    let tmpGroups = {...expandedGroups};
    tmpGroups[groupVal] = !tmpGroups[groupVal];
    console.log('tmpGroups', tmpGroups);

    setState(tmpGroups);
  };

  return (
    <div>
      <ul>
        {Object.keys(expandedGroups).map((itemKey, index) => (
          <li>{itemKey} : {expandedGroups[itemKey] ? "true" : "false"}</li>
        ))}
      </ul>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            {columns.map(item => (
              <TableCell>
                <TableSortLabel>
                  {item.title}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedData).map( (key, index) => (
            <React.Fragment>
              <TableRow key={index}>
                <TableCell colSpan={columns.length} onClick={() => expandRow(key)}>
                  <IconButton>
                    <Icon>
                      {expandedGroups[key] ? "expand_more" : "chevron_right"}
                    </Icon>
                  </IconButton>
                  <span>{key}</span>
                </TableCell>
              </TableRow>
              {expandedGroups[key] && groupedData[key].map(item => (
                <TableRow>
                  <TableCell />
                  <TableCell />
                  {columns.map(col => (
                    <TableCell>{item[col.dataKey]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default GroupedTableV2;
