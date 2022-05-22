function updateTime() {
  // getting current time
  var currentTime = moment().hours();
  console.log("current hour:", currentTime);

  // loop over time blocks
  $(".time-block").each(function () {
    var timeBlock = parseInt($(this).attr("id").split("-")[1]);

    console.log("block hour:", timeBlock);

    if (timeBlock < currentTime) {
      $(this).addClass("past");
    } else if (timeBlock === currentTime) {
      $(this).removeClass("past").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

$(document).ready(function () {
  // save button event listner

  $(".saveBtn").on("click", function () {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    // save the value in localStorage as time
    localStorage.setItem(time, value);
  });

  updateTime();
  // set up interval to check if current time needs to be updated
  setInterval(function () {
    updateTime();
  }, 30000);

  // get data from localStorage
  $(".time-block").each(function () {
    $(this)
      .children(".description")
      .text(localStorage.getItem($(this).attr("id")));
  });

  // display current info on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
