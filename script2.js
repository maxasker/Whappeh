$("#search").on("click", function(){
    var searchterm = $("#searchterm").val();
    $( ".single-article" ).remove();
    $( ".show-button" ).remove();
	guardian(searchterm);
    nytimes(searchterm);
});

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
}).fail(function(data){
    console.log("something went wrong");
});
    
}

function updatenytimes(data){
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
        $('<button id="nytimesbutt-'+ i + '">').appendTo($('#nytimes-article-' + i));
        $('<a>').text("Klicka här").appendTo($('#nytimesbutt-' + i));
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
        $('<button id="nytimesbutt-'+ i + '">').appendTo($('#nytimes-article-' + i));
        $('<a>').text("Klicka här").appendTo($('#nytimesbutt-' + i));
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
        $('<button id="guardianbutt-'+ i + '">').appendTo($('#guardian-article-' + i));
        $('<a>').text("Klicka här").appendTo($('#guardianbutt-' + i));
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
        $('<button id="guardianbutt-'+ i + '">').appendTo($('#guardian-article-' + i));
        $('<a>').text("Klicka här").appendTo($('#guardianbutt-' + i));   
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