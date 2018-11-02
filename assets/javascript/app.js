$(document).ready(function(){
    var topics = [];

    $("#submit-search").on("click", function(e){
        e.preventDefault();
        var newTopic = $("<button>");
        var topic = $("#new-search").val().trim();
        if(topic !== "" && topics.indexOf(topic) === -1){
            $(newTopic).text(topic);
            $(newTopic).addClass("topic-button");
            $(newTopic).attr("data-topic", topic);
            $(newTopic).attr("data-offset", 0);
            $("#topic-list").prepend(newTopic);
            topics.push(topic);
        }
    });

    $(document).on("click", ".topic-button", function(){
        var button = this;
        console.log($(button).attr("data-topic"));
        var topic = $(button).attr("data-topic");
        var limit = $("#limit").val();
        if(limit === ""){limit = 10;};
        var rating = "";
        var offset = $(button).attr("data-offset");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=KG1zDRQwtw1e9SVqH91kwxeOxINgtMBG&rating="
         + rating + "&limit=" + limit + "&offset=" + offset;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            var gifs = response.data;
            for(var i = 0; i < limit; i++) {
                var newDiv = $("<div>");
                $(newDiv).addClass("gif-div");
                var newGif = $("<img>");
                $(newGif).attr("src", gifs[i].images.fixed_height_still.url);
                $(newGif).attr("data-paused", gifs[i].images.fixed_height_still.url);
                $(newGif).attr("data-play", gifs[i].images.fixed_height.url);
                $(newGif).addClass("gif-image");
                var rating = $("<p>");
                $(rating).text(gifs[i].rating);
                $(newDiv).append(newGif);
                $(newDiv).append(rating);
                $("#gif-dump").prepend(newDiv);
                $(button).attr("data-offset", (parseInt($(button).attr("data-offset")) + 1));
            }

        });
    });

    $(document).on({
        mouseenter: function() {
            $(this).attr("src", $(this).attr("data-play"));
    },  mouseleave: function() {
            $(this).attr("src", $(this).attr("data-paused"));
    }
    }, ".gif-image");

});