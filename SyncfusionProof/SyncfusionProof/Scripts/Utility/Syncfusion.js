$(function () {
  //click handler for undoing an edit
  $("#UndoLink").on("click", function () {
    //undoUpdate();
    undoDelete();

    return false;
  });

  //custom validation rule on an editable grid
  $.validator.addMethod("lessThanValue2", function (value, element) {
    var value2 = getColumnValue("InlineEditingGrid", "Value 2");

    return parseFloat(value.replace(",", "")) <= parseFloat(value2.replace(",", ""));
  }, "Value 1 must be less than or equal to Value 2");
});

var getGrid = function (gridId) {
  return $("#" + gridId).ejGrid("instance");
}

var onChange = function (args) {
  var self = this;
  var grid = getGrid("InlineEditingGrid");
  var val1 = getColumnValue("InlineEditingGrid", "Value1");
  var val2 = getColumnValue("InlineEditingGrid", "Value2");
  
  val1 = parseFloat(val1.replace(",", ""));
  val2 = parseFloat(val2.replace(",", ""));
  val1 = isNaN(val1) ? 0 : val1;
  val2 = isNaN(val2) ? 0 : val2;
  
  var sum = val1 + val2;

  return setColumnValue("InlineEditingGrid", "ValueSum", sum);
}

var getColumnValue = function (gridId, columnName) {
  //gets a column value in an a grid row that is currently in edit mode
  var grid = getGrid(gridId);

  return grid.element.find(".gridform").find("input#" + gridId + columnName).val();
}

var setColumnValue = function (gridId, columnName, newValue) {
  var grid = getGrid(gridId);

  return grid.element.find(".gridform").find("input#" + gridId + columnName).val(newValue);
}

//this may not be needed since version 13.3.0.12
//tab rendering fix (working)
//var onItemActive = function (args) {
//  //if EnablePersistence = false, skip this action for the active tab item
//  if (!args.model.enablePersistence &&
//    args.activeIndex == args.prevActiveIndex) {
//    return;
//  }

//  //get the current tab
//  var activeGrid = $(args.activeHeader).find("a").attr("href");

//  //find the grid inside the current tab and apply scrolling
//  $(activeGrid).find(".e-grid").ejGrid({
//    allowScrolling: true,
//    scrollSettings: { width: "100%" }
//  });

//  //refresh the grid content
//  $(activeGrid).find(".e-grid").ejGrid("refreshContent");
//}

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
  var grid = getGrid(gridId);

  grid.deleteRecord(gridKey, record);
  //alert("Selected Key: " + gridKey);

  return record;
}

var addRecords = function (gridId, records) {
  var grid = getGrid(gridId);

  $.each(records, function (i, record) {
    grid.addRecord(record);
  });

  return records;
}

var deleteRecords = function (gridId, gridKey, records) {
  var grid = getGrid(gridId);

  $.each(records, function (i, record) {
    grid.deleteRecord(gridKey, record);
  });

  return records;
}

var deleteRecordsWithUndo = function (gridId, gridKey, records) {
  //alert and storage ttl
  var ttl = 60000;

  //store the records
  amplify.store("StoredRecords", records, { expires: ttl });

  //show undo alert
  $("#UndoAlert").slideDown();

  //set the alert timeout
  setTimeout(function () {
    $("#UndoAlert").slideUp();
  }, ttl);

  //remove the records
  deleteRecords(gridId, gridKey, records);
}

var undoDelete = function () {
  //recover the stored records
  var records = ej.parseJSON(amplify.store("StoredRecords"));

  //clear records from storage
  amplify.store("StoredRecords", null);

  //add the updated records
  addRecords("InlineEditingGrid", records);
}

var updateRows = function (gridId, gridKey, records) {
  //alert and storage ttl
  var ttl = 60000;

  //store the records
  amplify.store("StoredRecords", records, { expires: ttl });

  //show undo alert
  $("#UndoAlert").slideDown();

  //set the alert timeout
  setTimeout(function () {
    $("#UndoAlert").slideUp();
  }, ttl);

  //remove the stale records
  deleteRecords("InlineEditingGrid", "Id", records);

  //update the records
  $.each(records, function (i, record) {
    record.ShipCity = "Updated City";
  });

  //add the updated records
  addRecords("InlineEditingGrid", records);
}

var undoUpdate = function () {
  //recover the stored records
  var records = ej.parseJSON(amplify.store("StoredRecords"));

  //update the records
  $.each(records, function (i, record) {
    record.ShipCity = "Undone City";
  });

  //clear records from storage
  amplify.store("StoredRecords", null);

  //hide the alert
  $("#UndoAlert").slideUp();

  //remove the old records
  deleteRecords("InlineEditingGrid", "Id", records);

  //re-add the updated records
  addRecords("InlineEditingGrid", records);
}

var removeRow = function () {
  //change based on which grid you're testing
  var grid = getGrid("MultiSelectGroupedGrid");

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
    //deleteRecords("MultiSelectGroupedGrid", "OrderId", records);
    //updateRows("InlineEditingGrid", "OrderId", records);
    deleteRecordsWithUndo("InlineEditingGrid", "OrderId", records);
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
    
    //just showing that we got the correct manufacturer id and text
    console.log(args.data.ManufacturerId);
    console.log(args.data.Manufacturer);

    //refresh the grid so the id displays properly (not really applicable in this project)
    $("#InlineEditingGrid").ejGrid("refreshContent");

    //add a new record for editing if a new record was just added
    if (!args.data.OrderId) {
      self.addRecord();
    }
  }

  if (args.requestType === "beginedit") {
    //when editing a dropdown, set the selected text to match the current value
    var ele = $("#" + self._id + "Manufacturer");

    ele.ejDropDownList("setSelectedText", args.model.currentViewData[args.rowIndex].Manufacturer);
  }
}

var getSelectedText = function (args, columnName, selectedValue) {
  var columnData = _.findWhere(args.model.columns, { field: columnName }).dataSource;
  var selectedText = _.findWhere(columnData, { value: parseInt(selectedValue) }).text;

  return selectedText;
}

var inlineEditActionBegin = function (args) {
  var self = this;

  //this is working to fetch the selected dropdown id at edit time
  //no more variable needed
  if (args.requestType === "save") {
    args.data.ManufacturerId = self.element.find("select#InlineEditingGridManufacturer").ejDropDownList("getSelectedValue");
    args.data.Manufacturer = getSelectedText(args, "Manufacturer", args.data.ManufacturerId);
  }
}

var editRow = function (args) {
  var grid = getGrid("MultiSelectGroupedGrid");
  var i = grid.model.selectedRowIndex;
  var record = grid.getCurrentViewData()[i];
  
  //here, the wrong rowindex is found, making it impossible to get the correct record with grid.getCurrentViewData()[i]
  alert("i=" + i);

  return record;
}
