$(function () {
 
});

//tabbed grid test, cannot be contained in document ready, per Syncfusion
//http://www.syncfusion.com/support/directtrac/incidents/133501
/*
 * We have analyzed your code snippet and found that you have called the 
 * event function inside the JQuery document ready, which is the cause of 
 * the issue. We would like to let you know that when we defined the event 
 * function inside the document ready, the control cant able to access on 
 * that function because it’s not rendered at that time. So we suggest you 
 * to call the event function outside of document ready to resolve the 
 * issue. Please refer the below code snippets for further details.
 */
var onItemActive = function (args) {
  //console.log("onItemActive");

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
