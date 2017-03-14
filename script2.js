$("#search").on("click", function(){
    var searchterm = $("#searchterm").val();
	guardian(searchterm);
});


function guardian(searchterm){
    $.ajax({
    url: "https://content.guardianapis.com/search?q="+searchterm+"&show-fields=thumbnail&api-key=f6a07e0d-f72f-47f9-ae61-a0d0446cef14",
    dataType: "JSONP"
}).done(function(data){
    console.log(data);
    updateguardian(data);
}).fail(function(data){
    console.log("something went wrong");
});

}

function updateguardian();{
    
    
    
}