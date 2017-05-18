
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).on("ready", () => {

  function createTweetElement(tweet) {

    let image = $("<img>").attr( "src", tweet.user.avatars.regular);
    let name = $("<div>").text(tweet.user.name).addClass("name");
    let handle = $("<div>").text(tweet.user.handle).addClass("handle");
    let header = $("<header>").append( image, name, handle);

    let body = $("<div>").addClass("body").text(tweet.content.text);

    let daysAgo =  Math.round(((new Date().getTime()) - tweet.created_at) / 86400000);
    let created = $("<div>").addClass("daysago").text(daysAgo + " days ago");
    let symbols = $("<div>").addClass("symbols").text("\u2691 \u2665");
    let footer = $("<footer>").append( created, symbols);

    let tweetElement = $("<article>").addClass("tweet").append( header, body, footer);

    return tweetElement
  }

  function renderTweets(jsonData) {
    $("#tweets").empty();
    jsonData.forEach( (userObj) =>{
      $('#tweets').append(createTweetElement(userObj));
    })
  }

  function loadTweets() {
    $.ajax( {
        method: "GET",
        url: "/tweets",
    }).done(renderTweets)
  }


  function addErrorMSG(errorSTR ) {
    let errMSG = $("<div>").addClass("errMSG").text(errorSTR);
    $(".new-tweet").after(errMSG);

  }

  loadTweets();


  $(".new-tweet").on("submit", "form", function(event) {
    event.preventDefault();
    $(".errMSG").remove();
    let text = $("textarea").val();
    let trimText = $("textarea").val().trim();
    if (text.length > 140) {
      addErrorMSG("Too many things!");
    } else if (trimText.length === 0) {
      addErrorMSG("Say some more, please.");
    } else {
      $.ajax( {
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done( () => {
        $("textarea").val("");
        loadTweets();
      })
    }
  })


  $("#compose").on("submit", function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle( 300, "swing", function() {
        $("textarea").focus();
    });
  })



})








