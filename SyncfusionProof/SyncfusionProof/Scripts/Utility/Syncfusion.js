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

var deleteRecord = function (gridId, gridKey, record) {
  var grid = $("#" + gridId).ejGrid("instance");

  grid.deleteRecord(gridKey, record);
  //alert("Selected Key: " + gridKey);

  return record;
}

var deleteRecords = function (gridId, gridKey, records) {
  var grid = $("#" + gridId).ejGrid("instance");

  $.each(records, function (i, record) {
    grid.deleteRecord(gridKey, record);
  });

  return records;
}

var removeRow = function () {
  //change based on which grid you're testing
  //var grid = $("#MultiSelectGrid").ejGrid("instance");
  var grid = $("#MultiSelectGroupedGrid").ejGrid("instance");

  var i = grid.model.selectedRowIndex;
  var record = grid.getCurrentViewData()[i];

  //change based on which grid you're testing
  //deleteRecord("MultiSelectGrid", "OrderId", record);
  deleteRecord("MultiSelectGroupedGrid", "OrderId", record);
}

var toolbarClick = function (toolbarItem) {
  var self = this;

  if (toolbarItem.itemName === "Delete" ||
      toolbarItem.itemName === "Refresh") {
    //cancel the grid's default operation
    toolbarItem.cancel = true;
  }

  if (toolbarItem.itemName === "Delete") {
    var records = getRecords(toolbarItem, self);

    //change based on which grid you're testing
    //deleteRecords("MultiSelectGrid", "OrderId", records);
    deleteRecords("MultiSelectGroupedGrid", "OrderId", records);
  }
  else if (toolbarItem.itemName === "Refresh") {
    alert("refresh button clicked")
  }
}

var inlineEditActionComplete = function (args) {
  var self = this;

  if (args.requestType === "save") {
    //cancel the grid's default operation
    args.cancel = true;
    
    //just showing that we got the correct manufacturer id
    console.log(args.data.ManufacturerId);
  }

  if (args.requestType === "beginedit") {
    //when editing a dropdown, set the selected text to match the current value
    var ele = $("#" + self._id + "Manufacturer");

    ele.ejDropDownList("setSelectedText", args.model.currentViewData[args.rowIndex].Manufacturer);
  }
}

var inlineEditActionBegin = function (args) {
  var self = this;

  //this is working to fetch the selected dropdown id at edit time
  //no more variable needed
  if (args.requestType === "save") {
    args.data.ManufacturerId = self.element.find("select#InlineEditingGridManufacturer").ejDropDownList("getSelectedValue");
  }
}

var editRow = function (args) {
  console.log(args);
}
