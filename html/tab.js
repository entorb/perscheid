function defineTable() {
    var table = new Tabulator("#table-perscheid", {
        height: 800, // set height of table to enable virtual DOM
        layout: "fitColumns", //fit columns to width of table (optional)
        // autoColumns: true, // very nice!!!
        tooltipsHeader: true,
        selectable: false,
        columns: [ //Define Table Columns
            // not using the checkbox column, as clicking the checkbox is not the same as clicking the row
            // { formatter: "rowSelection", titleFormatter: "rowSelection", align: "center", headerSort: true },
            { title: "Nr", field: "Originalnummer", sorter: "number", headerFilter: true, width: 100 },
            { title: "A-Nr", field: "A-Nummern", sorter: "string", headerFilter: true, width: 100 },
            { title: "Stichworte", field: "Stichworte", sorter: "string", headerFilter: true },
            { title: "Buch", field: "Buch", sorter: "string", headerFilter: true, width: 100 },
            { title: "Postkarten", field: "PostkartenNr", sorter: "string", headerFilter: true, width: 100 },
        ],
        rowClick: function (e, row) {
            var rowData = row.getData();
            if ('URL' in rowData === true) {
                var activityUrl = rowData["URL"];
                window.open(activityUrl);
            }
        },
    });

    table.setSort([
        { column: "Originalnummer", dir: "desc" },
    ]);

    return table;
}

// // ASync JQuery fetching
// function fetch_table_data() {
//     table.setData("./datenbank.json", {}, "get")
// }

function fetch_table_data_v2() {
    const url =
        "./datenbank.json";
    return $.getJSON(url, function (data) {
        console.log("fetching: success");
    })
        .done(function (data) {
            console.log("fetching: done");

            // console.log(my_array);
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                let s = row["Stichworte"];

                s = s.replace(/[\?\.,!\-\/\+&]/g, " ");
                // s = s.replace("?", " ");
                // s = s.replace(".", " ");
                // s = s.replace(",", " ");
                // s = s.replace("!", " ");
                // s = s.replace("-", " ");
                // s = s.replace("/", " ");
                // s = s.replace("+", " ");
                // s = s.replace("&", " ");
                s = s.replace(/\s+/g, " ");
                s = s.trim()

                row["URL"] = "https://www.google.de/search?q=Perscheid+" + encodeURI(s) + "&hl=de&tbm=isch"
                data[i] = row;
                // console.log(row["URL"]);
            }
            table.setData(data);
            // return data;
        })
        .fail(function () {
            console.log("fetching: failed");
        });
}
