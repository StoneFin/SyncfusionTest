$(function () {
  //tab declaration
  $("#TestTabs").ejTab();

  var gridObj = $("#Grid").ejGrid("instance");

  scrolWidth = gridObj.model.scrollSettings.width / $(".cols-sample-area").width();

  if (gridObj.element.width() > $(".cols-sample-area").width()) {
    var scrollerwidth = Math.floor($(".cols-sample-area").width())

    gridObj.option("model.scrollSettings", { width: scrollerwidth })

    scrolWidth = 1;
  }
});

$(window).resize(function () {
  var gridObj = $("#Grid").ejGrid("instance")
  var scrollerwidth = Math.floor($(".cols-sample-area").width() * scrolWidth)

  gridObj.option("model.scrollSettings", { width: scrollerwidth })
});
