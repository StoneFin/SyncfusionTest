$(function () {

});

//tab rendering fix (working)
var onItemActive = function (args) {
  //if EnablePersistence = false, skip this action for the active tab item
  if (!args.model.enablePersistence &&
    args.activeIndex == args.prevActiveIndex) {
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

//single select testing (working)
var getRecord = function (toolbarItem, gridElement) {
  if (gridElement.getSelectedRecords().length === 1) {
    return gridElement.getSelectedRecords()[0];
  }

  alert("Please select a single record.");

  return null;
}

//multi select testing (working)
var getRecords = function (toolbarItem, gridElement) {
  if (gridElement.getSelectedRecords().length > 0) {
    return gridElement.getSelectedRecords();
  }

  alert("Please select one or more records.");

  return null;
}

var deleteRecord = function () {
  var self = this;

  var record = getRecord("MultiSelectGrid", self.element);

  alert("Selected Key: " + record.OrderId);
}

var deleteRecords = function (gridId, gridKey, records) {
  var self = this;

  var grid = $("#" + gridId).ejGrid("instance");

  $.each(records, function (i, record) {
    grid.deleteRecord(gridKey, record);
  });

  //not necessary for deleting records
  //$("#" + gridId).ejGrid("refreshContent");

  return records;
}

var toolbarClick = function (toolbarItem) {
  var self = this;

  if (toolbarItem.itemName === "Delete") {
    var records = getRecords(toolbarItem, self);

    //use this to show the selected keys
    //var keys = "";

    //$.each(records, function (i, record) {
    //  keys = keys.concat(record.OrderId + ", ");
    //});

    //alert("Selected Keys: " + keys);

    deleteRecords("MultiSelectGroupedGrid", "OrderId", records);
  }
}
