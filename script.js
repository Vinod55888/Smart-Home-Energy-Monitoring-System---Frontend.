const ctx = document.getElementById("energyChart").getContext("2d");
let energyData = [0]; 
let budgetLimit = null;

// Initialize Chart
const energyChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["0s"],
        datasets: [{
            label: "Energy Consumption (kWh)",
            data: energyData,
            borderColor: "blue",
            borderWidth: 2,
            fill: false
        }]
    },
    options: { responsive: true }
});

// Fetch simulated energy data (replace with real API)
function fetchEnergyData() {
    let newUsage = Math.random() * 5 + 1; 
    energyData.push(newUsage);
    
    if (energyData.length > 10) energyData.shift(); 
    energyChart.data.labels.push(`${energyData.length * 5}s`);
    energyChart.data.datasets[0].data = energyData;
    energyChart.update();
    
    document.getElementById("currentEnergy").innerText = newUsage.toFixed(2) + " kWh";

    // Check Budget Alert
    if (budgetLimit !== null && newUsage > budgetLimit) {
        document.getElementById("budgetAlert").innerText = "⚠️ Energy usage exceeded!";
        document.getElementById("budgetAlert").style.color = "red";
    }
}

// Set Budget
function setBudget() {
    budgetLimit = document.getElementById("budgetInput").value;
    document.getElementById("budgetAlert").innerText = "Budget set to " + budgetLimit + " kWh";
    document.getElementById("budgetAlert").style.color = "green";
}

// Simulate energy updates every 5 seconds
setInterval(fetchEnergyData, 5000);