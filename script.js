// Replace this with your Minecraft server IP and port
const serverIP = "tencojajamidzwoni.pl"; 
const apiURL = `https://api.mcsrvstat.us/2/${serverIP}`;

// Function to fetch server stats and update the page
async function fetchServerStats() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Update webpage with server data
        if (data.online) {
            document.getElementById("server-status").textContent = "Online";
            document.getElementById("player-count").textContent = data.players.online;
            document.getElementById("player-list").textContent = 
                data.players.list ? data.players.list.join(", ") : "None";
        } else {
            document.getElementById("server-status").textContent = "Offline";
            document.getElementById("player-count").textContent = "0";
            document.getElementById("player-list").textContent = "N/A";
        }
    } catch (error) {
        // Display error message if fetching data fails
        document.getElementById("server-status").textContent = "Error";
        document.getElementById("player-count").textContent = "N/A";
        document.getElementById("player-list").textContent = "N/A";
        console.error("Error fetching server stats:", error);
    }
}

// Call the function on page load
fetchServerStats();
