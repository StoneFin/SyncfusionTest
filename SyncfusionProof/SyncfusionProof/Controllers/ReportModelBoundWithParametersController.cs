using Syncfusion.EJ.ReportViewer;
using Syncfusion.Reports.EJ;
using SyncfusionProof.Data;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace SyncfusionProof.Controllers
{
  public class ReportModelBoundWithParametersController : ApiController, IReportController
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
      if (HttpContext.Current.Items.Contains("CustomerID"))
      {
        //clear the data sources
        reportOption.ReportModel.DataSources.Clear();

        //go get the data
        var testModels = DataHelper.GetTestModels(HttpContext.Current.Items["CustomerID"].ToString());

        //set the data sources
        reportOption.ReportModel.DataSources.Add(new ReportDataSource
        {
          Name = "TestModels",
          Value = testModels
        });

        //remove the parameters so we don't query again
        HttpContext.Current.Items.Remove("CustomerID");
      }
    }

    public object PostReportAction(Dictionary<string, object> jsonResult)
    {
      if (jsonResult.ContainsValue("GetDataSourceCredential") &&
        jsonResult.ContainsKey("CustomerID"))
      {
        HttpContext.Current.Items.Add("CustomerID", jsonResult["CustomerID"]);
      }

      return ReportHelper.ProcessReport(jsonResult, this);
    }
  }
}
