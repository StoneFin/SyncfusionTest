SyncfusionUtility = (function () {
  var exports = {};

  exports.refreshGridData = function (gridId, data) {
    var grid = $("#" + gridId).ejGrid("instance");

    grid.model.dataSource = ej.DataManager(data);

    $("#" + gridId).ejGrid("refreshContent");
  }

  exports.getGridRecord = function (gridId, element) {
    var grid = $("#" + gridId).ejGrid("instance");
    var index = element.closest("tr").index();
    var record = grid.getCurrentViewData()[index];

    return record;
  }

  exports.setScrollingGridSize = function () {
    //set the size of all grids where AllowScrolling is turned on

    $("[data-ej-allowscrolling=true]").each(function () {
      //get the grid
      var grid = $(this);
      
      //get the grid parent width
      var pWidth = grid.parent().width();

      //set grid width to the desired width
      grid.width(pWidth);

      //get the scroller
      var scroller = grid.ejGrid("instance").getContent().ejScroller("instance");

      //set scroller width to the desired width
      scroller.model.width = pWidth;

      //refresh the scroller
      scroller.refresh();

      //console.log("create: " + grid.attr("id") + ", width = " + gWidth);
    });
  }

  exports.createScrollingGrid = function () {
    //get the grid
    var grid = this._gridContent.parent();

    //get the grid parent container
    var gParent = grid.parent();

    //get the parent width
    var pWidth = gParent.width();

    //current grid width
    var gWidth = grid.width();

    if (gParent.attr("class") == "well") {
      //the parent is the well, we don't care about padding

      //set the width to the parent width
      gWidth = pWidth;
    }
    else {
      //the parent is not the well, use the padding from the well

      //get the closest .well container (that's what dictates the size when the grid is created)
      var gWell = grid.closest(".well");

      //get the well container padding value
      var wPadding = gWell.css("padding-left");

      //strip out the "px" so we just have the number
      var padNum = wPadding.substring(0, wPadding.length - 2);

      //set the width to the parent width minus padding
      gWidth = pWidth - (padNum * 2);
    }
    
    //get the scroller
    var scroller = grid.ejGrid("instance").getContent().ejScroller("instance");

    //set scroller width to the desired width
    scroller.model.width = gWidth;

    //refresh the scroller
    scroller.refresh();

    //set grid width to the desired width
    grid.width(gWidth);

    //console.log("create: " + grid.attr("id") + ", width = " + gWidth);
  }

  return exports;
})();
