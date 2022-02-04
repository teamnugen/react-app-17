import React from "react";
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

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (a[orderBy] > b[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class GroupedTable extends React.Component {
  state = {
    groupBy: "tokenId",
    sortBy: "",
    sortOrder: "asc",
    expandedGroups: ["4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f"]
  };

  getColumnData = columns => {
    return columns.filter(item => item.dataKey !== this.state.groupBy);
  };

  getGroupedData = rows => {
    const groupedData = rows.reduce((acc, item) => {
      let key = item[this.state.groupBy];
      let groupData = acc[key] || [];
      acc[key] = groupData.concat([item]);
      return acc;
    }, {});

    const expandedGroups = {};
    const { sortBy, sortOrder } = this.state;
    Object.keys(groupedData).forEach(item => {
      expandedGroups[item] = this.state.expandedGroups.indexOf(item) !== -1;
      groupedData[item] = groupedData[item].sort(getSorting(sortOrder, sortBy));
    });

    this.groups = expandedGroups;

    console.log('expandedGroups', expandedGroups);
    console.log('this.groups', expandedGroups);

    return groupedData;
  };

  handleRequestSort = property => {
    const sortBy = property;
    let sortOrder = "desc";

    if (this.state.sortBy === property && this.state.sortOrder === "desc") {
      sortOrder = "asc";
    }

    this.setState({ sortOrder, sortBy });
  };

  expandRow = groupVal => {
    const curr = this.groups[groupVal];
    let expandedGroups = this.state.expandedGroups;
    if (curr) {
      expandedGroups = expandedGroups.filter(item => item !== groupVal);
    } else {
      if (expandedGroups.indexOf(groupVal) === -1) {
        //Maintain all open groups ever!!
        expandedGroups = expandedGroups.concat([groupVal]);
      }
    }
    this.setState({ expandedGroups });
  };

  render() {
    // let { rows, columns } = this.props;
    let columnData = this.getColumnData(columns);
    let groupedData = this.getGroupedData(rows);
    let { sortBy, sortOrder } = this.state;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {columnData.map(item => (
              <TableCell>
                <TableSortLabel
                  active={sortBy === item.dataKey}
                  direction={sortOrder}
                  onClick={this.handleRequestSort.bind(null, item.dataKey)}
                >
                  {item.title}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedData).map(key => {
            return (
              <React.Fragment>
                <TableRow>
                  <TableCell
                    colSpan={columnData.length}
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={this.expandRow.bind(null, key)}
                  >
                    <IconButton>
                      <Icon>
                        {this.groups[key] ? "expand_more" : "chevron_right"}
                      </Icon>
                    </IconButton>
                    <span>{key}</span>
                  </TableCell>
                </TableRow>
                {this.groups[key] && groupedData[key].map(item => (
                  <TableRow>
                    {columnData.map(col => (
                      <TableCell>{item[col.dataKey]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default GroupedTable;
