import React from 'react';
import GroupedTableV3 from "./GroupedTableV3";

const columns = [
  { dataKey: "tokenId", title: "tokenId" },
  { dataKey: "created", title: "Submitted" },
  { dataKey: "name", title: "Name" },
  { dataKey: "workflowStatus", title: "Status" }
];

const rows = [
  { firstName: "Adam", lastName: "Smoth", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-19T01:58:59.525Z", workflowStatus: " ACCTREQ-DENIED" },
  { firstName: "John", lastName: "Smith", tokenId: "4127e3e6-e1e3-4de5-8273-7ed72fc4cd2f", created: "2021-02-20T01:30:00.034Z", workflowStatus: " ACCTREQ-APPROVED" },
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

function sortByFullName(items) {
  // console.table(items);

  // temp array to hold objects with index and full name
  const fullNames = items.map((item, i) => {
    return { index: i, fullName: (item.lastName + ", " + item.firstName) };
  });
  // console.table(fullNames);

  // sorts the temp array containing the full names
  fullNames.sort(function (a, b) {
    return a.fullName.localeCompare(b.fullName);
  });

  const sorted = fullNames.map((el) => {
    let item = items[el.index];
    item['fullName'] = el.fullName;
    return item;
  });
  // console.table(sorted);

  return sorted;
}

function groupByTokenId(items) {
  const results = {};
  for (const item of items) {
    const { tokenId } = item;
    // console.log('results[tokenId]', results[tokenId]);
    if (results[tokenId] === undefined) {
      results[tokenId] = [];
    }
    results[tokenId].push(item);
  }

  return results;
}

function latestRecord(items) {
  const sorted = items.sort((a, b) => {
    return (a.created < b.created) ? -1 : (a.created > b.created ? 1 : 0);
  });
  return  sorted[sorted.length - 1];
}

// fullName: latestRecordByPropName(children, "fullName"),
// function latestRecordByPropName(items, propName) {
//   const latest = latestRecord(items);
//   return latest[propName];
// }

function buildTableData(groupedItems) {
  let parents = [];
  Object.keys(groupedItems).forEach(itemKey => {
    let children = groupedItems[itemKey];
    const latest = latestRecord(children);
    let data = {
      expanded: false,  // collapsed
      // fullName: latestRecordByPropName(children, "fullName"),
      // lastStatus: latestRecordByPropName(children, "created"),
      fullName: latest.fullName,
      lastStatus: latest.workflowStatus,
      tokenId: itemKey,
      children: children,
    };
    parents.push(data);
  });
  return parents;
}

export default function Main() {
  const sortedData = sortByFullName(rows);
  const groupedRawData = groupByTokenId(sortedData);
  const tableData = buildTableData(groupedRawData);

  return (
    <div>
      <GroupedTableV3 tableData={tableData} />
    </div>
  );
}
