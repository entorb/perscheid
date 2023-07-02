/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-unused-vars
function defineTable() {
  const table = new Tabulator("#table-perscheid", {
    height: 800, // set height of table to enable virtual DOM
    layout: "fitColumns", // fit columns to width of table (optional)
    // autoColumns: true, // very nice!!!
    tooltipsHeader: true,
    selectable: false,
    columns: [
      // Define Table Columns
      // not using the checkbox column, as clicking the checkbox is not the same as clicking the row
      // { formatter: "rowSelection", titleFormatter: "rowSelection", align: "center", headerSort: true },
      {
        field: "Originalnummer",
        title: "Nr",
        sorter: "number",
        headerFilter: true,
        width: 100,
      },
      {
        field: "A-Nummern",
        title: "A-Nr",
        sorter: "string",
        headerFilter: true,
        width: 100,
      },
      {
        field: "Stichworte",
        title: "Stichworte",
        sorter: "string",
        headerFilter: true,
      },
      {
        field: "Buch",
        title: "Buch",
        sorter: "string",
        headerFilter: true,
        width: 100,
      },
      {
        field: "PostkartenNr",
        title: "Postkarten",
        sorter: "string",
        headerFilter: true,
        width: 100,
      },
    ],
    rowClick: function (e, row) {
      const rowData = row.getData();
      if ("URL" in rowData === true) {
        const activityUrl = rowData["URL"];
        window.open(activityUrl);
      }
    },
  });

  table.setSort([{ column: "Originalnummer", dir: "desc" }]);

  return table;
}
const table = defineTable();

// eslint-disable-next-line no-unused-vars
function fetch_table_data_v2() {
  const url = "./datenbank.json";
  return $.getJSON(url, function (data) {
    console.log("fetching: success");
  })
    .done(function (data) {
      console.log("fetching: done");

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        let s = row["Stichworte"];

        s = s.replace(/[\?\.,!\-\/\+&]/g, " ");
        s = s.replace(/\s+/g, " ");
        s = s.trim();

        row["URL"] =
          "https://www.google.de/search?q=Perscheid+" +
          encodeURI(s) +
          "&hl=de&tbm=isch";
        data[i] = row;
      }
      table.setData(data);
    })
    .fail(function () {
      console.log("fetching: failed");
    });
}

// array of promises for async fetching
const promises = [];
promises.push(fetch_table_data_v2());

// add promise for tableBuilt event
// requires Tabulator V5
// promises.push(
//   new Promise((resolve) => {
//     table.on("tableBuilt", () => {
//       console.log("tableBuilt");
//       resolve();
//     });
//   })
// );

// Wait for all async promises to be done (all data is fetched)
// Promise.all(promises).then(function () {
//   table.setData(data);
// });
