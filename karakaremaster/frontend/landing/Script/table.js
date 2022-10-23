"use strict";
// run tsc in this directory to compile to js before testing
const loader = document.getElementById("loader");
const tables = document.getElementById("tables");
const table = document.getElementById("table");
const dropdown = document.getElementById("dropdown");
const tableModification = document.getElementById("tableModification");
const commands = document.getElementById("commands");
const tableModificationInput = document.getElementById("tableModificationInput");
const content = document.getElementById("content");
const tableLabel = document.getElementById("tableLabel");
const modifyTableHeading = document.getElementById("modifyTableHeading");
const modify = document.getElementById("modify");
dropdown.style.display = "none";
tableModification.style.display = "none";
content.style.display = "none";
loader.addEventListener("click", loadData);
modify.addEventListener("click", modifyTable);
tables.addEventListener("change", changeTable);
commands.addEventListener("change", changeCommand);
function changeCommand() {
    switch (commands.value) {
        case "add":
            tableModificationInput.setAttribute("placeholder", "val1, val2, val3, ...");
            break;
        case "update":
            tableModificationInput.setAttribute("placeholder", "row value,column to change,row to change,new value");
            break;
        case "delete":
            tableModificationInput.setAttribute("placeholder", "column name, value");
            break;
    }
}
function changeTable() {
    const postParameters = {
        name: tables.value
    };
    fetch('http://localhost:4567/table', {
        method: 'POST',
        body: JSON.stringify(postParameters),
        headers: { 'Access-Control-Allow-Origin': '*' },
    })
        .then((response) => response.json())
        .then((data) => updateTable(data))
        .catch((error) => console.error("Error:", error));
    modifyTableHeading.innerHTML = `Modify Table: ${capitalizeFirstLetter(postParameters.name)}`;
    tableLabel.innerHTML = `Visualizer: ${capitalizeFirstLetter(postParameters.name)}`;
}
function modifyTable() {
    switch (commands.value) {
        case "add":
            const addParameters = {
                table_name: tables.value,
                to_add: tableModificationInput.value.split(",")
            };
            fetch('http://localhost:4567/insert', {
                method: 'POST',
                body: JSON.stringify(addParameters),
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
                .then((response) => response.json())
                .then((data) => updateTable(data))
                .catch((error) => console.error("Error:", error));
            break;
        case "update":
            let arrUpdate = tableModificationInput.value.split(",");
            const updateParameters = {
                table_name: tables.value,
                update_value: arrUpdate[3],
                condition: arrUpdate[0],
                set: arrUpdate[1],
                toChange: arrUpdate[2],
            };
            fetch('http://localhost:4567/update', {
                method: 'POST',
                body: JSON.stringify(updateParameters),
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
                .then((response) => response.json())
                .then((data) => updateTable(data))
                .catch((error) => console.error("Error:", error));
            break;
        case "delete":
            let arrDelete = tableModificationInput.value.split(",");
            const deleteParameters = {
                table_name: tables.value,
                row: arrDelete[0],
                value: arrDelete[1],
            };
            fetch('http://localhost:4567/delete', {
                method: 'POST',
                body: JSON.stringify(deleteParameters),
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
                .then((response) => response.json())
                .then((data) => updateTable(data))
                .catch((error) => console.error("Error:", error));
            break;
    }
}
function loadData() {
    fetch('http://localhost:4567/database')
        .then((response) => response.json())
        .then((data) => updateDropdown(data))
        .catch((error) => console.error("Error:", error));
}
function updateDropdown(data) {
    if (data == null) {
        return;
    }
    dropdown.style.display = "block";
    const tableNames = data.tableNames;
    tables.innerHTML = "";
    for (let i = 0; i < tableNames.length; i += 1) {
        tables.innerHTML += `<option value="${tableNames[i]}">${capitalizeFirstLetter(tableNames[i])}</option>`;
    }
    if (tableNames.length > 0) {
        tableModification.style.display = "block";
        tables.value = tableNames[0];
        commands.value = "add";
        changeCommand();
        changeTable();
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function updateTable(selectedTable) {
    loader.style.display = "none";
    content.style.display = "block";
    const columns = selectedTable.columns;
    const data = selectedTable.data;
    table.innerHTML = "";
    table.innerHTML += `<tr id="header"><tr>`;
    const header = document.getElementById("header");
    for (let i = 0; i < columns.length; i += 1) {
        header.innerHTML += `<th>${columns[i]}</th>`;
    }
    for (let i = 0; i < data.length; i += 1) {
        let row = table.insertRow();
        for (let j = 0; j < columns.length; j += 1) {
            let cell = row.insertCell();
            cell.innerHTML = `${data[i][j]}`;
        }
    }
}
