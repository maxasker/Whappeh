var myvalues = new Array();
$("#search").on("click", function(){
    if( $("#searchterm").val().length === 0 ) {
      $(".article-h").addClass("hidden");
      $( ".single-article" ).remove();
      $( ".show-button" ).remove();
      for(i=0;i<2;i++) {
    $("#searchterm").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
    $("#searchterm").attr("placeholder", "You need to search for something!");
    }} else {
    $(".article-h").removeClass("hidden");
    $("#searchterm").attr("placeholder", "Search for...");
    myvalues = [];
    var searchterm = $("#searchterm").val();
    $( ".single-article" ).remove();
    $( ".show-button" ).remove();
    sverigesradio(searchterm);
	guardian(searchterm);
    nytimes(searchterm);
    makegraph(myvalues);
    }
});

$("#search").keypress(function(event) {
    if (event.which == 13) {
        alert("HEJ");
    }
});

function sverigesradio(searchterm){
$.ajax({
    url: "http://api.sr.se/api/v2/episodes/search/?query="+searchterm+"&format=json",
    dataType: "JSON"
}).done(function(data){
    console.log(data);
    gethitsSR(data);
    updatesr(data);
}).fail(function(data){
    console.log("something went wrong");
});
}

function nytimes(searchterm){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "8731a51f622143dd834372cdff348d28",
    'q': searchterm
});


$.ajax({
    url: url,
    dataType: "JSON"
}).done(function(data){
    console.log(data);
    updatenytimes(data);
    gethitsNYTIMES(data);
}).fail(function(data){
    console.log("something went wrong");
});
    
}

function updatenytimes(data){
    if (data["response"]["docs"].length == 0){
        $('<div class="single-article" id="nothinghere">').appendTo($('.nyt'));
        $('<p>').text("Sorry nothing here :(").appendTo($('#nothinghere'));
    }
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


function updatesr(data){
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

function guardian(searchterm){
    $.ajax({
    url: "https://content.guardianapis.com/search?q="+searchterm+"&show-fields=all&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14",
    dataType: "JSONP"
}).done(function(data){
    console.log(data);
    updateguardian(data);
    gethitsGUARDIAN(data);
}).fail(function(data){
    console.log("something went wrong");
});

}

function updateguardian(data){
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
var ctx = $("#myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["SR", "Guardian", "NY Times"],
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}