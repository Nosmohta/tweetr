
/*
*  jQuery logic handling the current character count for tweets being written.
*  Display character count is separrate for tweet acceptance/rejection logic.
*/

$(document).on("ready", () => {
  $("textarea").on("keyup", (Event) => {
    let curLength = $("textarea").val().length
    let countRemaining = 140 - curLength;
    $(".counter").text(countRemaining);
  })
})