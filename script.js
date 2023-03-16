const clothingForm = document.getElementById("clothingForm");
const searchForm = document.getElementById("searchForm");
const result = document.getElementById("result");
const confirmation = document.getElementById("confirmation");
const clothingTableBody = document.getElementById("clothingTableBody");

let clothingStorage = new Map();

function loadStorage() {
    const storedData = localStorage.getItem("clothingStorage");
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        clothingStorage = new Map(parsedData);
    }
}

function saveStorage() {
    const serializedData = JSON.stringify(Array.from(clothingStorage.entries()));
    localStorage.setItem("clothingStorage", serializedData);
}

function updateTable() {
    clothingTableBody.innerHTML = '';

    for (const [clothingNumber, rodNumber] of clothingStorage) {
        const row = document.createElement("tr");

        const clothingCell = document.createElement("td");
        clothingCell.textContent = clothingNumber;
        row.appendChild(clothingCell);

        const rodCell = document.createElement("td");
        rodCell.textContent = rodNumber;
        row.appendChild(rodCell);

        clothingTableBody.appendChild(row);
    }
}

loadStorage();
updateTable();

clothingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const clothingNumber = document.getElementById("clothingNumber").value;
    const rodNumber = document.getElementById("rodNumber").value;

    clothingStorage.set(parseInt(clothingNumber), parseInt(rodNumber));

    saveStorage();
    updateTable();

    // Anzeige der Bestätigungsnachricht
    confirmation.textContent = `Abholschein ${clothingNumber} wurde der Stange ${rodNumber} zugeordnet.`;
    setTimeout(() => {
        confirmation.textContent = "";
    }, 3000);

    document.getElementById("clothingNumber").value = "";
    document.getElementById("rodNumber").value = "";
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchNumber = document.getElementById("searchNumber").value;
    const rodNumber = clothingStorage.get(parseInt(searchNumber));

    if (rodNumber !== undefined) {
        result.textContent = `Abholschein ${searchNumber} befindet sich auf der Stange ${rodNumber}`;
        clothingStorage.delete(parseInt(searchNumber));

        saveStorage();
        updateTable();
    } else {
        result.textContent = `Der Abholschein ${searchNumber} wurde NICHT gefunden.`;
    }

    document.getElementById("searchNumber").value = "";
});
