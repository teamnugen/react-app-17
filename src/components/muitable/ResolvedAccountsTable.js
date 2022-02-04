import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatDateTime } from '../../../models/date';
import ResolvedAccountsData from './ResolvedAccountsData';

const columns = [
  { dataKey: "button", title: "" },
  { dataKey: "name", title: "Name" },
  { dataKey: "tokenId", title: "Token ID" },
  { dataKey: "created", title: "Submitted" },
  { dataKey: "workflowStatus", title: "Request Status" },
];

const REPLACED_STRING = "ACCTREQ-";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function groupAccountsByUserFullName(accounts) {
  // Group by token Id
  const groupedData = accounts.reduce((acc, item) => {
    // item['created'] = formatDateTime(item['created']);
    item['workflowStatus'] = item['workflowStatus'].replace(REPLACED_STRING, "");

    const key = item['tokenId'];
    const groupData = acc[key] || [];
    acc[key] = groupData.concat([item]);
    return acc;
  }, {});

  // Rename object keys from `token Id` to `full name`
  Object.keys(groupedData).forEach(key => {
    const fullName = groupedData[key][0].lastName + ", " + groupedData[key][0].firstName;
    groupedData[fullName] = groupedData[key];
    delete groupedData[key];
  });
  return groupedData;;
};

const getGroupIDs = (groups) => {

  const expGroups = {};
  Object.keys(groups).forEach(item => {
    expGroups[item] = false;
  });

  return expGroups;
};

const ResolvedAccountsTable = ({ resolvedAccounts }) => {
  console.log("Render...");
  const groupedData = groupAccountsByUserFullName(resolvedAccounts);
  const groups = getGroupIDs(groupedData);

  const [expandedGroups, setState] = useState(groups);
  console.log('expandedGroups: ', expandedGroups);

  const expandRow = (groupKey) => {
    console.log('Clicked', expandedGroups[groupKey]);

    const tmpGroups = {...expandedGroups};
    tmpGroups[groupKey] = !expandedGroups[groupKey];
    console.log('tmpGroups', tmpGroups);

    setState(tmpGroups);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple grouped table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            <TableCell>Token ID</TableCell>
            <TableCell>Submitted</TableCell>
            <TableCell>Request Status</TableCell>
            {/* {columns.map(item => (
        <TableCell key={item.title}>{item.title}</TableCell>
      ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedData).map((key) => (
            <React.Fragment key={key}>
              <TableRow>
                <TableCell colSpan={columns.length} onClick={() => expandRow(key)}>
                  <IconButton>
                    { expandedGroups[key] ? <ExpandMore /> : <ExpandLess /> }
                  </IconButton>
                  <span>{key}</span>
                </TableCell>
              </TableRow>
              {expandedGroups[key] && groupedData[key].map(item => (
                <TableRow key={item.created}>
                  {columns.map(col => (
                    <TableCell key={col.dataKey}>{item[col.dataKey]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResolvedAccountsTable;
