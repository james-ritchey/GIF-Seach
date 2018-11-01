$(document).ready(function(){

    $("#submit-search").on("click", function(e){
        e.preventDefault();
        var newTopic = $("<button>");
        var topic = $("#new-search").val().trim();
        if(topic !== ""){
            $(newTopic).text(topic);
            $(newTopic).addClass("topic-button");
            $(newTopic).attr("data-topic", topic);
            $("#topic-list").prepend(newTopic);
        }
    });

    $(document).on("click", ".topic-button", function(){
        console.log($(this).attr("data-topic"));
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=KG1zDRQwtw1e9SVqH91kwxeOxINgtMBG&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            var gifs = response.data;

            var newDiv = $("<div>");
            $(newDiv).addClass("gif-div");
            var newGif = $("<img>");
            $(newGif).attr("src", gifs[0].images.fixed_height.url);
            $(newDiv).append(newGif);
            $("#gif-dump").append(newDiv);

        });
    });

});