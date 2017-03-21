var myvalues = new Array();
$("#search").on("click", function(){
    start();
});

 $('#searchterm').keypress(function(event) {
        if (event.keyCode == 13) {
            start();
            return false;
        }
});
 

function start(){
    myvalues = [];
    if( $("#searchterm").val().length === 0 ) {
      $(".article-h").addClass("hidden");
      $( ".chartjs-hidden-iframe" ).remove();
      $( "#myChart" ).remove();
      $( ".single-article" ).remove();
      $( ".show-button" ).remove();
      $( ".totalhitsp" ).remove();
      for(i=0;i<2;i++) {
    $("#searchterm").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
    $("#searchterm").attr("placeholder", "You need to search for something!");
    }} else {
    $( ".chartjs-hidden-iframe" ).remove();
    $( "#myChart" ).remove();
    $(".article-h").removeClass("hidden");
    $("#searchterm").attr("placeholder", "Search for...");
    myvalues = [];
    var searchterm = $("#searchterm").val();
    $( ".single-article" ).remove();
    $( ".show-button" ).remove();
    $( ".totalhitsp" ).remove();
    sverigesradio(searchterm);
	guardian(searchterm);
    nytimes(searchterm);
    }
}

function sverigesradio(searchterm){
$('<div class="spinner spinnersr"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>').appendTo($('#srtothits'));
$.ajax({
    url: "http://api.sr.se/api/v2/episodes/search/?query="+searchterm+"&format=json",
    dataType: "JSON",
    timeout:5000
}).done(function(data){
    console.log(data);
    $( ".spinnersr" ).remove();
    gethitsSR(data);
    updatesr(data);
}).fail(function(data){
    $( ".spinnersr" ).remove();
    $('<p class="totalhitsp">').text("Error when connecting to SR").appendTo($('#srtothits'));
});
}

function nytimes(searchterm){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "8731a51f622143dd834372cdff348d28",
    'q': searchterm
});
$('<div class="spinner spinnernyt"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>').appendTo($('#nytimestothits'));

$.ajax({
    url: url,
    dataType: "JSON",
    timeout:5000
}).done(function(data){
    console.log(data);
    $( ".spinnernyt" ).remove();
    updatenytimes(data);
    gethitsNYTIMES(data);
}).fail(function(data){
    $( ".spinnernyt" ).remove();
    $('<p class="totalhitsp">').text("Error when connecting to NY-times").appendTo($('#nytimestothits'));
});
    
}


function updatenytimes(data){
    $('<p class="totalhitsp">').text("NY-times total hits: " +data["response"]["meta"]["hits"]).appendTo($('#nytimestothits'));
    if (data["response"]["docs"].length == 0){
        $('<div class="single-article nothinghere" id="nothingherenyt">').appendTo($('.nyt'));
        $('<p>').text("Sorry nothing here :(").appendTo($('#nothingherenyt'));
    }else{
    for (var i = 0; i < data["response"]["docs"].length; i++){
       if (i==0){
        $('<div class="single-article" id="nytimes-' + i + '">').appendTo($('.nyt'));
        $('<article id="nytimes-article-' + i + '">').appendTo($('#nytimes-' + i));
        $('<h2>').text(data["response"]["docs"][i]["headline"]["main"]).appendTo($('#nytimes-article-' + i));
        $('<p>').text(data["response"]["docs"][i]["snippet"]).appendTo($('#nytimes-article-' + i)); 
        if(data["response"]["docs"][i]["multimedia"].length != 0){
            $('<img src="http://www.nytimes.com/' + data["response"]["docs"][i]["multimedia"][1]["url"] +  '">').appendTo($('#nytimes-article-' + i));
        } else {
            $('<img src="nyt.jpg">').appendTo($('#nytimes-article-' + i));
        }
        $('<a href="'+ data["response"]["docs"][i]["web_url"] + '">').text("Läs hela artikeln").appendTo($('#nytimes-' + i));
        $('<button value="nyt" class="show-button" id="nytimes-show-more">').appendTo($('.nyt'));
        $('<a>').text("Show more").appendTo($('#nytimes-show-more'));
        $("#nytimes-show-more").click(showmore);
        } else if (i>0){
        $('<div class="single-article hidden" id="nytimes-' + i + '">').appendTo($('.nyt'));
        $('<article id="nytimes-article-' + i + '">').appendTo($('#nytimes-' + i));
        $('<h2>').text(data["response"]["docs"][i]["headline"]["main"]).appendTo($('#nytimes-article-' + i));
        $('<p>').text(data["response"]["docs"][i]["snippet"]).appendTo($('#nytimes-article-' + i));
        if(data["response"]["docs"][i]["multimedia"].length != 0){
            $('<img src="http://www.nytimes.com/' + data["response"]["docs"][i]["multimedia"][1]["url"] +  '">').appendTo($('#nytimes-article-' + i));
        } else {
            $('<img src="nyt.jpg">').appendTo($('#nytimes-article-' + i));
        }
        $('<a href="'+ data["response"]["docs"][i]["web_url"] + '">').text("Läs hela artikeln").appendTo($('#nytimes-' + i));
       } 
    }
    }
}


function updatesr(data){
        $('<p class="totalhitsp">').text("SR total hits: " +data["pagination"]["totalhits"]).appendTo($('#srtothits'));
        if (data["episodes"].length == 0){
        $('<div class="single-article" id="nothingheresr">').appendTo($('.sr'));
        $('<p>').text("Sorry nothing here :(").appendTo($('#nothingheresr'));
    }else{
        for (var i = 0; i < data["episodes"].length; i++){
       if (i==0){
        $('<div class="single-article" id="sr-' + i + '">').appendTo($('.sr'));
        $('<article id="sr-article-' + i + '">').appendTo($('#sr-' + i));
        $('<h2>').text(data["episodes"][i]["title"]).appendTo($('#sr-article-' + i));
        $('<p>').text(data["episodes"][i]["description"]).appendTo($('#sr-article-' + i));
        $('<img src="'+data["episodes"][i]["imageurl"]+'">').appendTo($('#sr-article-' + i));
        $('<a href="'+ data["episodes"][i]["url"] +'">').text("Läs hela artikeln").appendTo($('#sr-' + i));
        $('<button value="sr" class="show-button" id="sr-show-more">').appendTo($('.sr'));
        $('<a>').text("Show more").appendTo($('#sr-show-more'));
        $("#sr-show-more").click(showmore);
        } else if (i>0){
        $('<div class="single-article hidden" id="sr-' + i + '">').appendTo($('.sr'));
        $('<article id="sr-article-' + i + '">').appendTo($('#sr-' + i));
        $('<h2>').text(data["episodes"][i]["title"]).appendTo($('#sr-article-' + i));
        $('<p>').text(data["episodes"][i]["description"]).appendTo($('#sr-article-' + i));
        $('<img src="'+data["episodes"][i]["imageurl"]+'">').appendTo($('#sr-article-' + i));
        $('<a href="'+ data["episodes"][i]["url"] +'">').text("Läs hela artikeln").appendTo($('#sr-' + i));
       } 
        }
    }
}

function guardian(searchterm){
    $('<div class="spinner spinnerguard"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>').appendTo($('#guardiantothits'));
    $.ajax({
    url: "https://content.guardianapis.com/search?q="+searchterm+"&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14",
    dataType: "JSONP",
    timeout:5000
}).done(function(data){
    console.log(data);
    $( ".spinnerguard" ).remove();
    updateguardian(data);
    gethitsGUARDIAN(data);
}).fail(function(data){
    $( ".spinnerguard" ).remove();
    $('<p class="totalhitsp">').text("Error when connecting to The Guardian").appendTo($('#guardiantothits'));
});

}

function updateguardian(data){
    $('<p class="totalhitsp">').text("The Guardian total hits: " +data["response"]["total"]).appendTo($('#guardiantothits'));
    if (data["response"]["results"].length == 0){
        $('<div class="single-article" id="nothinghereguard">').appendTo($('.guardian'));
        $('<p>').text("Sorry nothing here :(").appendTo($('#nothinghereguard'));
    }else{
    for (var i = 0; i < data["response"]["results"].length; i++){
        if (i==0){
        $('<div class="single-article" id="guardian-' + i + '">').appendTo($('.guardian'));
        $('<article id="guardian-article-' + i + '">').appendTo($('#guardian-' + i));
        $('<h2>').text(data["response"]["results"][i]["webTitle"]).appendTo($('#guardian-article-' + i));
        $('<p>').text(data["response"]["results"][i]["fields"]["trailText"]).appendTo($('#guardian-article-' + i));
        if(typeof data["response"]["results"][i]["fields"]["thumbnail"] != 'undefined'){
     $('<img src="' + data["response"]["results"][i]["fields"]["thumbnail"] +  '">').appendTo($('#guardian-article-' + i));
}else{
     $('<img src="guardian.jpg">').appendTo($('#guardian-article-' + i));
}
        $('<a href="'+data["response"]["results"][i]["webUrl"]+'">').text("Läs hela artikeln").appendTo($('#guardian-' + i));
        $('<button value="guardian" class="show-button" id="guardian-show-more">').appendTo($('.guardian'));
        $('<a>').text("Show more").appendTo($('#guardian-show-more'));
        $("#guardian-show-more").click(showmore);
        } else if (i>0){
        $('<div class="single-article hidden" id="guardian-' + i + '">').appendTo($('.guardian'));
        $('<article id="guardian-article-' + i + '">').appendTo($('#guardian-' + i));
        $('<h2>').text(data["response"]["results"][i]["webTitle"]).appendTo($('#guardian-article-' + i));
        $('<p>').text(data["response"]["results"][i]["fields"]["trailText"]).appendTo($('#guardian-article-' + i));
        if(typeof data["response"]["results"][i]["fields"]["thumbnail"] != 'undefined'){
     $('<img src="' + data["response"]["results"][i]["fields"]["thumbnail"] +  '">').appendTo($('#guardian-article-' + i));
}else{
     $('<img src="guardian.jpg">').appendTo($('#guardian-article-' + i));
}
        $('<a href="'+data["response"]["results"][i]["webUrl"]+'">').text("Läs hela artikeln").appendTo($('#guardian-' + i));   
        }
    }
    }
}

function showmore(){
       var newsclass = this.value;
       var articles = $("." + newsclass + " > div");
       for (var i = 0; i < articles.length; i++){
           if ($(articles[i]).hasClass( "hidden" )){
               articles[i].className = "single-article hidethis";
           }
       }
       $(this).remove();
       $('<button value="' + newsclass + '" class="show-button" id="' + newsclass +'-show-less">').appendTo($('.' + newsclass));
       $('<a>').text("Show less").appendTo($('#'+newsclass+'-show-less'));
       $('#' + newsclass +'-show-less').click(showless);
}

function showless(){
    var newsclass = this.value;
    var articles = $("." + newsclass + " > div");
    for (var i = 0; i < articles.length; i++){
       if ($(articles[i]).hasClass( "hidethis" )){
               articles[i].className = "single-article hidden";
        }
    }
    $(this).remove();
    $('<button value="' + newsclass + '" class="show-button" id="' + newsclass +'-show-more">').appendTo($('.' + newsclass));
    $('<a>').text("Show more").appendTo($('#'+newsclass+'-show-more'));
    $('#' + newsclass +'-show-more').click(showmore);
}

function gethitsSR(data){
    $.each(data.pagination, function (key, val) {
        if(key == "totalhits"){
            myvalues.push(val);
        }
    });
}

function gethitsNYTIMES(data){
    $.each(data.response, function (i) {
    $.each(data.response[i], function (key, val) {
        if(key == "hits"){
            myvalues.push(val)
            makegraph(myvalues)
        }
        });
    });
}

function gethitsGUARDIAN(data){
    $.each(data.response, function (key, val) {
        if(key == "total"){
            myvalues.push(val);
        }
    });
}

function makegraph(myvalues){
    $('<canvas id="myChart"></canvas>').appendTo($('#charts'));
    var hits = $("#myChart");
    console.log(hits);
    var ctx = hits[0].getContext("2d");
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
    var chartframe = $(".chartjs-hidden-iframe")
    if (chartframe == null){
        myBar = new Chart(ctx, barData);
    }else if (chartframe != null)
        $(".chartjs-hidden-iframe").remove();
        myBar = new Chart(ctx, barData);
    }