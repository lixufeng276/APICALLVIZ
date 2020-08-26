//label on the x-axis
var date = ["08/05", "08/06", "08/07", "08/08", "08/09", "08/10", "08/11"];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//for the y-axis
var apiCalls = [0, 15, 12, 12, 19, 8, 0]
var apiCallsPrev = [0, 12, 14, 15, 3, 9, 0]

var ctx = document.getElementById("apiCallsChart");
var apiCallsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        datasets: [
            {
                data: apiCalls,
                label: "Total API calls",
                borderColor: "black",
                fill: false
            },
            {
                data: apiCallsPrev,
                label: "Total API calls previous week",
                fill: false
            }
        ]
    }
})
ctx.scale(0.5,0.5)