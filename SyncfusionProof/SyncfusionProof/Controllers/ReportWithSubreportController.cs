using Syncfusion.EJ.ReportViewer;
using Syncfusion.Reports.EJ;
using SyncfusionProof.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SyncfusionProof.Controllers
{
  public class ReportWithSubreportController : ApiController, IReportController
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
        //Why must I do this when the data already exists on the main report?
        //Why doesn't my subreport display any data?

        //get the data for the subreport
        reportOption.SubReportModel.DataSources.Clear();

        var customerId = reportOption.SubReportModel.Parameters.Single(x => x.Name.Equals("CustomerId")).Values.First();
        var customerDetailsModel = DataHelper.GetTestModels(customerId).First().CustomerDetailsModel;

        reportOption.SubReportModel.DataSources.Add(new ReportDataSource
        {
          Name = "CustomerDetailsModel",
          Value = customerDetailsModel
        });
      }
    }

    public object PostReportAction(Dictionary<string, object> jsonResult)
    {
      return ReportHelper.ProcessReport(jsonResult, this);
    }
  }
}
