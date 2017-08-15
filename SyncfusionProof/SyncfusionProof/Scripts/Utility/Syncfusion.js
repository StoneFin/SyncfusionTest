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
    undoDelete: function (gridId) {
      //recover the stored records
      var storageName = gridId + "StoredRecords";
      var records = ej.parseJSON(amplify.store(storageName));

      //clear records from storage
      amplify.store(storageName, null);

      //add the updated records
      Utility.Syncfusion.Grid.addRecords(gridId, records);

      //hide the undo alert
      $("#" + gridId + "UndoAlert").slideUp();
    },
    addRecords: function (gridId, records) {
      var grid = Utility.Syncfusion.Grid.getGrid(gridId);

      $.each(records, function (i, record) {
        grid.addRecord(record);
      });

      return records;
    },
    getRecord: function (gridElement) {
      //single select
      if (gridElement.getSelectedRecords().length === 1) {
        return gridElement.getSelectedRecords()[0];
      }

      alert("Please select a single record.");

      return null;
    },
    getRecords: function (gridElement) {
      //multi select
      if (gridElement.getSelectedRecords().length > 0) {
        return gridElement.getSelectedRecords();
      }

      alert("Please select one or more records.");

      return null;
    },
    setColumnValue: function (gridId, columnName, newValue) {
      var grid = Utility.Syncfusion.Grid.getGrid(gridId);

      return grid.element.find(".gridform").find("input#" + gridId + columnName).val(newValue);
    },
    getColumnValue: function (gridId, columnName) {
      //gets a column value in an a grid row that is currently in edit mode
      var grid = Utility.Syncfusion.Grid.getGrid(gridId);

      return grid.element.find(".gridform").find("input#" + gridId + columnName).val();
    },
    getGrid: function (gridId) {
      return $("#" + gridId).ejGrid("instance");
    },
    //no longer necessary as of Syncfusion 14.3.0.52
    //https://www.syncfusion.com/support/directtrac/incidents/166542
    //applyScrolling: function (gridId) {
    //  if (gridId) {
    //    var grid = Utility.Syncfusion.Grid.getGrid(gridId);
    //    var scrollWidth = grid.element.width();

    //    $("#" + gridId).ejGrid({
    //      allowScrolling: true,
    //      scrollSettings: { width: scrollWidth }
    //    });
    //  }
    //},
    deleteRecord: function (gridId, gridKey, record) {
      var grid = Utility.Syncfusion.Grid.getGrid(gridId);

      grid.deleteRecord(gridKey, record);
      //alert("Selected Key: " + gridKey);

      return record;
    },
    deleteRecords: function (gridId, gridKey, records) {
      var grid = Utility.Syncfusion.Grid.getGrid(gridId);

      $.each(records, function (i, record) {
        grid.deleteRecord(gridKey, record);
      });

      return records;
    },
    deleteRecordsWithUndo: function (gridId, gridKey, records) {
      //alert and storage ttl
      var ttl = 60000;

      //store the records
      amplify.store(gridId + "StoredRecords", records, { expires: ttl });

      //show undo alert
      $("#" + gridId + "UndoAlert").slideDown();

      //set the alert timeout
      setTimeout(function () {
        $("#" + gridId + "UndoAlert").slideUp();
      }, ttl);

      //remove the records
      Utility.Syncfusion.Grid.deleteRecords(gridId, gridKey, records);
    },
    Dropdown: {
      getSelectedText: function (args, columnName, selectedValue) {
        var columnData = _.findWhere(args.model.columns, { field: columnName }).dataSource;
        var selectedItem = _.findWhere(columnData, { value: parseInt(selectedValue) });
        var selectedText = selectedItem ? selectedItem.text : "";

        return selectedText;
      },
      getSelectedValue: function (gridId, columnName) {
        var grid = Utility.Syncfusion.Grid.getGrid(gridId);

        return grid.element.find("select#" + grid._id + columnName).ejDropDownList("getSelectedValue");
      }
    },
    EmptyGrid: {
      actionBegin: function (args) {
        var self = this;

        //this is working to fetch the selected dropdown id at edit time
        //no more variable needed
        if (args.requestType === "save") {
          args.data.ManufacturerId = Utility.Syncfusion.Grid.Dropdown.getSelectedValue("EmptyGrid", "Manufacturer");
          args.data.Manufacturer = Utility.Syncfusion.Grid.Dropdown.getSelectedText(args, "Manufacturer", args.data.ManufacturerId);
        }
      },
      actionComplete: function (args) {
        var self = this;

        if (args.requestType === "save") {
          //cancel the grid's default operation
          args.cancel = true;

          //just showing that we got the correct manufacturer id and text
          console.log(args.data.ManufacturerId);
          console.log(args.data.Manufacturer);

          //refresh the grid so the id displays properly (not really applicable in this project)
          $("#EmptyGrid").ejGrid("refreshContent");

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
      },
      toolbarClick: function (toolbarItem) {
        var self = this;

        if (toolbarItem.itemName === "Delete" ||
            toolbarItem.itemName === "Refresh") {
          //cancel the grid's default operation
          toolbarItem.cancel = true;
        }

        if (toolbarItem.itemName === "Delete") {
          var records = Utility.Syncfusion.Grid.getRecords(self);

          Utility.Syncfusion.Grid.deleteRecordsWithUndo("EmptyGrid", "OrderId", records);
        }
        else if (toolbarItem.itemName === "Refresh") {
          alert("refresh button clicked")
        }
      }
    },
    InlineEditingGrid: {
      textAreaCreate: function () {
        //return the textarea
        var $textArea = $("<textarea>", {
          "class": "e-field",
          "rows": "5",
          "style": "width: 100%;"
        });
        
        return $textArea;
      },
      textAreaRead: function (args) {
        //get the edited text value
        return args.val();
      },
      textAreaWrite: function (args) {
        //write the edited text value
        args.element.val(args.rowdata["ShipCity"]).attr("name", "ShipCity");
      },
      actionBegin: function (args) {
        var self = this;

        //this is working to fetch the selected dropdown id at edit time
        //no more variable needed
        if (args.requestType === "save") {
          args.data.ManufacturerId = Utility.Syncfusion.Grid.Dropdown.getSelectedValue("InlineEditingGrid", "Manufacturer");
          args.data.Manufacturer = Utility.Syncfusion.Grid.Dropdown.getSelectedText(args, "Manufacturer", args.data.ManufacturerId);
        }
      },
      actionComplete: function (args) {
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
      },
      toolbarClick: function (toolbarItem) {
        var self = this;

        if (toolbarItem.itemName === "Delete" ||
            toolbarItem.itemName === "Refresh") {
          //cancel the grid's default operation
          toolbarItem.cancel = true;
        }

        if (toolbarItem.itemName === "Delete") {
          var records = Utility.Syncfusion.Grid.getRecords(self);

          Utility.Syncfusion.Grid.deleteRecordsWithUndo("InlineEditingGrid", "OrderId", records);
        }
        else if (toolbarItem.itemName === "Refresh") {
          alert("refresh button clicked")
        }
      },
      undoDelete: function () {
        return Utility.Syncfusion.Grid.undoDelete("InlineEditingGrid");
      },
      onChange: function (args) {
        var self = this;
        var grid = Utility.Syncfusion.Grid.getGrid("InlineEditingGrid");
        var val1 = Utility.Suncfusion.Grid.getColumnValue("InlineEditingGrid", "Value1");
        var val2 = Utility.Suncfusion.Grid.getColumnValue("InlineEditingGrid", "Value2");

        val1 = parseFloat(val1.replace(",", ""));
        val2 = parseFloat(val2.replace(",", ""));
        val1 = isNaN(val1) ? 0 : val1;
        val2 = isNaN(val2) ? 0 : val2;

        var sum = val1 + val2;

        return Utility.Syncfusion.Grid.setColumnValue("InlineEditingGrid", "ValueSum", sum);
      }
    },
    MultiSelectGrid: {
      toolbarClick: function (toolbarItem) {
        var self = this;

        if (toolbarItem.itemName === "Delete" ||
            toolbarItem.itemName === "Refresh") {
          //cancel the grid's default operation
          toolbarItem.cancel = true;
        }

        if (toolbarItem.itemName === "Delete") {
          var records = Utility.Syncfusion.Grid.getRecords(self);

          Utility.Syncfusion.Grid.deleteRecordsWithUndo("MultiSelectGrid", "OrderId", records);
        }
        else if (toolbarItem.itemName === "Refresh") {
          alert("refresh button clicked")
        }
      },
      undoDelete: function () {
        return Utility.Syncfusion.Grid.undoDelete("MultiSelectGrid");
      },
      editRow: function (args) {
        var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGrid");

        var i = grid.model.selectedRowIndex;
        var record = grid.getCurrentViewData()[i];

        alert("selectedRowIndex = " + i + "; OrderId = " + record.OrderId);

        return record;
      },
      removeRow: function () {
        var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGrid");

        var i = grid.model.selectedRowIndex;
        var record = grid.getCurrentViewData()[i];

        Utility.Syncfusion.Grid.deleteRecord("MultiSelectGrid", "OrderId", record);
      }
    },
    MultiSelectGroupedGrid: {
      toolbarClick: function (toolbarItem) {
        var self = this;

        if (toolbarItem.itemName === "Delete" ||
            toolbarItem.itemName === "Refresh") {
          //cancel the grid's default operation
          toolbarItem.cancel = true;
        }

        if (toolbarItem.itemName === "Delete") {
          var records = Utility.Syncfusion.Grid.getRecords(self);

          Utility.Syncfusion.Grid.deleteRecordsWithUndo("MultiSelectGroupedGrid", "OrderId", records);
        }
        else if (toolbarItem.itemName === "Refresh") {
          alert("refresh button clicked")
        }
      },
      editRow: function (args) {
        var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGroupedGrid");

        var i = grid.model.selectedRowIndex;
        var record = grid.getCurrentViewData()[i];

        alert("selectedRowIndex = " + i + "; OrderId = " + record.OrderId);

        return record;
      },
      removeRow: function () {
        var grid = Utility.Syncfusion.Grid.getGrid("MultiSelectGroupedGrid");

        var i = grid.model.selectedRowIndex;
        var record = grid.getCurrentViewData()[i];

        Utility.Syncfusion.Grid.deleteRecord("MultiSelectGroupedGrid", "OrderId", record);
      }
    },
    ToolbarTemplateGrid: {
      toolbarClick: function (toolbarItem) {
        var self = this;

        if (toolbarItem.itemName === "Delete" ||
            toolbarItem.itemName === "Refresh") {
          //cancel the grid's default operation
          toolbarItem.cancel = true;
        }

        if (toolbarItem.itemName === "Delete") {
          var records = Utility.Syncfusion.Grid.getRecords(self);

          Utility.Syncfusion.Grid.deleteRecordsWithUndo("ToolbarTemplateGrid", "OrderId", records);
        }
        else if (toolbarItem.itemName === "Refresh") {
          alert("refresh button clicked")
        }
      }
    }
  },
  Tab: {
    hideAllTabs: function () {
      //remove "active" from the tab li elements that are active
      $("ul.nav.nav-tabs").find(".active").removeClass("active")

      //remove "in active" from the tab content div elements that are active
      $("div.tab-content").find(".in.active").removeClass("in active");
    },
    showTab: function (tabId) {
      //add "active" to the tab's li parent element
      $("a[href='" + tabId + "'").parent().addClass("active");

      //add "in active" to the associated div
      $(tabId).addClass("in active");

      //no longer necessary as of Syncfusion 14.3.0.52
      //https://www.syncfusion.com/support/directtrac/incidents/166542
      ////get the grid and apply scrolling
      //var gridId = $(tabId).find(".e-grid")[0].id;

      ////fix scrolling
      //Utility.Syncfusion.Grid.applyScrolling(gridId);
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
  //click handler for undoing deletes
  $("#InlineEditingGridUndoLink").on("click", function () {
    Utility.Syncfusion.Grid.InlineEditingGrid.undoDelete();
  });

  $("#MultiSelectGridUndoLink").on("click", function () {
    Utility.Syncfusion.Grid.MultiSelectGrid.undoDelete();
  });

  //custom validation rule on an editable grid
  $.validator.addMethod("lessThanValue2", function (value, element) {
    var value2 = Utility.Syncfusion.Grid.getColumnValue("InlineEditingGrid", "Value 2");

    return parseFloat(value.replace(",", "")) <= parseFloat(value2.replace(",", ""));
  }, "Value 1 must be less than or equal to Value 2");

  //no longer necessary as of Syncfusion 14.3.0.52
  //https://www.syncfusion.com/support/directtrac/incidents/166542
  ////when the tab selection changes, fix the scrolling
  //$(document).on("shown.bs.tab", "a[data-toggle='tab']", function (e) {
  //  //find the tab's grid
  //  var self = this;
  //  var tabId = $(e.target).attr("href");
  //  var gridId = $(tabId).find(".e-grid")[0].id;
  //  //fix scrolling
  //  Utility.Syncfusion.Grid.applyScrolling(gridId);
  //});

  //set the last remembered tab active when the page loads
  Utility.Syncfusion.Tab.loadActiveTab();

  //remember the last selected tab when we leave the page
  $(window).on("beforeunload", function () {
    Utility.Syncfusion.Tab.saveActiveTab();
  });
});

//currently, we're using Bootstrap tabs, this is probably way out of date
////Syncfusion tab rendering fix (working)
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
