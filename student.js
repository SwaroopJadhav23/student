document.addEventListener('DOMContentLoaded', displayResults);

function displayResults() {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block'; // Show loading message

    try {
        const allResults = JSON.parse(localStorage.getItem('studentResults')) || [];
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        if (Array.isArray(allResults) && allResults.length > 0) {
            allResults.forEach(result => {
                // Debugging output
                console.log('Result:', result);

                if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
                    const div = document.createElement('div');
                    div.className = 'marksheet';

                    const table = document.createElement('table');
                    const headerRow = document.createElement('tr');
                    result.data[0].forEach(cell => {
                        const th = document.createElement('th');
                        th.textContent = cell;
                        headerRow.appendChild(th);
                    });
                    table.appendChild(headerRow);

                    result.data.slice(1).forEach(row => {
                        const tr = document.createElement('tr');
                        row.forEach(cell => {
                            const td = document.createElement('td');
                            td.textContent = cell;
                            tr.appendChild(td);
                        });
                        table.appendChild(tr);
                    });

                    div.appendChild(table);
                    resultsContainer.appendChild(div);
                } else {
                    console.error("Invalid data format:", result); // Log detailed error
                }
            });
        } else {
            displayMessage("No results available.");
        }
    } catch (error) {
        console.error("Error loading results:", error); // Log detailed error
    } finally {
        loadingMessage.style.display = 'none'; // Hide loading message
    }
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.className = 'success-message';
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
}

function displayError(message) {
    // Do nothing here to hide error messages
}
