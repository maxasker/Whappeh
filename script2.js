$("#search").on("click", function(){
    var searchterm = $("#searchterm").val();
	guardian(searchterm);
});


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
        $('<img src="' + data["response"]["results"][i]["fields"]["thumbnail"] +  '">').appendTo($('#guardian-article-' + i));
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
        $('<img src="' + data["response"]["results"][i]["fields"]["thumbnail"] +  '">').appendTo($('#guardian-article-' + i));
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
    console.log("hej");
    var articles = $("." + newsclass + " > div");
    for (var i = 0; i < articles.length; i++){
       if ($(articles[i]).hasClass( "hidden" )){
               articles[i].className = "single-article hidethis";
        }
    }
}