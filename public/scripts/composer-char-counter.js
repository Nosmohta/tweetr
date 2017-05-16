$(document).on("ready", () => {
  $("textarea").on("keyup", (Event) => {

    //console.log(this);

    let curLength = $("textarea").val().length
    let countRemaining = 140 - curLength;
    $(".counter").text(countRemaining);
  })
})