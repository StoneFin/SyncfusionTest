var viewReport = function () {
  var reportViewer = $("#ReportModelBoundWithParameters").data("ejReportViewer");

  reportViewer._customerId = $("#txtCustomerId").val();
  reportViewer._updateDatasource = true;

  if (reportViewer._isReportLoaded) {
    reportViewer._refreshReport();
  }
  else {
    reportViewer.doAjaxPost("POST", reportViewer._actionUrl, JSON.stringify({
      'reportAction': reportViewer._reportAction.reportLoad, 'controlId': reportViewer._id, 'reportPath': reportViewer.model.reportPath,
      'reportServerUrl': reportViewer.model.reportServerUrl, 'processingMode': reportViewer.model.processingMode
    }), "_reportLoaded");
  }
}

ej.ReportViewer.prototype.doAjaxPost = function (type, url, jsondata, onSuccess) {
  var invokeMethod = onSuccess;
  var reportViewer = $("#ReportModelBoundWithParameters").data("ejReportViewer");

  if (reportViewer._customerId && !ej.isNullOrUndefined(reportViewer._customerId)) {
    reportViewer._isReportLoaded = true;

    $.ajax({
      type: type,
      url: url,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: jsondata,
      beforeSend: function (req) {
        if (reportViewer._updateDatasource && invokeMethod == "_getDataSourceCredential") {
          if (reportViewer._customerId) {
            var _json = jQuery.parseJSON(this.data);

            _json["CustomerId"] = reportViewer._customerId;

            this.data = JSON.stringify(_json);
          }

          reportViewer._updateDatasource = false;
        }

        if (invokeMethod == "_getPageModel" || invokeMethod == "_getPreviewModel") {
          if (!reportViewer._isToolbarClick) {
            reportViewer._showloadingIndicator(true);

            reportViewer._updateDatasource = true;
          } else {
            reportreportViewerData._showNavigationIndicator(true);
          }
        }

        req.setRequestHeader('ejAuthenticationToken', reportViewer._authenticationToken);
      },
      success: function (data) {
        if (data && typeof (data.Data) != "undefined") {
          data = data.Data;
        }
        if (typeof (data) == "string") {
          if (data.indexOf("Sf_Exception") != -1) {
            reportViewer._renderExcpetion(invokeMethod + ":" + data);

            return;
          }
        }
        reportViewer[invokeMethod](data);
      }
    });
  }
  else if (invokeMethod == "_reportLoaded") {
    reportViewer._isReportLoaded = false;
  }
}

$(function () {
  $("#btnViewReport").on("click", function () {
    viewReport();
  });
});
