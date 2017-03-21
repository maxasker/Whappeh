var hitsArray = new Object();
hitsArray.sr = [];
hitsArray.gn = [];
hitsArray.nt = [];

var urlarray = new Object();
urlarray.sr = ["http://api.sr.se/api/v2/episodes/search/?query=trump&format=json","http://api.sr.se/api/v2/episodes/search/?query=zlatan&format=json","http://api.sr.se/api/v2/episodes/search/?query=information+architecture&format=json","http://api.sr.se/api/v2/episodes/search/?query=malmö&format=json"];
urlarray.gn = ["https://content.guardianapis.com/search?q=trump&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14","https://content.guardianapis.com/search?q=zlatan&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14","https://content.guardianapis.com/search?q=information+architecture&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14","https://content.guardianapis.com/search?q=malmö&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14"];
urlarray.nt = ["https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8731a51f622143dd834372cdff348d28&q=trump","https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8731a51f622143dd834372cdff348d28&q=zlatan","https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8731a51f622143dd834372cdff348d28&q=information+architecture","https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8731a51f622143dd834372cdff348d28&q=malmö"];

$('<div class="loader col-sm-6 text-middle" id="chart-0"></div>').appendTo($('#chart1'));
$('<div class="loader col-sm-6 text-middle" id="chart-1"></div>').appendTo($('#chart2'));
$('<div class="loader col-sm-6 text-middle" id="chart-2"></div>').appendTo($('#chart3'));
$('<div class="loader col-sm-6 text-middle" id="chart-3"></div>').appendTo($('#chart4'));

var printInterval;
var times = 0;
var timesarray = 0;
var timesrungraph = 0;

start();

function start() {
    
    function print() {
        if (times < 4){
        apirequest(urlarray["sr"][times], "sr", "JSON");
        apirequest(urlarray["gn"][times], "gn", "JSONP");
        apirequest(urlarray["nt"][times], "nt", "JSON");
        }
        times += 1;
        if ((hitsArray["sr"].length == 1) && (hitsArray["gn"].length == 1) && (hitsArray["nt"].length == 1)){
            var grapharray = [];
            grapharray.push(hitsArray["nt"][0]);
            grapharray.push(hitsArray["gn"][0]);
            grapharray.push(hitsArray["sr"][0]);
            makegraph(grapharray, "chart1", 0);
        } else if ((hitsArray["sr"].length == 2) && (hitsArray["gn"].length == 2) && (hitsArray["nt"].length == 2)){
            var grapharray = [];
            grapharray.push(hitsArray["nt"][1]);
            grapharray.push(hitsArray["gn"][1]);
            grapharray.push(hitsArray["sr"][1]);
            makegraph(grapharray, "chart2", 1);
        } else if ((hitsArray["sr"].length == 3) && (hitsArray["gn"].length == 3) && (hitsArray["nt"].length == 3)){
            var grapharray = [];
            grapharray.push(hitsArray["nt"][2]);
            grapharray.push(hitsArray["gn"][2]);
            grapharray.push(hitsArray["sr"][2]);
            makegraph(grapharray, "chart3", 2);
        } else if ((hitsArray["sr"].length == 4) && (hitsArray["gn"].length == 4) && (hitsArray["nt"].length == 4)){
            console.log("HEEEEEEEEEJ");
            var grapharray = [];
            grapharray.push(hitsArray["nt"][3]);
            grapharray.push(hitsArray["gn"][3]);
            grapharray.push(hitsArray["sr"][3]);
            makegraph(grapharray, "chart4", 3);
            stop();
        }
        if (times == 5) {
            clearInterval(printInterval);
        }
        console.log("It has been run ", times, " times");
    }

    printInterval = setInterval(print, 2000);
}

function stop() {
      clearInterval(printInterval);
    }

function apirequest(url, newstype, jsontype){
$.ajax({
    url: url,
    dataType: jsontype,
    timeout:5000
}).done(function(data){
    console.log(data);
    genericpopfunction(data, newstype);
}).fail(function(data){
    console.log("fakka yu");
});
    
}

function genericpopfunction(data, newstype){
    console.log(newstype);
    if (newstype == "gn"){
        hitsArray.gn.push(data["response"]["total"])
    }else if (newstype == "nt"){
        hitsArray.sr.push(data["response"]["meta"]["hits"])
    }else if (newstype == "sr"){
        hitsArray.nt.push(data["pagination"]["totalhits"])
}
    console.log(hitsArray);
}

function makegraph(myvalues, chartnumber,numberz){
    $( "#chart-" + numberz ).remove();
    $('<canvas class="myChart" id="chart-'+numberz+'"></canvas>').appendTo($('#'+chartnumber));
    var hits = $('#chart-'+numberz);
    var ctx = hits[0].getContext("2d");
    console.log(hits);
    var barData = {
    animation: true,
    type: 'bar',
    data: {
        labels: ["Sveriges Radio", "Guardian", "New York Times"],
        datasets: [{
            label: 'Total hits!',
            data: myvalues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive : true
            }
        }
        myBar = new Chart(ctx, barData);
}