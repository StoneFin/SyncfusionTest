using Syncfusion.EJ.ReportViewer;
using Syncfusion.Reports.EJ;
using SyncfusionProof.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SyncfusionProof.Controllers
{
  public class ReportWithNestedSubreportsController : ApiController, IReportController
  {
    public object GetResource(string key, string resourcetype, bool isPrint)
    {
      return ReportHelper.GetResource(key, resourcetype, isPrint);
    }

    public void OnInitReportOptions(ReportViewerOptions reportOption)
    {
    }

    public void OnReportLoaded(ReportViewerOptions reportOption)
    {
      if (reportOption.SubReportModel != null)
      {
        //selectively load the subreport datasources based on which subreport is being loaded
        //NOTE: the subreport path is relative to the containing report, not to the root report.
        switch (reportOption.SubReportModel.ReportPath)
        {
          case "CustomerDetailsNestedOne":
            reportOption.SubReportModel.DataSources.Add(ReportDataHelper.GetReportDataSource(reportOption, "CustomerDetailsModel", "CustomerDetailsModelNestedOne"));
            break;
          case "CustomerDetailsNestedTwo":
            reportOption.SubReportModel.DataSources.Add(ReportDataHelper.GetReportDataSource(reportOption, "CustomerDetailsModel", "CustomerDetailsModelNestedTwo"));
            break;
          case "CustomerDetailsNestedThree":
            reportOption.SubReportModel.DataSources.Add(ReportDataHelper.GetReportDataSource(reportOption, "CustomerDetailsModel", "CustomerDetailsModelNestedThree"));
            break;
          case "../Shared/Address":
            reportOption.SubReportModel.DataSources.Add(ReportDataHelper.GetReportDataSource(reportOption, "AddressModel", "AddressModel"));
            break;
        }
      }
    }

    public object PostReportAction(Dictionary<string, object> jsonResult)
    {
      return ReportHelper.ProcessReport(jsonResult, this);
    }
  }
}
