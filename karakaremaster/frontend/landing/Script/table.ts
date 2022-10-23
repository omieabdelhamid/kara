// run tsc in this directory to compile to js before testing
const loader = document.getElementById("loader") as HTMLButtonElement
const tables = document.getElementById("tables") as HTMLSelectElement
const table = document.getElementById("table") as HTMLTableElement
const dropdown = document.getElementById("dropdown") as HTMLDivElement
const tableModification = document.getElementById("tableModification") as HTMLDivElement
const commands = document.getElementById("commands") as HTMLSelectElement
const tableModificationInput = document.getElementById("tableModificationInput") as HTMLInputElement
const content = document.getElementById("content") as HTMLDivElement
const tableLabel = document.getElementById("tableLabel") as HTMLHeadingElement
const modifyTableHeading = document.getElementById("modifyTableHeading") as HTMLHeadingElement
const modify = document.getElementById("modify") as HTMLInputElement


dropdown.style.display = "none";
tableModification.style.display = "none";
content.style.display = "none";

loader.addEventListener("click", loadData);
modify.addEventListener("click", modifyTable);
tables.addEventListener("change", changeTable);
commands.addEventListener("change", changeCommand);

type tableInfo = {columns: string[], data: string[][]}
type databaseInfo = {tableNames: string[]}
type tableRequestData = {name: string}
type deleteRequestData = {table_name: string, row: string , value:string }
type addRequestData = {table_name: string, to_add: Array<string>}
type updateRequestData = {table_name: string, update_value: string, condition: string, set:string,toChange:string}



function changeCommand(): void {
    switch (commands.value) {
        case "add":
            tableModificationInput.setAttribute("placeholder", "val1, val2, val3, ...")
            break;
        case "update":
            tableModificationInput.setAttribute("placeholder", "row value,column to change,row to change,new value")
            break;
        case "delete":
            tableModificationInput.setAttribute("placeholder", "column name, value")
            break;
    }
}

function changeTable(): void {
    const postParameters: tableRequestData = {
        name: tables.value
    }

    fetch('http://localhost:4567/table', {
        method: 'POST',
        body: JSON.stringify(postParameters),
        headers: {'Access-Control-Allow-Origin':'*'},
    })
        .then((response: Response) => response.json())
        .then((data: tableInfo) => updateTable(data))
        .catch((error: any) => console.error("Error:", error))

    modifyTableHeading.innerHTML = `Modify Table: ${capitalizeFirstLetter(postParameters.name)}`
    tableLabel.innerHTML = `Visualizer: ${capitalizeFirstLetter(postParameters.name)}`
}

function modifyTable(): void {
    switch (commands.value) {
        case "add":
            const addParameters: addRequestData = {
                table_name: tables.value,
                to_add: tableModificationInput.value.split(",")
            }
            fetch('http://localhost:4567/insert', {
                method: 'POST',
                body: JSON.stringify(addParameters),
                headers: {'Access-Control-Allow-Origin':'*'},
            })
                .then((response: Response) => response.json())
                .then((data: tableInfo) => updateTable(data))
                .catch((error: any) => console.error("Error:", error))
            break;
        case "update":
            let arrUpdate = tableModificationInput.value.split(",");
            const updateParameters: updateRequestData = {
                table_name: tables.value,
                update_value: arrUpdate[3],
                condition: arrUpdate[0],
                set:arrUpdate[1],
                toChange:arrUpdate[2],

            }
            fetch('http://localhost:4567/update', {
                method: 'POST',
                body: JSON.stringify(updateParameters),
                headers: {'Access-Control-Allow-Origin':'*'},
            })
                .then((response: Response) => response.json())
                .then((data: tableInfo) => updateTable(data))
                .catch((error: any) => console.error("Error:", error))
            break;
        case "delete":
            let arrDelete = tableModificationInput.value.split(",");
            const deleteParameters: deleteRequestData = {
                table_name: tables.value,
                row: arrDelete[0],
                value: arrDelete[1],
            }
            fetch('http://localhost:4567/delete', {
                method: 'POST',
                body: JSON.stringify(deleteParameters),
                headers: {'Access-Control-Allow-Origin':'*'},
            })
                .then((response: Response) => response.json())
                .then((data: tableInfo) => updateTable(data))
                .catch((error: any) => console.error("Error:", error))
            break;
    }
}

function loadData(): void {
    fetch('http://localhost:4567/database')
        .then((response: Response) => response.json())
        .then((data: databaseInfo) => updateDropdown(data))
        .catch((error: any) => console.error("Error:", error))
}

function updateDropdown(data : databaseInfo) {
    if (data == null) {
        return;
    }
    dropdown.style.display = "block";
    const tableNames : string[] = data.tableNames;

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

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateTable(selectedTable : tableInfo) {
    loader.style.display = "none";
    content.style.display = "block";
    const columns : string[] = selectedTable.columns
    const data: string[][] = selectedTable.data
    table.innerHTML = ""
    table.innerHTML += `<tr id="header"><tr>`
    const header = document.getElementById("header") as HTMLTableRowElement
    for (let i = 0; i <columns.length; i += 1) {
        header.innerHTML += `<th>${columns[i]}</th>`
    }
    for (let i = 0; i < data.length; i += 1) {
        let row = table.insertRow();
        for (let j = 0; j < columns.length; j += 1) {
            let cell = row.insertCell();
            cell.innerHTML = `${data[i][j]}`
        }
    }
}
