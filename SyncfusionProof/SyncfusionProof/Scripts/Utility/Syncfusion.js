window.Utility = window.Utility || {};

//a function for extending the namespace
function extend(ns, ns_string, ns_o) {
  var parts = ns_string.split('.'),
    parent = ns,
    ns_o = ns_o || {},
    pl,
    i;

  if (parts[0] == 'Utility') {
    parts = parts.slice(1);
  }
  pl = parts.length;
  for (i = 0; i < pl; i++) {
    if (typeof parent[parts[i]] == 'undefined') {
      if (i == pl - 1)
        parent[parts[i]] = ns_o;
      else
        parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
}

extend(window.Utility, "Syncfusion", {
  Grid: {
    getGrid: function (gridId) {
      return $("#" + gridId).ejGrid("instance");
    },
    applyScrolling: function (gridId) {
      if (gridId) {
        var grid = Utility.Syncfusion.Grid.getGrid(gridId);
        var scrollWidth = grid.element.width();

        $("#" + gridId).ejGrid({
          allowScrolling: true,
          scrollSettings: { width: scrollWidth }
        });
      }
    }
  },
  Tab: {
    hideAllTabs: function () {
      //remove "active" from the tab li elements
      $("ul.nav.nav-tabs").children().removeClass("active");

      //remove "in active" from the tab content div elements
      $("div.tab-content").children().removeClass("in active");
    },
    showTab: function (tabId) {
      //add "active" to the tab's li parent element
      $("a[href='" + tabId + "'").parent().addClass("active");

      //add "in active" to the associated div
      $(tabId).addClass("in active");

      //get the grid and apply scrolling
      var gridId = $(tabId).find(".e-grid")[0].id;

      //fix scrolling
      Utility.Syncfusion.Grid.applyScrolling(gridId);
    },
    loadActiveTab: function () {
      //initially hide all the tabs
      Utility.Syncfusion.Tab.hideAllTabs();

      var lastActiveTab = amplify.store("BootstrapActiveTab");

      if (lastActiveTab) {
        //there's a stored active tab, activate it instead of the default
        Utility.Syncfusion.Tab.showTab(lastActiveTab);
      }
      else {
        //there's no stored active tab, activate the first one
        Utility.Syncfusion.Tab.showTab("#tabone");
      }
    },
    saveActiveTab: function () {
      var currentActiveTab = $("ul.nav.nav-tabs").find(".active").find("a").attr("href");

      amplify.store("BootstrapActiveTab", currentActiveTab);
    }
  }
});

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

  //when the tab selection changes, fix the scrolling
  $(document).on("shown.bs.tab", "a[data-toggle='tab']", function (e) {
    //find the tab's grid
    var self = this;
    var tabId = $(e.target).attr("href");
    var gridId = $(tabId).find(".e-grid")[0].id;

    //fix scrolling
    Utility.Syncfusion.Grid.applyScrolling(gridId);
  });

  ////set the last remembered tab active when the page loads
  //Utility.Syncfusion.Tab.loadActiveTab();

  ////remember the last selected tab when we leave the page
  //$(window).on("beforeunload", function () {
  //  Utility.Syncfusion.Tab.saveActiveTab();
  //});
});

var onChange = function (args) {
  var self = this;
  var grid = Utility.Syncfusion.Grid.getGrid("InlineEditingGrid");
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
  var grid = Utility.Syncfusion.Grid.getGrid(gridId);

  return grid.element.find(".gridform").find("input#" + gridId + columnName).val();
}

var setColumnValue = function (gridId, columnName, newValue) {
  var grid = Utility.Syncfusion.Grid.getGrid(gridId);

  return grid.element.find(".gridform").find("input#" + gridId + columnName).val(newValue);
}

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
  var grid = Utility.Syncfusion.Grid.getGrid(gridId);

  grid.deleteRecord(gridKey, record);
  //alert("Selected Key: " + gridKey);

  return record;
}

var addRecords = function (gridId, records) {
  var grid = Utility.Syncfusion.Grid.getGrid(gridId);

  $.each(records, function (i, record) {
    grid.addRecord(record);
  });

  return records;
}

var deleteRecords = function (gridId, gridKey, records) {
  var grid = Utility.Syncfusion.Grid.getGrid(gridId);

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
  var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGroupedGrid");

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
  var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGrid");

  var i = grid.model.selectedRowIndex;
  var record = grid.getCurrentViewData()[i];

  alert("selectedRowIndex = " + i + "; OrderId = " + record.OrderId);

  return record;
}

var textAreaCreate = function () {
  //return the textarea
  return $("<div class='e-field'><textarea rows='5'></textarea></div>");
}

var textAreaRead = function (args) {
  //get the edited text value
  return args.val();
}

var textAreaWrite = function (args) {
  //write the edited text value
  args.element.find("textarea").val(args.rowdata["ShipCity"]).attr("name", "ShipCity");
}

var tabOneRowSelected = function (row) {
  var grid = Utility.Syncfusion.Grid.getGrid("TabTwoGrid");

  //current data 
  var currData = grid.getCurrentViewData();

  currData.push(row.data);

  grid.dataSource(currData);
}