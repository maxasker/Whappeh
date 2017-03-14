$.ajax({
    url: "https://content.guardianapis.com/search?q=trump&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14",
    dataType: "JSONP"
}).done(function(data){
    console.log(data);
    loopdatasemen(data);
}).fail(function(data){
    console.log("something went wrong");
});

function loopdatasemen(data){
    for (var i = 0; i < data["response"]["results"].length; i++){
        $('#title').text(data["response"]["results"][i]["webTitle"]);
    }
}

