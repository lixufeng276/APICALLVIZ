//creating current date and time and displaying on id = datetime
var d = new Date();
var n = d.toString();
//this function is to test all edge case of time
// d.setHours(24);
currentDay = (("0" + (d.getMonth()+1)).slice(-2)) + "/" + (("0" + d.getDate()).slice(-2));

setInterval(displayclock, 500);

function displayclock() {
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var amorPm;
    if (hrs > 12) {
        hrs = hrs - 12;
        amorPm = " PM";
    } else {
        amorPm = " AM"
    }

    if (hrs == 0) {
        hrs = 12;
    }
    if (hrs < 10) {
        hrs = '0' + hrs;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    document.getElementById("datetime").innerHTML = (("0" + (d.getMonth()+1)).slice(-2)) + "/" + (("0" + d.getDate()).slice(-2)) + "/" + (d.getFullYear()) + " " + hrs + ':' + min + ':' + sec + amorPm;
    document.getElementById("oppositedatetime").innerHTML = hrs + ':' + min + ':' + (("0"+(60 - time.getSeconds())).slice(-2)) + amorPm;
}

//label on the x-axis and creating the chart
var dayArr = [];
dayArr.length = 7;
for (var i = 0; i < dayArr.length; i++) {
    //create a new date object subtracting the days using get time from current day * 24hr * 60min * 60sec * 1000miliseconds
    var prevDays = new Date(d.getTime() - (i * 24 * 60 * 60 * 1000))
    dayArr[i] = (("0" + (prevDays.getMonth()+1)).slice(-2)) + "/" + (("0" + (prevDays.getDate())).slice(-2));
}


//Lets do every 7 minutes
var minArr = [];
minArr.length = 7;
for (var i = 0; i < minArr.length; i++) {
    var prevMins = new Date(d.getTime() - (i * 60 * 1000));
    minArr[i] = (("0" + (prevMins.getHours())).slice(-2)) + ":" + (("0" + (prevMins.getMinutes())).slice(-2));
}

var date = ["08/05", "08/06", "08/07", "08/08", "08/09", "08/10", currentDay];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//for the y-axis

var prevArr = [0, 12, 14, 15, 3, 9, 0]
var newArr = [5, 18, 2, 15, 9, 15, 0]

var ctx = document.getElementById("apiCallsChart");
var apiCallsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: minArr.reverse(),
        datasets: [
            {
                data: newArr,
                label: "Total API calls",
                borderColor: "black",
                fill: false
            },
            {
                data: prevArr,
                label: "Total API calls previous week",
                fill: false
            }
        ]
    }
})



//pushes 0 to the front of the array and shift and removes the end of the array so it will always be size 7
function updateArray() {
    prevArr.push(newArr[0]);
    prevArr.shift();
    newArr.push(0);
    newArr.shift();
    apiCallsChart.update();
}
//updates the label of the array every minute so that it will be live
function updateLabel() {
    var current = new Date();
    var minCurr = [];
    minCurr.length = 7;
    for (var i = 0; i < minCurr.length; i++) {
        var prevMins = new Date(current.getTime() - (i * 60 * 1000));
        minCurr[i] = (("0" + (prevMins.getHours())).slice(-2)) + ":" + (("0" + (prevMins.getMinutes())).slice(-2));
    }
    
    apiCallsChart.data.labels = minCurr.reverse();
    apiCallsChart.update();
}

function getCurSecond() {
    const d = new Date()
    // console.log(d.getSeconds())
    if (d.getSeconds() == 0) {
        updateLabel();
        updateArray();
    }
}
setInterval(getCurSecond,1000);

//testing button function is the click me button
function testFunction() {
    
    apiCallsChart.data.datasets[0].data[6]++;
    document.getElementById("test").style.color = "red";
    document.getElementById("test").innerHTML = "Text has changed, ADDING ONE to the current dataset[6]";
    
    apiCallsChart.update();
}
function resetFunction() {
    document.getElementById("test").style.color = "black";
    
    
    if (apiCallsChart.data.datasets[0].data == prevArr) {
        apiCallsChart.data.datasets[0].data = newArr;
        apiCallsChart.data.datasets[1].data = prevArr;
        document.getElementById("dataset").innerText = "Current dataset is: newArr";
    } else {
        apiCallsChart.data.datasets[0].data = prevArr;
        apiCallsChart.data.datasets[1].data = newArr;
        document.getElementById("dataset").innerText = "Current dataset is: prevArr";
    }
    apiCallsChart.update();
}
