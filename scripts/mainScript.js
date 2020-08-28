//creating current date and time and displaying on id = datetime
var d = new Date();
var n = d.toString();

currentDay = (("0" + (d.getMonth()+1)).slice(-2)) + "/" + (("0" + d.getDate()).slice(-2));

d.setHours(24);
if (d.getHours() <= 12) {
    document.getElementById("datetime").innerHTML = (("0" + (d.getMonth()+1)).slice(-2)) + "/" + (("0" + d.getDate()).slice(-2)) + "/" + (d.getFullYear()) + " " + (("0" + (d.getHours())).slice(-2)) + ":" + (("0" + (d.getMinutes())).slice(-2)) + " AM";
} else {
    document.getElementById("datetime").innerHTML = (("0" + (d.getMonth()+1)).slice(-2)) + "/" + (("0" + d.getDate()).slice(-2)) + "/" + (d.getFullYear()) + " " + (("0" + (d.getHours() - 12)).slice(-2)) + ":" + (("0" + (d.getMinutes())).slice(-2)) + " PM";
}


//label on the x-axis and creating the chart
var dayArr = [];
dayArr.length = 7;
for (var i = 0; i < dayArr.length; i++) {
    //create a new date object subtracting the days using get time from current day * 24hr * 60min * 60sec * 1000miliseconds
    var prevDays = new Date(d.getTime() - (i * 24 * 60 * 60 * 1000))
    dayArr[i] = (("0" + (prevDays.getMonth()+1)).slice(-2)) + "/" + (("0" + (prevDays.getDate())).slice(-2));
}

var date = ["08/05", "08/06", "08/07", "08/08", "08/09", "08/10", currentDay];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//for the y-axis
var apiCalls = [0, 15, 12, 12, 19, 8, 0]
var apiCallsPrev = [0, 12, 14, 15, 3, 9, 0]
var apiCallsNew = [5, 18, 2, 15, 9, 15, 0]

var ctx = document.getElementById("apiCallsChart");
var apiCallsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dayArr.reverse(),
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

//testing button function
function testFunction() {
    document.getElementById("test").style.color = "red";
    document.getElementById("test").innerHTML = dayArr;
    var i;
    // for (i = 0; i < apiCalls.length; i++){
    //     apiCalls[i] = apiCalls[i] + 1
    // }
    apiCallsChart.data.datasets[0].data = apiCallsNew
    apiCallsChart.data.datasets[1].data = apiCalls
    apiCallsChart.update();
}
function resetFunction() {
    document.getElementById("test").style.color = "black";
    document.getElementById("test").innerText = "Changing Text";
    apiCallsChart.data.datasets[0].data = apiCalls
    apiCallsChart.data.datasets[1].data = apiCallsPrev
    apiCallsChart.update();
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    })
    chart.update();
}
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}



