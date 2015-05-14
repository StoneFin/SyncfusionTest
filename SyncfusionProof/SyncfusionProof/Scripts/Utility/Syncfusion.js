$(function () {
  //is there a better way to get the selected value from the drop down editor than this?
  //change event for inline edit dropdown grid editor
  $(document).on("click", "#InlineEditingGridManufacturer_popup ul[role='listbox']", function () {
    //get the selected funding source and set the variable
    var manufacturerId = $("#InlineEditingGridManufacturer_popup ul[role='listbox'] .e-active").data("value");

    currentManufactuerId = manufacturerId;
  }).change();
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

var deleteRecord = function (gridId, gridKey, record) {
  var self = this;
  var grid = $("#" + gridId).ejGrid("instance");

  grid.deleteRecord(gridKey, record);
  //alert("Selected Key: " + gridKey);

  return record;
}

var deleteRecords = function (gridId, gridKey, records) {
  var self = this;
  var grid = $("#" + gridId).ejGrid("instance");

  $.each(records, function (i, record) {
    grid.deleteRecord(gridKey, record);
  });

  return records;
}

var toolbarClick = function (toolbarItem) {
  var self = this;

  if (toolbarItem.itemName === "Delete") {
    //cancel the grid's default operation
    toolbarItem.cancel = true;
  }

  if (toolbarItem.itemName === "Delete") {
    var records = getRecords(toolbarItem, self);

    //change based on which grid you're testing
    //deleteRecords("MultiSelectGrid", "OrderId", records);
    //deleteRecords("MultiSelectGrouped", "OrderId", records);
  }
}

//is there a better way to get the selected value from the drop down editor than this?
var currentManufactuerId = 0;

var inlineEditActionComplete = function (args) {
  var self = this;

  if (args.requestType === "save") {
    //cancel the grid's default operation
    args.cancel = true;
  }

  //is there a better way to get the selected value from the drop down editor than this?
  console.log(currentManufactuerId);
}
