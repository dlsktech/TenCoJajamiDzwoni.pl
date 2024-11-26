// Replace this with your Minecraft server IP and port
const serverIP = "tencojajamidzwoni.pl";
const apiURL = `https://api.mcsrvstat.us/2/${serverIP}`;

async function fetchServerStats() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        document.getElementById("server-motd").textContent = data.motd ? data.motd.clean.join(" ") : "No MOTD available";

        if (data.online) {
            document.getElementById("server-status").textContent = "Online";
            document.getElementById("player-count").textContent = data.players.online;
			
			document.getElementById("player-list").innerHTML =
				data.players.list
					? data.players.list.map(player => `<span>${player}</span>`).join("")
					: "None";

            const playerListContainer = document.getElementById("player-list");
            playerListContainer.innerHTML = "";

            if (data.players.list && data.players.list.length > 0) {
                const sortedPlayers = data.players.list.sort();
                sortedPlayers.forEach((player) => {
                    const playerItem = document.createElement("div");
                    playerItem.textContent = player;
                    playerItem.style.textAlign = "left";
                    playerListContainer.appendChild(playerItem);
                });
            } else {
                playerListContainer.textContent = "None";
            }
        } else {
            document.getElementById("server-status").textContent = "Offline";
            document.getElementById("player-count").textContent = "0";
            document.getElementById("player-list").textContent = "N/A";
        }
    } catch (error) {
        document.getElementById("server-title").textContent = "Error";
        document.getElementById("server-motd").textContent = "Could not load data.";
        document.getElementById("server-status").textContent = "Error";
        document.getElementById("player-count").textContent = "N/A";
        document.getElementById("player-list").textContent = "N/A";
        console.error("Error fetching server stats:", error);
    }
}
document.getElementById("server-title").textContent = "TenCoJajamiDzwoni.pl";
fetchServerStats();

// Refresh stats every 3 seconds
setInterval(fetchServerStats, 3000);
