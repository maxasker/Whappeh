var hitsArray = new Object();
hitsArray.sr = [];
hitsArray.gn = [];
hitsArray.nt = [];

apirequest("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8731a51f622143dd834372cdff348d28&q=trump", "nt", "JSON");
apirequest("https://content.guardianapis.com/search?q=trump&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14", "gn", "JSONP");

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
    if (newstype == "gn"){
        hitsArray.gn.push([data][response][total])
    }else if (newstype == "nt"){
        hitsArray.nt.push([data][response][meta][hits])
    }else if (newstype == "sr"){
        hitsArray.nt.push([data][pagination][totalhits])
}
    console.log(hitsArray);
}