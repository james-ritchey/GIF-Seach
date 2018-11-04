$(document).ready(function(){
    var topics = JSON.parse(localStorage.getItem("topicList"));
    if(topics === null) {topics = ["snake", "dog", "science", "tech"];}
    console.log(topics);
    console.log(topics.length);


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
        localStorage.setItem("topicList", JSON.stringify(topics));
    });

    $(document).on("click", ".topic-button", function(){
        var button = this;
        console.log($(button).attr("data-topic"));
        var topic = $(button).attr("data-topic");
        var limit = $("#limit").val();
        if(limit === ""){limit = 10;};
        var rating = $("#rating").val();
        var offset = $(button).attr("data-offset");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=KG1zDRQwtw1e9SVqH91kwxeOxINgtMBG&limit=" + limit + "&offset=" + offset;

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

                var gifImgDiv = $("<div>");
                $(gifImgDiv).addClass("gif-img-div");

                var newGif = $("<img>");
                $(newGif).attr("src", gifs[i].images.fixed_height_still.url);
                $(newGif).attr("data-paused", gifs[i].images.fixed_height_still.url);
                $(newGif).attr("data-play", gifs[i].images.fixed_height.url);
                $(newGif).addClass("gif-image");
                $(gifImgDiv).append(newGif)

                var textDiv = $("<div>");
                $(textDiv).addClass("gif-text-div");

                var rating = $("<p>");
                $(rating).text("Rating: " + gifs[i].rating);
                $(textDiv).append(rating);

                var favorite = $("<p>");
                $(favorite).addClass("add-favorite");
                $(favorite).text("Add to favorites");
                $(textDiv).append(favorite);


                $(newDiv).append(gifImgDiv);
                $(newDiv).append(textDiv);
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

    function loadList() {
        for(var i = 0; i < topics.length; i++){
            var newTopic = $("<button>");
            var topic = topics[i];
            $(newTopic).text(topic);
            $(newTopic).addClass("topic-button");
            $(newTopic).attr("data-topic", topic);
            $(newTopic).attr("data-offset", 0);
            $("#topic-list").prepend(newTopic);
        }
    }

    $(document).on("click", ".add-favorite", function(){
        if($(this).text() === "Add to favorites"){
            $(this).text("Remove favorite");
        }
        else {
            $(this).text("Add to favorites");
        }
    });

    $(document).on("click", "#clear", function(){
        if(confirm("Are you sure you want to clear your topic list?")) {
            topics = [];
            $("#topic-list").empty();
            localStorage.clear();
        }
    });

    loadList();
});

