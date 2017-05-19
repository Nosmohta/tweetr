
/*
*  Client-side scripting of index.html file on the  "/tweets" path.
*  jQuery used to build and modify DOM.
*  Ajax used to update view with tweets upon "ready" state and upon new tweets being added.
*  All code is wrapped in a ducument ready callback
*/

$(document).on("ready", () => {

 /*
*  @Params pass the function an object representing the data for one tweet.
*  @returns an <article> element structured to include in the index.html file with proper class attributes for styling.
*/
  function createTweetElement(tweet) {
    let image = $("<img>").attr( "src", tweet.user.avatars.regular);
    let name = $("<div>").text(tweet.user.name).addClass("name");
    let handle = $("<div>").text(tweet.user.handle).addClass("handle");
    let header = $("<header>").append( image, name, handle);

    let body = $("<div>").addClass("body").text(tweet.content.text);

    let daysAgo =  Math.round(((new Date().getTime()) - tweet.created_at) / 86400000);
    let created = $("<div>").addClass("daysago").text(daysAgo + " days ago");
    let retweet = $("<i>").addClass("symbols fa fa-retweet");
    let heart = $("<i>").addClass("symbols fa fa-heart");
    let flag = $("<i>").addClass("symbols fa fa-flag");
    let footer = $("<footer>").append( created, retweet, heart, flag);

    let tweetElement = $("<article>").addClass("tweet").append( header, body, footer);

    return tweetElement
  }

 /*
*  @Params accepts an array of tweets
*  @returns appends each tweet to the index.html tweets section
*/
  function renderTweets(tweetsData) {
    $("#tweets").empty();
    tweetsData.forEach( (tweet) =>{
      $('#tweets').append(createTweetElement(tweet));
    })
  }


 /*
*  performs an Ajax get request to "/tweets"
*  @Params none.
*  @returns calls the renderTweets function on the returned array of tweet data.
*/
  function loadTweets() {
    $.ajax( {
        method: "GET",
        url: "/tweets",
    }).done(renderTweets)
  }


 /*
*  @Params accepts a string representing an error msg
*  @returns appends the passed error to the DOM directly after the new tweet section.
*/
  function addErrorMSG(errorSTR ) {
    let errMSG = $("<div>").addClass("errMSG").text(errorSTR);
    $(".new-tweet").after(errMSG);

  }

  //load tweets on inicial page load
  loadTweets();

   /*
  * Handles the submission of new tweets.
  * submission text is validated to ensure length is not greater than 140 characters and not empty.
  * If valid the tweet data is serialised and sent in an Ajax Post to "/tweets"
  * load tweets function is called upon successful Ajax post.
  */
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



  /*
  *  Toggles the compse tweet element in the index.html
  */
  $("#compose").on("submit", function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle( 300, "swing", function() {
        $("textarea").focus();
    });
  })


})








