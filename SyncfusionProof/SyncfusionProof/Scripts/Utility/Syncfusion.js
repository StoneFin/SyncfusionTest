$(function () {
 
});

//tab rendering fix (working)
var onItemActive = function (args) {
  //skip the action for the first tab item
  if (args.activeIndex == args.prevActiveIndex) {
    return;
  }

  //get the current tab
  var activeGrid = $(args.activeHeader).find("a").attr("href");

  //find the grid inside the current tab and apply scrolling
  $(activeGrid).find(".e-grid").ejGrid({
    allowScrolling: true,
    scrollSettings: { width: "100%" }
  });

  //refresh the grid content
  $(activeGrid).find(".e-grid").ejGrid("refreshContent");
}

//multi select testing (not working)
var getRecords = function (toolbarItem) {
  if (toolbarItem.model.selectedRecords.length > 0) {
    //console.log(toolbarItem.model.selectedRecords);

    var sr = toolbarItem.model.selectedRecords;
    var retVal = [];

    $.each(sr, function (i, r) {
      retVal.push(r[0]);
    });

    return retVal;
  }

  return null;
}

var toolbarClick = function (toolbarItem) {
  if (toolbarItem.itemName === "Delete") {
    var records = getRecords(toolbarItem);

    $.each(records, function (i, record) {
      console.log(record);
    });
  }
}